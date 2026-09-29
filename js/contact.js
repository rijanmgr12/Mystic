// Handles Contact Form Validation
function handleContactSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !message) {
        alert("Please complete all fields.");
        return;
    }

    document.getElementById("contact-response").innerText = "Thank you! Your inquiry has been submitted successfully.";
    event.target.reset();
}