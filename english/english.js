let words = [];
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// HTML elements
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const finishBtn = document.getElementById("finish-btn");
const scoreText = document.getElementById("score-text");

async function loadWords() {
  const response = await fetch('english.json');
  const data = await response.json();
  words = data;
  generateQuestions();
  loadQuestion();
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generateQuestions() {
  questions = words.map(word => {
    const askEnglish = Math.random() < 0.5;
    const question = askEnglish ? word.english : word.mongolian;
    const correctAnswer = askEnglish ? word.mongolian : word.english;

    let choices = [correctAnswer];
    let pool = words.filter(w => (askEnglish ? w.mongolian !== correctAnswer : w.english !== correctAnswer));

    shuffleArray(pool);

    while (choices.length < 4 && pool.length > 0) {
      const choice = askEnglish ? pool.pop().mongolian : pool.pop().english;
      choices.push(choice);
    }

    choices = shuffleArray(choices);

    return {
      question: question,
      correctAnswer: correctAnswer,
      choices: choices,
      askEnglish: askEnglish,
      selected: null
    };
  });

  shuffleArray(questions); // Shuffle questions overall
}

function loadQuestion() {
  const q = questions[currentQuestionIndex];
  questionText.textContent = `What is the ${q.askEnglish ? "Mongolian" : "English"} for: "${q.question}"?`;

  optionsContainer.innerHTML = "";
  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = choice;
    btn.onclick = () => selectAnswer(choice, btn);
    if (q.selected) {
      btn.disabled = true;
      if (choice === q.correctAnswer) {
        btn.classList.add("correct");
      } else if (choice === q.selected) {
        btn.classList.add("wrong");
      }
    }
    optionsContainer.appendChild(btn);
  });

  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.disabled = currentQuestionIndex === questions.length - 1;
}

function selectAnswer(selected, btn) {
  const q = questions[currentQuestionIndex];
  if (q.selected) return; // Already answered

  q.selected = selected;

  Array.from(optionsContainer.children).forEach(button => {
    button.disabled = true;
    if (button.textContent === q.correctAnswer) {
      button.classList.add("correct");
    }
    if (button.textContent === selected && selected !== q.correctAnswer) {
      button.classList.add("wrong");
    }
  });

  if (selected === q.correctAnswer) {
    score++;
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
});

// Add keyboard navigation
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  } else if (event.key === 'ArrowRight' && currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  }
});

finishBtn.addEventListener("click", () => {
  questionText.textContent = "Quiz Completed!";
  optionsContainer.innerHTML = "";
  nextBtn.style.display = "none";
  prevBtn.style.display = "none";
  finishBtn.style.display = "none";
  scoreText.textContent = `Your score: ${score}/${questions.length}`;
});

loadWords();
