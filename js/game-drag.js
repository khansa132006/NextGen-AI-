const soalData = [
  { kata: 'Machine Learning', definisi: 'Kemampuan mesin untuk belajar dari data tanpa diprogram secara eksplisit.' },
  { kata: 'Chatbot', definisi: 'Program komputer yang bisa berkomunikasi dengan manusia melalui teks atau suara.' },
  { kata: 'Deep Learning', definisi: 'Teknik AI yang meniru cara kerja otak manusia menggunakan jaringan saraf tiruan.' },
  { kata: 'Computer Vision', definisi: 'Kemampuan komputer untuk memahami dan menginterpretasi gambar atau video.' },
];

let jawaban = {}; // { indexKotak: kata }
document.getElementById('total').textContent = soalData.length;

const kataContainer  = document.getElementById('kataContainer');
const kotakContainer = document.getElementById('kotakContainer');

// Acak urutan kata
const acak = [...soalData].sort(() => Math.random() - .5);

// Render kata
acak.forEach(item => {
  const chip = document.createElement('div');
  chip.className = 'kata-chip';
  chip.textContent = item.kata;
  chip.draggable = true;
  chip.dataset.kata = item.kata;

  chip.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', item.kata);
    setTimeout(() => chip.style.opacity = '.4', 0);
  });
  chip.addEventListener('dragend', () => chip.style.opacity = '1');

  kataContainer.appendChild(chip);
});

// Render kotak — acak urutan definisi juga
const acakKotak = [...soalData].sort(() => Math.random() - .5);

acakKotak.forEach((item, i) => {
  const row = document.createElement('div');
  row.className = 'kotak-item';

  const drop = document.createElement('div');
  drop.className = 'kotak-drop';
  drop.dataset.index = i;
  drop.dataset.jawaban = item.kata;
  drop.textContent = 'Taruh di sini';

  drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('drag-over'); });
  drop.addEventListener('dragleave', () => drop.classList.remove('drag-over'));
  drop.addEventListener('drop', e => {
    e.preventDefault();
    drop.classList.remove('drag-over');
    const kata = e.dataTransfer.getData('text/plain');

    // Kembalikan kata lama ke pool jika sudah ada
    if (drop.dataset.isi) {
      const lama = kataContainer.querySelector(`[data-kata="${drop.dataset.isi}"]`);
      if (lama) lama.classList.remove('used');
    }

    drop.textContent = kata;
    drop.dataset.isi = kata;
    drop.classList.remove('benar', 'salah');

    // Tandai chip sebagai used
    const chip = kataContainer.querySelector(`[data-kata="${kata}"]`);
    if (chip) chip.classList.add('used');

    jawaban[i] = kata;
  });

  const def = document.createElement('div');
  def.className = 'kotak-definisi';
  def.textContent = item.definisi;

  row.appendChild(drop);
  row.appendChild(def);
  kotakContainer.appendChild(row);
});

// Cek jawaban
function cekJawaban() {
  let benar = 0;
  const drops = document.querySelectorAll('.kotak-drop');

  drops.forEach(drop => {
    if (!drop.dataset.isi) return;
    if (drop.dataset.isi === drop.dataset.jawaban) {
      drop.classList.add('benar');
      drop.classList.remove('salah');
      benar++;
    } else {
      drop.classList.add('salah');
      drop.classList.remove('benar');
    }
  });

  document.getElementById('skor').textContent = benar;
  tampilNotif(benar === soalData.length
    ? '🎉 Semua benar! Luar biasa!' : `✔ ${benar} benar, coba lagi yang salah!`,
    benar === soalData.length ? 'benar' : 'salah'
  );
}

function tampilNotif(pesan, tipe) {
  const notif = document.getElementById('notif');
  notif.textContent = pesan;
  notif.className = `notif show ${tipe}`;
  setTimeout(() => notif.classList.remove('show'), 2500);
}