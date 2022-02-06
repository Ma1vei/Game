let start = document.querySelector('.btn');
let game = document.querySelector('.game');
let time = document.querySelector('#time');
let result = document.querySelector('#result');
let timeH1 = document.querySelector('#time-header');
let resultH1 = document.querySelector('#result-header');
let inputTime = document.querySelector('#game-time');
let isGameActive = false;
let score = 0;

function getRandom(min, max) {
    return (Math.floor(Math.random() * (max - min) + min)) 
}

function gameBoxClick(event) {
    if (event.target.classList.contains('box')) {
        score++;
        renderBox();
    }
    if(!isGameActive) {
        return;
    }
}

function renderBox() {
    let randomSize = getRandom(30, 100);
    let maxDelta = 300 - randomSize;
    let randomTop = getRandom(30, maxDelta);
    let randomLeft = getRandom(30, maxDelta);
    game.innerHTML = '';
    let cube = document.createElement('div');
    cube.classList.add('box');
    cube.style.width = `${randomSize}px`;
    cube.style.height = `${randomSize}px`;
    cube.style.top = `${randomTop}px`;
    cube.style.left = `${randomLeft}px`;
    game.appendChild(cube);
}

function endGame(){
    isGameActive = false;
    game.innerHTML = '';
    start.classList.remove('hide');
    game.style.backgroundColor = '#ccc';
    timeH1.classList.add('hide');
    resultH1.classList.remove('hide');
    result.innerText = score;
    inputTime.removeAttribute('disabled');
}

start.addEventListener('click', (startGame) => {
    score = 0;
    timeH1.classList.remove('hide');
    resultH1.classList.add('hide');
    time.innerText = inputTime.value;
    inputTime.setAttribute('disabled', 'true;');
    isGameActive = true;
    let interval = setInterval(function() {
        let currentTime = Number(time.innerText);
        if(currentTime <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            time.innerText = (currentTime - 0.1).toFixed(1);
        }
    },100);
    start.classList.add('hide');
    game.style.backgroundColor = 'white';
    renderBox();
});

inputTime.addEventListener('change', (change) => {
    time.innerText = inputTime.value;
    resultH1.classList.add('hide');
    timeH1.classList.remove('hide');
});

game.addEventListener('click', (event) => {
    gameBoxClick(event);
});

