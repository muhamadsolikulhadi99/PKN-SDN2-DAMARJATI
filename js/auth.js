function login() {
  let nama = document.getElementById("nama").value;
  if(nama === "") {
    alert("Isi nama dulu ya!");
    return;
  }
  localStorage.setItem("nama_siswa", nama);
  window.location.href = "dashboard.html";
}