export {};

const labelInput: HTMLInputElement = document.getElementById(
    'project-name'
) as HTMLInputElement;
const latitudeInput: HTMLInputElement = document.getElementById(
    'map-lat'
) as HTMLInputElement;
const longitudeInput: HTMLInputElement = document.getElementById(
    'map-long'
) as HTMLInputElement;
const submitButton: HTMLButtonElement = document.getElementById(
    'submit-btn'
) as HTMLButtonElement;

labelInput.addEventListener('keyup', validate);

const minLabelLength = 5;
const maxLabelLength = 32;

disableButton();

export function validate() {
    if (
        labelInput.value.length < minLabelLength ||
        labelInput.value.length > maxLabelLength ||
        -90 > parseFloat(latitudeInput.value) ||
        parseFloat(latitudeInput.value) > 90 ||
        -180 > parseFloat(longitudeInput.value) ||
        parseFloat(longitudeInput.value) > 180
    ) {
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
