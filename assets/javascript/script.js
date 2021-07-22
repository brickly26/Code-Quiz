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
var startButton = document.getElementById("startButton");
var timer = document.getElementById("timer");
var previousHigh = document.getElementById("prevHighscore");
var questionEl = document.getElementById("question");


// DATA
var Question = [
    question1 = {
        question: "Inside which HTML element do we put the JavaScript?";
        answer: "<script>";
        choice1: "<javascript>";
        choice2: "<js>";
        choice3: "<scripting>";
    }
    question2 = {
        question: "Where is the correct place to insert a JavaScript?";
        answer: "<body>";
        choice1: "<section>";
        choice2: "<main>";
        choice3: "<footer>";
    }
    }
    question3 = {
        question: "How do you create a function in JavaScript?";
        answer: "function myFunction()";
        choice1: "function:myfunctions()";
        choice2: "function = myfunction()";
        choice3: "fucntion.myfunction()";
    }
    }
]

var score = 0;

// FUNCTIONS
function clickStart() {
    var time = 0;
    startTimer();

}


function startTimer() {
    setInterval(function(){ 


     }, 3000);
}

function renderQuestion() {

}

function gameOver {

}
// USER INTERACTION