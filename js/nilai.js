function simpanRanking(nilai){
  let nama = localStorage.getItem("nama_siswa");
  let data = JSON.parse(localStorage.getItem("ranking")) || [];

  data.push({nama:nama, nilai:nilai});
  data.sort((a,b)=> b.nilai - a.nilai);

  localStorage.setItem("ranking", JSON.stringify(data));
}