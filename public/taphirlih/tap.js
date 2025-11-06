let words = [];
let usedWords = new Set();
let timerInterval;
let timeLeft = 30;
let proverbs = {};

// DOM elements
const wordDisplay = document.getElementById('word-display');
const timerDisplay = document.getElementById('timer');
const taskDisplay = document.getElementById('task');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const nextBtn = document.getElementById('next-btn');
const showProverbsBtn = document.getElementById('show-proverbs-btn');
const proverbsList = document.getElementById('proverbs-list');

// Load words and proverbs from JSON files
async function loadData() {
    try {
        const [wordsResponse, proverbsResponse] = await Promise.all([
            fetch('tap.json'),
            fetch('tap_answer.json')
        ]);
        const wordsData = await wordsResponse.json();
        const proverbsData = await proverbsResponse.json();
        
        words = Object.values(wordsData);
        proverbs = proverbsData;
    } catch (error) {
        console.error('Error loading data:', error);
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

// Find proverbs containing the word
function findProverbsWithWord(word) {
    const foundProverbs = [];
    for (const [id, proverb] of Object.entries(proverbs)) {
        // Split the word into parts to handle compound words
        const wordParts = word.split(' ');
        // Check if any part of the word is in the proverb
        if (wordParts.some(part => proverb.toLowerCase().includes(part.toLowerCase()))) {
            foundProverbs.push(proverb);
        }
    }
    return foundProverbs;
}

// Show proverbs containing the current word
function showProverbs() {
    const currentWord = wordDisplay.textContent.split(' ')[0]; // Get only the word part
    const foundProverbs = findProverbsWithWord(currentWord);
    
    proverbsList.innerHTML = '';
    if (foundProverbs.length > 0) {
        foundProverbs.forEach(proverb => {
            const li = document.createElement('li');
            li.textContent = proverb;
            proverbsList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'Энэ үгтэй мақал олдсонгүй';
        proverbsList.appendChild(li);
    }
    proverbsList.classList.remove('hidden');
}

// Update timer display
function updateTimer() {
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        startBtn.disabled = false;
        stopBtn.disabled = true;
        wordDisplay.textContent = '';
        taskDisplay.textContent = '';
        proverbsList.classList.add('hidden');
    }
}

// Start game
function startGame() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    nextBtn.disabled = true;
    timeLeft = 30;
    updateTimer();
    
    const word = getRandomWord();
    wordDisplay.textContent = `${word} сөзі кіріскен мақал жазыңыз`;
    proverbsList.classList.add('hidden');
    
    startBtn.textContent = 'Дахин эхлэх';
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
    }, 1000);
}

// Stop game
function stopGame() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    nextBtn.disabled = false;
    timeLeft = 0;
    timerDisplay.textContent = timeLeft;
    taskDisplay.textContent = 'Зогссон';
}

// Show next word
function showNextWord() {
    const word = getRandomWord();
    wordDisplay.textContent = `${word} сөзі кіріскен мақал жазыңыз`;
    taskDisplay.textContent = "Сәттілік!";
    proverbsList.classList.add('hidden');
    nextBtn.disabled = true;
    stopBtn.disabled = false;
    
    timeLeft = 30;
    updateTimer();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
    }, 1000);
}

// Initialize
async function init() {
    await loadData();
    startBtn.addEventListener('click', startGame);
    stopBtn.addEventListener('click', stopGame);
    nextBtn.addEventListener('click', showNextWord);
    showProverbsBtn.addEventListener('click', showProverbs);
}

init(); 