const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreDisplay = document.getElementById('score');

let gameInterval;
let isAlive = true;
let score = 0;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
});

function jump() {
    if (!dino.classList.contains('jump')) {
        dino.classList.add('jump');
        setTimeout(function() {
            dino.classList.remove('jump');
        }, 300);
    }
}

let highScore = localStorage.getItem('highScore') || 0;

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
}

function gameOver() {
    clearInterval(gameInterval);
    updateHighScore(); 
    alert('GAME OVER!!! Your score: ' + score + '\nHigh Score: ' + highScore);
    score = 0;
    restart();
}

function restart() {
    dino.style.top = '140px';
    cactus.style.left = '500px';

    isAlive = true;
    scoreDisplay.textContent = score; 
    
    gameInterval = setInterval(gameLoop, 10);
}

function gameLoop() {
    if (isAlive) {
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'));

        if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
            isAlive = false;
            gameOver();
        } else {
            score++;
            scoreDisplay.textContent = score;
        }
    }
}

gameInterval = setInterval(gameLoop, 10);
