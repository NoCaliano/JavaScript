document.getElementById("home").addEventListener("click", () => {
    document.getElementById("content").innerHTML = '';
    document.getElementById("category-links").innerHTML = '';
});

document.getElementById("catalog").addEventListener("click", () => {
    fetch("data/categories.json")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("category-links");
            container.innerHTML = '';

            data.forEach(cat => {
                const btn = document.createElement("div");
                btn.textContent = cat.name;
                btn.className = "category-link";
                btn.addEventListener("click", () => loadCategory(cat.shortname));
                container.appendChild(btn);
            });

            const specialsBtn = document.createElement("div");
            specialsBtn.textContent = "Specials";
            specialsBtn.className = "category-link";
            specialsBtn.addEventListener("click", () => {
                const randomCat = data[Math.floor(Math.random() * data.length)];
                loadCategory(randomCat.shortname);
            });
            container.appendChild(specialsBtn);
        });
});

function loadCategory(shortname) {
    fetch(`data/${shortname}.json`)
        .then(res => res.json())
        .then(data => {
            const content = document.getElementById("content");
            content.innerHTML = `<h2 class="category-title">${data.title}</h2>`;

            data.items.forEach(item => {
                const div = document.createElement("div");
                div.className = "item-card";

                div.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="item-info">
            <div class="item-name">${item.name}</div>
            <div class="item-desc">${item.description}</div>
            <div class="item-price">${item.price}</div>
          </div>
        `;

                content.appendChild(div);
            });
        });
}
