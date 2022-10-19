const signupInputValidate = () => {
    const passwordMinLength = 8;
    const usernameMinLength = 4;

    const passwordInput: any = document.getElementById('password-input');
    const retypePasswordInput: any = document.getElementById(
        'retype-password-input'
    );
    const signupAlertContainer = document.getElementById(
        'signup__alert-container'
    );
    const submitButton: any = document.getElementById('submit-btn');
    const usernameInput: any = document.getElementById('username-input');

    disableButton();

    retypePasswordInput.addEventListener('keyup', validate);
    passwordInput.addEventListener('keyup', validate);
    usernameInput.addEventListener('keyup', validate);

    function validate() {
        removeAlert();
        let enabled = true;

        if (usernameInput.value.length < usernameMinLength) {
            showAlert('Nazwa użytkownika musi mieć minimum 4 znaki!');
            enabled = false;
        }

        if (passwordInput.value.length == 0) enabled = false;

        if (
            passwordInput.value.length < passwordMinLength &&
            passwordInput.value.length != 0
        ) {
            showAlert('Hasło musi mieć minimum 8 znaków!');
            enabled = false;
        }

        if (passwordInput.value != retypePasswordInput.value) {
            showAlert('Hasła nie są identyczne!');
            enabled = false;
        }

        if (!enabled) {
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

    function showAlert(message: string) {
        if (signupAlertContainer.children.length === 0) {
            let alert = document.createElement('p');
            alert.classList.add('signup__alert');
            alert.innerHTML = message;
            signupAlertContainer.appendChild(alert);
        }
    }

    function removeAlert() {
        if (signupAlertContainer.children.length !== 0)
            signupAlertContainer.children[0].remove();
    }
};

const loginInputValidate = () => {
    const usernameInput: any = document.getElementById('username-input');
    const submitButton: any = document.getElementById('submit-btn');
    const passwordInput: any = document.getElementById('password-login');

    const usernameMinLength = 4;
    const passwordMinLength = 8;

    disableButton();

    usernameInput.addEventListener('keyup', validate);
    passwordInput.addEventListener('keyup', validate);

    function validate() {
        if (usernameInput.value.length < usernameMinLength) {
            disableButton();
            return;
        }

        if (passwordInput.value.length < passwordMinLength) {
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
};

export { signupInputValidate, loginInputValidate };
