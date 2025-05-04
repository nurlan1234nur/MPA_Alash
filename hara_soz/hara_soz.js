let questions = [];
let currentIndex = 0;

const questionContainer = document.getElementById("question-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");

// Questions data
const text = `Әрбір байқаған адам білсе керек: күлкі өзі бір мастық екенін, әрбір мас кісіден ғафил көп өтетұғынын да, әрбір мастың сөйлеген кезінде бас ауыртатұғынын. Бұлай болғанда, күлкіге салынған кісі не шаруадан, не ақылдан, не бір ұят келерлік істен құр, ғафил көп өткізіп отырса керек. Осындай ғафилдік көп өткізіп, өлмеген кісінің не дүниеде, не ахиретте басы бір ауырмай қалмаса керек.

Әрбір уайым-қайғы ойлағыш кісі не дүние шаруасына, не ахирет шаруасына өзгеден жинақырақ болса керек. Әрбір жинақылықтың түбі кәніш болса керек. Енді олай болғанда, үнемі уайым-қайғыменен жүре аламыз ба? Үнемі күлмей жүруге жан шыдай ма екен? Жоқ, мен үнемі уайым-қайғыменен бол демеймін. Уайым-қайғысыздығыңа уайым-қайғы қыл дағы, сол уайым-қайғысыздықтан құтыларлық орынды харекет табу керек һәм қылу керек. Әрбір орынды харекет өзі де уайым-қайғыны азайтады, орынсыз күлкіменен азайтпа, орынды харекетпен азайт!

Шығар есігін таба алмай, уайым-қайғының ішіне кіріп алып, қамалып қалмақ, ол өзі де - бір антұрғандық. Және әрбір жаман кісінің қылығына күлсең, оған рахаттанып күлме, ыза болғаныңнан күл, ызалы күлкі - өзі де қайғы. Ондай күлкіге үнемі өзің де салынбассың, әрбір жақсы адамның жақсылық тапқанына рахаттанып күлсең, оның жақсылықты жақсылығынан тапқанын ғибрат көріп күл. Әрбір ғибрат алмақтың өзі де мастыққа жібермей, уақытымен тоқтатады. Көп күлкінің бәрін де мақтағаным жоқ, оның ішінде бір күлкі бар-ау, құдай жаратқан орныменен іштен, көкіректен, жүректен келмейді, қолдан жасап, сыртыменен бет-аузын түзеп, бай-бай күлкінің әнін сәндеп, әдемішілік үшін күлетін бояма күлкі.

Адам баласы жылап туады, кейіп өледі. Екі ортада, бұ дүниенің рахатының кайда екенін білмей, бірін-бірі аңдып, біріне-бірі мақтанып, есіл өмірді ескерусіз, босқа, жарамсыз қылықпен, қор етіп өткізеді де, таусылған күнде бір күндік өмірді бар малына сатып алуға таба алмайды.

Қулық саумақ, көз сүзіп, тіленіп, адам саумақ - өнерсіз иттің ісі. Әуелі құдайға сыйынып, екінші өз қайратыңа сүйеніп, еңбегіңді сау, еңбек қылсаң, қара жер де береді, құр тастамайды.`;

// Split text into sentences and create questions
function loadQuestions() {
    // Split text into sentences by periods, question marks and exclamation marks
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    
    // Create questions with first few words
    questions = sentences.map(sentence => {
        const words = sentence.trim().split(/\s+/);
        const firstWords = words.slice(0, 5).join(' ');
        return {
            question: `${firstWords}...`,
            answer: sentence.trim()
        };
    });
    
    renderQuestion();
}

function renderQuestion() {
    if (currentIndex >= questions.length) {
        currentIndex = questions.length - 1;
    }
    
    const q = questions[currentIndex];
    
    questionContainer.innerHTML = `
        <div class="question-box">
            <p class="question-line">${q.question}</p>
            <p class="answer-line" style="display: none">${q.answer}</p>
            <p class="question-number">Өгүүлбэр ${currentIndex + 1}/${questions.length}</p>
        </div>
    `;
    
    // Update button states
    prevBtn.style.display = currentIndex > 0 ? "block" : "none";
    nextBtn.style.display = currentIndex < questions.length - 1 ? "block" : "none";
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
    } else if (event.key === "ArrowRight" && currentIndex < questions.length - 1) {
        currentIndex++;
        renderQuestion();
    } else if (event.key === "Enter") {
        const answerLine = document.querySelector(".answer-line");
        if (answerLine) {
            answerLine.style.display = answerLine.style.display === "none" ? "block" : "none";
        }
    }
});

// Load questions when the page loads
loadQuestions();
  