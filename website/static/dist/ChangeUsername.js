const changeUserame = () => {
    const userContainer = document.getElementById('user-container');
    const usernameBtnUser = document.getElementById('username-btn-user');
    usernameBtnUser.addEventListener('click', () => {
        let alert = document.createElement('form');
        alert.classList.add('user__delete-alert');
        let title = document.createElement('p');
        title.classList.add('user__delete-title');
        title.innerHTML = 'Zmiana nazwy użytkownika';
        let password = document.createElement('input');
        password.classList.add('user__delete-password');
        password.placeholder = 'Podaj nową nazwę użytkownika';
        let checkbox = document.createElement('input');
        checkbox.classList.add('user__delete-checkbox');
        checkbox.type = 'checkbox';
        let checkboxP = document.createElement('p');
        checkboxP.innerHTML =
            'Jestem pewien, że chcę zmienić nazwę użytkownika';
        let checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('user__delete-checkbox-container');
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(checkboxP);
        let btnP = document.createElement('p');
        btnP.innerHTML = 'Zmień';
        let btn = document.createElement('button');
        btn.classList.add('table__row-btn', 'user__delete-btn', 'user__delete-btn--blue');
        btn.type = 'submit';
        btn.appendChild(btnP);
        let alertItems = [title, password, checkboxContainer, btn];
        alertItems.forEach((element) => {
            alert.appendChild(element);
        });
        userContainer.children.length === 1
            ? userContainer.appendChild(alert)
            : userContainer.removeChild(userContainer.lastChild);
    });
};
export { changeUserame };
