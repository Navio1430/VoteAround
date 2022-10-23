export {};

const projectsContainerPopular = document.getElementById(
    'projects-container-popular'
);

const index = 0;
const limit = 4;

async function getNext(index: number, limit: number) {
    let response = await fetch(
        `/api/projects/popular?index=${index}&limit=${limit}`
    );

    return await response.json().then((data) => {
        return data;
    });
}

const createCard = (label: string, uuid) => {
    let a = document.createElement('a');
    a.href = uuid;

    let card = document.createElement('div');
    card.classList.add('card');

    let img = document.createElement('img');
    img.src = '../../static/assets/city.svg';
    img.classList.add('card__icon');

    let cardTitle = document.createElement('p');
    cardTitle.classList.add('card__title');

    if (label.split('').length > 11) {
        let shortTitle = [];

        for (let i = 0; i < 11; i++) {
            shortTitle.push(label[i]);
        }

        shortTitle.push('...');

        cardTitle.innerHTML = shortTitle.join().replace(/\,/g, '');
    } else {
        cardTitle.innerHTML = label;
    }

    card.appendChild(img);
    card.appendChild(cardTitle);
    a.appendChild(card);
    projectsContainerPopular.appendChild(a);
};

async function loadPopular() {
    let projects = await getNext(index, limit);

    projects.forEach((element) => {
        createCard(element.label, element.uuid);
    });
}

loadPopular();
