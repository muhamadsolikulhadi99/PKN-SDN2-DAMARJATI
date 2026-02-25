let utterance;
let voices = [];

function loadVoices() {
    voices = speechSynthesis.getVoices();
}

speechSynthesis.onvoiceschanged = loadVoices;

function getIndonesianVoice() {
    return voices.find(v => v.lang === "id-ID") || voices[0];
}

function playTTS() {
    stopTTS();

    let teks = document.querySelector(".materi-container").innerText;

    utterance = new SpeechSynthesisUtterance(teks);
    utterance.voice = getIndonesianVoice();
    utterance.lang = "id-ID";
    utterance.rate = 0.95; // lebih natural
    utterance.pitch = 1.1; // lebih ceria

    speechSynthesis.speak(utterance);
}

function pauseTTS() {
    speechSynthesis.pause();
}

function resumeTTS() {
    speechSynthesis.resume();
}

function stopTTS() {
    speechSynthesis.cancel();
}