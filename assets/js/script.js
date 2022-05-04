var mainEl = document.querySelector(".main");
var h1El = document.createElement("h1");
var overviewEl = document.querySelector("#overview");
var challengeQuestionsEl = document.querySelector("#challenge");
var finalScoreEl = document.querySelector("#finalScore");
var highScorePageEl = document.querySelector("#highScore");

var userScoreEl = document.createElement("div");
var beginBtnEl = document.querySelector("#start");

var answerAEl = document.createElement("button");
var answerBEl = document.createElement("button");
var answerCEl = document.createElement("button");
var answerDEl = document.createElement("button");

var enterScoreFormEl = document.createElement("form");
var userInputEl = document.createElement("input");
var submitBtnEl = document.createElement("button");
var backBtnEl = document.createElement("button");
var eraseScores = document.createElement("button");

var scoreDetailsEl = document.createElement("div");
var scoreItemEl = document.createElement("li");
var scoreSheetEl = document.createElement("ol");

var navScoreLinkEl = document.querySelector(".viewHigh");

var questionNumber = 0;
var check;

var timer = 30;

var timerEl = document.querySelector("#time");
var highScores = [];
var sortedScores = [];

var challengeQuestions = [
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

  scoreDetailsEl.className = "score-list";
  scoreDetailsEl.innerHTML =
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

function buildChallenge(questionNum) {
  challengeQuestionsEl.classList.remove("variable");

  h1El.textContent = challengeQuestions[questionNum].question;

  answerAEl.textContent = challengeQuestions[questionNum].answers[0];
  answerBEl.textContent = challengeQuestions[questionNum].answers[1];
  answerCEl.textContent = challengeQuestions[questionNum].answers[2];
  answerDEl.textContent = challengeQuestions[questionNum].answers[3];

  var questionContainer = document.createElement("div");

  questionContainer.appendChild(h1El);
  questionContainer.appendChild(answerAEl);
  questionContainer.appendChild(answerBEl);
  questionContainer.appendChild(answerCEl);
  questionContainer.appendChild(answerDEl);

  challengeQuestionsEl.appendChild(questionContainer);
  if (questionNum != 0) {
    footerEl.textContent = check;
    if (questionNum > 5) {
      buildScoreFormPage();
    }
  }
}

function buildScoreFormPage() {
  challengeQuestionsEl.classList.add("variable");
  scoreSubmitEl.classList.remove("variable");
  h1El.textContent = "All Done!";

  yourScoreEl.textContent = `Your final score is: ${timer}`;
  scoreSubmitEl.appendChild(h1El);
  scoreSubmitEl.appendChild(yourScoreEl);

  enterScoreFormEl.textContent = "Enter Your Initials:";

  userInputEl.setAttribute("type", "text");
  userInputEl.setAttribute("name", "score");
  userInputEl.setAttribute("id", "score");
  userInputEl.setAttribute("placeholder", "Your Initials");

  submitBtnEl.setAttribute("type", "button");
  submitBtnEl.textContent = "Submit";

  enterScoreFormEl.appendChild(inputFieldEl);
  enterScoreFormEl.appendChild(submitBtnEl);

  scoreSubmitEl.appendChild(enterScoreFormEl);
}

function buildHighScorePage() {
  var scores = loadScores();
  console.log(scores, scores.score);

  scoreSubmitEl.classList.add("variable");
  highScorePageEl.classList.remove("variable");
  h1El.textContent = "High Score";

  for (var i = 0; i < scores.length; i++) {
    if ((i = 0)) sortedScores.append(scores.score);

    console.log(sortedScores);
  }

  scoreSheetEl.appendChild(scoreItemEl);

  backBtnEl.textContent = "Go back";
  eraseScores.textContent = "Reset High Scores";
  highScorePageEl.appendChild(h1El);
  highScorePageEl.appendChild(scoreSheetEl);
  highScorePageEl.appendChild(backBtnEl);
  highScorePageEl.appendChild(eraseScores);
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
  overviewEl.classList.add("variable");
  setTimer();
  buildChallenge(questionNumber);
}

function checkAnswer(choice) {
  if (choice == challengeQuestions[questionNumber].correct) {
    check = true;
    timer += 10;
  } else {
    check = false;
    timer -= 10;
  }
  questionNumber += 1;
  if (questionNumber < challengeQuestions.length) {
    buildChallenge(questionNumber);
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

function variable(item) {
  item.setAttribute("class", "variable");
}

challengeQuestionsEl.addEventListener("click", function (event) {
  var element = event.target;
  var choice;
  if (element.matches("button")) {
    choice = element.textContent;
  }
  checkAnswer(choice);
  console.log(element);
});

// Event Listeners
submitBtnEl.addEventListener("click", scoreFormHandler);

beginBtnEl.addEventListener("click", startGame);

backBtnEl.addEventListener("click", function () {
  timer = 30;
  questionNumber = 0;
  highScorePageEl.classList.add("variable");
  overviewEl.classList.remove("variable");
});

eraseScores.addEventListener("click", function () {
  highScores = [];
  saveScore();
  scoreSheetEl.innerHTML = "";
});

// Not working
navScoreLinkEl.addEventListener("click", function () {
  overviewEl.classList.add("variable");
  scoreSubmitEl.classList.add("variable");
  challengeQuestionsEl.classList.add("variable");
  buildHighScorePage();
});
