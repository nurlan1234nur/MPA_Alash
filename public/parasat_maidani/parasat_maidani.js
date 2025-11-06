const questions = [
    {
      question: "«Парасат майданы» кітабының авторы кім?",
      options: ["Оралхан Бөкей", "Смағұл Елубай", "Әзілхан Нұршайықов", "Мен"],
      answer: "Мен"
    },
    {
     
    },
    // Асуултуудыг нэмэх боломжтой
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
  