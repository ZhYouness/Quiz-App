const questions = [
  {
    question: "Who was the first caliph of the Rashidun Caliphate?",
    answers: [
      { text: "Umar ibn al-Khattab", correct: false },
      { text: "Uthman ibn Affan", correct: false },
      { text: "Ali ibn Abi Talib", correct: false },
      { text: "Abu Bakr", correct: true },
    ],
  },
  {
    question: "In what year did the Titanic sink?",
    answers: [
      { text: "1905", correct: false },
      { text: "1912", correct: true },
      { text: "1918", correct: false },
      { text: "1923", correct: false },
    ],
  },
  {
    question:
    "Who was the famous Arab scholar known as the 'father of algebra'?",
    answers: [
      { text: "Al-Farabi", correct: false },
      { text: "Al-Khwarizmi", correct: true },
      { text: "Ibn Sina", correct: false },
      { text: "Al-Ghazali", correct: false },
    ],
  },
  {
    question:
      "Which war was fought between the North and South regions in the United States?",
    answers: [
      { text: "World War I", correct: false },
      { text: "World War II", correct: false },
      { text: "The American Civil War", correct: true },
      { text: "The Revolutionary War", correct: false },
    ],
  },
  {
    question: "Which city was the capital of the Abbasid Caliphate?",
    answers: [
      { text: "Cairo", correct: false },
      { text: "Damascus", correct: false },
      { text: "Baghdad", correct: true },
      { text: "Cordoba", correct: false },
    ],
  },
  {
    question:
      "What was the name of the famous library and center of learning in Baghdad during the Abbasid Caliphate?",
    answers: [
      { text: "House of Wisdom", correct: true },
      { text: "Library of Alexandria", correct: false },
      { text: "Great Mosque of Kairouan", correct: false },
      { text: "Alhambra", correct: false },
    ],
  },
  {
    question: "Who was the first president of the United States?",
    answers: [
      { text: "Thomas Jefferson", correct: false },
      { text: "George Washington", correct: true },
      { text: "Abraham Lincoln", correct: false },
      { text: "John Adams", correct: false },
    ],
  },
  {
    question: "In which year did the Umayyad Caliphate begin?",
    answers: [
      { text: "661 CE", correct: true },
      { text: "750 CE", correct: false },
      { text: "632 CE", correct: false },
      { text: "711 CE", correct: false },
    ],
  },
  {
    question: "Who was the British Prime Minister during World War II?",
    answers: [
      { text: "Winston Churchill", correct: true },
      { text: "Neville Chamberlain", correct: false },
      { text: "Clement Attlee", correct: false },
      { text: "Anthony Eden", correct: false },
    ],
  },
  {
    question:
      "What ancient civilization built the Machu Picchu complex in Peru?",
    answers: [
      { text: "Maya", correct: false },
      { text: "Aztec", correct: false },
      { text: "Inca", correct: true },
      { text: "Olmec", correct: false },
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
