// Client-side validation only (no storage). Demo login: demo@mystic.com / Mystic123
const DEMO_USERS = [
  { name: "Demo Traveller", email: "demo@mystic.com", password: "Mystic123" },
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setErr(sel, msg) {
  $(sel)
    .toggleClass("bad", !!msg)
    .closest(".field")
    .find(".err")
    .text(msg || "");
  return !msg;
}
function validRegister() {
  const name = $("#name").val().trim(),
    email = $("#email").val().trim(),
    pw = $("#password").val(),
    pw2 = $("#confirm").val();
  let ok = true;
  ok =
    setErr(
      "#name",
      name.length < 3 ? "Name must be at least 3 characters." : "",
    ) && ok;
  ok =
    setErr(
      "#email",
      !EMAIL_RE.test(email)
        ? "Enter a valid email, like name@example.com."
        : "",
    ) && ok;
  ok =
    setErr(
      "#password",
      !/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(pw)
        ? "Use 8+ characters with letters and numbers."
        : "",
    ) && ok;
  ok = setErr("#confirm", pw !== pw2 ? "Passwords do not match." : "") && ok;
  return ok;
}
$(function () {
  $("#registerForm").on("submit", function (e) {
    e.preventDefault();
    if (!validRegister()) return;
    $("#msg")
      .attr("class", "msg ok")
      .text("Account created. Redirecting to login...");
    setTimeout(() => (location.href = "login.html"), 1500);
  });

  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    const email = $("#email").val().trim(),
      pw = $("#password").val();
    let ok = setErr(
      "#email",
      !EMAIL_RE.test(email) ? "Enter a valid email address." : "",
    );
    ok = setErr("#password", !pw ? "Enter your password." : "") && ok;
    if (!ok) return;
    const user = DEMO_USERS.find((u) => u.email === email && u.password === pw);
    if (user) {
      $("#msg")
        .attr("class", "msg ok")
        .text("Welcome back, " + user.name + "!");
      setTimeout(() => (location.href = "explore.html"), 1200);
    } else
      $("#msg")
        .attr("class", "msg fail")
        .text(
          "Email or password is incorrect. Try the demo account shown below.",
        );
  });

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    const name = $("#cname").val().trim(),
      email = $("#cemail").val().trim(),
      text = $("#cmessage").val().trim();
    let ok = setErr("#cname", name.length < 3 ? "Enter your name." : "");
    ok =
      setErr(
        "#cemail",
        !EMAIL_RE.test(email) ? "Enter a valid email address." : "",
      ) && ok;
    ok =
      setErr(
        "#cmessage",
        text.length < 10 ? "Message must be at least 10 characters." : "",
      ) && ok;
    if (!ok) return;
    $("#msg")
      .attr("class", "msg ok")
      .text("Thanks, " + name + ". Your message has been sent.");
    this.reset();
  });
});
