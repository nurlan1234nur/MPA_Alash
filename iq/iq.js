const questions = [
    { 
      question: "2 + 2 х 2 = ?", 
      options: [4, 6, 8, 10], 
      correctAnswer: 6 
    },
    { 
      question: "3 x 5 = ?", 
      options: [10, 12, 15, 18], 
      correctAnswer: 15 
    },
    { 
      question: "12 ÷ 4 = ?", 
      options: [3, 4, 5, 6], 
      correctAnswer: 3 
    },
    { 
      question: "5 + 3 = ?", 
      options: [6, 7, 8, 9], 
      correctAnswer: 8 
    },
    { 
      question: "7 x 9 = ?", 
      options: [56, 63, 72, 81], 
      correctAnswer: 63 
    }
  ];
  
  let currentIndex = 0;
  let score = 0;
  
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");
  const checkBtn = document.getElementById("check-btn");
  const result = document.getElementById("result");
  const nextBtn = document.getElementById("next-btn");
  const backBtn = document.getElementById("back-btn");
  
  function showQuestion() {
    const question = questions[currentIndex];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = "";
  
    question.options.forEach((option, index) => {
      const optionLabel = document.createElement("label");
      const optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.name = "option";
      optionInput.value = option;
  
      optionLabel.appendChild(optionInput);
      optionLabel.appendChild(document.createTextNode(option));
      optionsContainer.appendChild(optionLabel);
      optionsContainer.appendChild(document.createElement("br"));
    });
  
    result.textContent = "";
  }
  
  checkBtn.onclick = () => {
    const selectedOption = document.querySelector("input[name='option']:checked");
    
    if (selectedOption) {
      const selectedAnswer = Number(selectedOption.value);
      const correctAnswer = questions[currentIndex].correctAnswer;
  
      if (selectedAnswer === correctAnswer) {
        score++;
        result.textContent = "Зөв!";
        result.style.color = "green";
      } else {
        result.textContent = `Буруу! Зөв хариулт: ${correctAnswer}`;
        result.style.color = "red";
      }
    } else {
      result.textContent = "Хариулт сонгоно уу!";
      result.style.color = "orange";
    }
  };
  
  nextBtn.onclick = () => {
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      showQuestion();
    } else {
      alert(`Тест дууслаа! Таны оноо: ${score}`);
    }
  };
  
  backBtn.onclick = () => {
    window.location.href = "../../index.html";
  };
  
  // Add keyboard navigation
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && currentIndex > 0) {
      currentIndex--;
      showQuestion();
    } else if (event.key === 'ArrowRight' && currentIndex < questions.length - 1) {
      currentIndex++;
      showQuestion();
    }
  });
  
  showQuestion();
  