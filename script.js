/* ===========
   TAB SWITCHING
   ============ */
function showTab(tabName, element) {
  // Hide all tab content
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');

  // Show selected tab content
  document.getElementById(tabName).style.display = 'block';

  // Update active tab style
  document.querySelectorAll('.folder-tab').forEach(tab => tab.classList.remove('active'));
  element.classList.add('active');

  // Change folder background to match selected tab
  const folder = document.querySelector('.folder');
  folder.classList.remove(
    'folder-lavender',
    'folder-green',
    'folder-yellow',
    'folder-pink',
    'folder-blue',
    'folder-mint'
  );

  if (tabName === 'color') {
    folder.classList.add('folder-lavender');
  } else if (tabName === 'convert') {
    folder.classList.add('folder-green');
  } else if (tabName === 'guess') {
    folder.classList.add('folder-yellow');
  } else if (tabName === 'rps') {
    folder.classList.add('folder-pink');
  } else if (tabName === 'quote') {
    folder.classList.add('folder-blue');
  } else if (tabName === 'todo') {
    folder.classList.add('folder-mint');
  }
}

/* ===========
   COLOR CHANGER
   ============ */
let isBlack = true;

function toggleColor() {
  const text = document.getElementById("colorText");
  text.style.color = isBlack ? "red" : "black";
  isBlack = !isBlack;
  clearColorError();
}

function randomTextColor() {
  const text = document.getElementById("colorText");
  text.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  clearColorError();
}

function setTextColor() {
  const color = document.getElementById("colorInput").value.trim();
  const text = document.getElementById("colorText");
  if (isValidColor(color)) {
    text.style.color = color;
    clearColorError();
  } else {
    document.getElementById("colorError").textContent = "Try it again!";
    const errorImage = document.getElementById("colorErrorImage");
    errorImage.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzZndnA3YXg5cXIyNXl5ZnFjamptY3piYmE0NXE1NWYzOTc2YW9qYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MXywxyJ5UyvtgoF94a/giphy.gif";
    errorImage.style.display = "block";
  }
}

function clearColorError() {
  document.getElementById("colorError").textContent = "";
  const errorImage = document.getElementById("colorErrorImage");
  errorImage.style.display = "none";
  errorImage.src = "";
}

function isValidColor(str) {
  const s = new Option().style;
  s.color = str;
  return s.color !== "";
}

/* ===========
   UNIT CONVERTER
   ============ */
function updateUnitLabels() {
  document.getElementById("conversionResult").textContent = "";
}

function convert() {
  const type = document.getElementById("conversionType").value;
  const value = parseFloat(document.getElementById("inputValue").value);
  let result = "";

  if (isNaN(value)) {
    result = "Please enter a valid number.";
  } else {
    switch (type) {
      case "ftoc":
        result = `${((value - 32) * 5 / 9).toFixed(2)} °C`;
        break;
      case "ctof":
        result = `${((value * 9 / 5) + 32).toFixed(2)} °F`;
        break;
      case "kgtolbs":
        result = `${(value * 2.20462).toFixed(2)} lbs`;
        break;
      case "mtoft":
        result = `${(value * 3.28084).toFixed(2)} ft`;
        break;
    }
  }

  document.getElementById("conversionResult").textContent = result;
}

/* ===========
   NUMBER GUESSING GAME
   ============ */
let secretNumber = Math.floor(Math.random() * 11);
let guessesLeft = 3;

function makeGuess() {
  const guess = parseInt(document.getElementById("guessInput").value);
  const feedback = document.getElementById("guessFeedback");

  if (guess === secretNumber) {
    feedback.textContent = `🎉 Yay you did it! The number was ${secretNumber}. New game.`;
    resetGuessGame();
  } else {
    guessesLeft--;
    if (guessesLeft > 0) {
      feedback.textContent = `Wrong guess. ${guessesLeft} guesses left.`;
    } else {
      feedback.textContent = `Strike out! The number was ${secretNumber}. New game.`;
      resetGuessGame();
    }
  }
}

function resetGuessGame() {
  secretNumber = Math.floor(Math.random() * 11);
  guessesLeft = 3;
}

/* ===========
   ROCK PAPER SCISSORS
   ============ */
function playRPS(playerChoice) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  let result = "";

  if (playerChoice === computerChoice) {
    result = "It's a tie!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = `You win! Mickey chose ${computerChoice}.`;
  } else {
    result = `You lose! Mickey chose ${computerChoice}.`;
  }

  document.getElementById("rpsResult").textContent = result;
}

/* ===========
   QUOTE OF THE DAY
   ============ */
async function getQuote() {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();
    const quote = `${data[0].q} — ${data[0].a}`;
    document.getElementById("quoteText").textContent = quote;
  } catch (err) {
    document.getElementById("quoteText").textContent = "Failed to fetch quote.";
  }
}

/* ===========
   TODO LIST
   ============ */
function addTodo() {
  const input = document.getElementById("todoInput");
  const task = input.value.trim();
  if (!task) return;

  const li = document.createElement("li");
  li.textContent = task;

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✓";
  doneBtn.style.marginLeft = "10px";
  doneBtn.onclick = () => li.style.textDecoration = "line-through";

  li.appendChild(doneBtn);
  document.getElementById("todoList").appendChild(li);
  input.value = "";
}
