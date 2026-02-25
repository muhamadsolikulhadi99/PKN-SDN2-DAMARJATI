window.onload = function(){
  let total = 0;
  for(let i=1;i<=4;i++){
    let n = parseInt(localStorage.getItem("nilai_materi"+i)) || 0;
    document.getElementById("n"+i).innerText = n;
    total += n;
  }
  let rata = total/4;
  document.getElementById("rata").innerText = rata;
}

function cekSertifikat(){
  let rata = parseInt(document.getElementById("rata").innerText);
  if(rata >= 75){
    document.getElementById("sertifikat").innerHTML =
      "<h3>🎉 Selamat! Kamu Lulus 🎉</h3><button onclick='window.print()'>Cetak Sertifikat</button>";
  } else {
    alert("Belum lulus, semangat belajar lagi!");
  }
}