// Handles Single Destination Details View
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    
    const destination = destinationsData.find(d => d.id === id);
    const container = document.getElementById("detail-container");

    if (!destination) {
        container.innerHTML = `<h2>Destination Not Found</h2><p><a href="destinations.html">Return to all destinations</a></p>`;
        return;
    }

    container.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 8px; border: 1px solid var(--border-color);">
            <img src="${destination.image}" alt="${destination.name}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem;">
            <h1>${destination.name}</h1>
            <p style="margin: 0.5rem 0; color: var(--text-muted);"><strong>Province:</strong> ${destination.province} | <strong>Category:</strong> ${destination.category}</p>
            <p style="margin-bottom: 1rem;">${destination.description}</p>
            <div style="background: var(--bg-light); padding: 1rem; border-radius: 6px; margin-bottom: 1.5rem;">
                <p><strong>Best Time to Visit:</strong> ${destination.bestTime}</p>
                <p><strong>Estimated Base Cost per Day:</strong> NPR ${destination.dailyCost.toLocaleString()}</p>
            </div>
            <a href="planner.html?id=${destination.id}" class="btn">Plan Trip for this Destination</a>
            <a href="destinations.html" class="btn" style="background-color: #6b7280;">Back to List</a>
        </div>
    `;
});