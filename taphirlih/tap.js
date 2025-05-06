let words = [];
let usedWords = new Set();
let timerInterval;
let timeLeft = 30;

// DOM elements
const wordDisplay = document.getElementById('word-display');
const timerDisplay = document.getElementById('timer');
const taskDisplay = document.getElementById('task');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');

// Load words from JSON file
async function loadWords() {
    try {
        const response = await fetch('tap.json');
        const data = await response.json();
        words = Object.values(data);
    } catch (error) {
        console.error('Error loading words:', error);
    }
}

// Get random word that hasn't been used
function getRandomWord() {
    if (usedWords.size === words.length) {
        usedWords.clear(); // Reset if all words have been used
    }
    
    let availableWords = words.filter(word => !usedWords.has(word));
    let randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    usedWords.add(randomWord);
    return randomWord;
}

// Stop the game
function stopGame() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    wordDisplay.textContent = '';
    taskDisplay.textContent = '';
    timeLeft = 30;
    timerDisplay.textContent = timeLeft;
}

// Update timer display
function updateTimer() {
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        stopGame();
    }
}

// Start game
function startGame() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timeLeft = 30;
    updateTimer();
    
    const word = getRandomWord();
    wordDisplay.textContent = word;
    taskDisplay.textContent = 'Осы сөз кіріскен мақал жаз';
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
    }, 1000);
}

// Initialize
async function init() {
    await loadWords();
    startBtn.addEventListener('click', startGame);
    stopBtn.addEventListener('click', stopGame);
}

init(); 