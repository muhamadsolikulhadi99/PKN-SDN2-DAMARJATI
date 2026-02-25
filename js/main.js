/* =========================================
   MAIN JS - MINI LMS PKN KELAS 6
   Versi Stabil Final (49 Materi)
========================================= */

console.log("Aplikasi PKN Kelas 6 siap digunakan.");


/* =========================================
   0️⃣ CEK LOGIN (AMAN)
========================================= */

let halamanSekarang = window.location.pathname.split("/").pop();
let namaLogin = localStorage.getItem("nama_siswa");

if(
    halamanSekarang !== "index.html" &&
    halamanSekarang !== "" &&
    !namaLogin
){
    window.location.href = "index.html";
}


/* =========================================
   1️⃣ DOM SIAP
========================================= */

document.addEventListener("DOMContentLoaded", function(){

    // Tampilkan Nama
    let nama = localStorage.getItem("nama_siswa");
    let namaEl = document.getElementById("namaSiswa");

    if(nama && namaEl){
        namaEl.innerText = nama;
    }

    // Progress Nilai (49 Materi)
    let totalNilai = 0;
    let jumlahMateri = 49;

    for(let i = 1; i <= jumlahMateri; i++){
        totalNilai += parseInt(localStorage.getItem("nilai_materi" + i)) || 0;
    }

    let rataNilai = totalNilai / jumlahMateri;

    let progressEl = document.getElementById("globalProgress");
    if(progressEl){
        progressEl.style.width = Math.round(rataNilai) + "%";
        progressEl.innerText = Math.round(rataNilai) + "%";
    }

    // Progress bar materi jika ada
    let barMateri = document.querySelector(".progress-bar");
    if(barMateri){
        barMateri.style.width = "100%";
    }

});


/* =========================================
   2️⃣ TEXT TO SPEECH GLOBAL
========================================= */

function bacakan(){

    let teks = document.body.innerText;

    if('speechSynthesis' in window){
        let suara = new SpeechSynthesisUtterance(teks);
        suara.lang = "id-ID";
        speechSynthesis.speak(suara);
    } else {
        alert("Browser tidak mendukung fitur suara.");
    }
}


/* =========================================
   3️⃣ HITUNG MATERI SELESAI
========================================= */

window.addEventListener("load", function(){

    let nama = localStorage.getItem("nama_siswa");
    let namaEl = document.getElementById("namaSiswa");

    if(nama && namaEl){
        namaEl.innerText = nama;
    }

    let selesai = 0;
    let jumlahMateri = 49;

    for(let i = 1; i <= jumlahMateri; i++){
        if(localStorage.getItem("materi" + i + "_selesai")){
            selesai++;
        }
    }

    let persenSelesai = (selesai / jumlahMateri) * 100;

    let bar = document.getElementById("globalProgress");
    if(bar){
        bar.style.width = Math.round(persenSelesai) + "%";
        bar.innerText = Math.round(persenSelesai) + "%";
    }

});


/* =========================================
   4️⃣ SISTEM TOMBOL KEMBALI (ANTI DIAM)
========================================= */

document.addEventListener("click", function(e){

    let tombol = e.target.closest(".btn-kembali");

    if(tombol){
        e.preventDefault();
        window.location.href = "dashboard.html";
    }

});


/* =========================================
   5️⃣ Fungsi Manual (Opsional)
========================================= */

function kembaliKeMenu(){
    window.location.href = "dashboard.html";
}