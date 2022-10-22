const userContainer = document.getElementById('user-container');
const usernameChangeBtn = document.getElementById('username-btn-user');
const usernameMinLength = 4;
const passwordMinLength = 8;
let submitBtn;
let usernameInput;
let passwordInput;
let checkboxInput;
usernameChangeBtn.addEventListener('click', () => {
    userContainer.children.length == 1 ? showAlert() : hideAlert();
});
function showAlert() {
    let alert = document.createElement('form');
    alert.classList.add('user__delete-alert');
    let title = document.createElement('p');
    title.classList.add('user__delete-title');
    title.innerHTML = 'Zmiana nazwy użytkownika';
    usernameInput = document.createElement('input');
    usernameInput.classList.add('user__delete-password');
    usernameInput.placeholder = 'Podaj nową nazwę użytkownika';
    passwordInput = document.createElement('input');
    passwordInput.classList.add('user__password-input');
    passwordInput.type = "password";
    passwordInput.placeholder = 'Podaj hasło';
    checkboxInput = document.createElement('input');
    checkboxInput.classList.add('user__delete-checkbox');
    checkboxInput.type = 'checkbox';
    let checkboxInner = document.createElement('p');
    checkboxInner.innerHTML =
        'Jestem pewien, że chcę zmienić nazwę użytkownika';
    let checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('user__delete-checkbox-container');
    checkboxContainer.appendChild(checkboxInput);
    checkboxContainer.appendChild(checkboxInner);
    let buttonInner = document.createElement('p');
    buttonInner.innerHTML = 'Zmień';
    submitBtn = document.createElement('button');
    submitBtn.classList.add('table__row-btn', 'user__delete-btn', 'user__delete-btn--blue');
    submitBtn.type = 'submit';
    submitBtn.appendChild(buttonInner);
    let alertItems = [
        title,
        usernameInput,
        passwordInput,
        checkboxContainer,
        submitBtn,
    ];
    alertItems.forEach((element) => {
        alert.appendChild(element);
    });
    userContainer.appendChild(alert);
    usernameInput.addEventListener('keyup', validate);
    passwordInput.addEventListener('keyup', validate);
    checkboxInput.addEventListener('click', validate);
    submitBtn.addEventListener('click', () => {
        fetch('/api/user/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                new_username: usernameInput.value,
                password: passwordInput.value,
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
    });
    disableButton();
}
function hideAlert() {
    userContainer.removeChild(userContainer.lastChild);
}
function validate() {
    if (usernameInput.value.length < usernameMinLength ||
        passwordInput.value.length < passwordMinLength ||
        checkboxInput.checked === false) {
        disableButton();
        return;
    }
    enableButton();
}
function disableButton() {
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.5';
}
function enableButton() {
    submitBtn.removeAttribute('disabled');
    submitBtn.style.opacity = '1';
}
export {};
