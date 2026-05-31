const soalData = [
  {
    pertanyaan: 'Apa kepanjangan dari AI?',
    jawaban: 'Artificial Intelligence',
    pilihan: ['Artificial Intelligence', 'Automatic Interface', 'Advanced Internet', 'Applied Innovation']
  },
  {
    pertanyaan: 'Siapa ilmuwan yang menciptakan "Turing Test" untuk menguji kecerdasan mesin?',
    jawaban: 'Alan Turing',
    pilihan: ['Alan Turing', 'Albert Einstein', 'Isaac Newton', 'Elon Musk']
  },
  {
    pertanyaan: 'Teknik AI yang terinspirasi dari cara kerja otak manusia disebut?',
    jawaban: 'Deep Learning',
    pilihan: ['Deep Learning', 'Data Mining', 'Web Scraping', 'Cloud Computing']
  },
  {
    pertanyaan: 'Manakah contoh penerapan AI dalam kehidupan sehari-hari?',
    jawaban: 'Rekomendasi lagu di Spotify',
    pilihan: ['Rekomendasi lagu di Spotify', 'Mencetak dokumen', 'Mengirim surat', 'Membaca buku']
  },
  {
    pertanyaan: 'Apa yang harus kita lakukan agar menggunakan AI dengan bijak?',
    jawaban: 'Verifikasi informasi dari AI',
    pilihan: ['Percaya semua hasil AI', 'Verifikasi informasi dari AI', 'Bagikan data pribadi ke AI', 'Gunakan AI untuk menipu']
  },
];

let current = 0;
let skor = 0;
const total = soalData.length;

function tampilSoal() {
  const soal = soalData[current];

  document.getElementById('nomorSoal').textContent = `Soal ${current + 1} / ${total}`;
  document.getElementById('skorInfo').textContent   = `Skor: ${skor}`;
  document.getElementById('progressFill').style.width = `${(current / total) * 100}%`;
  document.getElementById('pertanyaan').textContent = soal.pertanyaan;

  const grid = document.getElementById('pilihanGrid');
  grid.innerHTML = '';

  const acak = [...soal.pilihan].sort(() => Math.random() - .5);
  acak.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'pilihan-btn';
    btn.textContent = p;
    btn.onclick = () => pilih(btn, p, soal.jawaban, grid);
    grid.appendChild(btn);
  });
}

function pilih(btn, dipilih, benar, grid) {
  const semua = grid.querySelectorAll('.pilihan-btn');
  semua.forEach(b => b.disabled = true);

  if (dipilih === benar) {
    btn.classList.add('benar');
    skor++;
    tampilNotif('✔ Benar! Keren! 🎉', 'benar');
  } else {
    btn.classList.add('salah');
    semua.forEach(b => { if (b.textContent === benar) b.classList.add('benar'); });
    tampilNotif('✖ Salah! Jawaban: ' + benar, 'salah');
  }

  document.getElementById('skorInfo').textContent = `Skor: ${skor}`;

  setTimeout(() => {
    current++;
   if (current < total) {
  tampilSoal();
} else {
  document.getElementById('progressFill').style.width = '100%';
  localStorage.setItem('skorKuis', skor);
  localStorage.setItem('totalKuis', total);
  setTimeout(() => {
    window.location.replace('hasil-kuis.html');
  }, 600);
}
  }, 1500);
}

function tampilNotif(pesan, tipe) {
  const notif = document.getElementById('notif');
  notif.textContent = pesan;
  notif.className = `notif show ${tipe}`;
  setTimeout(() => notif.classList.remove('show'), 1300);
}

tampilSoal();