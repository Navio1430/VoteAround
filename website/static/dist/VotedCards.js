const projectsContainerVoted = document.getElementById('projects-container-voted');
const index = 0;
const limit = 4;
async function getNext(index, limit) {
    let response = await fetch(`/api/projects/voted?index=${index}&limit=${limit}`);
    return await response.json().then((data) => {
        return data;
    });
}
const createCard = (label, uuid) => {
    let a = document.createElement('a');
    a.href = uuid;
    let card = document.createElement('div');
    card.classList.add('card');
    let img = document.createElement('img');
    img.src = '../../static/assets/city.svg';
    img.classList.add('card__icon');
    let cardTitle = document.createElement('p');
    cardTitle.classList.add('card__title');
    cardTitle.innerHTML = label;
    card.appendChild(img);
    card.appendChild(cardTitle);
    a.appendChild(card);
    projectsContainerVoted.appendChild(a);
};
async function loadPopular() {
    let projects = await getNext(index, limit);
    projects.forEach((element) => {
        createCard(element.label, element.uuid);
    });
}
loadPopular();
export {};