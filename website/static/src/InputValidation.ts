const loginInputValidate = () => {
    const usernameInput: any = document.getElementById("username-input");
    const submitButton: any = document.getElementById("submit-btn");
    const passwordInput: any = document.getElementById("password-login");

    const usernameMinLength = 4;
    const passwordMinLength = 8;

    disableButton();

    usernameInput.addEventListener("keyup", validate);
    passwordInput.addEventListener("keyup", validate);

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
        submitButton.style.opacity = "0.5";
    }

    function enableButton() {
        submitButton.removeAttribute("disabled");
        submitButton.style.opacity = "1";
    }
};

export { loginInputValidate };
