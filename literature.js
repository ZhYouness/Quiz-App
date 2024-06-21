const questions = [
  {
    question: "Who is the author of 'One Thousand and One Nights'?",
    answers: [
      { text: "Ibn Battuta", correct: false },
      { text: "Al-Razi", correct: false },
      { text: "Al-Masudi", correct: false },
      { text: "Unknown", correct: true },
    ],
  },
  {
    question:
      "What is the title of the famous epic poem by Antarah ibn Shaddad?",
    answers: [
      { text: "Kitab al-Aghani", correct: false },
      { text: "Al-Mu'allaqat", correct: false },
      { text: "The Book of Songs", correct: false },
      { text: "Antar", correct: true },
    ],
  },
  {
    question: "Who wrote 'Season of Migration to the North'?",
    answers: [
      { text: "Naguib Mahfouz", correct: false },
      { text: "Tayeb Salih", correct: true },
      { text: "Nawal El Saadawi", correct: false },
      { text: "Gamal Abdel Nasser", correct: false },
    ],
  },
  {
    question:
      "Which Arab poet is known for his collection of poems called 'The Diwan'?",
    answers: [
      { text: "Al-Mutanabbi", correct: true },
      { text: "Abu Nuwas", correct: false },
      { text: "Ibn Arabi", correct: false },
      { text: "Al-Khansa", correct: false },
    ],
  },
  {
    question: "What is the title of the famous novel by Taha Hussein?",
    answers: [
      { text: "The Book of Songs", correct: false },
      { text: "The Call of the Wild", correct: false },
      { text: "The Days", correct: true },
      { text: "The Stranger", correct: false },
    ],
  },
  {
    question: "Who wrote 'War and Peace'?",
    answers: [
      { text: "Fyodor Dostoevsky", correct: false },
      { text: "Leo Tolstoy", correct: true },
      { text: "Anton Chekhov", correct: false },
      { text: "Aleksandr Solzhenitsyn", correct: false },
    ],
  },
  {
    question:
      "What is the title of Jane Austen's novel about the Dashwood sisters?",
    answers: [
      { text: "Emma", correct: false },
      { text: "Sense and Sensibility", correct: true },
      { text: "Pride and Prejudice", correct: false },
      { text: "Mansfield Park", correct: false },
    ],
  },
  {
    question: "Who wrote 'One Hundred Years of Solitude'?",
    answers: [
      { text: "Gabriel García Márquez", correct: true },
      { text: "Pablo Neruda", correct: false },
      { text: "Jorge Luis Borges", correct: false },
      { text: "Julio Cortázar", correct: false },
    ],
  },
  {
    question:
      "What is the title of Haruki Murakami's novel about a missing cat?",
    answers: [
      { text: "Norwegian Wood", correct: false },
      { text: "Kafka on the Shore", correct: false },
      { text: "1Q84", correct: false },
      { text: "The Wind-Up Bird Chronicle", correct: true },
    ],
  },
  {
    question: "Who wrote the novel 'The Catcher in the Rye'?",
    answers: [
      { text: "J.D. Salinger", correct: true },
      { text: "Ernest Hemingway", correct: false },
      { text: "F. Scott Fitzgerald", correct: false },
      { text: "John Steinbeck", correct: false },
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
