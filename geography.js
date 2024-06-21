const questions = [
  {
    question: "What is the capital of Morocco?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Casablanca", correct: false },
      { text: "Cairo", correct: false },
      { text: "Rabat", correct: true },
    ],
  },
  {
    question: "What is the capital of Japan?",
    answers: [
      { text: "Beijing", correct: false },
      { text: "Seoul", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Bangkok", correct: false },
    ],
  },
  {
    question: "Which continent is the Sahara Desert located in?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Africa", correct: true },
      { text: "Australia", correct: false },
      { text: "South America", correct: false },
    ],
  },
  {
    question: "What is the longest river in the world?",
    answers: [
      { text: "Nile", correct: true },
      { text: "Amazon", correct: false },
      { text: "Yangtze", correct: false },
      { text: "Mississippi", correct: false },
    ],
  },
  {
    question: "Which country has the largest population?",
    answers: [
      { text: "India", correct: false },
      { text: "United States", correct: false },
      { text: "China", correct: true },
      { text: "Russia", correct: false },
    ],
  },
  {
    question: "What is the smallest country in the world by land area?",
    answers: [
      { text: "Monaco", correct: false },
      { text: "San Marino", correct: false },
      { text: "Vatican City", correct: true },
      { text: "Liechtenstein", correct: false },
    ],
  },
  {
    question: "Which ocean is the largest by surface area?",
    answers: [
      { text: "Atlantic", correct: false },
      { text: "Indian", correct: false },
      { text: "Arctic", correct: false },
      { text: "Pacific", correct: true },
    ],
  },
  {
    question: "Mount Everest is located in which mountain range?",
    answers: [
      { text: "Andes", correct: false },
      { text: "Rockies", correct: false },
      { text: "Himalayas", correct: true },
      { text: "Alps", correct: false },
    ],
  },
  {
    question: "Which U.S. state has the most coastline?",
    answers: [
      { text: "California", correct: false },
      { text: "Florida", correct: false },
      { text: "Alaska", correct: true },
      { text: "Hawaii", correct: false },
    ],
  },
  {
    question: "What is the capital city of Australia?",
    answers: [
      { text: "Sydney", correct: false },
      { text: "Melbourne", correct: false },
      { text: "Canberra", correct: true },
      { text: "Brisbane", correct: false },
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
