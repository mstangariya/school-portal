let DATA = [];

fetch("data/schools.json")
  .then(r => r.json())
  .then(d => {
    DATA = d;
    render(DATA);
  });

function render(list) {
  const c = document.getElementById("schools");
  c.innerHTML = "";

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
      html += `<h6>${cat}</h6><ul>`;
      docs.forEach(d => {
        html += `<li><a target="_blank" href="${d.link}">${d.title}</a></li>`;
      });
      html += `</ul>`;
    });

    html += `</div></div></div>`;
    c.innerHTML += html;
  });
}

document.getElementById("search").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  render(DATA.filter(s =>
    s.name.toLowerCase().includes(q) ||
    JSON.stringify(s.documents).toLowerCase().includes(q)
  ));
});
