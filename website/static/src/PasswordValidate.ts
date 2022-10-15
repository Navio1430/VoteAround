const passwordValidate = () => {
    const passwordInput: any = document.getElementById('password-input');
    const retypePasswordInput: any = document.getElementById(
        'retype-password-input'
    );
    const signupAlertContainer = document.getElementById(
        'signup__alert-container'
    );

    retypePasswordInput.addEventListener('keyup', () => {
        if (passwordInput.value.length === retypePasswordInput.value.length) {
            if (passwordInput.value !== retypePasswordInput.value) {
                passwordInput.style.color = '#d92537';
                retypePasswordInput.style.color = '#d92537';

                if (signupAlertContainer.children.length === 0) {
                    let alert = document.createElement('p');
                    alert.classList.add('signup__alert');
                    alert.innerHTML = 'Hasła muszą być identyczne';
                    signupAlertContainer.appendChild(alert);
                }
            } else {
                passwordInput.style.color = '#223242';
                retypePasswordInput.style.color = '#223242';

                if (signupAlertContainer.children.length !== 0) {
                    signupAlertContainer.remove();
                }
            }
        }
    });
};

export { passwordValidate };
