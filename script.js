// JavaScript source code

let last = new Date();
const sinelow = new Audio('./Tone/500hz.wav');
const sinemid = new Audio('./Tone/1000hz.wav');
const sinehigh = new Audio('./Tone/2000hz.wav');
let voices = [];
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices().filter((v) => v.lang === 'ja-JP');
  console.log(voices);  // 利用可能な音声リストを確認できます
};


function PlayAnnounce(TIME) {
  const getVoices = () => {
    return speechSynthesis.getVoices().filter((v) => v.voiceURI === 'Google 日本語');
  }
  voices = getVoices();
  console.log(voices);

  const H = TIME.getHours();
  const M = TIME.getMinutes();
  const S = TIME.getSeconds();
  // Google 日本語の音声を取得
  let voice = voices.find(v => v.voiceURI === 'Google 日本語');

  // Google 日本語が見つからない場合、最初の音声を使用
  if (!voice) {
    voice = voices[0];
  }

  let announce = new SpeechSynthesisUtterance();
  announce.voice = voice;
  announce.rate = 1;
  if (H == 11 && M == 59 && S >= 50) {
    announce = new SpeechSynthesisUtterance(`正午、を、お知らせします`);
  }
  else if (M == 59 && S >= 50) {
    const ampm = H < 12 ? '午前' : '午後';
    announce = new SpeechSynthesisUtterance(`${ampm}$、{(H+1)%12}時、ちょうど、を、お知らせします`);
  }
  else if (S >= 50) {
    const ampm = H < 12 ? '午前' : '午後';
    announce = new SpeechSynthesisUtterance(`${ampm}、${H}時、${M + 1}分、ちょうど、を、お知らせします`);
  }
  else {
    const ampm = H < 12 ? '午前' : '午後';
    const T = (S / 10 + 1) * 10;
    announce = new SpeechSynthesisUtterance(`${ampm}、${H}時、${M}分、${T}秒、を、お知らせします`);
  }
  speechSynthesis.speak(announce);
}

function displayTime() {
  const pad2Zero = value => value.toString().padStart(2, '0');
  const pad3Zero = value => value.toString().padStart(3, '0');
  const now = new Date();
  const hour = pad2Zero(now.getHours());
  const minute = pad2Zero(now.getMinutes());
  const second = pad2Zero(now.getSeconds());
  const dsecond = pad3Zero(now.getMilliseconds()).slice(0, 2);


  if (now.getSeconds() !== last.getSeconds()) {
    last = now;
    if (now.getSeconds() % 10 == 0) {
      sinemid.play();
      PlayAnnounce(now);
    }
    else if (now.getSeconds() % 30 >= 27) {
      sinelow.play();
    }
    else {
      sinehigh.play();
    }
  }

  const currentTime = `${hour}:${minute}:${second}`;
  const decisecond = `${dsecond}`
  document.querySelector('.clock').textContent = currentTime;
  document.querySelector('.dsec').textContent = decisecond;
}

setInterval(displayTime, 8);