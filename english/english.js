let words = [];
let currentWordIndex = 0;

// HTML elements
const questionText = document.getElementById("question-text");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const answerBox = document.getElementById("answer-box");
const correctAnswerText = document.getElementById("correct-answer");
const showAnswerBtn = document.getElementById("show-answer-btn");

async function loadWords() {
  try {
    const response = await fetch('english.json');
    const data = await response.json();
    words = data;
    shuffleWords();
    loadWord();
  } catch (error) {
    console.error('Error loading words:', error);
  }
}

function shuffleWords() {
  words = words.sort(() => Math.random() - 0.5);
}

function loadWord() {
  const word = words[currentWordIndex];
  const askEnglish = Math.random() < 0.5;
  
  questionText.textContent = askEnglish ? 
    `What is the Mongolian for: "${word.english}"?` :
    `What is the English for: "${word.mongolian}"?`;
  
  correctAnswerText.textContent = askEnglish ? word.mongolian : word.english;
  answerBox.classList.add("hidden");
  showAnswerBtn.textContent = "Хариултыг нээх (Enter)";

  prevBtn.disabled = currentWordIndex === 0;
  nextBtn.disabled = currentWordIndex === words.length - 1;
}

function toggleAnswer() {
  answerBox.classList.toggle("hidden");
  showAnswerBtn.textContent = answerBox.classList.contains("hidden") ? 
    "Хариултыг нээх (Enter)" : 
    "Хариултыг нуух (Enter)";
}

function nextWord() {
  if (currentWordIndex < words.length - 1) {
    currentWordIndex++;
    loadWord();
  }
}

function prevWord() {
  if (currentWordIndex > 0) {
    currentWordIndex--;
    loadWord();
  }
}

// Button event listeners
nextBtn.addEventListener("click", nextWord);
prevBtn.addEventListener("click", prevWord);
showAnswerBtn.addEventListener("click", toggleAnswer);

// Keyboard event listener
document.addEventListener('keydown', (event) => {
  switch(event.key) {
    case 'ArrowLeft':
      prevWord();
      break;
    case 'ArrowRight':
      nextWord();
      break;
    case 'Enter':
      toggleAnswer();
      break;
  }
});

loadWords();
