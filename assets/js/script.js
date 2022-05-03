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

var countdown = 30;

var countdownEl = document.querySelector("#countdown");
var highScores = [];
var sortedScores = [];

var challengeQuestions = [
  {
    question: "Commonly used data types do not include:",
    answers: ["Strings", "Boolean", "Alerts", "Numbers"],
    correct: "Alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed with ____.",
    answers: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
    correct: "Parenthesis",
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    answers: [
      "Numbers and Strings",
      "Other Arrays",
      "Booleans",
      "All of the Above",
    ],
    correct: "All of the Above",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    answers: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
    correct: "Quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "Terminal/Bash", "For Loops", "console.log"],
    correct: "console.log",
  },
];

function scoreFormHandler(event) {
  event.preventDefault();
  var scoreNameInput = document.querySelector("input[name='score']").value;
  var score = countdown;

  if (!scoreNameInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  var userScores = {
    initials: scoreNameInput,
    score: countdown,
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

  yourScoreEl.textContent = `Your final score is: ${countdown}`;
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
    if (countdown > 0) {
      countdownEl.textContent = countdown;
      countdown--;
    } else {
      countdownEl.textContent = 0;
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
    countdown += 10;
  } else {
    check = false;
    countdown -= 10;
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
  countdown = 30;
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
