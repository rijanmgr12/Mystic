// Linear search + filtering (proposal sections 5.4.1 and 5.4.2)
function getResults(keyword, province, category, type) {
  const kw = keyword.trim().toLowerCase();
  const out = [];
  for (const d of destinations) {
    if (!d.name.toLowerCase().includes(kw)) continue;
    if (province !== "all" && d.province !== province) continue;
    if (category !== "all" && d.category !== category) continue;
    if (type === "hidden" && !d.hidden) continue;
    if (type === "famous" && d.hidden) continue;
    out.push(d);
  }
  return out;
}
$(function () {
  [...new Set(destinations.map((d) => d.category))]
    .sort()
    .forEach((c) => $("#category").append(`<option>${c}</option>`));
  const q = new URLSearchParams(location.search);
  if (q.get("q")) $("#search").val(q.get("q"));
  if (q.get("province")) $("#province").val(q.get("province"));
  if (q.get("type")) $("#type").val(q.get("type"));
  function run() {
    const res = getResults(
      $("#search").val(),
      $("#province").val(),
      $("#category").val(),
      $("#type").val(),
    );
    renderCards(res, "#results");
    $("#count").text(
      res.length + " destination" + (res.length === 1 ? "" : "s") + " found",
    );
  }
  $("#search").on("input", run);
  $("#province,#category,#type").on("change", run);
  $("#reset").on("click", () => {
    $("#search").val("");
    $("#province,#category,#type").val("all");
    run();
  });
  run();
});
