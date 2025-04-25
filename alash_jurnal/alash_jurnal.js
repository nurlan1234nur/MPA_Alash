const questions = [
    { question: "Алаш гэж юу вэ?", answer: "Монголын үндэсний хөдөлгөөн" },
    { question: "Алашийн удирдагч хэн байсан бэ?", answer: "Ш.Цэдэнбал" },
    { question: "Алашийн үйл ажиллагаа ямар зорилготой байв?", answer: "Монголын тусгаар тогтнол" },
    { question: "Алашийг байгуулах санааг хэн эхлүүлсэн бэ?", answer: "Ш.Цэдэнбал, Д.Сүхбаатар" },
    { question: "Алашийн үйл ажиллагаа ямар үүрэгтэй байв?", answer: "Үндэсний эрх ашгийг хамгаалах" },
    // нэмж оруулж болно
  ];
  
  let currentIndex = 0;
  
  const questionText = document.getElementById("question-text");
  const answerInput = document.getElementById("answer-input");
  const result = document.getElementById("result");
  const checkBtn = document.getElementById("check-btn");
  const nextBtn = document.getElementById("next-btn");
  const backBtn = document.getElementById("back-btn");
  
  function showQuestion() {
    const question = questions[currentIndex];
    questionText.textContent = question.question;
    result.textContent = "";
    answerInput.value = "";
  }
  
  checkBtn.onclick = () => {
    const question = questions[currentIndex];
    const answer = answerInput.value.trim().toLowerCase();
  
    if (answer === question.answer.toLowerCase()) {
      result.textContent = "Зөв!";
      result.style.color = "green";
    } else {
      result.textContent = `Буруу! Зөв хариулт: ${question.answer}`;
      result.style.color = "red";
    }
  };
  
  nextBtn.onclick = () => {
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      showQuestion();
    } else {
      alert("Бүх асуултууд дууслаа!");
    }
  };
  
  backBtn.onclick = () => {
    window.location.href = "../../index.html";
  };
  
  showQuestion();
  