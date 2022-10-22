const userContainer = document.getElementById('user-container');
const userDeleteAccountBtn = document.getElementById('user-delete-account');
userDeleteAccountBtn.addEventListener('click', () => {
    userContainer.children.length == 1 ? showAlert() : hideAlert();
});
let submitBtn;
let passwordInput;
let checkboxInput;
function showAlert() {
    let alert = document.createElement('div');
    alert.classList.add('user__delete-alert');
    let title = document.createElement('p');
    title.classList.add('user__delete-title');
    title.innerHTML = 'Usuwanie konta';
    passwordInput = document.createElement('input');
    passwordInput.classList.add('user__delete-password');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Podaj hasło';
    let alertContainer = document.createElement('div');
    checkboxInput = document.createElement('input');
    checkboxInput.classList.add('user__delete-checkbox');
    checkboxInput.type = 'checkbox';
    let checkboxInner = document.createElement('p');
    checkboxInner.innerHTML =
        'Jestem pewien, że chcę bezpowrotnie usunąć konto';
    let checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('user__delete-checkbox-container');
    checkboxContainer.appendChild(checkboxInput);
    checkboxContainer.appendChild(checkboxInner);
    alertContainer.appendChild(checkboxContainer);
    let buttonInner = document.createElement('p');
    buttonInner.innerHTML = 'Usuń';
    submitBtn = document.createElement('button');
    submitBtn.classList.add('table__row-btn', 'table__row-btn--negative', 'user__delete-btn');
    submitBtn.appendChild(buttonInner);
    let alertItems = [title, passwordInput, alertContainer, submitBtn];
    alertItems.forEach((element) => {
        alert.appendChild(element);
    });
    userContainer.appendChild(alert);
    passwordInput.addEventListener('keyup', validate);
    checkboxInput.addEventListener('click', validate);
    submitBtn.addEventListener('click', () => {
        fetch('/api/user/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: passwordInput.value }),
        })
            .then((response) => response.json())
            .then((data) => {
            if (data.success) {
                location.reload();
            }
            else {
                if (alertContainer.children.length <= 1) {
                    let passwordAlert = document.createElement('p');
                    passwordAlert.style.color = "red";
                    passwordAlert.innerHTML = 'Błędne hasło';
                    alertContainer.appendChild(passwordAlert);
                }
            }
        });
    });
    disableButton();
}
function hideAlert() {
    userContainer.removeChild(userContainer.lastChild);
}
function validate() {
    if (passwordInput.value.length < 8 ||
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
