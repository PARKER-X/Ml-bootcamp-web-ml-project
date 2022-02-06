var instructions = document.getElementById("instructions");
var quiz = document.getElementById("quiz");
var startBtn = document.getElementById("startBtn");
var askQuestion = document.getElementById("askQuestion");
var submitBtn = document.getElementById("submitBtn");
var resetBtn = document.getElementById("resetBtn");
var form = document.getElementById("form");
var quiz = document.getElementById("quiz");
var inform = document.getElementById("inform");
var showScore = document.getElementById("showScore");
var displayScore = document.getElementById("displayScore");
var displayQCount = document.getElementById("displayQCount");
var checkedRadio;
var allRadios;
var i;
var score;

var questions = [
  {
    question: "The term machine learning was coined in which year",
    choices: ["1952", "1783", "1959","1972"],
    correct: 2
  },
  {
    question: "which algorithm is good for home price prediction",
    choices: ["Clustring", "Classification", "Reinforcment", "Regression"],
    correct: 3
  },
  {
    question: "What category of machine learning algorithm finds patterns in the data when the data is not labeled?",
    choices: ["Unsupervised", "Supervised", "Reinforcment", "Non-of-these"],
    correct: 0
  },
  {
    question: "Which is not unsupervised learning algorithms ",
    choices: ["Anomaly detection", "K-means clustering", "Principle Component Analysis", "Support Vector Machine"],
    correct: 3
  },
  {
    question: "How many main metrics that are used for evaluting the trained regression model ",
    choices: ["1", "2", "3", "4"],
    correct: 2
  }
];

window.onload = beginQuiz;

function beginQuiz() {
    form.style.display = "block";
    instructions.style.display = "block";
    showScore.style.display = "none";
    quiz.style.display = "none";
    submitBtn.style.display = "none";
    i = 0;
    score = 0;
    displayQCount.innerHTML = 1;
    displayScore.innerHTML = 0;
}

startBtn.addEventListener("click", function() {
    instructions.style.display = "none";
    submitBtn.style.display = "block";
    quiz.style.display = "block";
    getQAs();
});

submitBtn.addEventListener("click", function() {
    allRadios = document.getElementsByName("option");
    var isChecked = false;
    for (var j = 0; j < allRadios.length; j++) {
        if (allRadios[j].checked) {
            isChecked = true;
            checkedRadio = j;
            break;
        }
    }
    if (!(isChecked)) {
        alert("Please select an answer before moving on");
    } else {
        getResults();
        deselectRadios();
        i++;
        displayQCount.innerHTML = i + 1;
        getQAs();
    }
});

function deselectRadios() {
    allRadios = document.getElementsByName("option");
    for (var p = 0; p < allRadios.length; p++) {
        allRadios[p].checked = false;
    }
}

function getResults() {
        if (allRadios[checkedRadio].value === questions[i].choices[questions[i].correct]) {
            score++;
            displayScore.innerHTML = score;
        }
}

function getQAs() {
    if (i < 5) {
        askQuestion.innerHTML = questions[i].question;
        for (var k = 0; k < 4; k++) {
            document.getElementById("answer" + k).innerHTML = questions[i].choices[k];
            document.getElementById("answer" + k).setAttribute("for", questions[i].choices[k]);
            document.getElementById("label" + k).setAttribute("value", questions[i].choices[k]);
        }
    } else {
        displayResults();
    }
};

function displayResults() {
    quiz.style.display = "none";
    showScore.style.display = "block";
    inform.innerHTML = "Congratulations!! You scored " + score + " out of 5 correct.";
};

resetBtn.addEventListener("click", function() {
    beginQuiz();
});