const changePassword = () => {
    const userContainer = document.getElementById('user-container');
    const usernameBtnPassword = document.getElementById('username-btn-password');
    usernameBtnPassword.addEventListener('click', () => {
        let alert = document.createElement('form');
        alert.classList.add('user__password-alert');
        let title = document.createElement('p');
        title.classList.add('user__delete-title');
        title.innerHTML = 'Zmiana hasła';
        let oldPassword = document.createElement('input');
        oldPassword.classList.add('user__password-input');
        oldPassword.placeholder = 'Podaj aktualne hasło';
        let newPassword = document.createElement('input');
        newPassword.classList.add('user__password-input');
        newPassword.type = 'password';
        newPassword.placeholder = 'Podaj nowe hasło';
        let newPasswordRepeat = document.createElement('input');
        newPasswordRepeat.classList.add('user__password-input', 'user__password-input--last');
        newPasswordRepeat.type = 'password';
        newPasswordRepeat.placeholder = 'Powtórz nowe hasło';
        let checkbox = document.createElement('input');
        checkbox.classList.add('user__delete-checkbox');
        checkbox.type = 'checkbox';
        let checkboxP = document.createElement('p');
        checkboxP.innerHTML = 'Jestem pewien, że chcę zmienić hasło';
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
        let alertItems = [
            title,
            oldPassword,
            newPassword,
            newPasswordRepeat,
            checkboxContainer,
            btn,
        ];
        alertItems.forEach((element) => {
            alert.appendChild(element);
        });
        userContainer.children.length === 1
            ? userContainer.appendChild(alert)
            : userContainer.removeChild(userContainer.lastChild);
        const newPasswordValidate = () => {
            // if (newPassword.value !== newPasswordRepeat.value) {
            // } else {
            // }
            fetch('/api/user/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: oldPassword.value,
                    new_password: newPassword.value,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                if (data.success) {
                    location.reload();
                }
                else {
                    // if (alertContainer.children.length <= 1) {
                    //     let passwordAlert = document.createElement('p');
                    //     passwordAlert.innerHTML = 'Błędne hasło';
                    //     alertContainer.appendChild(passwordAlert);
                    // }
                }
            });
        };
        btn.addEventListener('click', () => {
            newPasswordValidate();
        });
    });
};
export { changePassword };
