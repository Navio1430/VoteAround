const userLogoutBtn = document.getElementById('user-logout-account');
userLogoutBtn.addEventListener('click', () => {
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
export {};
