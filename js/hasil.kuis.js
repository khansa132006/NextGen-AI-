const skor  = parseInt(localStorage.getItem('skorKuis') ?? '0');
const total = parseInt(localStorage.getItem('totalKuis') ?? '5');
const nama  = localStorage.getItem('nama') || 'Kamu';

document.getElementById('totalAngka').textContent = total;

// Counting animation
const skorEl = document.getElementById('skorAngka');
skorEl.textContent = '0';

if (skor === 0) {
  skorEl.textContent = '0';
} else {
  let count = 0;
  const intervalMs = Math.floor(1000 / skor);
  const interval = setInterval(() => {
    count++;
    skorEl.textContent = count;
    if (count >= skor) clearInterval(interval);
  }, intervalMs);
}

// Kategori & pesan
const badge     = document.getElementById('kategoriBadge');
const ringkasan = document.getElementById('ringkasan');
const trophy    = document.getElementById('trophy');
const title     = document.getElementById('hasilTitle');

if (skor === total) {
  badge.textContent  = '🌟 Sangat Baik!';
  badge.className    = 'kategori-badge sangat-baik';
  trophy.textContent = '🏆';
  title.textContent  = `Luar Biasa, ${nama}!`;
  ringkasan.textContent = `Kamu menjawab semua ${total} soal dengan benar! Kamu sudah memahami AI dengan sangat baik!`;
} else if (skor >= Math.ceil(total / 2)) {
  badge.textContent  = '👍 Baik!';
  badge.className    = 'kategori-badge baik';
  trophy.textContent = '🎖️';
  title.textContent  = `Bagus, ${nama}!`;
  ringkasan.textContent = `Kamu menjawab ${skor} dari ${total} soal dengan benar. Terus belajar ya, kamu hampir sempurna!`;
} else {
  badge.textContent  = '📚 Perlu Belajar';
  badge.className    = 'kategori-badge perlu-belajar';
  trophy.textContent = '💪';
  title.textContent  = `Semangat, ${nama}!`;
  ringkasan.textContent = `Kamu menjawab ${skor} dari ${total} soal. Jangan menyerah, coba pelajari materinya lagi ya!`;
}