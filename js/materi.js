/* =====================================
   TEXT TO SPEECH GLOBAL SYSTEM
===================================== */

let elements;
let index = 0;
let speech;
let voices = [];

document.addEventListener("DOMContentLoaded", function(){

    if ("speechSynthesis" in window) {
        speechSynthesis.onvoiceschanged = () => {
            voices = speechSynthesis.getVoices();
        };
    }

});

/* =============================
   PLAY TTS
============================= */
function playTTS(){
    stopTTS();

    elements = document.querySelectorAll("#materiText > p, #materiText .tts-only p");

    // Hapus semua highlight dulu
    elements.forEach(el => el.classList.remove("highlight"));
    document.querySelectorAll("table tr")
        .forEach(tr => tr.classList.remove("highlight-row"));

    readNext();
}
function readNext(){

    if(index >= elements.length){
        selesaiMateri();
        return;
    }

    elements.forEach(el => el.classList.remove("highlight"));
    elements[index].classList.add("highlight");
    // Jika bagian tabel (tts-only), highlight baris tabel
    if(elements[index].closest(".tts-only")){
    let nomor = index - document.querySelectorAll("#materiText > p").length + 1;
    let row = document.getElementById("row" + nomor);
    if(row) row.classList.add("highlight-row");
    }

    elements[index].scrollIntoView({
        behavior:"smooth",
        block:"center"
    });

    speech = new SpeechSynthesisUtterance(elements[index].innerText);
    speech.lang = "id-ID";
    speech.rate = 0.9;

    let indoVoice = voices.find(v => v.lang === "id-ID");
    if(indoVoice) speech.voice = indoVoice;

    highlightTableRow(elements[index].innerText);

    speech.onend = function(){
    removeTableHighlight();
    index++;
    readNext();
    };

    speechSynthesis.speak(speech);
}

/* =============================
   PAUSE & STOP
============================= */
function pauseTTS(){
    speechSynthesis.pause();
}

function stopTTS(){
    speechSynthesis.cancel();
    index = 0;
    document.querySelectorAll(".highlight")
        .forEach(el => el.classList.remove("highlight"));
}

/* =============================
   SELESAI MATERI
============================= */
function selesaiMateri(){

    const badge = document.getElementById("badge");
    if(badge) badge.style.display = "block";

    const halaman = window.location.pathname;
    const match = halaman.match(/materi(\d+)/);

    if(match){

        const nomor = match[1];

        // Simpan status selesai
        localStorage.setItem("materi" + nomor + "_selesai", true);

        // Cegah kirim dobel
        const sudahTerkirim = localStorage.getItem("materi" + nomor + "_terkirim");

        if(!sudahTerkirim){
            kirimKeSheet(nomor);
            localStorage.setItem("materi" + nomor + "_terkirim", true);
        }
    }

    startConfetti();
}
/* =====================================
   CONFETTI CELEBRATION
===================================== */

function startConfetti() {

    const canvas = document.getElementById("confetti");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let pieces = [];

    for (let i = 0; i < 150; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 4,
            speed: Math.random() * 3 + 2,
            color: `hsl(${Math.random()*360}, 100%, 50%)`
        });
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        pieces.forEach(p => {
            p.y += p.speed;

            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }

            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
        });

        requestAnimationFrame(update);
    }

    update();

    // berhenti setelah 4 detik
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 4000);
}

// ===============================
// DETEKSI NOMOR MATERI
// ===============================
function getMateriNumber() {
    const title = document.querySelector("h2").innerText;
    const match = title.match(/MATERI\s+(\d+)/i);
    return match ? parseInt(match[1]) : 0;
}

const materiNumber = getMateriNumber();


// ===============================
// SUPER PREMIUM THEME ENGINE
// ===============================
window.addEventListener("load", function () {

    applyTheme();
    launchFloatingTheme();
    observeBadge();

});


// ===============================
// APPLY BACKGROUND THEME
// ===============================
function applyTheme() {

    let bg;

    if (materiNumber <= 7)
        bg = "linear-gradient(to bottom right, #fff8e1, #ffe082)"; // Pancasila

    else if (materiNumber == 8)
        bg = "linear-gradient(to bottom right, #e3f2fd, #bbdefb)"; // Makna

    else if (materiNumber == 9)
        bg = "linear-gradient(to bottom right, #ede7f6, #d1c4e9)"; // UUD

    else if (materiNumber <= 16)
        bg = "linear-gradient(to bottom right, #f1f8e9, #dcedc8)"; // Norma

    else if (materiNumber == 17)
        bg = "linear-gradient(to bottom right, #fce4ec, #f8bbd0)"; // Hak Anak

    else if (materiNumber <= 19)
        bg = "linear-gradient(to bottom right, #e0f7fa, #b2ebf2)"; // Musyawarah

    else
        bg = "linear-gradient(to bottom right, #f3e5f5, #e1bee7)"; // Etika

    document.body.style.background = bg;
}


// ===============================
// FLOATING THEME ICONS
// ===============================
function getIcons() {

    if (materiNumber <= 7) return ["⭐","🇮🇩"];
    if (materiNumber == 8) return ["💡"];
    if (materiNumber == 9) return ["📜"];
    if (materiNumber <= 16) return ["⚖️"];
    if (materiNumber == 17) return ["👶","❤️"];
    if (materiNumber <= 19) return ["🤝"];
    return ["💬"];

}

let floatInterval;

function launchFloatingTheme() {

    const icons = getIcons();

    floatInterval = setInterval(() => {

        if (document.hidden) return;

        let span = document.createElement("span");
        span.classList.add("super-float");

        span.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        span.style.left = Math.random() * 100 + "vw";
        span.style.fontSize = (20 + Math.random() * 25) + "px";
        span.style.animationDuration = (5 + Math.random() * 4) + "s";

        document.body.appendChild(span);

        setTimeout(() => span.remove(), 9000);

    }, 900);
}


// ===============================
// BADGE CELEBRATION BURST
// ===============================
function observeBadge() {

    const badge = document.getElementById("badge");
    if (!badge) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                celebrationBurst();
            }
        });
    });

    observer.observe(badge);
}

function celebrationBurst() {

    for (let i = 0; i < 25; i++) {

        let burst = document.createElement("span");
        burst.classList.add("burst");
        burst.innerHTML = "✨";

        burst.style.left = (window.innerWidth / 2) + "px";
        burst.style.top = (window.innerHeight / 2) + "px";

        burst.style.transform = `rotate(${Math.random()*360}deg) translate(${Math.random()*200}px)`;

        document.body.appendChild(burst);

        setTimeout(() => burst.remove(), 1500);
    }
}

// ===============================
// TABLE ROW HIGHLIGHT SUPPORT
// ===============================

function highlightTableRow(text){

    removeTableHighlight();

    const match = text.match(/Nomor\s+(\d+)/i);
    if(match){
        const nomor = match[1];
        const row = document.getElementById("row" + nomor);
        if(row){
            row.classList.add("row-highlight");
        }
    }
}

function removeTableHighlight(){
    document.querySelectorAll(".row-highlight")
        .forEach(r => r.classList.remove("row-highlight"));
}


function kirimKeSheet(nomorMateri){

    let sudah = localStorage.getItem("materi_" + nomorMateri);

    if(sudah){
        return;
    }

    localStorage.setItem("materi_" + nomorMateri, "sudah");

    let nama = localStorage.getItem("nama_siswa");
    let absen = localStorage.getItem("absen_siswa");

    let total = localStorage.getItem("total_selesai") || 0;
    total++;

    localStorage.setItem("total_selesai", total);

    fetch("https://script.google.com/macros/s/AKfycbzMpyclX-FVsuw4i_7X9DL014Sd23nHezcdnu2ujiYaazBAEgpA3ci7amCR8k_Boqh-jA/exec", {
        method: "POST",
        body: JSON.stringify({
            nama: nama,
            absen: absen,
            materi: nomorMateri,
            total: total
        })
    });
}