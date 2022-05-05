var mainEl = document.querySelector(".main");
var h1El = document.createElement("h1");
var startPageEl = document.querySelector("#instructions");
var questionEl = document.querySelector("#quiz");
var scoreSubmitEl = document.querySelector("#submitScore");
var highScorePageEl = document.querySelector("#highScore");

var yourScoreEl = document.createElement("div");
var beginBtnEl = document.querySelector("#begin");

var opt1El = document.createElement("button");
var opt2El = document.createElement("button");
var opt3El = document.createElement("button");
var opt4El = document.createElement("button");

var footerEl = document.querySelector("footer");
var enterScoreFormEl = document.createElement("form");
var inputFieldEl = document.createElement("input");
var submitButtonEl = document.createElement("button");
var goBackButtonEl = document.createElement("button");
var clearScores = document.createElement("button");

var scoreInfoEl = document.createElement("div");
var scoreItemEl = document.createElement("li");
var scoreSheetEl = document.createElement("ol");

var navScoreLinkEl = document.querySelector(".view_scores");

var questionNumber = 0;
var check;

var timer = 30;

var timerEl = document.querySelector("#time");
var highScores = [];
var sortedScores = [];

var quizQuestions = [
  {
    question: "Which type of JavaScript language is ___",
    answers: [
      "Object-Oriented",
      "Object-Based",
      "Assembly-language",
      "High-level",
    ],
    correct: "Object-Based",
  },
  {
    question: "The condition in an if/else statement is enclosed with ____.",
    answers: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
    correct: "Parenthesis",
  },
  {
    question:
      "Which one of the following also known as Conditional Expression:",
    answers: [
      "Alternative to if-else",
      "Switch statement",
      "If-then-else statement",
      "immediate if",
    ],
    correct: "immediate if",
  },
  {
    question: "In JavaScript, what is a block of statement?",
    answers: [
      "Conditional block",
      "block that combines a number of statements into a single compound statement",
      "both conditional block and a single statement",
      "block that contains a single statement",
    ],
    correct:
      "block that combines a number of statements into a single compound statement",
  },
  {
    question: "The 'function; and 'var' are known as:",
    answers: ["Keywords", "Data types", "Declaration statements", "Prototypes"],
    correct: "Declaration statements",
  },
];

function scoreFormHandler(event) {
  event.preventDefault();
  var scoreNameInput = document.querySelector("input[name='score']").value;
  var score = timer;

  if (!scoreNameInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  var userScores = {
    initials: scoreNameInput,
    score: timer,
  };

  createScore(userScores);
}

function createScore(userScores) {
  console.log(userScores);

  scoreItemEl.className = "score-item";

  scoreInfoEl.className = "score-list";
  scoreInfoEl.innerHTML =
    "<h2 class = 'score-name'>" +
    userScores.initials +
    "</h3><span class='user-score'>" +
    userScores.score +
    "</span>";

  highScores.push(userScores);

  saveScore();
  loadScores();
  buildHighScorePage(userScores.score);
}

function buildQuizPage(questionNum) {
  questionEl.classList.remove("hide");

  h1El.textContent = quizQuestions[questionNum].question;

  opt1El.textContent = quizQuestions[questionNum].answers[0];
  opt2El.textContent = quizQuestions[questionNum].answers[1];
  opt3El.textContent = quizQuestions[questionNum].answers[2];
  opt4El.textContent = quizQuestions[questionNum].answers[3];

  var questionContainer = document.createElement("div");
  questionContainer.appendChild(h1El);
  questionContainer.appendChild(opt1El);
  questionContainer.appendChild(opt2El);
  questionContainer.appendChild(opt3El);
  questionContainer.appendChild(opt4El);

  questionEl.appendChild(questionContainer);
  if (questionNum != 0) {
    footerEl.textContent = check;
    if (questionNum > 5) {
      buildScoreFormPage();
    }
  }
}

function buildScoreFormPage() {
  questionEl.classList.add("hide");
  scoreSubmitEl.classList.remove("hide");
  h1El.textContent = "All Done!";

  yourScoreEl.textContent = `Your final score is: ${timer}`;
  scoreSubmitEl.appendChild(h1El);
  scoreSubmitEl.appendChild(yourScoreEl);

  enterScoreFormEl.textContent = "Enter Your Initials:";

  inputFieldEl.setAttribute("type", "text");
  inputFieldEl.setAttribute("name", "score");
  inputFieldEl.setAttribute("id", "score");
  inputFieldEl.setAttribute("placeholder", "Your Initials");

  submitButtonEl.setAttribute("type", "button");
  submitButtonEl.textContent = "Submit";

  enterScoreFormEl.appendChild(inputFieldEl);
  enterScoreFormEl.appendChild(submitButtonEl);

  scoreSubmitEl.appendChild(enterScoreFormEl);
}

function buildHighScorePage() {
  var scores = loadScores();
  console.log(scores, scores.score);

  scoreSubmitEl.classList.add("hide");
  footerEl.classList.add("hide");
  highScorePageEl.classList.remove("hide");
  h1El.textContent = "High Score";

  for (var i = 0; i < scores.length; i++) {
    if ((i = 0)) sortedScores.append(scores.score);

    console.log(sortedScores);
  }

  scoreSheetEl.appendChild(scoreItemEl);

  goBackButtonEl.textContent = "Go back";
  clearScores.textContent = "Reset High Scores";
  highScorePageEl.appendChild(h1El);
  highScorePageEl.appendChild(scoreSheetEl);
  highScorePageEl.appendChild(goBackButtonEl);
  highScorePageEl.appendChild(clearScores);
}

function compareScores(a, b) {
  if (b > a) {
    var temp = highScores[i];
    highScores[i] = highScores[i + 1];
    highScores[i + 1] = temp;
  }
}

function setTimer() {
  timeInterval = setInterval(function () {
    if (timer > 0) {
      timerEl.textContent = timer;
      timer--;
    } else {
      timerEl.textContent = 0;
      clearInterval(timeInterval);
      if (questionNumber < 5) buildScoreFormPage();
    }
  }, 1000);
}

function startGame() {
  startPageEl.classList.add("hide");
  setTimer();
  buildQuizPage(questionNumber);
}

function checkAnswer(choice) {
  if (choice == quizQuestions[questionNumber].correct) {
    check = true;
    timer += 10;
  } else {
    check = false;
    timer -= 10;
  }
  questionNumber += 1;
  if (questionNumber < quizQuestions.length) {
    buildQuizPage(questionNumber);
  } else {
    buildScoreFormPage();
  }
}

function saveScore() {
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function loadScores() {
  var highScores = localStorage.getItem("highScores");
  console.log(highScores);

  if (!highScores) {
    return false;
  }

  for (var i = 0; i < highScores.length; i++) {
    if (sortedScores.length == 0) sortedScores.append(highScores[i].score);
  }

  highScores = JSON.parse(highScores);
  console.log(highScores);
  return highScores;
}

function hide(item) {
  item.setAttribute("class", "hide");
}

questionEl.addEventListener("click", function (event) {
  var element = event.target;
  var choice;
  if (element.matches("button")) {
    choice = element.textContent;
  }
  checkAnswer(choice);
  console.log(element);
});

submitButtonEl.addEventListener("click", scoreFormHandler);

beginBtnEl.addEventListener("click", startGame);

goBackButtonEl.addEventListener("click", function () {
  timer = 30;
  questionNumber = 0;
  highScorePageEl.classList.add("hide");
  startPageEl.classList.remove("hide");
});

clearScores.addEventListener("click", function () {
  highScores = [];
  saveScore();
  scoreSheetEl.innerHTML = "";
});

navScoreLinkEl.addEventListener("click", function () {
  startPageEl.classList.add("hide");
  scoreSubmitEl.classList.add("hide");
  questionEl.classList.add("hide");
  buildHighScorePage();
});
