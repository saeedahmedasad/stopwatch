cnano = 0;
cmin = 0;
csec = 0;
chour = 0;
randomNumber = 0;
state = "start";
const title = document.querySelector("#title");
const watchText = document.querySelector("#watch_text");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
let colors = [
  "red",
  "green",
  "blue",
  "palevioletred",
  "indigo",
  "brown",
  "yellow",
  "#222",
];
watchText.innerText = "00:00:00:00";
function stopWatchStart() {
  startBtn.innerText = "STOP";
  if (state == "start") {
    watchText.classList.add("moveHereThere");
    state = "stop";
    timerStart();
  } else if (state == "stop") {
    watchText.classList.remove("moveHereThere");
    state = "start";
    startBtn.innerHTML = "START";
    clearInterval(timer);
  }
}
function timerStart() {
  timer = setInterval(() => {
    cnano += 1;
    if (cnano % 100 == 99) {
      randomNumber += 1;
      randomNumber = randomNumber % colors.length;
      console.log(randomNumber);
      title.style.color = colors[randomNumber];
      csec = csec + 1;
    }
    if (csec > 59) {
      csec = csec % 60;
    }
    cmin = Math.floor(cnano / 6000);
    chour = Math.floor(cnano / 360000);
    if (chour < 10) {
      chour = `0${chour}`;
    }
    if (cmin < 10) {
      cmin = `0${cmin}`;
    }

    if (csec < 10) {
      watchText.innerHTML = `${chour}:${cmin}:0${csec}:${Math.floor(
        cnano % 100
      )}`;
    } else {
      watchText.innerHTML = `${chour}:${cmin}:${csec}:${Math.floor(
        cnano % 100
      )}`;
    }
  }, 10);
}
stopBtn.addEventListener("click", () => {
  clearInterval(timer);
  cmin = 0;
  csec = 0;
  chour = 0;
  watchText.innerText = "00:00:00:00";
  state = "start";
  startBtn.innerText = "START";
});

//! FOR THE TIMER
const inputHour = document.querySelector("#input_hour");
const inputMinute = document.querySelector("#input_minute");
const inputSecond = document.querySelector("#input_second");
const inputDisplayEl = document.querySelector(".inputs");
const timerStartBtn = document.querySelector("#start_timer");
const timerDisplay = document.querySelector(".timer_display");
const progressBar = document.querySelector(".progress_bar");
const timerStopBtn = document.querySelector("#stop_timer");
const progressBarElement = document.querySelector(".progress_bar_element");
timerStopBtn.addEventListener("click", () => {
  timerDisplay.innerText = "00:00:00";
  clearInterval(secondTimer);
  timerState = "start";
  timerStartBtn.innerText = "START";
  inputDisplayEl.style.display = "block";
  timerDisplay.style.display = "none";
  requireValues = true;
});
let timerState = "start";
timerStartBtn.addEventListener("click", () => {
  if (timerState == "start") {
    timerState = "stop";
    timerStartBtn.innerText = "STOP";
    timerFunc();
  } else if (timerState == "stop") {
    timerStartBtn.innerText = "START";
    timerState = "start";
    clearInterval(secondTimer);
  }
});
let requireValues = true;
function timerFunc() {
  if (requireValues) {
    timerHour = +inputHour.value;
    timerMinute = +inputMinute.value;
    timerSecond = +inputSecond.value;
    tsec = timerHour * 3600 + timerMinute * 60 + timerSecond;
    tmin = 0;
    thour = 0;
    totalTimeSelected = tsec;
  }
  requireValues = false;
  //Displaying the timer on the screen
  inputDisplayEl.style.display = "none";
  timerDisplay.style.display = "block";
  if (tsec != 0) {
    secondTimer = setInterval(() => {
      progressBarElement.style.display = "block";
      let progress = Math.floor((tsec / totalTimeSelected) * 100);
      progressBar.style.width = progress + "%";
      if (progress < 30) {
        progressBar.style.background = "red";
      } else if (progress < 50) {
        progressBar.style.background = "orange";
      } else {
        progressBar.style.background = "green";
      }
      tsec -= 1;
      tmin = Math.floor(tsec / 60);
      tmin = tmin % 60;
      console.log(tmin);
      if (tmin < 10) {
        tmin = "0" + tmin;
      }
      thour = Math.floor(tsec / 3600);
      if (thour < 10) {
        thour = `0${thour}`;
      }
      if (tsec % 60 < 10) {
        timerDisplay.innerHTML = `${thour}:${tmin}:0${Math.floor(tsec % 60)}`;
      } else {
        timerDisplay.innerHTML = `${thour}:${tmin}:${Math.floor(tsec % 60)}`;
      }
      // When timer hits ZERO
      if (tsec == 0) {
        timerState = "start";
        timerStartBtn.innerText = "START";
        requireValues = true;
        clearInterval(secondTimer);
        timerDisplay.innerHTML = `00:00:00`;
        progressBar.style.width = "0%";
        setTimeout(() => {
          inputDisplayEl.style.display = "block";
          timerDisplay.style.display = "none";
        }, 2000);
        inputHour.value = "";
        inputMinute.value = "";
        inputSecond.value = "";
        setTimeout(() => {
          progressBarElement.style.display = "none";
        }, 1000);
      }
    }, 1000);
  } else {
    timerState = "start";
    timerStartBtn.innerText = "START";
    inputDisplayEl.style.display = "block";
    timerDisplay.style.display = "none";
    requireValues = true;
  }
}
