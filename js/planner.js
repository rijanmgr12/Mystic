// Handles Travel Expense Calculation
document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("plan-destination");
    
    destinationsData.forEach(d => {
        const option = document.createElement("option");
        option.value = d.id;
        option.innerText = `${d.name} (NPR ${d.dailyCost}/day)`;
        select.appendChild(option);
    });

    const params = new URLSearchParams(window.location.search);
    const preSelectId = params.get("id");
    if (preSelectId) {
        select.value = preSelectId;
    }

    document.getElementById("planner-form").addEventListener("submit", (e) => {
        e.preventDefault();
        
        const destId = parseInt(select.value);
        const days = parseInt(document.getElementById("plan-days").value);
        const dailyExp = parseFloat(document.getElementById("plan-daily").value);
        const transport = parseFloat(document.getElementById("plan-transport").value);

        const destObj = destinationsData.find(d => d.id === destId);
        const total = (days * (destObj.dailyCost + dailyExp)) + transport;

        const resultDiv = document.getElementById("planner-result");
        resultDiv.style.display = "block";
        resultDiv.innerHTML = `
            <h3>Estimated Budget Breakdown</h3>
            <p><strong>Destination:</strong> ${destObj.name}</p>
            <p><strong>Duration:</strong> ${days} Days</p>
            <p><strong>Total Estimated Cost:</strong> NPR ${total.toLocaleString()}</p>
        `;
    });
});