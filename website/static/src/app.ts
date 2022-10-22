import { loginInputValidate } from './InputValidation.js';
import { logout } from './Logout.js';
import { infiniteScroll } from './InfiniteScroll.js';

if (document.getElementById('password-login') !== null) {
    loginInputValidate();
}

if (document.getElementById('table-row-container') !== null) {
    infiniteScroll();
}
