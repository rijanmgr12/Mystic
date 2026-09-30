// Budget estimation: simple arithmetic (proposal section 5.4.3)
const LEVELS = { budget: 0.8, standard: 1, comfort: 1.8 };
function estimateBudget(dest, days, people, level, transport) {
  const stay = Math.round(dest.dailyCost * LEVELS[level] * days * people);
  const travel = transport * people;
  return {
    stay,
    travel,
    total: stay + travel,
    perPerson: Math.round((stay + travel) / people),
  };
}
function countUp(sel, to) {
  const t0 = performance.now(),
    dur = 900;
  (function step(t) {
    const p = Math.min((t - t0) / dur, 1);
    $(sel).text("Rs. " + Math.round(to * p).toLocaleString());
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}
$(function () {
  destinations.forEach((d) =>
    $("#dest").append(
      `<option value="${d.id}">${d.name} (${d.province})</option>`,
    ),
  );
  const pre = new URLSearchParams(location.search).get("id");
  if (pre && getDest(pre)) $("#dest").val(pre);
  $("#budgetForm").on("submit", function (e) {
    e.preventDefault();
    const d = getDest($("#dest").val()),
      days = parseInt($("#days").val()),
      people = parseInt($("#people").val()),
      transport = parseInt($("#transport").val()) || 0;
    let ok = true;
    $("#errDest").text(d ? "" : "Choose a destination.");
    if (!d) ok = false;
    $("#errDays").text(days >= 1 && days <= 60 ? "" : "Enter 1 to 60 days.");
    if (!(days >= 1 && days <= 60)) ok = false;
    $("#errPeople").text(
      people >= 1 && people <= 50 ? "" : "Enter 1 to 50 travellers.",
    );
    if (!(people >= 1 && people <= 50)) ok = false;
    if (transport < 0) {
      $("#errTrans").text("Cannot be negative.");
      ok = false;
    } else $("#errTrans").text("");
    if (!ok) return;
    const r = estimateBudget(d, days, people, $("#level").val(), transport);
    $("#result")
      .html(`<h3>${d.name}: ${days} day(s), ${people} traveller(s)</h3>
      <div class="total" id="totalNum">Rs. 0</div><p style="margin-bottom:12px">estimated total</p>
      <div class="row"><span>Stay, food and local travel</span><b>Rs. ${r.stay.toLocaleString()}</b></div>
      <div class="row"><span>Transport to destination</span><b>Rs. ${r.travel.toLocaleString()}</b></div>
      <div class="row"><span>Per person</span><b>Rs. ${r.perPerson.toLocaleString()}</b></div>`);
    countUp("#totalNum", r.total);
  });
});
