const questions = [
    {
      question: "Абайдың бірінші қара сөзі қандай мәселені қозғайды?",
      options: ["Білім туралы", "Ұлт болашағы", "Тәрбие", "Еңбек"],
      answer: "Білім туралы"
    },
    {
      question: "Абайдың қара сөздері не жайында жазылған?",
      options: ["Ғылым мен өнер", "Философиялық ойлар", "Саясат", "Спорт"],
      answer: "Философиялық ойлар"
    },
    // Асуултуудыг нэмсээр байж болно
  ];
  
  let currentQuestion = 0;
  
  const questionContainer = document.getElementById('question-container');
  const optionsContainer = document.getElementById('options-container');
  const nextBtn = document.getElementById('next-btn');
  const backBtn = document.getElementById('back-btn');
  
  function showQuestion() {
    const q = questions[currentQuestion];
    questionContainer.textContent = q.question;
    optionsContainer.innerHTML = '';
  
    q.options.forEach(option => {
      const btn = document.createElement('button');
      btn.textContent = option;
      btn.onclick = () => {
        if (option === q.answer) {
          btn.style.backgroundColor = 'lightgreen';
        } else {
          btn.style.backgroundColor = 'lightcoral';
        }
      };
      optionsContainer.appendChild(btn);
    });
  }
  
  nextBtn.onclick = () => {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      showQuestion();
    } else {
      alert("Асуултууд дууслаа!");
    }
  };
  
  backBtn.onclick = () => {
    window.location.href = "../../index.html";
  };
  
  // эхлэх үед эхний асуултыг харуулах
  showQuestion();
  