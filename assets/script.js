//array of question URLs
const pages =["question1.html","question2.html","question3.html","question4.html",
"question5.html","question6.html","question7.html","question8.html","question9.html",
"question10.html",]

// get currentQuestionIndex and remainingTime from localStorage or set to 0
let currentQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex')) || 0;
let remainingTime = parseInt(localStorage.getItem('remainingTime')) || 0;

// update question number element
function updateQuestionNumber() {
    let questionNumberElement = document.getElementById("questionNumber");
    if (questionNumberElement) {
        questionNumberElement.textContent = "Question Number: " + (currentQuestionIndex + 1);
    }
}

// update timer element
function updateTimer() {
    let timerElement = document.getElementById("timerDisplay");
    if (timerElement) {
        timerElement.textContent = "Timer: " + remainingTime + "s";
    }
}

//check if there are more questions
function nextQuestion() {
    if (currentQuestionIndex < pages.length -1){
        currentQuestionIndex++;
        updateQuestionNumber();
        // save the currentQuestionIndex in localStorage
        localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
        // go to next question
        window.location.href = pages[currentQuestionIndex];
    } else {
        // change to score screen
        alert('last question');
    }   
}

// takes you to first question
function startQuiz() {
    updateQuestionNumber();
    // save the currentQuestionIndex in localStorage
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
    if (remainingTime === 0){
        remainingTime = 75;
        localStorage.setItem("remainingTime", remainingTime);
    }
    // go to the first question
    window.location.href = pages[currentQuestionIndex];

    // starts the countdown 
    startTimer();
}

// Start the countdown timer
function startTimer() {
    // Set the total time for 75 seconds 
    const totalTime = 75;

    // Update the timer every second
    const timerInterval = setInterval(function () {
        remainingTime--;

        // Save the remaining time in localStorage
        localStorage.setItem('remainingTime', remainingTime);

        // Update the timer display
        updateTimer();

        // Check if time has run out
        if (remainingTime <= 0) {
            clearInterval(timerInterval); // Stop the timer
            // Perform actions when time is up 
            alert('Time is up!');
        }
    }, 1000); // Update every 1 second
}


if (currentQuestionIndex === 0) {
    // event listener for "Start Quiz" if it exist
    let startButton = document.getElementById("start-button");
    if (startButton) {
        startButton.addEventListener("click", startQuiz);
    }
} else {
    updateQuestionNumber();
    updateTimer();
}
