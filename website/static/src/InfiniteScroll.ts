export {};

const rowsContainer = document.getElementById('table-row-container');
const limit = 10;
let index = 0;
let isLoading = false;

loadNext();

async function getNext(index: number, limit: number) {
    let response = await fetch(
        `/api/projects/newest?index=${index}&limit=${limit}`
    );

    return await response.json().then((data) => {
        return data;
    });
}

async function loadNext() {
    if (isLoading) return;

    showLoader();
    isLoading = true;

    let projects = await getNext(index, limit);

    projects.forEach((element) => {
        createRow(
            element.uuid,
            element.label,
            element.description,
            element.positive_votes,
            element.negative_votes
        );
    });

    if (projects.length === 0) {
        hideLoader();
        return;
    }

    hideLoader();
    isLoading = false;

    index += limit;
}

function showLoader() {
    let row = document.createElement('div');
    row.classList.add('table__loader');
    row.id = 'loader';

    rowsContainer.appendChild(row);

    rowsContainer.scrollTop = rowsContainer.scrollHeight;
}

function hideLoader() {
    document.getElementById('loader').remove();
}

function createRow(uuid, label, description, positive_votes, negative_votes) {
    let row = document.createElement('div');
    row.classList.add('table__row');

    let items = [];

    for (let i = 0; i <= 3; i++) {
        let item = document.createElement('p');
        item.classList.add('table__row-item');
        items.push(item);
    }

    items[0].classList.add('table__row-item');

    let label_item = document.createElement('a');
    label_item.innerHTML = label;
    label_item.href = `${uuid}`;
    items[0].appendChild(label_item);

    items[1].innerHTML = description;
    items[2].innerHTML = positive_votes.toString();
    items[3].innerHTML = negative_votes.toString();

    let btnPositive = document.createElement('button');
    btnPositive.classList.add('table__row-btn', 'table__row-btn--positive');

    let btnPositiveInner = document.createElement('a');
    btnPositiveInner.innerHTML = 'Za';

    btnPositive.appendChild(btnPositiveInner);

    let btnNegative = document.createElement('button');
    btnNegative.classList.add('table__row-btn', 'table__row-btn--negative');

    let btnNegativeInner = document.createElement('a');
    btnNegativeInner.innerHTML = 'Przeciw';

    btnNegative.appendChild(btnNegativeInner);

    let rowItems = [
        items[0],
        items[1],
        items[2],
        items[3],
        btnPositive,
        btnNegative,
    ];

    rowItems.forEach((item) => {
        row.appendChild(item);
    });

    rowsContainer.appendChild(row);
}

rowsContainer.addEventListener('scroll', () => {
    let scrollTop = rowsContainer.scrollTop;

    let scrollHeight = rowsContainer.scrollHeight - rowsContainer.clientHeight;

    let progress = scrollTop / scrollHeight;

    if (progress === 1) {
        loadNext();
    }
});
