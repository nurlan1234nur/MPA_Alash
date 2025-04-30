let questions = [];
let usedIndices = new Set();

const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById('back-btn');

// Fetch questions from JSON file
async function loadQuestions() {
    try {
        const response = await fetch('https://nurlan1234nur.github.io/MPA_Alash/eskendir/eskendir.json');
        const data = await response.json();
        // Convert the object to an array of questions
        questions = Object.values(data);
        renderQuestion();
    } catch (error) {
        console.error('Error loading questions:', error);
        questionContainer.innerHTML = '<p class="error-message">Асуултуудыг ачахад алдаа гарлаа</p>';
    }
}

function getRandomQuestion() {
    if (usedIndices.size >= questions.length) {
        return null;
    }
    
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedIndices.has(randomIndex));
    
    usedIndices.add(randomIndex);
    return randomIndex;
}

function renderQuestion() {
    const index = getRandomQuestion();
    if (index === null) {
        questionContainer.innerHTML = '<p class="end-message">Бүх асуултууд дууссан!</p>';
        nextBtn.style.display = 'none';
        return;
    }
    
    const line1 = questions[index];
    const line2 = questions[index + 1] || "";
    questionContainer.innerHTML = `
        <div class="question-box">
            <p class="question-line">${line1}</p>
            <p class="question-line">${line2}</p>
        </div>
    `;
}

nextBtn.onclick = () => {
    renderQuestion();
};

backBtn.onclick = () => {
    window.location.href = "../../index.html";
};

// Hide previous button as we don't need it anymore
prevBtn.style.display = 'none';

// Load questions when the page loads
loadQuestions();
  