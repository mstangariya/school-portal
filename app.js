let DATA = [];

document.addEventListener("DOMContentLoaded", () => {

  // 1️⃣ Load JSON data
  fetch("data/schools.json")
    .then(r => r.json())
    .then(d => {
      DATA = d;
      render(DATA);
    })
    .catch(err => {
      console.error("JSON load error:", err);
    });

  // 2️⃣ Search handler
  document.getElementById("search").addEventListener("input", e => {
    const q = e.target.value.toLowerCase();

    const filtered = DATA.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.area.toLowerCase().includes(q) ||
      JSON.stringify(s.documents).toLowerCase().includes(q)
    );

    render(filtered);
  });

});

// 3️⃣ Render function
function render(list) {
  const c = document.getElementById("schools");
  c.innerHTML = "";

  if (list.length === 0) {
    c.innerHTML = `<p class="text-muted">No matching results found</p>`;
    return;
  }

  list.forEach(s => {
    let html = `
      <div class="col-md-6">
        <div class="card">
          <div class="card-header bg-secondary text-white">
            ${s.name} <small>(${s.area})</small>
          </div>
          <div class="card-body">
    `;

    Object.entries(s.documents).forEach(([cat, docs]) => {
      html += `<h6 class="mt-2">${cat}</h6><ul>`;
      docs.forEach(d => {
        html += `<li><a target="_blank" href="${d.link}">${d.title}</a></li>`;
      });
      html += `</ul>`;
    });

    html += `</div></div></div>`;
    c.innerHTML += html;
  });
}
