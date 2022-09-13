const start = document.getElementById("start");
const screens = document.getElementsByClassName("screen");
const timeList = document.getElementById("time-list");
const timeEl = document.getElementById("time");
const board = document.getElementById("board");
const colors = [
  "#e05858",
  "#f3f047",
  "#25b12c",
  "#4bd0d4",
  "#4547a7",
  "#9c45a7",
  "#972058",
];
let intervalId = null;
let time = 0;
let score = 0;

start.addEventListener("click", (e) => {
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-btn")) {
    time = parseInt(e.target.dataset.time);
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (e) => {
  if (e.target.classList.contains("circle")) {
    score++;
    e.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  intervalId = setInterval(decreaseTime, 1000);
  createRandomCircle();
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    setTime(--time);
  }
}

function setTime(time) {
  let min = 0;
  let sec = 0;
  if (time > 59) {
    min = Math.floor(time / 60);
    sec = time % 60;
    if (sec < 10) {
      sec = `0${sec}`;
    }
  } else if (time < 10) {
    sec = `0${time}`;
  } else {
    min = 0;
    sec = time;
  }
  timeEl.innerHTML = `0${min}:${sec}`;
}

function finishGame() {
  clearInterval(intervalId);
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `
    <h1 style="margin: 0"><span class="primary">Cчет:</span> ${score}</h1>
    `;
  // <button class="start" id="retry">Начать заново</button>
  // const retry = document.getElementById("retry");
  // retry.addEventListener("click", retryGame);
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 40);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const color = colors[Math.floor(Math.random() * colors.length)];

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = `${color}`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// function retryGame() {
//   removeEventListener("click", retryGame);
//   screens[1].classList.remove("up");
// }
