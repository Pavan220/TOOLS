// BUTTONS
const button = document.querySelectorAll(".btn");
const startBtn = document.querySelector(".btn-1");
// DISPLAY
const millisec = document.querySelector(".millisec");
const sec = document.querySelector(".sec");
const min = document.querySelector(".min");
const hour = document.querySelector(".hour");
//VARIABLES
const data = {
  seconds: 0,
  milli: 0,
  minutes: 0,
  hours: 0,
};

var stopstopWatch;
//STOPWATCH--TIMER--FUNCTION
let { seconds, milli, minutes, hours } = data;
function timer() {
  milli++;
  millisec.textContent = `${milli}`.padStart(2, 0);
  if (milli == 100) {
    seconds++;
    sec.textContent = `${seconds}`.padStart(2, 0);
    milli = 0;
    millisec.textContent = `${milli}`.padStart(2, 0);
  } else if (seconds == 60) {
    minutes++;
    min.textContent = `${minutes}`.padStart(2, 0);
    seconds = 0;
    sec.textContent = `${seconds}`.padStart(2, 0);
  } else if (minutes == 60) {
    hours++;
    hour.textContent = `${hours}`.padStart(2, 0);
    minutes = 0;
    min.textContent = `${minutes}`.padStart(2, 0);
  }
}
//EVENT--HANDELER
for (const btn of button) {
  btn.addEventListener("click", function () {
    //IDENTIFIES THE BUTTON BY ITS CLASS NAME
    //IF START BUTTON IS CLICKED
    if (btn.getAttribute("class").includes("btn-1")) {
      stopWatch = setInterval(timer, 10);
      btn.classList.toggle("clicked");
    }
    //IF STOP BUTTON IS CLICKED
    else if (btn.getAttribute("class").includes("btn-2")) {
      clearInterval(stopWatch);
    }
    // IF RESET BUTTON IS CLICKED
    else if (btn.getAttribute("class").includes("btn-3")) {
      clearInterval(stopWatch);
      startBtn.classList.toggle("clicked"); //THIS WILL REMOVE 'CLICKED' FROM START BUTTON'S CLASS NAME
      let { seconds, milli, minutes, hours } = data;
      millisec.textContent = `${milli}`.padStart(2, 0);
      sec.textContent = `${seconds}`.padStart(2, 0);
      min.textContent = `${minutes}`.padStart(2, 0);
      hour.textContent = `${hours}`.padStart(2, 0);
    }
  });
}
