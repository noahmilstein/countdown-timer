let running = false;

const timeDisplay = document.querySelector('#time')
const startButton = document.querySelector('#countDownButton')

const keys = document.querySelectorAll('div[data-key]')
const keyCodes =[];

keys.forEach(key => {
  keyCodes.push(key.getAttribute('data-key'))
  key.addEventListener('click', toggleCSS)  
})

startButton.addEventListener("click", startCountDown)

function startCountDown() {
  if (output === '000000') {
    return
  }

  running = !running;
  running ? startButton.value = "Stop Countdown" : startButton.value = "Start Countdown";

  if (!running && timeDisplay.style.color != 'black') {
    timeDisplay.style.color = 'black'
    timeDisplay.style.textShadow = '';
  } else {
    console.log(running)
    console.log("in the method")
    timeDisplay.classList.add('active')
  }

  let t = timeDisplay.innerHTML.replace(/:/g, '');
  let seconds = t.slice(-2)
  let minutes = t.slice(-4, -2);
  let hours = t.slice(-6, -4);

  seconds > 60 ? seconds = 60 : seconds;
  minutes > 60 ? minutes = 59 : minutes;

  secondsRemaining = (hours * 3600) + (minutes * 60) + (seconds * 1)

  if (running === false) {
    timeDisplay.classList.remove('active')
    clearInterval(intervalHandle);
  } else {
    intervalHandle = setInterval(tick, 1000);
  }
}

function tick() {
  if (running && output > 0) {

    secondsRemaining--;
    output--;

    if (secondsRemaining < 1) {
      playAlarm()
      clearInterval(intervalHandle);
      setTimeout(function() {
        timeDisplay.style.color = 'black';
        timeDisplay.style.textShadow = '';
        startCountDown()
      }, 1000)
    } else if (secondsRemaining < 11) {
      timeDisplay.style.color = 'red'
      timeDisplay.style.textShadow = '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
    } else if (secondsRemaining < 31) {
      timeDisplay.style.color = 'yellow'
      timeDisplay.style.textShadow = '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black';
    }

    console.log(secondsRemaining)
    hour = Math.floor(secondsRemaining / 3600)
    min = Math.floor((secondsRemaining - (hour * 3600)) / 60);
    sec = Math.floor((secondsRemaining - (hour * 3600) - (min * 60) ));

    timeDisplay.innerHTML = `${hour < 10 ? '0' + hour.toString(): hour}:${min < 10 ? '0' + min.toString(): min}:${sec < 10 ? '0' + sec.toString(): sec}`
    if (secondsRemaining === 0 || running === false) {
      clearInterval(intervalHandle)
    }
  }
}

function toggleCSS(e) {
  let key
  let code
  let targetValue

  if (e.type === 'keydown') {
    key = document.querySelector(`.key[data-key="${e.keyCode}"]`) 
    code = e.keyCode
    targetValue = e.key.toString()
  } else {
    key = e.currentTarget
    code = parseInt(e.currentTarget.dataset.key)
    targetValue = e.target.textContent.trim()
  }

  key.classList.add('active')
  setTimeout(function() {
    key.classList.remove('active')
  }, 100)  

  if (running === false) {
    if(code === 67) {
      output = '000000';
    } else if (code === 8) {
      output = output.slice(0, -1);
      output = '0' + output
    } else if (keyCodes.includes(code.toString())) {
      output += targetValue
    }
    if (output.length > 6) {
      output = output.slice(1);
    }
    timeDisplay.innerHTML = formatOutput(output)
  }
}

let output = '000000';
window.addEventListener('keydown', function(e) {
  if (keyCodes.includes(e.keyCode.toString()) && !running) {
    toggleCSS(e)
  }
})

function playAlarm() {
  const audio = document.querySelector('audio.alarm')
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
}

function formatOutput(string) {
  const seconds = parseInt(string.slice(-2))
  const minutes = parseInt(string.slice(-4, -2))
  const hours = parseInt(string.slice(-6, -4))
  return `${hours < 10 ? '0' + hours.toString(): hours}:${minutes < 10 ? '0' + minutes.toString(): minutes}:${seconds < 10 ? '0' + seconds.toString(): seconds}`
}
