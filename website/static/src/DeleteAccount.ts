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
        password.type = 'password';
        password.placeholder = 'Podaj hasło';

        let alertContainer = document.createElement('div');

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

        alertContainer.appendChild(checkboxContainer);

        let btnP = document.createElement('p');
        btnP.innerHTML = 'Usuń';

        let btn = document.createElement('button');
        btn.classList.add(
            'table__row-btn',
            'table__row-btn--negative',
            'user__delete-btn'
        );

        btn.appendChild(btnP);

        let alertItems = [title, password, alertContainer, btn];
        alertItems.forEach((element) => {
            alert.appendChild(element);
        });

        userContainer.children.length === 1
            ? userContainer.appendChild(alert)
            : userContainer.removeChild(userContainer.lastChild);

        btn.addEventListener('click', () => {
            if (checkbox.checked === true) {
                fetch('/api/user/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ password: password.value }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success) {
                            location.reload();
                        } else {
                            if (alertContainer.children.length <= 1) {
                                let passwordAlert = document.createElement('p');
                                passwordAlert.innerHTML = 'Błędne hasło';
                                alertContainer.appendChild(passwordAlert);
                            }
                        }
                    });
            }
        });
    });
};

export { deleteAccount };
