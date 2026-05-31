function keluarApp() {
  // Hapus data sesi
  localStorage.removeItem('nama');
  localStorage.removeItem('kelas');
  localStorage.removeItem('skorKuis');
  localStorage.removeItem('totalKuis');

  // Redirect ke halaman awal
  window.location.replace('index.html');
}