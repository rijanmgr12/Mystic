// Utility Functions and Session Navigation Management
document.addEventListener("DOMContentLoaded", () => {
    updateNavSession();
    updateFavoriteCountBadge();
});

function getFavorites() {
    return JSON.parse(localStorage.getItem('mystic_favs')) || [];
}

function saveFavorites(favs) {
    localStorage.setItem('mystic_favs', JSON.stringify(favs));
    updateFavoriteCountBadge();
}

function updateFavoriteCountBadge() {
    const badge = document.getElementById('fav-badge');
    if (badge) {
        badge.innerText = getFavorites().length;
    }
}

function updateNavSession() {
    const session = localStorage.getItem('mystic_session');
    const authContainer = document.getElementById('nav-auth');
    
    if (authContainer) {
        if (session) {
            authContainer.innerHTML = `
                <span>Welcome, <strong>${session}</strong></span>
                <a href="#" onclick="logoutUser()" class="btn-nav">Logout</a>
            `;
        } else {
            authContainer.innerHTML = `
                <a href="login.html" class="btn-nav">Login</a>
                <a href="register.html" class="btn-nav">Register</a>
            `;
        }
    }
}

function logoutUser() {
    localStorage.removeItem('mystic_session');
    window.location.href = 'index.html';
}