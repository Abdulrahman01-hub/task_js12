const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");

function showImages(keyword) {
    results.innerHTML = "";

    const filtered = data.hits.filter(item =>
        item.tags.toLowerCase().includes(keyword.toLowerCase())
    );

    if (filtered.length === 0) {
        results.innerHTML = `<p class="text-center text-gray-400 col-span-full">Sonuç bulunamadi 😢</p>`;
        return;
    }

    filtered.forEach(item => {
        const div = document.createElement("div");
        div.className = "bg-gray-800 rounded-lg p-3 hover:scale-105 transform transition";
        div.innerHTML = `
      <img src="${item.previewURL}" alt="${item.tags}" class="rounded-lg mb-2 w-full">
      <p class="text-blue-400 font-semibold">${item.user}</p>
      <p class="text-sm text-gray-300">${item.tags}</p>
    `;
        results.appendChild(div);
    });
}

searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value.trim();
    if (keyword) showImages(keyword);
}); 