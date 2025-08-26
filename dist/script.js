// Navbar Fixed
window.onscroll = function () {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;

    if (window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
    } else {
        header.classList.remove('navbar-fixed');
    }
};

// Hamburger
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});

// klik di luar hamburger
window.addEventListener('click', function (e) {
    if (e.target !== hamburger && e.target !== navMenu) {
        hamburger.classList.remove('hamburger-active');
        navMenu.classList.add('hidden');
    }
});


// Categories Filter
document.addEventListener("DOMContentLoaded", () => {
    const templateList = document.getElementById("template-list");
    const filterButtons = document.querySelectorAll(".filter-btn");

    let allTemplates = [];

    // Ambil data dari server
    fetch("templates.json")
        .then(res => res.json())
        .then(data => {
            allTemplates = data;
            renderTemplates(allTemplates); // render awal
        })
        .catch(err => console.error("Gagal ambil data:", err));

    // Event filter kategori
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // ambil filter, default 'all' kalau null
            const filter = (btn.getAttribute("data-filter") || "all").toLowerCase();

            // hapus active style di semua btn, tambahkan ke yg dipilih
            filterButtons.forEach(b => {
                b.classList.remove("bg-pink-400", "text-white");
                b.classList.add("bg-white", "text-gray-700");
            });
            btn.classList.remove("bg-white", "text-gray-700");
            btn.classList.add("bg-pink-400", "text-white");

            if (filter === "all") {
                renderTemplates(allTemplates);
            } else {
                const filtered = allTemplates.filter(item => {
                    const cat = (item.category || "").toLowerCase();
                    // cocok persis atau awalan (photostrip-1, photostrip-2, dll)
                    return cat === filter || cat.startsWith(filter + "-");
                });
                renderTemplates(filtered);
            }
        });
    });


// Function render template dengan animasi fade-in
function renderTemplates(templates) {
        templateList.innerHTML = "";

        templates.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = `template-item ${item.category} relative rounded-lg shadow cursor-pointer 
                            bg-white opacity-0 translate-y-4 flex flex-col items-center transition-all duration-700 ease-out`;

            div.innerHTML = `<img src="${item.image}" alt="${item.title}" class="max-w-full h-auto object-contain rounded-t-lg">
            <div class="absolute bottom-0 left-0 right-0 bg-pink-600/80 text-white text-center py-1 text-xs font-medium">
                ${item.category}
            </div>`;

            templateList.appendChild(div);

            // delay animasi supaya muncul satu-satu
            setTimeout(() => {
                div.classList.remove("opacity-0", "translate-y-4");
                div.classList.add("opacity-100", "translate-y-0");
            }, 250 * index);
        });
    }
});