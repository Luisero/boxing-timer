let roundTimer = document.querySelector(".round-timer");
let timeValue = document.querySelector("#round-timer-text");
let roundValue = document.querySelector("#round-text");

let progressTime = 0;
let progressEnd = 60*3;
let speed = 1000;


let progress = setInterval(()=>{
    progressTime++;
    timeValue.textContent = `${progressTime}`;
    roundTimer.style.background = `conic-gradient(
        #FA9B9B ${progressTime * 3.6}deg, 
        #FFB2FF ${progressTime * 3.6}deg
    )`;
    if(progressTime == progressEnd){
        clearInterval(progress);
    }
}, speed)