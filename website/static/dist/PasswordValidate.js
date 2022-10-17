const passwordValidate = () => {
    const passwordMinLength = 8;
    const usernameMinLength = 4;
    const passwordInput = document.getElementById("password-input");
    const retypePasswordInput = document.getElementById("retype-password-input");
    const signupAlertContainer = document.getElementById("signup__alert-container");
    const submitButton = document.getElementById("submit-btn");
    const usernameInput = document.getElementById("username-input");
    retypePasswordInput.addEventListener("keyup", checkPassword);
    passwordInput.addEventListener("keyup", checkPassword);
    usernameInput.addEventListener("keyup", checkUsername);
    disableButton();
    function checkUsername() {
        if (usernameInput.value.length < usernameMinLength) {
            removeAlert();
            showAlert("Nazwa użytkownika musi mieć minimum 4 znaki!");
            disableButton();
            return;
        }
        else {
            removeAlert();
        }
        checkPassword();
    }
    function checkPassword() {
        console.log("checkPassword()");
        if (passwordInput.value.length < passwordMinLength &&
            passwordInput.value.length != 0) {
            showAlert("Hasło musi mieć minimum 8 znaków!");
            disableButton();
            return;
        }
        removeAlert();
        if (passwordInput.value == retypePasswordInput.value) {
            enableButton();
            return;
        }
        showAlert("Hasła nie są identyczne!");
    }
    function disableButton() {
        submitButton.disabled = true;
        submitButton.style.opacity = "0.5";
    }
    function enableButton() {
        submitButton.removeAttribute("disabled");
        submitButton.style.opacity = "1";
    }
    function showAlert(message) {
        if (signupAlertContainer.children.length === 0) {
            let alert = document.createElement("p");
            alert.classList.add("signup__alert");
            alert.innerHTML = message;
            signupAlertContainer.appendChild(alert);
        }
    }
    function removeAlert() {
        if (signupAlertContainer.children.length !== 0)
            signupAlertContainer.children[0].remove();
    }
};
export { passwordValidate };
