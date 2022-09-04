// nao deixar a tela desligar

/*--------------------------------------*/


let roundTimer = document.querySelector(".round-timer");
let timeValue = document.querySelector("#round-timer-text");
let roundValue = document.querySelector("#round-text");
let audio = document.querySelector('.ringbell')
let buttonStart = document.querySelector('#start-button');
let buttonPause = document.querySelector('#pause-button');
let buttonStop = document.querySelector('#stop-button');

buttonStart.addEventListener('click',iniciar);
buttonPause.addEventListener('click', pause);
buttonStop.addEventListener('click', stop);



const COR_ROUND_BASE = "#FA9B9B";
const COR_ROUND_NEUTRA = "#F3C8CF";
const COR_INTERVALO_BASE = "#3fe652";
const COR_INTERVALO_NEUTRA = "#97f3a1";

let tempo_round = 180; //segundos
let tempo_descanco = 100 //segundos
let segundos = 0;
let minutos = 0;
let progressEnd = tempo_round;

let minutoLimit = 3;

let minutoIntervalLimit = 1;
let segundoIntervalLimit= 30;

let segundosLimit = 0;

let noIntervalo = false
let acabou = false
const SPEED = 1000;

let rounds = 1;
let roundsLimit = 2;
let intervalos = 0;
let intervalosLimit = roundsLimit -1;
// 100% - 180
// x% - valor tempo
// x = 100*valor tempo /180

let clickIniciar = 0;

let interval

function iniciar(){
    if(clickIniciar==0){
        audio.play();
        clickIniciar = 1;
        interval = setInterval(contador, SPEED);
       
    }

}

function pause(){
    clearInterval(interval);
    clickIniciar = 0
    
}

function stop(){
    
    clearInterval(interval);
    clickIniciar  = 0
    segundos = 0
    minutos = 0
    timeValue.textContent = `0:00`
    roundTimer.style.background = `conic-gradient(
        ${COR_ROUND_BASE} ${(segundos + minutos*60)*100/180 * 3.6}deg, 
        ${COR_ROUND_NEUTRA} ${(segundos + minutos * 60) *100/180 * 3.6}deg
    )`;
}


function contador(){
    if(noIntervalo){
        if(segundos == segundoIntervalLimit && minutos == minutoIntervalLimit){
            noIntervalo = false
            rounds++
            intervalos++
            minutos = 0
            segundos = 0
            audio.play()
        }
        else if(intervalos < intervalosLimit){
            document.querySelector('#intervalo-text').style.display = 'block';

            segundos++;
            if(segundos == 60){
                minutos++
                segundos = 0
            }
            roundValue.textContent = `Round ${rounds}/${roundsLimit}`;
            timeValue.textContent = `${minutos}:${segundos>=10?segundos:'0'+segundos}`;
            roundTimer.style.background = `conic-gradient(
                ${COR_INTERVALO_BASE} ${(segundos + minutos*60)*100/(segundoIntervalLimit + minutoIntervalLimit*60) * 3.6}deg, 
                ${COR_INTERVALO_NEUTRA} ${(segundos + minutos * 60) *100/(segundoIntervalLimit + minutoIntervalLimit*60) * 3.6}deg
                )`;
            
            }
        else{
            acabou = true
            document.querySelector('#finished').style.display = 'block'
        }
        
    }
    else{
        
        if(acabou || !noIntervalo){
            document.querySelector('#intervalo-text').style.display = 'none';
        }
        if(rounds > roundsLimit){
            clearInterval(interval)
            acabou =true
            noIntervalo = false 
        }else{
            if(segundos == segundosLimit && minutos == minutoLimit ){
                
                noIntervalo = true
                audio.play()
                segundos = 0
                minutos = 0
            }
            else{
                
                segundos++;
                if(segundos == 60){
                    minutos++
                    segundos = 0
                }
                roundValue.textContent = `Round ${rounds}/${roundsLimit}`;
                timeValue.textContent = `${minutos}:${segundos>=10?segundos:'0'+segundos}`;
                roundTimer.style.background = `conic-gradient(
                    ${COR_ROUND_BASE} ${(segundos + minutos*60)*100/180 * 3.6}deg, 
                    ${COR_ROUND_NEUTRA} ${(segundos + minutos * 60) *100/180 * 3.6}deg
                    )`;
        }
    }
            
    }
}