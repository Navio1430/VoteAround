const deleteAccount = () => {
    const userContainer = document.getElementById('user-container');
    const userDeleteAccount = document.getElementById('user-delete-account');
    userDeleteAccount.addEventListener('click', () => {
        let alert = document.createElement('div');
        alert.classList.add('user__delete-alert');
        let title = document.createElement('p');
        title.classList.add('user__delete-title');
        title.innerHTML = 'Usuwanie konta';
        let password = document.createElement('input');
        password.classList.add('user__delete-password');
        password.placeholder = 'Podaj hasło';
        let checkbox = document.createElement('input');
        checkbox.classList.add('user__delete-checkbox');
        checkbox.type = 'checkbox';
        let checkboxP = document.createElement('p');
        checkboxP.innerHTML =
            'Jestem pewien, że chcę bezpowrotnie usunąć konto';
        let checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('user__delete-checkbox-container');
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(checkboxP);
        let btnP = document.createElement('p');
        btnP.innerHTML = 'Usuń';
        let btn = document.createElement('button');
        btn.classList.add('table__row-btn', 'table__row-btn--negative', 'user__delete-btn');
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
export { deleteAccount };
