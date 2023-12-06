//array of question URLs
const pages =["question1.html","question2.html","question3.html","question4.html","question5.html","question6.html","question7.html","question8.html","question9.html","question10.html",]

// counter to keep track of the current question
let currentQuestionIndex = 0;

// update question number element
function updateQuestionNumber() {
    document.getElementById("questionNumber").textContent
}

//check if there are more questions
function nextQuestion() {
    if (currentQuestionIndex < pages.lenth -1){
        currentQuestionIndex++;
        updateQuestionNumber();
        // go to next question
        window.location.href = pages[currentQuestionIndex];
    } else {
        // change to score screen
        alert('last question');
    }   
}
updateQuestionNumber();