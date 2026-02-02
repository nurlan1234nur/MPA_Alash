async function loadQuestions() {
  try {
    const res = await fetch("./eskendir.json"); // ✅ ЗӨВ
    const data = await res.json();

    oddLines = Object.entries(data)
      .filter(([key]) => Number(key) % 2 === 1)
      .map(([, value]) => value);

    resetShuffle();
    renderLine();
  } catch (err) {
    console.error("Fetch error:", err);
    questionContainer.innerHTML = "JSON ачаалж чадсангүй";
  }
}

function resetShuffle() {
  shuffledIndices = Array.from(
    { length: oddLines.length },
    (_, i) => i
  );
  shuffleArray(shuffledIndices);
  currentIndex = 0;
}

// Fisher-Yates shuffle
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function renderLine() {
  // 🧠 БҮХ МӨР ДУУССАН → ДАХИН RANDOM
  if (currentIndex >= shuffledIndices.length) {
    resetShuffle();
  }

  const lineIndex = shuffledIndices[currentIndex];
  const text = oddLines[lineIndex];

  questionContainer.innerHTML = `
    <div class="question-box">
      <pre>${text.replace(/\\n/g, "\n")}</pre>
      <p style="opacity:.6; margin-top:10px;">
        (${currentIndex + 1} / ${oddLines.length})
      </p>
    </div>
  `;
}

nextBtn.onclick = () => {
  currentIndex++;
  renderLine();
};

// keyboard → →
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    currentIndex++;
    renderLine();
  }
});

loadQuestions();
