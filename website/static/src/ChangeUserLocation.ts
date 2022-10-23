const userContainer = document.getElementById('user-container');
const locationChangeBtn = document.getElementById('username-btn-map');

const passwordMinLength = 8;

let submitBtn: HTMLButtonElement;
let passwordInput: HTMLInputElement;
let checkboxInput: HTMLInputElement;
let latitudeInput: HTMLInputElement = document.getElementById(
    'map-lat'
) as HTMLInputElement;
let longitudeInput: HTMLInputElement = document.getElementById(
    'map-long'
) as HTMLInputElement;

locationChangeBtn.addEventListener('click', () => {
    userContainer.children.length == 1 ? showAlert() : hideAlert();
});

function showAlert() {
    let alert = document.createElement('div');
    alert.classList.add('user__password-alert');

    let title = document.createElement('p');
    title.classList.add('user__delete-title');
    title.innerHTML = 'Zmiana lokalizacji';

    passwordInput = document.createElement('input');
    passwordInput.classList.add('user__password-input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Podaj aktualne hasło';

    let responseMessageContainer = document.createElement('div');

    checkboxInput = document.createElement('input');
    checkboxInput.classList.add('user__delete-checkbox');
    checkboxInput.type = 'checkbox';

    let checkboxInner = document.createElement('p');
    checkboxInner.innerHTML = 'Jestem pewien, że chcę zmienić lokalizacje';

    let checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('user__delete-checkbox-container');

    checkboxContainer.appendChild(checkboxInput);
    checkboxContainer.appendChild(checkboxInner);

    responseMessageContainer.appendChild(checkboxContainer);

    let messageBackContainer = document.createElement('p');
    messageBackContainer.innerHTML = '';
    messageBackContainer.style.color = 'red';

    let buttonInner = document.createElement('p');
    buttonInner.innerHTML = 'Zmień';

    submitBtn = document.createElement('button');
    submitBtn.classList.add(
        'table__row-btn',
        'user__delete-btn',
        'user__delete-btn--blue'
    );

    submitBtn.appendChild(buttonInner);

    let alertItems = [
        title,
        passwordInput,
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
                new_latitude: latitudeInput.value,
                new_longitude: longitudeInput.value,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    responseMessageContainer.removeChild(
                        responseMessageContainer.lastChild
                    );
                    setTimeout(
                        window.location.reload.bind(window.location),
                        1000
                    );
                } else {
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
    checkboxInput.addEventListener('click', validate);

    disableButton();
}

function hideAlert() {
    userContainer.removeChild(userContainer.lastChild);
}

function disableButton() {
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.5';
}

function enableButton() {
    submitBtn.removeAttribute('disabled');
    submitBtn.style.opacity = '1';
}

export function validate() {
    if (passwordInput === undefined) return;

    if (
        -90 > latitudeInput.valueAsNumber ||
        latitudeInput.valueAsNumber > 90 ||
        -180 > longitudeInput.valueAsNumber ||
        longitudeInput.valueAsNumber > 180 ||
        passwordInput.value.length < passwordMinLength ||
        checkboxInput.checked === false
    ) {
        disableButton();
        return;
    }

    enableButton();
}
