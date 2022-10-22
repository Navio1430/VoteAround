import { loginInputValidate } from './InputValidation.js';
import { deleteAccount } from './DeleteAccount.js';
import { logout } from './Logout.js';
import { infiniteScroll } from './InfiniteScroll.js';
import { changeUserame } from './ChangeUsername.js';
import { changePassword } from './ChangePassword.js';
if (document.getElementById('password-login') !== null) {
    loginInputValidate();
}
if (document.getElementById('user-container')) {
    changePassword();
    changeUserame();
}
if (document.getElementById('user-container') !== null) {
    logout();
    deleteAccount();
}
if (document.getElementById('table-row-container') !== null) {
    infiniteScroll();
}
