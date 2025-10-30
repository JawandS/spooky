// Halloween Interactive Elements

// Bat cursor trail effect
let batTrailEnabled = true;

document.addEventListener('mousemove', (e) => {
    if (!batTrailEnabled || Math.random() > 0.1) return;

    const bat = document.createElement('div');
    bat.className = 'bat';
    bat.innerHTML = '🦇';
    bat.style.left = e.clientX + 'px';
    bat.style.top = e.clientY + 'px';
    document.body.appendChild(bat);

    setTimeout(() => {
        bat.remove();
    }, 2000);
});

// Enter button - show game section
const enterBtn = document.getElementById('enter-btn');
const gameSection = document.getElementById('game-section');
const backBtn = document.getElementById('back-btn');

enterBtn.addEventListener('click', () => {
    gameSection.classList.remove('hidden');
    gameSection.scrollIntoView({ behavior: 'smooth' });
    batTrailEnabled = false; // Disable bat trail during game
});

backBtn.addEventListener('click', () => {
    gameSection.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    batTrailEnabled = true;
});

// Pumpkin Catching Game
let score = 0;
let timeLeft = 30;
let gameActive = false;
let gameInterval;
let timerInterval;
let pumpkinInterval;

const startGameBtn = document.getElementById('start-game');
const gameArea = document.getElementById('game-area');
const gameStatus = document.getElementById('game-status');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

startGameBtn.addEventListener('click', startGame);

function startGame() {
    score = 0;
    timeLeft = 30;
    gameActive = true;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    gameStatus.style.display = 'none';

    // Start timer
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    // Spawn pumpkins
    pumpkinInterval = setInterval(spawnPumpkin, 800);
}

function spawnPumpkin() {
    if (!gameActive) return;

    const pumpkin = document.createElement('div');
    pumpkin.className = 'pumpkin';
    pumpkin.innerHTML = '🎃';

    // Random position within game area
    const maxX = gameArea.clientWidth - 60;
    const maxY = gameArea.clientHeight - 60;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    pumpkin.style.left = randomX + 'px';
    pumpkin.style.top = randomY + 'px';

    gameArea.appendChild(pumpkin);

    // Click handler
    pumpkin.addEventListener('click', () => {
        if (gameActive) {
            score++;
            scoreDisplay.textContent = score;
            pumpkin.style.transform = 'scale(1.5) rotate(360deg)';
            setTimeout(() => pumpkin.remove(), 200);

            // Play pop sound effect (visual feedback)
            pumpkin.innerHTML = '💥';
        }
    });

    // Remove pumpkin after 2 seconds
    setTimeout(() => {
        if (pumpkin.parentElement) {
            pumpkin.style.opacity = '0';
            setTimeout(() => pumpkin.remove(), 300);
        }
    }, 2000);
}

function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    clearInterval(pumpkinInterval);

    // Remove all pumpkins
    document.querySelectorAll('.pumpkin').forEach(p => p.remove());

    // Show game over message
    gameStatus.style.display = 'flex';
    gameStatus.innerHTML = `
        <div class="text-center bg-gray-800 p-8 rounded-lg border-4 border-orange-500">
            <h3 class="text-4xl font-bold mb-4 text-orange-400">Game Over!</h3>
            <p class="text-2xl mb-4">Final Score: <span class="text-green-400 font-bold">${score}</span></p>
            <p class="text-xl mb-6">${getScoreMessage(score)}</p>
            <button id="restart-game" class="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-xl font-bold transform hover:scale-110 transition-all duration-300 cursor-pointer">
                Play Again
            </button>
        </div>
    `;

    document.getElementById('restart-game').addEventListener('click', startGame);
}

function getScoreMessage(score) {
    if (score >= 40) return "🎃 Pumpkin Master! Amazing! 🎃";
    if (score >= 30) return "👻 Spooktacular! Great job! 👻";
    if (score >= 20) return "🦇 Not bad! Keep practicing! 🦇";
    if (score >= 10) return "🕷️ Good effort! Try again! 🕷️";
    return "💀 Better luck next time! 💀";
}

// Spooky sound effects on card hover
document.querySelectorAll('.spooky-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05) rotate(2deg)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add flickering effect to title
const title = document.querySelector('.spooky-title');
setInterval(() => {
    if (Math.random() > 0.95) {
        title.style.opacity = '0.5';
        setTimeout(() => {
            title.style.opacity = '1';
        }, 100);
    }
}, 1000);

// Random floating pumpkins in background - Optimized with image
function createFloatingPumpkin() {
    const pumpkin = document.createElement('div');
    pumpkin.className = 'floating-pumpkin';

    const img = document.createElement('img');
    img.src = '/static/pumpkin.png';
    img.alt = 'pumpkin';
    pumpkin.appendChild(img);

    pumpkin.style.left = Math.random() * window.innerWidth + 'px';
    pumpkin.style.top = window.innerHeight + 'px';

    document.body.appendChild(pumpkin);

    // Use requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
        pumpkin.style.transform = `translateY(-${window.innerHeight + 100}px) rotate(360deg)`;
        pumpkin.style.opacity = '0';
    });

    // Remove after animation completes
    setTimeout(() => {
        pumpkin.remove();
    }, 5000);
}

// Create floating pumpkins periodically - 10x more pumpkins!
setInterval(createFloatingPumpkin, 300);

// Add spooky greeting
console.log(`
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⣠⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣄⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀
    ⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀⠀
    ⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀
    ⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀
    ⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀
    ⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
    ⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
    ⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇
    ⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠀
    ⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀
    ⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀
    ⠀⠀⠀⠀⠀⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠋⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠛⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠛⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀

    🎃 HAPPY HALLOWEEN! 🎃
    Welcome to the Spooky Website!
    Enjoy the haunted experience... if you dare! 👻
`);
