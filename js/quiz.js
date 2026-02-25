function mulaiQuiz(noMateri) {
  fetch("data/soal.json")
  .then(res => res.json())
  .then(data => {
    let soal = data.filter(s => s.materi == noMateri);
    tampilSoal(soal, noMateri);
  });
}

function koreksi(soal,noMateri) {
  let benar = 0;

  soal.forEach((s,i)=>{
    let jawaban = document.querySelector(`input[name="q${i}"]:checked`);
    if(jawaban && parseInt(jawaban.value) === s.jawaban){
      benar++;
      suaraBenar();
    } else {
      suaraSalah();
    }
  });

  let nilai = Math.round((benar/soal.length)*100);

  localStorage.setItem("nilai_materi"+noMateri,nilai);
  simpanRanking(nilai);

  document.getElementById("quiz").innerHTML =
    `<h3>🎉 Nilai Kamu: ${nilai}</h3>
     <div class="progress-container">
       <div class="progress-bar" style="width:${nilai}%"></div>
     </div>
     <button onclick="kembali()">Kembali</button>`;
}

function koreksi(soal,noMateri) {
  let benar = 0;
  soal.forEach((s,i)=>{
    let jawaban = document.querySelector(`input[name="q${i}"]:checked`);
    if(jawaban && parseInt(jawaban.value) === s.jawaban){
      benar++;
    }
  });
  let nilai = (benar/soal.length)*100;
  localStorage.setItem("nilai_materi"+noMateri,nilai);
  alert("Nilai kamu: "+nilai);
}