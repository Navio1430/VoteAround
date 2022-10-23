const userContainer = document.getElementById('user-container');
const passwordChangeBtn = document.getElementById('username-btn-password');
const passwordMinLength = 8;
let submitBtn;
let passwordInput;
let newPasswordInput;
let newPasswordRepeatInput;
let checkboxInput;
passwordChangeBtn.addEventListener('click', () => {
    userContainer.children.length == 1 ? showAlert() : hideAlert();
});
function showAlert() {
    let alert = document.createElement('div');
    alert.classList.add('user__password-alert');
    let title = document.createElement('p');
    title.classList.add('user__delete-title');
    title.innerHTML = 'Zmiana hasła';
    passwordInput = document.createElement('input');
    passwordInput.classList.add('user__password-input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Podaj aktualne hasło';
    newPasswordInput = document.createElement('input');
    newPasswordInput.classList.add('user__password-input');
    newPasswordInput.type = 'password';
    newPasswordInput.placeholder = 'Podaj nowe hasło';
    newPasswordRepeatInput = document.createElement('input');
    newPasswordRepeatInput.classList.add('user__password-input', 'user__password-input--last');
    newPasswordRepeatInput.type = 'password';
    newPasswordRepeatInput.placeholder = 'Powtórz nowe hasło';
    let responseMessageContainer = document.createElement('div');
    checkboxInput = document.createElement('input');
    checkboxInput.classList.add('user__delete-checkbox');
    checkboxInput.type = 'checkbox';
    let checkboxInner = document.createElement('p');
    checkboxInner.innerHTML = 'Jestem pewien, że chcę zmienić hasło';
    let checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('user__delete-checkbox-container');
    checkboxContainer.appendChild(checkboxInput);
    checkboxContainer.appendChild(checkboxInner);
    responseMessageContainer.appendChild(checkboxContainer);
    let buttonInner = document.createElement('p');
    buttonInner.innerHTML = 'Zmień';
    submitBtn = document.createElement('button');
    submitBtn.classList.add('table__row-btn', 'user__delete-btn', 'user__delete-btn--blue');
    submitBtn.appendChild(buttonInner);
    let alertItems = [
        title,
        passwordInput,
        newPasswordInput,
        newPasswordRepeatInput,
        responseMessageContainer,
        submitBtn,
    ];
    alertItems.forEach((element) => {
        alert.appendChild(element);
    });
    userContainer.appendChild(alert);
    submitBtn.addEventListener('click', () => {
        fetch('/api/user/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: passwordInput.value,
                new_password: newPasswordInput.value,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
            if (data.success) {
                window.location.reload();
            }
            else {
                if (responseMessageContainer.children.length <= 1) {
                    let message = document.createElement('p');
                    message.style.color = 'red';
                    message.innerHTML = 'Błędne hasło';
                    responseMessageContainer.appendChild(message);
                }
            }
        });
    });
    passwordInput.addEventListener('keyup', validate);
    newPasswordInput.addEventListener('keyup', validate);
    newPasswordRepeatInput.addEventListener('keyup', validate);
    checkboxInput.addEventListener('click', validate);
    disableButton();
}
function hideAlert() {
    userContainer.removeChild(userContainer.lastChild);
}
function validate() {
    if (passwordInput.value.length < passwordMinLength ||
        newPasswordInput.value.length < passwordMinLength ||
        newPasswordRepeatInput.value != newPasswordInput.value ||
        checkboxInput.checked == false) {
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
