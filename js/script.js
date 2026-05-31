const overlay    = document.getElementById('overlay');
const btnPlay    = document.getElementById('btnPlay');
const btnClose   = document.getElementById('btnClose');
const btnMulai   = document.getElementById('btnMulai');
const inputNama  = document.getElementById('inputNama');
const inputKelas = document.getElementById('inputKelas');

btnPlay.addEventListener('click', () => overlay.classList.add('active'));
btnClose.addEventListener('click', () => overlay.classList.remove('active'));
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.remove('active');
});

inputNama.addEventListener('input',  () => inputNama.classList.remove('error'));
inputKelas.addEventListener('input', () => inputKelas.classList.remove('error'));

btnMulai.addEventListener('click', () => {
  const nama  = inputNama.value.trim();
  const kelas = inputKelas.value.trim();
  if (!nama)  { inputNama.classList.add('error');  inputNama.focus();  return; }
  if (!kelas) { inputKelas.classList.add('error'); inputKelas.focus(); return; }

  localStorage.setItem('nama', nama);
  localStorage.setItem('kelas', kelas);
  window.location.replace('menu.html');
});