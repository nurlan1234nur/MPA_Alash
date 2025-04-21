const questions = [
    "Нэгэн хаан байжээ. Түүний нэр Ескендир.",
    "Тэр хаан их амжилтад хүрсэн ч шуналтай байжээ.",
    "Хүмүүс түүний авирыг гайхан ярилцдаг байв.",
    "Нэгэн өдөр түүний өмнө мэргэн хүн ирэв...",
    // … энэ мэтчилэн шүлгийн мөрүүдийг үргэлжлүүлээрэй
  ];
  
  let currentIndex = 0;
  
  const questionContainer = document.getElementById('question-container');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const backBtn = document.getElementById('back-btn');
  
  function renderQuestion() {
    const line1 = questions[currentIndex] || "";
    const line2 = questions[currentIndex + 1] || "";
    questionContainer.innerHTML = `<p>${line1}</p><p>${line2}</p>`;
  }
  
  prevBtn.onclick = () => {
    if (currentIndex >= 2) {
      currentIndex -= 2;
      renderQuestion();
    }
  };
  
  nextBtn.onclick = () => {
    if (currentIndex + 2 < questions.length) {
      currentIndex += 2;
      renderQuestion();
    }
  };
  
  backBtn.onclick = () => {
    window.location.href = "../../index.html";
  };
  
  // эхлэх үед харуулах
  render
  