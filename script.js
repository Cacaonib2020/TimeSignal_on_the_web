// JavaScript source code

let last = new Date();
const sinelow = new Audio('./Tone/500hz.wav');
const sinemid = new Audio('./Tone/1000hz.wav');
const sinehigh = new Audio('./Tone/2000hz.wav');

function PlayAnnounce(TIME){
  const H = TIME.getHours();
  const M = TIME.getMinutes();
  const S = TIME.getSeconds();
  let announce = new SpeechSynthesisUtterance();
  if(H==11&&M==59&&S>=50){
    announce = new SpeechSynthesisUtterance(`正午をお知らせします`);
  }
  else if(M==59&&S>=50){
    const ampm = H<12 ? '午前' : '午後';
    announce = new SpeechSynthesisUtterance(`${ampm}${(H+1)%12}時ちょうどをお知らせします`);
  }
  else if(S>=50){
    const ampm = H<12 ? '午前' : '午後';
    announce = new SpeechSynthesisUtterance(`${ampm}${H}時${M+1}分ちょうどをお知らせします`);
  }
  else{
    const ampm = H<12 ? '午前' : '午後';
    const T = (S/10+1)*10;
    announce = new SpeechSynthesisUtterance(`${ampm}${H}時${M}分${T}秒をお知らせします`);
  }
  speechSynthesis.speak(announce);
}

function displayTime(){
  const padZero = value => value.toString().padStart(2, '0');
  const now = new Date();
  const hour = padZero(now.getHours());
  const minute = padZero(now.getMinutes());
  const second = padZero(now.getSeconds());
  const dsecond = padZero(now.getMilliseconds()).slice(0, 2);

  
  if(now.getSeconds()!==last.getSeconds()){
    last = now;
    if(now.getSeconds()%10==0){
      sinemid.play();
      PlayAnnounce(now);
    }
    else if(now.getSeconds()%30>=27){
      sinelow.play();
    }
    else{
      sinehigh.play();
    }
  }

  const currentTime = `${hour}:${minute}:${second}.${dsecond}`;
  document.querySelector('.clock').textContent = currentTime;
}

setInterval(displayTime, 8);