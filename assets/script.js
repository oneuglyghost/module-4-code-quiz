// array of question URLs
const pages = [
    "question1.html", "question2.html", "question3.html", "question4.html",
    "question5.html", "question6.html", "question7.html", "question8.html", "question9.html",
    "question10.html",
  ];

var correct = [
    "2.var x;", "2.margin: auto;", "2.It adds space inside the border of an element.",
    "1.a:hover { color: red; }", "2.It contains metadata about the document", "1. Checks for equality without type coercion",
    "1.color", "1.HyperText Markup Language", "1./* This is a comment */", "2.margin",
];
  
// get currentQuestionIndex and remainingTime from localStorage or set to 0
let currentQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex')) || 0;
let remainingTime = parseInt(localStorage.getItem('remainingTime')) || 0;
var ProblemNumber = currentQuestionIndex  
var score =parseInt(localStorage.getItem("score")) || 0;
let timerInterval;  

// update question number element
function updateQuestionNumber() {
  let questionNumberElement = document.getElementById("questionNumber");
  if (questionNumberElement) {
    questionNumberElement.textContent = "Question Number: " + (ProblemNumber);
  }
}

  
// update timer element
function updateTimer() {
  let timerElement = document.getElementById("timerDisplay");
  if (timerElement) {
    timerElement.textContent = "Timer: " + remainingTime + "s";
  }
}
// updates checked answer
function UpdateResult() {
  var resultElement = document.getElementById("result");
  var storeResult =localStorage.getItem("result");
  if (resultElement && storeResult){
    resultElement.textContent = storeResult;
  }
}

function checkAnswer(buttonText){
  // checks if the clicked text matches any item in "correct"
  var displayResult = document.getElementById("result");

  if (correct.includes(buttonText)) {
    displayResult.textContent = "Correct!";
    localStorage.setItem("result", "Correct!")

    //adds 5points to score
    score += 5;
    localStorage.setItem("score", score);

  } else {
    displayResult.textContent = "Incorrect";
    localStorage.setItem("result", "Incorrect")
    
    // subtract 5 seconds from timer
    var remainingTime = parseInt(localStorage.getItem("remainingTime")) || 0;
    remainingTime = Math.max(0, remainingTime - 5); // stops it from going bellow 0
    localStorage.setItem("remainingTime", remainingTime);

    updateTimer();
  }
}

// shows final sscore
function updateScore(){
  var scoreDisplay = document.getElementById("scoreDisplay");
  if (scoreDisplay) {
    scoreDisplay.textContent = "Score:" + score;
  }
}
  
// check if there are more questions
function nextQuestion() {
  console.log("nextQuestion")
  //gets text from clicked button
  var buttonText = event.target.textContent.trim();
  console.log("Button text:", buttonText);

  if (buttonText === "Start Quiz") {
    console.log("quiz Started");
  } else{
    checkAnswer(buttonText);
  }

  if (currentQuestionIndex < pages.length - 1) {
    currentQuestionIndex++;
    updateQuestionNumber();
     //save the currentQuestionIndex in localStorage
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
     //go to next question
    window.location.href = pages[currentQuestionIndex];
  } else {
     //change to score screen
    window.location.href = "scoreSubmit.html";
  }
}  
  
 // takes you to the first question
function startQuiz() {
  console.log("startQuiz function called")
  // save the currentQuestionIndex in localStorage
  localStorage.setItem('currentQuestionIndex', currentQuestionIndex);

  if (remainingTime === 0) {
    remainingTime = 75;
    localStorage.setItem("remainingTime", remainingTime);

    // starts the countdown 
    startTimer();
    // Move to the next question after starting the quiz
    nextQuestion();
  }
}
  
  // Start the countdown timer
function startTimer() {
    // Update the timer every second
  timerInterval = setInterval(function () {
    remainingTime--;
  
      // Save the remaining time in localStorage
    localStorage.setItem('remainingTime', remainingTime);
  
      // Update the timer display
    updateTimer();
  
      // Check if time has run out
    if (remainingTime <= 0) {
      clearInterval(timerInterval); // Stop the timer
        // Perform actions when time is up 
      window.location.href = "scoreSubmit.html";
    }
  }, 1000);

}  
// stops the timer and sets it to 0 when scoreSubmit page opens
function stopTimerandReset(){
  clearInterval(timerInterval);
  remainingTime = 0; //makes timer 0
  localStorage.setItem("remainingTime", remainingTime);
  updateTimer();

  //reset the question index
  currentQuestionIndex = 0;
  localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
  updateQuestionNumber();
}
//resets the score
function resetscore(){
  score = 0;
  localStorage.setItem("score",score);
  updateScore();
}
  // event listener for "Start Quiz" if it exists and has not been attached yet
if (currentQuestionIndex === 0) {
  console.log("attaching event listener");
  let startButton = document.getElementById("start-button");
  if (startButton) {
    startButton.addEventListener("click", startQuiz);
  }
} else {
  console.log("not attaching event listener current index:"+ currentQuestionIndex);
  updateQuestionNumber();
  updateTimer();
  
  if (remainingTime > 0) {
    startTimer();
  }
}


// submit users score
function submitScore(){
  var userInput = document.getElementById("userInput").value;
  var userScore = parseInt(localStorage.getItem("score")) || 0;

//get existing high scores or make a new array
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScores.push({name:userInput, score: userScore});

// to sort high scores arrey by score 
highScores.sort(function (a, b){
  return b.score -a.score;
});

localStorage.setItem("highScores", JSON.stringify(highScores));

window.location.href = "highScores.html";

}


// display the high scores when page opens
function displayHighScores(){

  //checks if we are in the right html
  if (location.pathname.includes("highScores.html")){
    var highScoresList = document.getElementById("highScoresList");
  

    var highScoresList = document.getElementById("highScoresList");

    // get high scores from local storage
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // fill list with scores
    highScoresList.innerHTML = "";
    highScores.forEach(function(score, index) {
      var listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${score.name} - ${score.score}`;
      highScoresList.appendChild(listItem);

    })
  }
}
function goBack() {
  window.location.href = "index.html";
}

// clears all local data and refreshes the page
function clearLocalStorage() {
  localStorage.clear();
  location.reload();

  alert("Your High Scores have been cleared!")
}

// For other pages, update question number and timer
updateQuestionNumber();
updateTimer();
UpdateResult();
updateScore()
displayHighScores();
