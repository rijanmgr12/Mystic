const NAV = [
  ["index.html", "Home"],
  ["explore.html", "Destinations"],
  ["budget.html", "Trip Planner"],
  ["about.html", "About"],
  ["contact.html", "Contact"],
];
const PROVINCES = [
  "Koshi",
  "Madhesh",
  "Bagmati",
  "Gandaki",
  "Lumbini",
  "Karnali",
  "Sudurpashchim",
];
const LOGO =
  '<img class="logo-img" src="images/logo.jpg" alt="Mystic Nepal logo" onerror="this.style.display=\'none\'">';
const PIN =
  '<svg viewBox="0 0 12 12"><path d="M6 0a4 4 0 0 0-4 4c0 3 4 8 4 8s4-5 4-8a4 4 0 0 0-4-4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>';

function cardHTML(d) {
  return `<a class="card" href="destination.html?id=${d.id}">
   <div class="ph"><img src="${d.image}" alt="${d.name}" onerror="this.style.display='none'">
   <span class="tag c-${d.category}">${d.category}</span>${d.hidden ? '<span class="tag gem">Hidden Gem</span>' : ""}</div>
   <div class="cb"><p class="loc">${PIN}${d.province}</p><h3>${d.name}</h3><p class="d">${d.description.slice(0, 72)}...</p>
   <div class="price"><span>From NPR <b>${d.dailyCost.toLocaleString()}</b> / day</span><em>&rarr;</em></div></div></a>`;
}
function renderCards(list, target) {
  $(target).html(
    list.length
      ? list.map(cardHTML).join("")
      : '<p class="empty">No destinations match. Try a different name or clear the filters.</p>',
  );
}
function getDest(id) {
  return destinations.find((d) => d.id === Number(id));
}

function showDetail() {
  const d = getDest(new URLSearchParams(location.search).get("id"));
  if (!d) {
    $("#detail").html(
      '<main class="wrap" style="padding-top:120px"><p class="empty">Destination not found. <a href="explore.html"><b>Back to Destinations</b></a></p></main>',
    );
    return;
  }
  document.title = d.name + " | Mystic Nepal";
  $("#detail")
    .html(`<section class="banner dbanner" style="background-image:url('${d.image}')"><div><a class="back" href="explore.html">&larr; Back to Destinations</a>
   <h1>${d.name}</h1><p>${d.location}</p><span class="tag2">${d.category}</span>${d.hidden ? '<span class="tag2 red">Hidden Gem</span>' : ""}</div>
   <div class="pricebox">From <b>NPR ${d.dailyCost.toLocaleString()}</b><small>per person / day</small></div></section>
  <main class="wrap"><div class="detail"><div><h2>Overview</h2><p>${d.description}</p>
  <div class="facts"><div><span>Location</span><b>${d.location}</b></div><div><span>Best time to visit</span><b>${d.bestTime}</b></div><div><span>Province</span><b>${d.province}</b></div></div>
  <h3>Travel tips</h3><ul class="tips">${d.tips.map((t) => `<li>${t}</li>`).join("")}</ul>
  <a class="btn" href="budget.html?id=${d.id}">Add to Trip Plan</a> <a class="btn dark" href="explore.html">More destinations</a></div>
  <div class="pic"><img src="${d.image}" alt="${d.name}" onerror="this.style.display='none'"></div></div></main>`);
}

$(function () {
  const page = location.pathname.split("/").pop() || "index.html";
  if (page === "index.html") $("body").addClass("home");
  const links = NAV.map(
    ([h, t]) => `<a href="${h}" class="${h === page ? "active" : ""}">${t}</a>`,
  ).join("");
  $("#nav")
    .html(`<nav class="nav"><a class="logo" href="index.html">${LOGO}<span>Mystic Nepal</span></a>
   <div class="menu" id="menu">${links}<a class="mlogin" href="login.html">Login / Sign Up</a></div><a class="btn" href="login.html">Login / Sign Up</a>
   <button id="burger" aria-label="Menu">&#9776;</button></nav>`);
  $("#foot").html(`<footer class="foot"><div class="fin">
   <div class="fc"><a class="logo" href="index.html">${LOGO}<span>Mystic Nepal</span></a><p style="margin-top:10px">Discover hidden destinations and plan your trip across Nepal.</p></div>
   <div class="fc"><h4>Contact</h4><p>Mystic Nepal, Butwal-10, Rupandehi<br>Lumbini Province, Nepal</p><p style="margin-top:6px">Phone: +977-9800000000</p><p>Email: mysticnepal@gmail.com</p></div>
   <div class="fc"><h4>Quick Links</h4>${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}</div>
   <div class="fc"><h4>Find Us in Nepal</h4><iframe title="Map of Nepal with Butwal" loading="lazy" src="https://maps.google.com/maps?q=Butwal%2C%20Nepal&z=7&output=embed"></iframe></div>
  </div><div class="copy">&copy; 2026 Mystic Nepal. Crimson College of Technology, Pokhara University.</div></footer>`);
  $("#burger").on("click", () => $("#menu").toggleClass("open"));

  if ($("#featured").length)
    renderCards([1, 5, 7, 8].map(getDest), "#featured");
  if ($("#detail").length) showDetail();
  if ($("#heroSearch").length) {
    PROVINCES.forEach((p) => $("#hp").append(`<option>${p}</option>`));
    $("#heroSearch").on("submit", function (e) {
      e.preventDefault();
      location.href =
        "explore.html?" +
        $.param({
          q: $("#hq").val(),
          province: $("#hp").val(),
          type: $("#ht").val(),
        });
    });
  }
});
