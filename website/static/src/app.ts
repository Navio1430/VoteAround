import { calendar } from './Calendar.js';
import { signupInputValidate, loginInputValidate } from './InputValidation.js';
import { deleteAccount } from './DeleteAccount.js';
import { logout } from './Logout.js';

if (document.getElementById('calendar-days') !== null) {
    calendar();
}

if (document.getElementById('password-input') !== null) {
    signupInputValidate();
}

if (document.getElementById('password-login') !== null) {
    loginInputValidate();
}

if (document.getElementById('password-login') !== null) {
    loginInputValidate();
}

if (document.getElementById('user-container') !== null) {
    logout();
    deleteAccount();
}
