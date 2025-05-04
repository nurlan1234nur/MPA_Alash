let sayings = [];
let currentIndex = 0;
let shuffledIndices = [];

const questionContainer = document.getElementById("question-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");

// Fetch sayings from JSON file
async function loadSayings() {
  try {
    const response = await fetch("alash.json");
    const data = await response.json();
    // Convert the object to an array of sayings
    sayings = Object.values(data);

    // Create and shuffle indices
    shuffledIndices = Array.from({ length: sayings.length }, (_, i) => i);
    shuffleArray(shuffledIndices);

    renderSaying();
  } catch (error) {
    console.error("Error loading sayings:", error);
    questionContainer.innerHTML = '<p class="error-message">Өгүүлбрүүдийг ачахад алдаа гарлаа</p>';
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

function renderSaying() {
  if (currentIndex >= sayings.length) {
    questionContainer.innerHTML = '<p class="end-message">Бүх өгүүлбрүүд дууссан!</p>';
    nextBtn.style.display = "none";
    return;
  }

  const sayingIndex = shuffledIndices[currentIndex];
  const saying = sayings[sayingIndex];

  // Split the saying at : or - or , and show the first part as question
  const parts = saying.split(/[:—,]/);
  const question = parts[0].trim();
  const answer = parts.slice(1).join(":").trim();

  questionContainer.innerHTML = `
    <div class="question-box">
      <p class="question-line">${question}</p>
      <p class="answer-line" style="display: none">${answer}</p>
      <button class="show-answer-btn" onclick="toggleAnswer()">Хариуг үзэх</button>
    </div>
  `;

  // Update button states
  prevBtn.style.display = currentIndex > 0 ? "block" : "none";
  nextBtn.style.display = currentIndex < sayings.length - 1 ? "block" : "none";
}

function toggleAnswer() {
  const answerLine = document.querySelector(".answer-line");
  const showAnswerBtn = document.querySelector(".show-answer-btn");
  
  if (answerLine.style.display === "none") {
    answerLine.style.display = "block";
    showAnswerBtn.textContent = "Хариуг нуух";
  } else {
    answerLine.style.display = "none";
    showAnswerBtn.textContent = "Хариуг үзэх";
  }
}

nextBtn.onclick = () => {
  if (currentIndex < sayings.length - 1) {
    currentIndex++;
    renderSaying();
  }
};

prevBtn.onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderSaying();
  }
};

backBtn.onclick = () => {
  window.location.href = "../../index.html";
};

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    } else if (e.key === 'Enter') {
        // Toggle answer visibility when Enter is pressed
        const answerLines = document.querySelectorAll('.answer-line');
        answerLines.forEach(line => {
            line.style.display = line.style.display === 'none' ? 'block' : 'none';
        });
    }
});

// Load sayings when the page loads
loadSayings();
  