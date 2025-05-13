const boardEl = document.querySelector(".board");
const restartBtn = document.querySelector(".restart");
const nextBtn = document.querySelector(".next");
const targetDisplay = document.querySelector(".target");
const counterDisplay = document.querySelector(".counter");
const timeDisplay = document.querySelector(".time");

const boardSize = 5;
let puzzles = [];
let current = 0;
let startState = [];
let steps = 0;
let lastTap = null;
let seconds = 0;
let timer = null;
let cells = [];

function render(state) {
  boardEl.innerHTML = "";
  cells = [];

  for (let row = 0; row < boardSize; row++) {
    cells[row] = [];
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement("button");
      cell.classList.add("tile");
      if (state[row][col]) cell.classList.add("active");
      cell.dataset.x = col;
      cell.dataset.y = row;
      cell.addEventListener("click", handleClick);
      boardEl.appendChild(cell);
      cells[row][col] = cell;
    }
  }
}

function resetGame() {
  render(startState.map(r => [...r]));
  steps = 0;
  lastTap = null;
  updateCounter();
  seconds = 0;
  clearInterval(timer);
  timer = setInterval(tickTime, 1000);
}

function updateCounter() {
  counterDisplay.textContent = steps;
}

function load(index) {
  clearInterval(timer);
  seconds = 0;
  timer = setInterval(tickTime, 1000);

  current = index % puzzles.length;
  const data = puzzles[current];

  startState = data.matrix.map(r => [...r]);
  targetDisplay.textContent = data.minMoves;
  steps = 0;
  updateCounter();
  render(startState);
}

function tickTime() {
  seconds++;
  const min = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');
  timeDisplay.textContent = `${min}:${sec}`;
}

function toggle(y, x) {
  if (y >= 0 && y < boardSize && x >= 0 && x < boardSize) {
    cells[y][x].classList.toggle("active");
  }
}

function handleClick(e) {
  const x = +e.target.dataset.x;
  const y = +e.target.dataset.y;

  toggle(y, x);
  toggle(y - 1, x);
  toggle(y + 1, x);
  toggle(y, x - 1);
  toggle(y, x + 1);

  if (lastTap && lastTap.x === x && lastTap.y === y) {
    steps = Math.max(0, steps - 1);
    lastTap = null;
  } else {
    steps++;
    lastTap = { x, y };
  }

  updateCounter();
  verifyWin();
}

function verifyWin() {
  const cleared = cells.every(row =>
    row.every(tile => !tile.classList.contains("active"))
  );
  if (cleared) {
    clearInterval(timer);
    setTimeout(() => {
      alert(`You cleared the board in ${steps} moves and ${timeDisplay.textContent}!`);
    }, 100);
  }
}

function fetchData() {
  fetch("index.json")
    .then(r => r.json())
    .then(data => {
      puzzles = data;
      load(0);
    });
}

nextBtn.addEventListener("click", () => load(current + 1));
restartBtn.addEventListener("click", resetGame);

fetchData();
