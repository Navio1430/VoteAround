import { signupInputValidate, loginInputValidate } from './InputValidation.js';
import { deleteAccount } from './DeleteAccount.js';
import { logout } from './Logout.js';
import { infiniteScroll } from './InfiniteScroll.js';
if (document.getElementById('password-input') !== null) {
    signupInputValidate();
}
if (document.getElementById('password-login') !== null) {
    loginInputValidate();
}
// changeUserame();
// changePassword();
if (document.getElementById('user-container') !== null) {
    logout();
    deleteAccount();
}
infiniteScroll();
