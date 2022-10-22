const infiniteScroll = () => {
    const tableRowContainer = document.getElementById('table-row-container');
    let fetchedProjects = [];
    async function fetchData(index, limit) {
        const response = await fetch(`/api/projects/newest?index=${index}&limit=${limit}`);
        const data = response.json();
        await data.then((data) => {
            data.forEach((dataProject) => {
                fetchedProjects.push(dataProject);
            });
        });
    }
    let indexNum = 0;
    let fetchedCount = 0;
    let fetchedCountPrev = -1;
    async function createTableItem() {
        fetchedProjects = [];
        await fetchData(indexNum, 4);
        indexNum += fetchedProjects.length;
        fetchedProjects.forEach((project) => {
            let projectHtmlElement = document.createElement('div');
            projectHtmlElement.classList.add('table__row');
            let pItems = [];
            for (let i = 0; i <= 3; i++) {
                let pItem = document.createElement('p');
                pItem.classList.add('table__row-item');
                pItems.push(pItem);
            }
            pItems[0].classList.add('table__row-item');
            let labelA = document.createElement('a');
            labelA.innerHTML = project.label;
            labelA.href = `${project.uuid}`;
            pItems[0].appendChild(labelA);
            pItems[1].innerHTML = project.description;
            pItems[2].innerHTML = project.positive_votes.toString();
            pItems[3].innerHTML = project.negative_votes.toString();
            let btnPositive = document.createElement('button');
            btnPositive.classList.add('table__row-btn', 'table__row-btn--positive');
            let btnPositiveA = document.createElement('a');
            btnPositiveA.innerHTML = 'Za';
            btnPositive.appendChild(btnPositiveA);
            let btnNegative = document.createElement('button');
            btnNegative.classList.add('table__row-btn', 'table__row-btn--negative');
            let btnNegativeA = document.createElement('a');
            btnNegativeA.innerHTML = 'Przeciw';
            btnNegative.appendChild(btnNegativeA);
            let projectItems = [
                pItems[0],
                pItems[1],
                pItems[2],
                pItems[3],
                btnPositive,
                btnNegative,
            ];
            projectItems.forEach((item) => {
                projectHtmlElement.appendChild(item);
            });
            //* Adding item to table row
            tableRowContainer.appendChild(projectHtmlElement);
        });
    }
    createTableItem();
    fetchedCount = fetchedProjects.length;
    tableRowContainer.addEventListener('scroll', () => {
        let scrollTop = tableRowContainer.scrollTop;
        let scrollHeight = tableRowContainer.scrollHeight - tableRowContainer.clientHeight;
        let progress = scrollTop / scrollHeight;
        if (progress >= 0.9 && fetchedCount !== fetchedCountPrev) {
            fetchedCountPrev = fetchedCount;
            createTableItem().then(() => {
                fetchedCount += fetchedProjects.length;
            });
        }
    });
};
export { infiniteScroll };
