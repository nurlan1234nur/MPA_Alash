// Load JSON data
let verses = {};
let usedVerses = [];
let currentVerseNumber = null;
let showingAnswer = false;

// Load the JSON file
fetch('eskendir.json')
  .then(response => response.json())
  .then(data => {
    verses = data;
    console.log('Verses loaded successfully');
  })
  .catch(error => {
    console.error('Error loading verses:', error);
    document.getElementById('question-container').innerHTML = 
      '<p style="color: red;">Алдаа: eskendir.json файлыг ачаалж чадсангүй</p>';
  });

// Get random odd number that hasn't been used
function getRandomOddNumber() {
  const totalVerses = Object.keys(verses).length;
  const oddNumbers = [];
  
  // Collect all odd numbers that haven't been used
  for (let i = 1; i <= totalVerses; i += 2) {
    if (!usedVerses.includes(i)) {
      oddNumbers.push(i);
    }
  }
  
  // If all verses have been used, reset
  if (oddNumbers.length === 0) {
    usedVerses = [];
    for (let i = 1; i <= totalVerses; i += 2) {
      oddNumbers.push(i);
    }
  }
  
  // Select random odd number
  const randomIndex = Math.floor(Math.random() * oddNumbers.length);
  return oddNumbers[randomIndex];
}

// Display verse
function displayVerse(verseNumber) {
  const container = document.getElementById('question-container');
  const verseText = verses[verseNumber.toString()];
  
  if (verseText) {
    // Format the text with line breaks
    const formattedText = verseText.split('\n').join('<br>');
    container.innerHTML = `<p>${formattedText}</p>`;
    currentVerseNumber = verseNumber;
    showingAnswer = false;
  } else {
    container.innerHTML = '<p>Мөр олдсонгүй</p>';
  }
}

// Show answer (next verse)
function showAnswer() {
  if (currentVerseNumber === null) return;
  
  const container = document.getElementById('question-container');
  const currentText = verses[currentVerseNumber.toString()];
  const nextVerseNumber = currentVerseNumber + 1;
  const nextText = verses[nextVerseNumber.toString()];
  
  if (nextText) {
    const formattedCurrent = currentText.split('\n').join('<br>');
    const formattedNext = nextText.split('\n').join('<br>');
    
    container.innerHTML = `
      <p>${formattedCurrent}</p>
      <hr style="margin: 20px 0; border: 1px solid #ccc;">
      <p style="color: #2c5282;">${formattedNext}</p>
    `;
    showingAnswer = true;
  }
}

// Show next random verse
function showNextVerse() {
  const randomOdd = getRandomOddNumber();
  usedVerses.push(randomOdd);
  displayVerse(randomOdd);
}

// Event listeners
document.getElementById('next-btn').addEventListener('click', showNextVerse);

document.getElementById('show-btn').addEventListener('click', showAnswer);

document.getElementById('prev-btn').addEventListener('click', () => {
  if (usedVerses.length > 1) {
    // Remove current verse from history
    usedVerses.pop();
    // Get previous verse
    const prevVerse = usedVerses[usedVerses.length - 1];
    displayVerse(prevVerse);
  } else if (usedVerses.length === 1) {
    // Just redisplay the current verse
    displayVerse(usedVerses[0]);
  }
});

// Initialize with first random verse on load
window.addEventListener('load', () => {
  // Wait a bit for JSON to load
  setTimeout(() => {
    if (Object.keys(verses).length > 0) {
      showNextVerse();
    }
  }, 100);
});