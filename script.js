let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let intervalId;
const display = document.getElementById("display");
const lapsList = document.getElementById("laps");
const startStopBtn = document.getElementById("startStopBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

function formatTime(time) {
  const hours = String(Math.floor(time / 3600000)).padStart(2, "0");
  const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

function startStop() {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
    startStopBtn.textContent = "Start";
    lapBtn.disabled = true;
    resetBtn.disabled = false;
  } else {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 100);
    isRunning = true;
    startStopBtn.textContent = "Stop";
    lapBtn.disabled = false;
    resetBtn.disabled = true;
  }
}

function lap() {
  const lapTime = document.createElement("li");
  lapTime.textContent = formatTime(elapsedTime);
  lapsList.appendChild(lapTime);
}

function reset() {
  clearInterval(intervalId);
  isRunning = false;
  startTime = 0;
  elapsedTime = 0;
  display.textContent = "00:00:00";
  startStopBtn.textContent = "Start";
  lapBtn.disabled = true;
  resetBtn.disabled = true;
  lapsList.innerHTML = "";
}

// Event listeners
startStopBtn.addEventListener("click", startStop);
lapBtn.addEventListener("click", lap);
resetBtn.addEventListener("click", reset);
