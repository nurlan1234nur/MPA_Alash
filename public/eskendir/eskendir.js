// Load JSON data
let verses = {};
let usedVerses = []; // Tracks which odd verses have been shown (for preventing duplicates)
let history = []; // Tracks navigation history (for prev/next buttons)
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
  const allOddNumbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21];
  
  // Get odd numbers that haven't been used
  const availableOdds = allOddNumbers.filter(num => !usedVerses.includes(num));
  
  // If all verses have been used, reset
  if (availableOdds.length === 0) {
    usedVerses = [];
    return allOddNumbers[Math.floor(Math.random() * allOddNumbers.length)];
  }
  
  // Select random odd number from available ones
  return availableOdds[Math.floor(Math.random() * availableOdds.length)];
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
  usedVerses.push(randomOdd); // Mark as used (never show again until reset)
  history.push(randomOdd); // Add to navigation history
  displayVerse(randomOdd);
}

// Event listeners
document.getElementById('next-btn').addEventListener('click', showNextVerse);

document.getElementById('show-btn').addEventListener('click', showAnswer);

document.getElementById('prev-btn').addEventListener('click', () => {
  if (history.length > 1) {
    // Remove current from history
    history.pop();
    // Get previous verse from history
    const prevVerse = history[history.length - 1];
    displayVerse(prevVerse);
  } else if (history.length === 1) {
    // Just redisplay the current verse
    displayVerse(history[0]);
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