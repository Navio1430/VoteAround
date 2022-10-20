const logout = () => {
    const userLogoutAccount = document.getElementById('user-logout-account');
    userLogoutAccount.addEventListener('click', () => {
        // Names of cookies to delete with logout
        let cookiesToDelete = ['token', 'uuid'];
        cookiesToDelete.forEach((cookie) => {
            const deleteCookie = (name, path) => {
                document.cookie =
                    name + '=' + ';path=' + path + ';expires=' + new Date(0);
            };
            deleteCookie(cookie, '/');
        });
        location.reload();
    });
};
export { logout };
