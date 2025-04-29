const menuScreen = document.querySelector('.menu-screen');
const playScreen = document.querySelector('.play-screen');
const colorChoice = document.getElementById('colorSelect');
const difficultyChoice = document.getElementById('difficultySelect');
const startButton = document.getElementById('startBtn');
const square = document.querySelector('.target-square');
const pointsDisplay = document.querySelector('.points');
const timeDisplay = document.querySelector('.time');

let gameSettings = {};
let score = 0;
let remainingTime = 0;
let gameIsRunning = false;
let moveInterval;
let timerTick;
let lastPosX = window.innerWidth / 2;
let lastPosY = window.innerHeight / 2;

startButton.addEventListener('click', (event) => {
    event.stopPropagation();
    let color = colorChoice.value;
    let difficulty = difficultyChoice.value;
    setupGame(color, difficulty);
});

function setupGame(color, difficulty) {
    switch (difficulty) {
        case 'easy':
            gameSettings = { timeLimit: 5, gain: 1, penalty: -1, size: 50, moveRange: 300 };
            break;
        case 'medium':
            gameSettings = { timeLimit: 3, gain: 3, penalty: -3, size: 40, moveRange: 700 };
            break;
        case 'hard':
            gameSettings = { timeLimit: 2, gain: 5, penalty: -5, size: 30, moveRange: 1111 };
            break;
    }

    square.style.backgroundColor = color;
    square.style.width = `${gameSettings.size}px`;
    square.style.height = `${gameSettings.size}px`;

    menuScreen.classList.remove('active');
    playScreen.classList.add('active');

    score = 0;
    gameIsRunning = true;

    teleportSquare();
    resetCountdown();

    square.addEventListener('click', clickOnSquare);
    document.body.addEventListener('click', missedClick);

    timerTick = setInterval(countdown, 1000);
}

function teleportSquare() {
    if (!gameIsRunning) return;

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const figSize = gameSettings.size;
    const maxOffset = gameSettings.moveRange;

    const rangeX = [
        Math.max(0, lastPosX - maxOffset),
        Math.min(screenW - figSize, lastPosX + maxOffset)
    ];

    const rangeY = [
        Math.max(0, lastPosY - maxOffset),
        Math.min(screenH - figSize, lastPosY + maxOffset)
    ];

    const newX = rangeX[0] + Math.random() * (rangeX[1] - rangeX[0]);
    const newY = rangeY[0] + Math.random() * (rangeY[1] - rangeY[0]);

    square.style.left = `${newX}px`;
    square.style.top = `${newY}px`;

    lastPosX = newX;
    lastPosY = newY;

    resetCountdown();
}

function clickOnSquare(event) {
    if (!gameIsRunning) return;
    event.stopPropagation();
    updatePoints(gameSettings.gain);
    teleportSquare();
}

function missedClick() {
    if (!gameIsRunning) return;
    updatePoints(gameSettings.penalty);
}

function updatePoints(amount) {
    score += amount;
    pointsDisplay.textContent = `Бали: ${score}`;
}

function countdown() {
    if (!gameIsRunning) return;
    remainingTime--;
    timeDisplay.textContent = remainingTime;
    if (remainingTime <= 0) {
        endGame();
    }
}

function resetCountdown() {
    remainingTime = gameSettings.timeLimit;
    timeDisplay.textContent = remainingTime;
}

function endGame() {
    gameIsRunning = false;
    clearInterval(timerTick);
    alert(`Game over! Ви отримали: ${score} балів.`);
    location.reload();
}