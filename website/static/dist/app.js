import { calendar } from './Calendar.js';
import { signupInputValidate, loginInputValidate } from './InputValidation.js';
import { deleteAccount } from './DeleteAccount.js';
import { logout } from './Logout.js';
import { infinityScroll } from './InfinityScroll.js';
import { changeUserame } from './ChangeUsername.js';
import { changePassword } from './ChangePassword.js';
if (document.getElementById('calendar-days') !== null) {
    calendar();
}
if (document.getElementById('password-input') !== null) {
    signupInputValidate();
}
if (document.getElementById('password-login') !== null) {
    loginInputValidate();
}
changeUserame();
changePassword();
if (document.getElementById('user-container') !== null) {
    logout();
    deleteAccount();
}
infinityScroll();
