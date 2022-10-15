import { calendar } from './Calendar.js';
import { passwordValidate } from './PasswordValidate.js';

if (document.getElementById('calendar-days') !== null) {
    calendar();
}
if (document.getElementById('password-input') !== null) {
    passwordValidate();
}
