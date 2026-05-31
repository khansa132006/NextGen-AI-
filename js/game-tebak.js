// ── DATA SOAL ──
const soalList = [
  {
    gambar: '🤖',
    pertanyaan: 'Teknologi ini bisa berpikir dan belajar seperti manusia. Namanya?',
    pilihan: ['Artificial Intelligence', 'Virtual Reality', 'Blockchain', 'Cloud Computing'],
    jawaban: 'Artificial Intelligence'
  },
  {
    gambar: '🧠',
    pertanyaan: 'Kemampuan mesin untuk belajar dari data tanpa diprogram secara eksplisit disebut?',
    pilihan: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Robotics'],
    jawaban: 'Machine Learning'
  },
  {
    gambar: '👁️',
    pertanyaan: 'Teknologi AI yang memungkinkan komputer memahami dan menganalisis gambar disebut?',
    pilihan: ['Natural Language Processing', 'Computer Vision', 'Speech Recognition', 'Data Mining'],
    jawaban: 'Computer Vision'
  },
  {
    gambar: '💬',
    pertanyaan: 'Program komputer yang bisa berkomunikasi dengan manusia melalui teks atau suara disebut?',
    pilihan: ['Search Engine', 'Chatbot', 'Web Scraper', 'Database'],
    jawaban: 'Chatbot'
  },
  {
    gambar: '🌐',
    pertanyaan: 'Jaringan saraf tiruan berlapis yang meniru cara kerja otak manusia disebut?',
    pilihan: ['Machine Learning', 'Big Data', 'Deep Learning', 'Internet of Things'],
    jawaban: 'Deep Learning'
  }
];

let soalIndex = 0;
let skor = 0;
let terjawab = false;

function tampilSoal() {
  terjawab = false;
  const soal = soalList[soalIndex];
  const total = soalList.length;

  document.getElementById('nomorSoal').textContent = `Soal ${soalIndex + 1}`;
  document.getElementById('totalSoal').textContent  = total;
  document.getElementById('skor').textContent        = skor;
  document.getElementById('progressFill').style.width = `${((soalIndex) / total) * 100}%`;
  document.getElementById('gambarBox').textContent    = soal.gambar;
  document.getElementById('pertanyaan').textContent   = soal.pertanyaan;

  const grid = document.getElementById('pilihanGrid');
  grid.innerHTML = '';
  soal.pilihan.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'pilihan-btn';
    btn.textContent = p;
    btn.onclick = () => pilihJawaban(btn, p, soal.jawaban);
    grid.appendChild(btn);
  });
}

function pilihJawaban(btn, dipilih, benar) {
  if (terjawab) return;
  terjawab = true;

  const semua = document.querySelectorAll('.pilihan-btn');
  semua.forEach(b => {
    b.disabled = true;
    if (b.textContent === benar) b.classList.add('benar');
  });

  if (dipilih === benar) {
    btn.classList.add('benar');
    skor++;
    tampilNotif('✅ Benar! Mantap!', 'benar');
  } else {
    btn.classList.add('salah');
    tampilNotif('❌ Salah! Jawaban yang benar: ' + benar, 'salah');
  }

  document.getElementById('skor').textContent = skor;

  setTimeout(() => {
    soalIndex++;
    if (soalIndex < soalList.length) {
      tampilSoal();
    } else {
      tampilHasil();
    }
  }, 1200);
}

function tampilNotif(pesan, tipe) {
  const el = document.getElementById('notif');
  el.textContent = pesan;
  el.className = `notif ${tipe} show`;
  setTimeout(() => el.classList.remove('show'), 1000);
}

function tampilHasil() {
  const total = soalList.length;
  // update progress bar penuh
  document.getElementById('progressFill').style.width = '100%';

  // tentukan trophy & pesan
  let trophy = '🏆', pesan = '';
  if (skor === total)        { trophy = '🏆'; pesan = 'Sempurna! Kamu luar biasa!'; }
  else if (skor >= total * .6) { trophy = '🌟'; pesan = 'Bagus! Terus semangat belajar!'; }
  else                         { trophy = '💪'; pesan = 'Jangan menyerah, coba lagi ya!'; }

  document.getElementById('hasilTrophy').textContent = trophy;
  document.getElementById('hasilSkor').textContent   = `${skor} / ${total}`;
  document.getElementById('hasilSub').textContent    = pesan;
  document.getElementById('hasilOverlay').classList.add('show');
}

function ulangGame() {
  soalIndex = 0;
  skor = 0;
  document.getElementById('hasilOverlay').classList.remove('show');
  tampilSoal();
}

// ── START ──
tampilSoal();