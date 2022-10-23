const usernameInput = document.getElementById('username-input');
const submitButton = document.getElementById('submit-btn');
const passwordInput = document.getElementById('password-login');
const usernameMinLength = 4;
const passwordMinLength = 8;
disableButton();
usernameInput.addEventListener('keyup', validate);
passwordInput.addEventListener('keyup', validate);
function validate() {
    if (usernameInput.value.length < usernameMinLength ||
        passwordInput.value.length < passwordMinLength) {
        disableButton();
        return;
    }
    enableButton();
}
function disableButton() {
    submitButton.disabled = true;
    submitButton.style.opacity = '0.5';
}
function enableButton() {
    submitButton.removeAttribute('disabled');
    submitButton.style.opacity = '1';
}
export {};
