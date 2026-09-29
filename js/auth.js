// Handles Client-Side Register & Login with Validation
function registerUser(event) {
    event.preventDefault();
    const user = document.getElementById("reg-username").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const pass = document.getElementById("reg-password").value;

    if (user === "" || email === "" || pass === "") {
        alert("Please fill in all fields.");
        return;
    }

    localStorage.setItem(`user_${user}`, pass);
    alert("Registration successful! Please login.");
    window.location.href = "login.html";
}

function loginUser(event) {
    event.preventDefault();
    const user = document.getElementById("login-username").value.trim();
    const pass = document.getElementById("login-password").value;

    const storedPass = localStorage.getItem(`user_${user}`);

    if (storedPass && storedPass === pass) {
        localStorage.setItem("mystic_session", user);
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password.");
    }
}