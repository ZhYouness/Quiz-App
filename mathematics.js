const questions = [
  {
    question: "What is the value of π (pi) correct to two decimal places?",
    answers: [
      { text: "3.12", correct: false },
      { text: "3.14", correct: true },
      { text: "3.16", correct: false },
      { text: "3.18", correct: false },
    ],
  },
  {
    question:
      "What is the area of a rectangle with length 6 cm and width 4 cm?",
    answers: [
      { text: "24 cm²", correct: true },
      { text: "20 cm²", correct: false },
      { text: "18 cm²", correct: false },
      { text: "16 cm²", correct: false },
    ],
  },
  {
    question: "What is the square root of 144?",
    answers: [
      { text: "10", correct: false },
      { text: "12", correct: true },
      { text: "14", correct: false },
      { text: "16", correct: false },
    ],
  },
  {
    question: "Simplify: 2x + 5x - 3x",
    answers: [
      { text: "4x", correct: false },
      { text: "5x", correct: true },
      { text: "6x", correct: false },
      { text: "7x", correct: false },
    ],
  },
  {
    question: "What is the value of 5² - 3²?",
    answers: [
      { text: "17", correct: false },
      { text: "20", correct: false },
      { text: "18", correct: false },
      { text: "16", correct: true },
    ],
  },
  {
    question: "What is the sum of angles in a triangle?",
    answers: [
      { text: "90 degrees", correct: false },
      { text: "180 degrees", correct: true },
      { text: "270 degrees", correct: false },
      { text: "360 degrees", correct: false },
    ],
  },
  {
    question: "If a = 5 and b = 3, what is a² + b²?",
    answers: [
      { text: "20", correct: false },
      { text: "25", correct: true },
      { text: "30", correct: false },
      { text: "35", correct: false },
    ],
  },
  {
    question: "What is the formula for the circumference of a circle?",
    answers: [
      { text: "2πr", correct: true },
      { text: "πr²", correct: false },
      { text: "πr", correct: false },
      { text: "π/2r", correct: false },
    ],
  },
  {
    question: "What is the value of 3 factorial (3!)?",
    answers: [
      { text: "3", correct: false },
      { text: "6", correct: true },
      { text: "9", correct: false },
      { text: "12", correct: false },
    ],
  },
  {
    question: "What is the sum of the interior angles of a hexagon?",
    answers: [
      { text: "360 degrees", correct: true },
      { text: "540 degrees", correct: false },
      { text: "720 degrees", correct: false },
      { text: "900 degrees", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const backButton = document.getElementById("back-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNumber}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(function (answer) {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (nextButton.innerHTML === "Restart") {
    startQuiz();
  } else {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
});

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Restart";
  nextButton.style.display = "block";
  backButton.style.display = "block";
}

startQuiz();
