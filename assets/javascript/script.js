// DEPENDECIES
var landingEl = document.getElementById("landing-el");
var questScreenEl = document.getElementById("question-el");
var endScreenEl = document.getElementById("ending-el");
var highscoreEl = document.getElementById("highscore-el");
var viewHighEl = document.getElementById("view-high");
var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start");
var saveBtn = document.getElementById("save");
var bodyEl = document.querySelectorAll(".body");
var titleEl = document.querySelectorAll(".title");
var inputEl = document.getElementById("input");
var responseEl = document.getElementById("response");
var retryBtn = document.querySelectorAll("#back-to-start");

// DATA

var timeLeft = 60;
var questionNum = 0;
var userScore = 0;
var actualTimer;
var currentAnswer;

var questions = [
    {
        question: "How to write an IF statement in JavaScript?",
        choices: ["if (i===5)", "if i===5 then", "if i=5", "if i=5 then"],
        answer: "if (i===5)"
    },
    {
        question: "How do you call a function named 'myFunction'?",
        choices: ["call myFunction()", "myFunction()", "function myFunction()", "myFunction = () => {}"],
        answer: "myFunction()"
    },
    {
        question: "How can you add a comment in a JavaScript?",
        choices: ["/*Comment*/", "--Comment--", "'Comment'", "//Comment"],
        answer: "//Comment"
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        choices: ["=", "*", "===", "!=="],
        answer: "="
    }
]
// FUNCTIONS

function startTimer() {
    actualTimer = setInterval(doTimer, 1000);
}

function doTimer() {
    if (timeLeft <= 0) {
        clearInterval(actualTimer);
        renderEnding();
        return
    }
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;

}

function startGame() {
    questScreenEl.style.display = "flex";
    landingEl.style.display = "none";
    endScreenEl.style.display = "none";
    highscoreEl.style.display = "none";
    questionNum = 0;
    score = 0;
    timeLeft = 60;
    startTimer()
    renderQuestion();
}

function renderQuestion() {
    titleEl[1].children[0].textContent = questions[questionNum].question;
    for (var i = 0; i < questions[questionNum].choices.length; i++) {
        bodyEl[1].children[i].textContent = questions[questionNum].choices[i];
    }

}

function checkAnswer(event) {
    var userInput = event.target.innerText;
    console.log(userInput);
    console.log(questions[questionNum].answer);
    if (userInput === questions[questionNum].answer) {
        questionNum++;
        userScore += 5
        responseEl.style.color = 'green'
        responseEl.textContent = "✓ Correct"
        setTimeout(function() {responseEl.textContent = ""}, 2000);
        renderQuestion();
    } else {
        responseEl.style.color = 'red'
        responseEl.textContent = "X Incorrect"
        setTimeout(function() {responseEl.textContent = ""}, 2000);
        if(timeLeft > 5) {
            timeLeft -= 5;
            questionNum++;
            renderQuestion();
        } else {
            timeLeft = 0;
            endGame();
        }
    }
}

function endGame() {
    clearInterval(actualTimer);
    renderEnding();
}

function renderEnding() {
    questScreenEl.style.display = "none";
    landingEl.style.display = "none";
    endScreenEl.style.display = "flex";
    highscoreEl.style.display = "none";
    timerEl.textContent = "Time: " + timeLeft;
    var endText = bodyEl[2].children[0]
    endText.textContent = "Your final score is " + userScore + "! Save your score to the leaderboard, or try again."
}

function renderHighscore () {
    questScreenEl.style.display = "none";
    landingEl.style.display = "none";
    endScreenEl.style.display = "none";
    highscoreEl.style.display = "flex";
    var scores = JSON.parse(localStorage.getItem("Highscores"));
    var tableEl = bodyEl[3].children[0];
    if(tableEl.children.length > 1) {
        for (var i = 1; i < tableEl.children.length; i++) {
            tableEl.removeChild(tableEl.children[i]);
        }
    }
    console.dir(tableEl);
    for (var i = 0; i < scores.length; i++) {
        var tableRow = document.createElement('tr');
        var tableName = document.createElement('th');
        var tableScore = document.createElement('th');

        tableName.textContent = scores[i].name;
        tableScore.textContent = scores[i].score;
        tableName.setAttribute("style", "font-weight:normal;text-align:left;padding:3px;");
        tableScore.setAttribute("style", "font-weight:normal;text-align:left;padding:3px;")

        tableRow.append(tableName);
        tableRow.append(tableScore);

        tableEl.append(tableRow);
    }
}

function saveScore() {
    var userName = inputEl.value;
    if (!localStorage.getItem("Highscores")) {
        var tempHighscore = [
            {
                name: userName,
                score: userScore
            }
        ]
        localStorage.setItem("Highscores", JSON.stringify(tempHighscore));
    } else {
        var tempHighscore = JSON.parse(localStorage.getItem("Highscores"));
        console.log(tempHighscore)
        tempHighscore.push({
            name: userName,
            score: userScore
        });
        localStorage.setItem("Highscores", JSON.stringify(tempHighscore))
    }
    renderHighscore();
}

function renderHome() {
    console.log("hello");
    questScreenEl.style.display = "none";
    landingEl.style.display = "flex";
    endScreenEl.style.display = "none";
    highscoreEl.style.display = "none";
}

// USER INTERACTION 

bodyEl[1].addEventListener('click', function(event) {
    if (questionNum < questions.length-1) {
        checkAnswer(event);
    } else {
        if(event.target.innerText === questions[questionNum].answer) {
            userScore += 5
            responseEl.style.color = 'green'
            responseEl.textContent = "✓ Correct"
        } else {
            responseEl.style.color = 'red'
            responseEl.textContent = "X Incorrect";
            if(timeLeft > 5) {
                timeLeft -= 5;
            } else {
                timeLeft = 0;
            }
        }
        setTimeout(function() {responseEl.textContent = ""}, 2000); 
        endGame();
    }
});

startBtn.addEventListener('click', startGame);

viewHighEl.addEventListener('click', renderHighscore);

saveBtn.addEventListener('click', saveScore);

retryBtn[0].addEventListener('click', renderHome);
retryBtn[1].addEventListener('click', renderHome);
