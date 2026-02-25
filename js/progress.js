document.addEventListener("DOMContentLoaded", function(){

    const match = window.location.pathname.match(/materi(\d+)\.html/);
    if(!match) return;

    const nomor = parseInt(match[1]);
    const persen = (nomor / APP_CONFIG.totalMateri) * 100;

    const bar = document.getElementById("progressBar");
    const text = document.getElementById("progressText");

    if(bar) bar.style.width = persen + "%";
    if(text) text.innerText =
        "Bab " + nomor + " dari " + APP_CONFIG.totalMateri;
});

function tandaiSelesai(nomor){
    localStorage.setItem("materi"+nomor+"_selesai", true);
}

function cekProgress(nomor){
    let bar = document.querySelector(".progress-bar");
    if(localStorage.getItem("materi"+nomor+"_selesai")){
        bar.style.width = "100%";
        bar.innerText = "Selesai ✔";
    }
}