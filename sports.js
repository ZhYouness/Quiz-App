const questions = [
  {
    question:
      "Who is widely regarded as the GOAT (Greatest of All Time) in football (soccer)?",
    answers: [
      { text: "Cristiano Ronaldo", correct: false },
      { text: "Lionel Messi", correct: true },
      { text: "Diego Maradona", correct: false },
      { text: "Pelé", correct: false },
    ],
  },
  {
    question: "Which sport is played at Wimbledon?",
    answers: [
      { text: "Tennis", correct: true },
      { text: "Golf", correct: false },
      { text: "Cricket", correct: false },
      { text: "Soccer", correct: false },
    ],
  },
  {
    question: "Who holds the record for the most Olympic gold medals?",
    answers: [
      { text: "Michael Phelps", correct: true },
      { text: "Usain Bolt", correct: false },
      { text: "Serena Williams", correct: false },
      { text: "Simone Biles", correct: false },
    ],
  },
  {
    question: "Which country won the FIFA World Cup in 2018?",
    answers: [
      { text: "Argentina", correct: false },
      { text: "Brazil", correct: false },
      { text: "France", correct: true },
      { text: "Germany", correct: false },
    ],
  },
  {
    question:
      "In which city are the headquarters of the International Olympic Committee (IOC) located?",
    answers: [
      { text: "London", correct: false },
      { text: "Paris", correct: false },
      { text: "Lausanne", correct: true },
      { text: "Geneva", correct: false },
    ],
  },
  {
    question: "Who won the 2020 NBA Finals?",
    answers: [
      { text: "Los Angeles Lakers", correct: true },
      { text: "Miami Heat", correct: false },
      { text: "Golden State Warriors", correct: false },
      { text: "Toronto Raptors", correct: false },
    ],
  },
  {
    question: "Which sport is associated with the term 'birdie'?",
    answers: [
      { text: "Badminton", correct: false },
      { text: "Golf", correct: true },
      { text: "Table Tennis", correct: false },
      { text: "Tennis", correct: false },
    ],
  },
  {
    question: "Who is the all-time leading scorer in NBA history?",
    answers: [
      { text: "Michael Jordan", correct: false },
      { text: "Kareem Abdul-Jabbar", correct: true },
      { text: "LeBron James", correct: false },
      { text: "Kobe Bryant", correct: false },
    ],
  },
  {
    question: "Which country won the UEFA Euro 2020 football championship?",
    answers: [
      { text: "Italy", correct: true },
      { text: "England", correct: false },
      { text: "Spain", correct: false },
      { text: "Germany", correct: false },
    ],
  },
  {
    question: "What is the diameter of a basketball hoop in inches?",
    answers: [
      { text: "16 inches", correct: false },
      { text: "19 inches", correct: false },
      { text: "20 inches", correct: false },
      { text: "18 inches", correct: true },
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
