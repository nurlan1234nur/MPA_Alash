let questions = [];
let currentIndex = 0;
let shuffledIndices = [];

const questionContainer = document.getElementById("question-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
//oorchlolttey
// Fetch questions from JSON file
async function loadQuestions() {
  try {
    const response = await fetch(
      "https://nurlan1234nur.github.io/MPA_Alash/eskendir/eskendir.json"
    );
    const data = await response.json();
    // Convert the object to an array of questions
    questions = Object.values(data);

    // Create and shuffle indices
    shuffledIndices = Array.from({ length: questions.length }, (_, i) => i);
    shuffleArray(shuffledIndices);

    renderQuestion();
  } catch (error) {
    console.error("Error loading questions:", error);
    questionContainer.innerHTML =
      '<p class="error-message">Асуултуудыг ачахад алдаа гарлаа</p>';
  }
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderQuestion() {
  if (currentIndex >= questions.length) {
    questionContainer.innerHTML =
      '<p class="end-message">Бүх бадагууд дууссан!</p>';
    nextBtn.style.display = "none";
    return;
  }

  const questionIndex = shuffledIndices[currentIndex];
  const question = questions[questionIndex];

  // Replace \n with actual newline and split
  const lines = question.replace(/\\n/g, "\n").split("\n");

  questionContainer.innerHTML = `
        <div class="question-box">
            <p class="question-line">${lines[0]}</p>
            <p class="question-line">${lines[1]}</p>
        </div>
    `;

  // Update button states
  prevBtn.style.display = currentIndex > 0 ? "block" : "none";
  nextBtn.style.display =
    currentIndex < questions.length - 1 ? "block" : "none";
}

nextBtn.onclick = () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  }
};

prevBtn.onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
};

backBtn.onclick = () => {
  window.location.href = "../../index.html";
};

// Add keyboard navigation
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  } else if (
    event.key === "ArrowRight" &&
    currentIndex < questions.length - 1
  ) {
    currentIndex++;
    renderQuestion();
  }
});

// Load questions when the page loads
loadQuestions();
