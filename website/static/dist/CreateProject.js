const labelInput = document.getElementById('project-name');
const latitudeInput = document.getElementById('map-lat');
const longitudeInput = document.getElementById('map-long');
const submitButton = document.getElementById('submit-btn');
labelInput.addEventListener('keyup', validate);
const minLabelLength = 5;
const maxLabelLength = 32;
disableButton();
export function validate() {
    if (labelInput.value.length < minLabelLength ||
        labelInput.value.length > maxLabelLength ||
        -90 > parseFloat(latitudeInput.value) ||
        parseFloat(latitudeInput.value) > 90 ||
        -180 > parseFloat(longitudeInput.value) ||
        parseFloat(longitudeInput.value) > 180) {
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
