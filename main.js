const companiesElem = document.querySelector("#companies");
const singleModal = document.querySelector("#single-modal");
const singleModalContent = document.querySelector("#sinlge-modal-content");
const formModal = document.querySelector("#form-modal");
const openFormBtn = document.querySelector("#openFormModal");
const formElem = document.querySelector("#form");

let selectedID = null;
let isEdit = false;

fetchAllCompanies();

async function fetchAllCompanies() {
    try {
        const res = await fetch("https://northwind.vercel.app/api/suppliers");
        const data = await res.json();

        companiesElem.innerHTML = data
            .map(
                (c) => `
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all relative">
        <div class="absolute top-[10px] right-[10px] space-x-2">
          <button onclick="handleView(${c.id})" title="Bax">
            👁️
          </button>
          <button onclick="handleEdit(${c.id})" title="Düzəliş et">
            ✏️
          </button>
          <button onclick="handleDelete(${c.id})" title="Sil">
            ❌
          </button>
        </div>
        <h1>ID: ${c.id}</h1>
        <h2 class="text-lg font-semibold mb-2 text-gray-800">${c.companyName || "Unknow"}</h2>
        <p><span class="font-medium">Əlaqə:</span> ${c.contactName || "Unknow"}</p>
        <p><span class="font-medium">Vəzifə:</span> ${c.contactTitle || "Unknow"}</p>
        <p class="text-sm text-gray-600 mt-2"><span class="font-medium">Şəhər:</span> ${c.address?.city || "Unknow"}</p>
      </div>
    `
            )
            .join("");
    } catch (err) {
        console.error("Xəta:", err);
    }
}

async function handleView(id) {
    try {
        const res = await fetch(`https://northwind.vercel.app/api/suppliers/${id}`);
        const data = await res.json();

        singleModal.classList.remove("hidden");
        singleModalContent.innerHTML = `
      <button class="absolute top-4 right-4 text-xl font-bold text-gray-500" onclick="closeModal(singleModal)">&times;</button>
      <h2 class="text-xl font-semibold text-gray-800 mb-4">${data.companyName || "Unknow"}</h2>
      <div class="text-sm text-gray-700 space-y-1">
        <p><b>ID:</b> ${data.id}</p>
        <p><b>Əlaqə:</b> ${data.contactName || "Unknow"}</p>
        <p><b>Vəzifə:</b> ${data.contactTitle || "Unknow"}</p>
        <p><b>Ünvan:</b> ${data.address?.street || "Unknow"}</p>
        <p><b>Şəhər:</b> ${data.address?.city || "Unknow"}</p>
        <p><b>Region:</b> ${data.address?.region || "Unknow"}</p>
        <p><b>Ölkə:</b> ${data.address?.country || "Unknow"}</p>
        <p><b>Telefon:</b> ${data.address?.phone || "Unknow"}</p>
      </div>
    `;
    } catch (err) {
        console.error("Xəta:", err);
    }
}

formElem.addEventListener("submit", async (e) => {
    e.preventDefault();

    const company = {
        companyName: formElem.companyName.value,
        contactName: formElem.contactName.value,
        contactTitle: formElem.contactTitle.value,
        address: {
            street: formElem.street.value,
            city: formElem.city.value,
            region: formElem.region.value,
            country: formElem.country.value,
            phone: formElem.phone.value,
            postalCode: formElem.postalCode.value,
        },
    };

    const url = `https://northwind.vercel.app/api/suppliers${isEdit ? `/${selectedID}` : ""}`;
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(company),
    });

    if (res.ok) {
        formElem.reset();
        closeModal(formModal);
        fetchAllCompanies();
        isEdit = false;
    }
});

async function handleDelete(id) {
    if (!confirm("Bu şirkəti silmək istədiyinə əminsən?")) return;

    const res = await fetch(`https://northwind.vercel.app/api/suppliers/${id}`, {
        method: "DELETE",
    });

    if (res.ok) fetchAllCompanies();
    else alert("Xəta baş verdi!");
}

async function handleEdit(id) {
    selectedID = id;
    isEdit = true;
    formModal.classList.remove("hidden");

    const res = await fetch(`https://northwind.vercel.app/api/suppliers/${id}`);
    const data = await res.json();

    formElem.companyName.value = data.companyName || "";
    formElem.contactName.value = data.contactName || "";
    formElem.contactTitle.value = data.contactTitle || "";
    formElem.street.value = data.address?.street || "";
    formElem.city.value = data.address?.city || "";
    formElem.region.value = data.address?.region || "";
    formElem.country.value = data.address?.country || "";
    formElem.phone.value = data.address?.phone || "";
    formElem.postalCode.value = data.address?.postalCode || "";
}

openFormBtn.addEventListener("click", () => formModal.classList.remove("hidden"));

function closeModal(modal) {
    modal.classList.add("hidden");
}

[formModal, singleModal].forEach((m) =>
    m.addEventListener("click", (e) => e.target === m && closeModal(m))
);