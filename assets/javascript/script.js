/*

    when button is click start game function is run
        start game function
        start timer
        if time > 0 && questions array length != 0
        loop through questions
            pick random question from array or objects
            render questions
            when an answer is picked  check it if its correct
            display next question

        else if time > 0 questions array =0
            game over
            display score
            ask for name
            store name in local storage 
        
        else 
            game over
            display score
            ask for name
            store in local storage
        


    when high score is click
        retrieve last score from local storage
        display score


*/




// DEPENDECIES
var startBtn = document.getElementById("startButton");
var timerEl = document.getElementById("timer");
var previousHigh = document.getElementById("prevHighscore");
var questionEl = document.getElementById("question");
var choice1 = document.getElementById("option1");
var choice2 = document.getElementById("option2");
var choice3 = document.getElementById("option3");
var choice4 = document.getElementById("option4");
var choices = document.getElementById("choices")
var resultEl = document.getElementById("result")


// DATA
var Question = [
    question1 = {
        question: "Inside which HTML element do we put the JavaScript?",
        option1: "<js>",
        option2: "<javascript>",
        option3: "<script>", //correct
        option4: "<scripting>",
    },
    question2 = {
        question: "Where is the correct place to insert a JavaScript?",
        option1: "<head>", //correct
        option2: "<section>",
        option3: "<main>",
        option4: "<footer>",
    },
    question3 = {
        question: "How do you create a function in JavaScript?",
        option1: "function:myfunctions()",
        option2: "function myFunction()", //correct
        option3: "function = myfunction()",
        option4: "fucntion.myfunction()",
    }
]

var answer = ["<script>", "<head>", "function myFunction()"]

var score;
var timeLeft;
var gameOver = false;

// FUNCTIONS

function startGame() {
    score = 0;
    timeLeft = 5;
    var timerInterval = setInterval(doTimer, 1000)
    console.log(timeLeft);
    var counter = 0;
    renderQuestion(counter)
}

function doTimer() {
    timeLeft--;
    timerEl.textContent = `${timeLeft} seconds left`;
    if (timeLeft === 0) {
        clearInterval(timerInterval);
        gameOver = true;
    }

}

function renderQuestion(i) {
    if(i < Question.length) {
        questionEl.textContent = Question[i].question;
        choice1.textContent = Question[i].option1;
        choice2.textContent = Question[i].option2;
        choice3.textContent = Question[i].option3;
        choice4.textContent = Question[i].option4;
    } else {
        gameOver();
    }
    choices.addEventListener("click", function(event) {
        var element = event.target;
        if (element.matches("button")) {
            var temp = element.innerText;
            if (answer.includes(temp)) {
                resultEl.textContent = "Correct"
                score = score + 5;
            }
            else {
                resultEl.textContent = "Incorrect"
            }
            i++
            renderQuestion(i)
            console.log(score)
        }
    })


}

function gameOver() {
    previousHigh.textContent = `Your score: ${score}`
}

// USER INTERACTION 

startBtn.addEventListener("click", startGame)