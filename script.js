let restSeconds = 0;
let seconds = 0;
let interval = "";
let toggle = 0;
let sound = new Audio('sounds/Computer_Magic-Microsift-1901299923.wav')

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector("#pomodoro").onchange=function(){init();}
    document.querySelector("#start").onclick=startTimer;
    document.querySelector("#pause").onclick=stopTimer;
    document.querySelector("#stop").onclick=function () {stopTimer(); init();};
}, false);

function init() {
    seconds = document.getElementById("pomodoro").value * 60;
    restSeconds = document.getElementById("rest").value * 60;
    updateTimer(document.getElementById("pomodoro").value,00);
}

function updateTimer(remMinutes, remSeconds) {
    if (remSeconds < 10) {
        remSeconds = `0${remSeconds}`
    }
    timer = document.getElementById(`time`);
    timer.innerHTML = `${remMinutes}:${remSeconds}`
}

function startTimer() {
    document.getElementById(`start`).disabled = true;
    document.getElementById(`stop`).disabled = false;
    document.getElementById(`pause`).disabled = false;
    document.getElementById(`pomodoro`).disabled = true;
    document.getElementById(`rest`).disabled = true;
    clearInterval(interval)
    if (toggle == 0) {
        sound.play();
        document.body.style.background = "url('images/abundance-agriculture-fresh-healthy-533280.jpg')";
        document.body.style.backgroundSize = "cover"
        document.body.style.backgroundPosition = "center"
        interval = setInterval(pomodorotimer, 1000); 
    } else if (toggle == 1) {
        sound.play();
        document.body.style.background = "url('images/beach-calm-clouds-idyllic-457882.jpg')";
        document.body.style.backgroundSize = "cover"
        document.body.style.backgroundPosition = "center"
        interval = setInterval(restTimer, 1000); 
    }   

}

function pomodorotimer() {
    if (seconds < 0) {
        toggle = 1;
        clearInterval(interval);
        init();
        startTimer()
    } else {
        let remainingMinutes = Math.floor(seconds / 60);
        let remainingSeconds = seconds % 60;
        updateTimer(remainingMinutes, remainingSeconds);
        seconds = seconds - 1;
    }
    
}

function restTimer() {
    if (restSeconds < 0) {
        toggle = 0;
        clearInterval(interval);
        init();
        startTimer();
    } else {
        let remainingMinutes = Math.floor(restSeconds / 60);
        let remainingSeconds = restSeconds % 60;
        updateTimer(remainingMinutes, remainingSeconds);
        restSeconds = restSeconds - 1;
    }
    
}

function stopTimer() {
    clearInterval(interval);
    toggle = 0;
    document.getElementById(`start`).disabled = false;
    document.getElementById(`stop`).disabled = true;
    document.getElementById(`pomodoro`).disabled = false;
    document.getElementById(`rest`).disabled = false;
    document.getElementById(`pause`).disabled = true;
  
}

init();