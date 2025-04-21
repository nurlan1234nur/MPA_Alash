const words = [
    { en: "apple", mn: "алим" },
    { en: "sun", mn: "нар" },
    { en: "water", mn: "ус" },
    { en: "book", mn: "ном" },
    { en: "computer", mn: "компьютер" },
    // нэмж оруулж болно
  ];
  
  let currentIndex = 0;
  let showEnglish = Math.random() < 0.5;
  
  const questionText = document.getElementById("question-text");
  const answerInput = document.getElementById("answer-input");
  const result = document.getElementById("result");
  const checkBtn = document.getElementById("check-btn");
  const nextBtn = document.getElementById("next-btn");
  const backBtn = document.getElementById("back-btn");
  
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  const shuffledWords = shuffle(words);
  
  function showQuestion() {
    const word = shuffledWords[currentIndex];
    showEnglish = Math.random() < 0.5;
    result.textContent = "";
    answerInput.value = "";
  
    if (showEnglish) {
      questionText.textContent = `Translate to Mongolian: ${word.en}`;
    } else {
      questionText.textContent = `Translate to English: ${word.mn}`;
    }
  }
  
  checkBtn.onclick = () => {
    const word = shuffledWords[currentIndex];
    const answer = answerInput.value.trim().toLowerCase();
  
    const correct = showEnglish ? word.mn.toLowerCase() : word.en.toLowerCase();
  
    if (answer === correct) {
      result.textContent = "Зөв!";
      result.style.color = "green";
    } else {
      result.textContent = `Буруу! Зөв хариулт: ${correct}`;
      result.style.color = "red";
    }
  };
  
  nextBtn.onclick = () => {
    if (currentIndex < shuffledWords.length - 1) {
      currentIndex++;
      showQuestion();
    } else {
      alert("Бүх үгс дууслаа!");
    }
  };
  
  backBtn.onclick = () => {
    window.location.href = "../../index.html";
  };
  
  showQuestion();
  