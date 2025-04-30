let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
let quizIndex = 0;
let score = 0;

function saveFlashcards() {
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
  displayFlashcards();
}

function addFlashcard() {
  const question = document.getElementById("question").value;
  const answer = document.getElementById("answer").value;
  if (question && answer) {
    flashcards.push({ question, answer });
    saveFlashcards();
    document.getElementById("question").value = '';
    document.getElementById("answer").value = '';
  }
}

function displayFlashcards() {
  const list = document.getElementById("flashcards");
  list.innerHTML = "";
  flashcards.forEach((card, index) => {
    const li = document.createElement("li");
    li.textContent = `Q: ${card.question} | A: ${card.answer}`;
    list.appendChild(li);
  });
}

function startQuiz() {
  if (flashcards.length === 0) return alert("Add some flashcards first!");
  quizIndex = 0;
  score = 0;
  document.getElementById("quiz-box").classList.remove("hidden");
  document.getElementById("quiz-result").classList.add("hidden");
  loadQuestion();
}

function loadQuestion() {
  const card = flashcards[quizIndex];
  document.getElementById("quiz-question").textContent = card.question;
  document.getElementById("quiz-answer").textContent = card.answer;
  document.getElementById("quiz-answer").classList.add("hidden");
}

function showAnswer() {
  document.getElementById("quiz-answer").classList.remove("hidden");
}

function markCorrect() {
  score++;
  nextQuestion();
}

function markIncorrect() {
  nextQuestion();
}

function nextQuestion() {
  quizIndex++;
  if (quizIndex >= flashcards.length) {
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("quiz-result").classList.remove("hidden");
    document.getElementById("score").textContent = `You scored ${score} out of ${flashcards.length}`;
  } else {
    loadQuestion();
  }
}

function resetQuiz() {
  document.getElementById("quiz-box").classList.add("hidden");
  document.getElementById("quiz-result").classList.add("hidden");
}

displayFlashcards();
