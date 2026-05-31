// ── DATA KARTU ──
// Setiap pasang terdiri dari 2 file berbeda (gambar + pasangannya)
const dataKartu = [
  { id: 'cv',  img: 'assets/memory-cv.jpeg',  label: 'Computer Vision'        },
  { id: 'cvv', img: 'assets/memory-cvv.jpeg', label: 'Computer Vision (def)'  },
  { id: 'ml',  img: 'assets/memory-ml.jpeg',  label: 'Machine Learning'       },
  { id: 'mll', img: 'assets/memory-mll.jpeg', label: 'Machine Learning (def)' },
  { id: 'nn',  img: 'assets/memory-nn.jpeg',  label: 'Neural Network'         },
  { id: 'nnn', img: 'assets/memory-nnn.jpeg', label: 'Neural Network (def)'   },
  { id: 'rs',  img: 'assets/memory-rs.jpeg',  label: 'Rekomendasi Sistem'     },
  { id: 'rss', img: 'assets/memory-rss.jpeg', label: 'Rekomendasi Sistem (def)'},
];

// Tunggu — kalau ini 12 file = 6 pasang maka tiap pasang punya 2 file BERBEDA
// Artinya cara mainnya: kartu gambar cocok dengan kartu definisinya
// Kita pakai pasangId untuk mencocokkan

const pasangData = [
  { id: 'cv',  img: 'assets/memory-cv.jpeg',  pasangId: 'cv'  },
  { id: 'cvv', img: 'assets/memory-cvv.jpeg', pasangId: 'cv'  },
  { id: 'ml',  img: 'assets/memory-ml.jpeg',  pasangId: 'ml'  },
  { id: 'mll', img: 'assets/memory-mll.jpeg', pasangId: 'ml'  },
  { id: 'nn',  img: 'assets/memory-nn.jpeg',  pasangId: 'nn'  },
  { id: 'nnn', img: 'assets/memory-nnn.jpeg', pasangId: 'nn'  },
  { id: 'rs',  img: 'assets/memory-rs.jpeg',  pasangId: 'rs'  },
  { id: 'rss', img: 'assets/memory-rss.jpeg', pasangId: 'rs'  },
];

// Cek apakah ada file memory-ai dan memory-chatbot juga
// Berdasarkan screenshot: cv, cvv, ml, mll, nn, nnn, rs, rss = 8 file = 4 pasang
// Tapi user bilang 12 file = 6 pasang, kemungkinan ada file lain yang tidak terlihat
// Kita pakai 4 pasang yang terlihat dulu, JS bisa dikembangkan

const semuaKartu = pasangData;
const totalPasang = semuaKartu.length / 2;

// ── STATE ──
let kartuTerbuka = [];
let jumlahCocok  = 0;
let giliran      = 0;
let waktu        = 60;
let intervalId   = null;
let bisaKlik     = true;

// ── SHUFFLE ──
function acak(arr) {
  return [...arr]
    .map(k => ({ ...k, uid: Math.random() }))
    .sort((a, b) => a.uid - b.uid);
}

// ── MULAI GAME ──
function mulaiGame() {
  kartuTerbuka = [];
  jumlahCocok  = 0;
  giliran      = 0;
  waktu        = 60;
  bisaKlik     = true;

  document.getElementById('pasang').textContent  = 0;
  document.getElementById('giliran').textContent = 0;
  document.getElementById('timer').textContent   = waktu;
  document.getElementById('hasilOverlay').classList.remove('show');

  clearInterval(intervalId);
  intervalId = setInterval(() => {
    waktu--;
    document.getElementById('timer').textContent = waktu;
    if (waktu <= 0) {
      clearInterval(intervalId);
      tampilHasil(false);
    }
  }, 1000);

  // update label total pasang di HTML
  document.getElementById('totalPasang').textContent = totalPasang;

  const board = document.getElementById('board');
  board.innerHTML = '';
  acak(semuaKartu).forEach(k => board.appendChild(buatKartu(k)));
}

// ── BUAT ELEMEN KARTU ──
function buatKartu(data) {
  const kartu = document.createElement('div');
  kartu.className = 'kartu';
  kartu.dataset.id      = data.id;
  kartu.dataset.pasangId = data.pasangId;

  kartu.innerHTML = `
    <div class="kartu-inner">
      <div class="kartu-depan">?</div>
      <div class="kartu-belakang">
        <img src="${data.img}" alt="${data.id}" draggable="false"
             onerror="this.style.display='none'; this.parentElement.innerHTML+='<span style=font-size:28px>🖼️</span>'"/>
      </div>
    </div>`;

  kartu.addEventListener('click', () => klikKartu(kartu));
  return kartu;
}

// ── LOGIKA KLIK ──
function klikKartu(kartu) {
  if (!bisaKlik) return;
  if (kartu.classList.contains('flip') || kartu.classList.contains('cocok')) return;

  kartu.classList.add('flip');
  kartuTerbuka.push(kartu);

  if (kartuTerbuka.length === 2) {
    bisaKlik = false;
    giliran++;
    document.getElementById('giliran').textContent = giliran;

    const [a, b] = kartuTerbuka;

    // cocok jika pasangId sama DAN id berbeda
    const cocok = a.dataset.pasangId === b.dataset.pasangId && a.dataset.id !== b.dataset.id;

    if (cocok) {
      a.classList.add('cocok');
      b.classList.add('cocok');
      jumlahCocok++;
      document.getElementById('pasang').textContent = jumlahCocok;
      kartuTerbuka = [];
      bisaKlik = true;

      if (jumlahCocok === totalPasang) {
        clearInterval(intervalId);
        setTimeout(() => tampilHasil(true), 400);
      }
    } else {
      setTimeout(() => {
        a.classList.remove('flip');
        b.classList.remove('flip');
        kartuTerbuka = [];
        bisaKlik = true;
      }, 900);
    }
  }
}

// ── TAMPIL HASIL ──
function tampilHasil(menang) {
  let trophy, judul, detail;
  if (menang) {
    if (giliran <= totalPasang + 3) {
      trophy = '🏆'; judul = 'Luar Biasa!';
      detail = `Semua pasangan ditemukan dalam <strong>${giliran} giliran</strong>! Kamu jenius!`;
    } else {
      trophy = '🌟'; judul = 'Berhasil!';
      detail = `Semua pasangan ditemukan dalam <strong>${giliran} giliran</strong>. Terus latih ingatanmu!`;
    }
  } else {
    trophy = '⏰'; judul = 'Waktu Habis!';
    detail = `Kamu berhasil menemukan <strong>${jumlahCocok} dari ${totalPasang} pasang</strong>. Coba lagi!`;
  }

  document.getElementById('hasilTrophy').textContent = trophy;
  document.getElementById('hasilJudul').textContent  = judul;
  document.getElementById('hasilDetail').innerHTML   = detail;
  document.getElementById('hasilOverlay').classList.add('show');
}

// ── START ──
mulaiGame();