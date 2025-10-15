const input = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");
const results = document.getElementById("results");
const key = "52453967-36db5c6ed5143a64d60e1c9f5";

function getImages(q) {
    results.innerHTML = "Yukleniyor...";

    fetch(`https://pixabay.com/api/?key=${key}&q=${q}&image_type=photo`)
        .then(res => res.json())
        .then(data => {
            if (!data.hits.length) {
                results.innerHTML = "Sonuc bulunamadi";
                return;
            }

            results.innerHTML = data.hits.map(i => `
        <div class="bg-gray-800 rounded-lg p-3 hover:scale-105 transition">
          <img src="${i.previewURL}" alt="${i.tags}" class="rounded-lg mb-2 w-full">
          <p class="text-blue-400 font-semibold">${i.user}</p>
          <p class="text-sm text-gray-300">${i.tags}</p>
        </div>
      `).join("");
        })
        .catch(() => results.innerHTML = "Bir xeta olustu");
}

btn.onclick = () => {
    const q = input.value.trim();
    if (q) getImages(q);
    else results.innerHTML = "Bir şey yaz";
};
