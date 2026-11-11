// Three sample questions. IMPORTANT:
// Compare these with the question array in your EdBytes starter pack.
// If the starter provides its own questions, use that exact array here.
const questions = [
  {
    question: "Which language is used to add interactivity to web pages?",
    answers: ["HTML", "CSS", "JavaScript", "SQL"],
    correctAnswer: "JavaScript"
  },
  {
    question: "Which HTML element is used for the largest heading?",
    answers: ["<h1>", "<head>", "<p>", "<title>"],
    correctAnswer: "<h1>"
  },
  {
    question: "Which CSS property changes the text color?",
    answers: ["font-size", "color", "margin", "padding"],
    correctAnswer: "color"
  }
];

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const progressElement = document.getElementById("progress");
const nextButton = document.getElementById("next-btn");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;
let answeredCurrentQuestion = false;

function showQuestion() {
  const current = questions[currentQuestionIndex];
  answeredCurrentQuestion = false;
  questionElement.textContent = current.question;
  progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  feedbackElement.textContent = "";
  feedbackElement.className = "";
  nextButton.hidden = true;
  answersElement.replaceChildren();

  current.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = answer;
    button.addEventListener("click", () => chooseAnswer(answer));
    answersElement.appendChild(button);
  });
}

function chooseAnswer(selectedAnswer) {
  // Prevent a second click from counting the same question again.
  if (answeredCurrentQuestion) return;
  answeredCurrentQuestion = true;

  const current = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === current.correctAnswer;

  if (isCorrect) {
    score += 1;
    feedbackElement.textContent = "Correct!";
    feedbackElement.className = "correct";
  } else {
    feedbackElement.textContent = `Incorrect. Correct answer: ${current.correctAnswer}`;
    feedbackElement.className = "incorrect";
  }

  // Disable every answer button after the first selection.
  answersElement.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  nextButton.textContent =
    currentQuestionIndex === questions.length - 1 ? "Show final score" : "Next question";
  nextButton.hidden = false;
}

function showResult() {
  quizSection.hidden = true;
  progressElement.hidden = true;
  resultSection.hidden = false;
  scoreElement.textContent = `Your score: ${score} / ${questions.length}`;
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    showQuestion();
  } else {
    showResult();
  }
});

if (questions.length === 0) {
  questionElement.textContent = "No questions are available.";
} else {
  showQuestion();
}
