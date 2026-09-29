// Handles Favorites Page View
document.addEventListener("DOMContentLoaded", () => {
    renderFavorites();
});

function renderFavorites() {
    const container = document.getElementById("favorites-container");
    const favIds = getFavorites();

    const items = destinationsData.filter(d => favIds.includes(d.id));

    if (items.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">You have no saved favorites yet. <a href="destinations.html">Explore destinations</a></p>`;
        return;
    }

    container.innerHTML = "";
    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="card-body">
                <h3 class="card-title">${item.name}</h3>
                <p class="card-desc">${item.description}</p>
                <button onclick="removeFavorite(${item.id})" class="btn" style="background-color: #dc2626;">Remove</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function removeFavorite(id) {
    let favs = getFavorites();
    favs = favs.filter(fId => fId !== id);
    saveFavorites(favs);
    renderFavorites();
}