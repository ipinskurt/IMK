// script.js

// Objek untuk menyimpan data resep
const resepData = {
    'rendang': {
        judul: 'Resep Rendang Daging Sapi Khas Minang',
        isi: "Bahan-bahan utama:\n- 1 kg daging sapi\n- 2 L santan kental\n- Bumbu halus (bawang, cabai, jahe, kunyit, lengkuas)\n- Daun-daunan (kunyit, salam, jeruk)\n\nCara membuat: Masak santan bersama bumbu halus hingga mendidih. Masukkan daging, masak dengan api kecil sambil terus diaduk hingga santan mengering dan bumbu meresap sempurna (sekitar 4-8 jam).",
        gambar: 'images/rendang.jpg',
        rating: 4.8, // Tambahan data rating
        ulasan: 125 // Tambahan jumlah ulasan
    },
    'gudeg': {
        judul: 'Resep Gudeg Khas Yogyakarta',
        isi: "Bahan-bahan utama:\n- Nangka muda\n- Santan kental\n- Gula aren dan daun jati\n\nCara membuat: Rebus nangka muda, santan, gula aren, dan bumbu. Masak dengan api sangat kecil selama berjam-jam (minimal 6 jam) hingga bumbu meresap dan kuah mengering, menghasilkan rasa manis otentik.",
        gambar: 'images/gudeg.jpg',
        rating: 4.5,
        ulasan: 98
    },
    'sate-lilit': {
        judul: 'Resep Sate Lilit Ikan Khas Bali',
        isi: "Bahan-bahan utama:\n- Ikan cincang (tenggiri/kakap)\n- Kelapa parut\n- Bumbu base genep Bali\n\nCara membuat: Campur semua bahan hingga rata. Lilitkan adonan pada batang serai atau bambu. Bakar di atas bara api hingga matang dan harum. Sajikan dengan sambal matah.",
        gambar: 'images/sate-lilit.jpg',
        rating: 4.7,
        ulasan: 150
    },
    'soto': {
        judul: 'Resep Soto Ayam Kuah Kuning',
        isi: "Bahan-bahan utama:\n- Ayam, bihun, tauge, telur rebus\n- Bumbu soto (bawang, kunyit, jahe, serai, daun jeruk)\n\nCara membuat: Rebus ayam, ambil kaldu. Tumis bumbu halus, masukkan ke dalam kaldu. Sajikan dengan potongan ayam, bihun, tauge, dan taburan bawang goreng.",
        gambar: 'images/soto.jpg',
        rating: 4.2,
        ulasan: 70
    },
    'gulai': {
        judul: 'Resep Gulai Kambing Pedas Gurih',
        isi: "Bahan-bahan utama:\n- Daging kambing\n- Santan kental\n- Bumbu gulai (rempah-rempah kering dan basah)\n\nCara membuat: Tumis bumbu, masukkan daging dan santan. Masak dengan api kecil hingga daging empuk dan kuah mengental. Gulai sangat kaya akan rasa rempah.",
        gambar: 'images/gulai.jpg',
        rating: 4.6,
        ulasan: 110
    },
    'nasi-goreng': {
        judul: 'Resep Nasi Goreng Kampung Sederhana',
        isi: "Bahan-bahan utama:\n- Nasi putih sisa semalam\n- Kecap manis, telur, dan bumbu dasar (bawang, cabai)\n\nCara membuat: Panaskan minyak, orak-arik telur. Tumis bumbu halus, masukkan nasi dan aduk rata. Tambahkan kecap manis dan masak dengan api besar. Siap disajikan!",
        gambar: 'images/nasi-goreng.jpg',
        rating: 4.0,
        ulasan: 200
    },
    'pempek': {
        judul: 'Resep Pempek Kapal Selam Palembang',
        isi: "Bahan-bahan utama:\n- Ikan giling (tenggiri/gabus)\n- Tepung sagu/tapioka\n- Telur (untuk isian Kapal Selam)\n\nCara membuat: Campur bahan, bentuk adonan, isi dengan telur, lalu rebus. Goreng sebelum disajikan bersama kuah Cuko pedas manis.",
        gambar: 'images/pempek.jpg',
        rating: 4.3,
        ulasan: 85
    },
    'rawon': {
        judul: 'Resep Rawon Daging Khas Jawa Timur',
        isi: "Bahan-bahan utama:\n- Daging sapi\n- Bumbu dasar (bawang, kunyit)\n- Kluwek (memberi warna hitam khas)\n\nCara membuat: Tumis bumbu kluwek, masukkan daging dan air. Masak hingga daging empuk dan kuah menjadi pekat. Rawon disajikan dengan tauge pendek dan telur asin.",
        gambar: 'images/rawon.jpg',
        rating: 4.4,
        ulasan: 90
    }
};

// --- DOM Element Selection ---
const sidebarMenu = document.getElementById('sidebarMenu');
const mainContent = document.getElementById('mainContent');

// --- Helper Functions ---

/**
 * Membuat representasi bintang berdasarkan rating (misal: 4.5)
 * @param {number} rating - Nilai rating dari 0 sampai 5
 * @returns {string} HTML string untuk bintang
 */
function createStarRatingHTML(rating, key) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    // Bintang Penuh
    for (let i = 0; i < fullStars; i++) {
        stars += `<span class="star full-star" data-value="${i + 1}" data-key="${key}">★</span>`;
    }

    // Bintang Setengah (Jika ada)
    if (hasHalfStar) {
        stars += `<span class="star half-star" data-value="${fullStars + 0.5}" data-key="${key}">★</span>`;
    }

    // Bintang Kosong
    const totalStarsToShow = 5;
    const currentStars = fullStars + (hasHalfStar ? 1 : 0);
    for (let i = currentStars; i < totalStarsToShow; i++) {
        stars += `<span class="star empty-star" data-value="${i + 1}" data-key="${key}">★</span>`;
    }

    return stars;
}

// ===========================================
// 1. Inisialisasi Sidebar (Menu Unggulan)
// ===========================================

function renderSidebar() {
    sidebarMenu.innerHTML = ''; // Kosongkan
    
    // Sortir resep berdasarkan rating tertinggi (Unggulan)
    const sortedResep = Object.entries(resepData).sort(([, a], [, b]) => b.rating - a.rating);

    sortedResep.forEach(([key, data]) => {
        const item = document.createElement('div');
        item.classList.add('menu-item');
        item.setAttribute('data-resep', key);
        item.innerHTML = `
            <img src="${data.gambar}" alt="${data.judul}" class="menu-img">
            <div class="menu-info">
                <h4>${data.judul}</h4>
                <div class="rating-display">
                    <span class="rating-value">${data.rating.toFixed(1)}</span>
                    <span class="stars-static">${createStarRatingHTML(data.rating, key)}</span>
                    <span class="review-count">(${data.ulasan} Ulasan)</span>
                </div>
            </div>
        `;
        
        item.addEventListener('click', () => {
            renderMainContent(key);
            // Hapus kelas aktif dari semua item
            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
            // Tambahkan kelas aktif ke item yang diklik
            item.classList.add('active');
        });

        sidebarMenu.appendChild(item);
    });

    // Tampilkan detail resep pertama secara default
    if (sortedResep.length > 0) {
        renderMainContent(sortedResep[0][0]);
        document.querySelector('.menu-item').classList.add('active');
    }
}

// ===========================================
// 2. Tampilkan Detail Resep & Fungsionalitas Rating
// ===========================================

function renderMainContent(key) {
    const data = resepData[key];
    if (!data) return;

    mainContent.innerHTML = `
        <div class="detail-resep">
            <h2>${data.judul}</h2>
            <img src="${data.gambar}" alt="${data.judul}" class="detail-img">
            
            <div class="rating-section">
                <h3>Beri Rating Resep Ini:</h3>
                <div class="rating-interactive" data-key="${key}">
                    ${createStarRatingHTML(data.rating, key)}
                </div>
                <p>Rating Saat Ini: <strong>${data.rating.toFixed(1)}</strong> dari ${data.ulasan} Ulasan.</p>
            </div>

            <h3>Bahan & Cara Membuat:</h3>
            <pre>${data.isi}</pre>
        </div>
    `;

    // Tambahkan Event Listener untuk Interaksi Rating
    document.querySelectorAll('.rating-interactive .star').forEach(star => {
        star.addEventListener('click', function() {
            const newRating = parseInt(this.dataset.value);
            handleRating(key, newRating);
        });
        
        // Efek hover
        star.addEventListener('mouseover', function() {
            const value = parseInt(this.dataset.value);
            highlightStars(key, value);
        });

        star.addEventListener('mouseout', function() {
            // Kembali ke rating saat ini ketika mouse keluar
            const currentRating = resepData[key].rating;
            highlightStars(key, currentRating, true);
        });
    });
    
    // Pastikan bintang saat ini disorot
    highlightStars(key, data.rating, true);
}

/**
 * Menyorot bintang saat hover/saat ini
 * @param {string} key - Kunci resep
 * @param {number} value - Nilai bintang yang harus disorot
 * @param {boolean} isFinal - Jika ini adalah nilai rating final (bukan hover)
 */
function highlightStars(key, value, isFinal = false) {
    const stars = document.querySelectorAll(`.rating-interactive[data-key="${key}"] .star`);
    stars.forEach(star => {
        const starValue = parseInt(star.dataset.value);
        if (starValue <= value) {
            star.classList.remove('empty-star');
            star.classList.add('full-star-hover');
        } else {
            star.classList.remove('full-star-hover');
            star.classList.add('empty-star');
        }
        
        // Hapus penanda "aktif" (full-star) saat hover kecuali jika itu rating final
        if (!isFinal) {
            star.classList.remove('full-star');
        } else {
            if (starValue <= Math.floor(value)) {
                star.classList.add('full-star');
            } else {
                star.classList.remove('full-star');
            }
        }
    });
}


/**
 * Logika ketika pengguna memberikan rating baru
 * @param {string} key - Kunci resep
 * @param {number} newRating - Rating yang diberikan pengguna (1-5)
 */
function handleRating(key, newRating) {
    const data = resepData[key];
    if (!data) return;

    // Logika sederhana: Hitung rata-rata baru
    // Rata-rata baru = ((rating lama * jumlah ulasan lama) + rating baru) / (jumlah ulasan lama + 1)
    const totalRatingLama = data.rating * data.ulasan;
    const newUlasan = data.ulasan + 1;
    const newAvgRating = (totalRatingLama + newRating) / newUlasan;

    data.rating = newAvgRating;
    data.ulasan = newUlasan;

    alert(`Anda memberi rating ${newRating} bintang untuk ${data.judul}.\nRating rata-rata baru: ${newAvgRating.toFixed(1)} (${newUlasan} Ulasan).`);
    
    // Render ulang konten utama dan sidebar
    renderMainContent(key);
    renderSidebar(); 
}


// ===========================================
// 3. Inisialisasi Aplikasi
// ===========================================
document.addEventListener('DOMContentLoaded', renderSidebar);

// script.js (Tambahan/Modifikasi di bagian bawah file)

// --- Seleksi Elemen Modal ---
const modal = document.getElementById('modalResep');
const closeBtn = document.querySelector('.close-btn');
const modalJudul = document.getElementById('judulResep');
const modalIsi = document.getElementById('isiResep');
const modalImg = document.getElementById('modalImgResep');
const resepButtons = document.querySelectorAll('.btn-resep');


// ===========================================
// 4. Fungsionalitas Modal
// ===========================================

/**
 * Menampilkan Modal dengan data resep yang sesuai.
 * @param {string} key - Kunci resep (rendang, gudeg, dll.)
 */
function showRecipeModal(key) {
    const data = resepData[key];
    if (!data) {
        console.error(`Data resep untuk kunci '${key}' tidak ditemukan.`);
        return;
    }

    // Isi konten modal dengan data resep
    modalJudul.textContent = data.judul;
    // Menggunakan <pre> untuk menjaga format baris baru (\n) pada teks 'isi'
    modalIsi.innerHTML = `<pre>${data.isi}</pre>`; 
    modalImg.src = data.gambar;
    modalImg.alt = data.judul;

    // Tampilkan modal
    modal.style.display = 'flex';
}

/**
 * Menyembunyikan Modal.
 */
function hideRecipeModal() {
    modal.style.display = 'none';
}


// ===========================================
// 5. Inisialisasi Event Listeners
// ===========================================

// 5a. Tambahkan listener ke setiap tombol "Lihat Resep"
resepButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Ambil kunci resep dari atribut data-resep pada tombol
        const resepKey = this.getAttribute('data-resep');
        showRecipeModal(resepKey);
    });
});

// 5b. Tutup Modal ketika tombol (x) diklik
closeBtn.addEventListener('click', hideRecipeModal);

// 5c. Tutup Modal ketika area luar modal diklik
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        hideRecipeModal();
    }
});

/*
    Catatan: Hapus fungsi renderSidebar dan renderMainContent 
    dari file script.js Anda karena fungsi tersebut dibuat untuk 
    halaman menu_unggulan.html (sidebar) dan tidak digunakan 
    pada halaman index.html ini.
*/