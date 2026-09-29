// Handles Destination Listing & Filtering
document.addEventListener("DOMContentLoaded", () => {
    renderDestinationsList(destinationsData);
    
    document.getElementById("search-input")?.addEventListener("input", filterDestinations);
    document.getElementById("province-filter")?.addEventListener("change", filterDestinations);
    document.getElementById("category-filter")?.addEventListener("change", filterDestinations);
});

function renderDestinationsList(items) {
    const container = document.getElementById("destinations-container");
    if (!container) return;
    
    container.innerHTML = "";
    if (items.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">No destinations match your filters.</p>`;
        return;
    }

    const favs = getFavorites();

    items.forEach(item => {
        const isFav = favs.includes(item.id);
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="card-body">
                <div class="card-tags">
                    <span class="tag tag-province">${item.province}</span>
                    <span class="tag">${item.category}</span>
                </div>
                <h3 class="card-title">${item.name}</h3>
                <p class="card-desc">${item.description}</p>
                <div style="display: flex; gap: 0.5rem; margin-top: auto;">
                    <a href="destination.html?id=${item.id}" class="btn" style="flex: 1;">Details</a>
                    <button onclick="toggleFav(${item.id})" class="btn" style="background-color: ${isFav ? '#dc2626' : '#6b7280'}">
                        ${isFav ? '♥ Saved' : '♡ Save'}
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterDestinations() {
    const search = document.getElementById("search-input").value.toLowerCase();
    const province = document.getElementById("province-filter").value;
    const category = document.getElementById("category-filter").value;

    const filtered = destinationsData.filter(d => {
        const matchSearch = d.name.toLowerCase().includes(search) || d.description.toLowerCase().includes(search);
        const matchProvince = province === "" || d.province === province;
        const matchCategory = category === "" || d.category === category;
        return matchSearch && matchProvince && matchCategory;
    });

    renderDestinationsList(filtered);
}

function toggleFav(id) {
    let favs = getFavorites();
    if (favs.includes(id)) {
        favs = favs.filter(fId => fId !== id);
    } else {
        favs.push(id);
    }
    saveFavorites(favs);
    filterDestinations();
}