// ── Nama & kelas dari localStorage ──
const nama  = localStorage.getItem('nama')  || 'Teman';
const kelas = localStorage.getItem('kelas') || '';

document.getElementById('namaUser').textContent = nama;
document.getElementById('kelasUser').textContent = kelas ? `Kelas ${kelas}` : '';

// ── Audio setup ──
const audio    = document.getElementById('backsound');
const audioBtn = document.getElementById('audioBtn');
const soundIcon = document.getElementById('soundIcon');

// Baca state terakhir dari localStorage (default: on)
let isMuted = localStorage.getItem('soundMuted') === 'true';

function applyAudioState() {
  if (isMuted) {
    audio.pause();
    soundIcon.textContent = '🔇';
    audioBtn.classList.add('muted');
  } else {
    audio.volume = 0.4;
    audio.play().catch(() => {});
    soundIcon.textContent = '🔊';
    audioBtn.classList.remove('muted');
  }
}

function toggleAudio() {
  isMuted = !isMuted;
  localStorage.setItem('soundMuted', isMuted);
  applyAudioState();
}

// Autoplay saat halaman siap
document.addEventListener('DOMContentLoaded', () => {
  audio.volume = 0.4;
  if (!isMuted) {
    audio.play().catch(() => {
      // Browser blokir autoplay → tunggu interaksi pertama
      document.addEventListener('click', () => {
        if (!isMuted) audio.play().catch(() => {});
      }, { once: true });
    });
  }
  applyAudioState();
});

// ── Navigasi menu ──
function bukaMenu(halaman) {
  window.location.href = halaman + '.html';
}