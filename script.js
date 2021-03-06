const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const secondEl = document.getElementById('second')
const instructionsEl = document.getElementById('instructions')
const currentScoreEl = document.getElementById('currentScore')
const containerEl = document.getElementById('container')
const clockEl = document.getElementById('clockdiv')
const quizDone = document.getElementById('done');
const finalScore = document.getElementById('score');
const countdownEl = document.getElementById('countdown')
const secEl = document.getElementById('sec')
const initialButtonEl = document.getElementById('initial-btn')
const showScore = document.getElementById('savedScore');
const showingScore = document.getElementById('saved-score');
const goBack = document.getElementById('go-back-btn');
const clearBtn = document.getElementById('clear-btn');
let initials = document.getElementById('newInitials')
let timeLeft = 60


var timer = function() {
    var timeInterval = setInterval(function() {
        if (timeLeft > 0 && currentQuestionIndex < questions.length) {
            timeLeft--
            secondEl.textContent = timeLeft
        } else {
            clearInterval(timeInterval)
            score()
        }

  
     
//    // secondEl.innerHTML = seconds;
//     //if (t < 0) {
//        // clearInterval(x);
//        if (t === 0) {
//         clearInterval(t);
//         document.getElementById("demo").innerHTML = "TIME UP";
//         document.getElementById("second").innerHTML = '0';
//     }
}, 1000);
}

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


function setNextQuestion() {
    resetState()
    showQuestion()
}



function startGame() {
    startButton.classList.add('hide')
    instructionsEl.classList.add('hide')

    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    timer()
}



function showQuestion(question) {
    questionElement.innerText = questions[currentQuestionIndex].question
    questions[currentQuestionIndex].answers.forEach((answer, i) => {
        var id = i + 1
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (!correct) {
        timeLeft = Math.max(0, timeLeft - 10)
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        score()
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
        
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function score() {
    containerEl.classList.add('hide')
    questionContainerElement.classList.add('hide')
    currentScoreEl.classList.remove('hide')
    clockEl.classList.add('hide')
    secondEl.classList.add('hide')
    countdownEl.classList.add('hide')
    secEl.classList.add('hide')
    currentScore.classList.remove('hide')
    quizDone.innerText = "All done!"
    finalScore.innerText = "Your final score is " + timeLeft + "."
};

function saveScore() {
    localStorage.setItem('timeLeft', timeLeft)
    localStorage.setItem('initials', initials.value)
    back()
}

function displayScore() {
    containerEl.classList.add('hide')
    questionContainerElement.classList.add('hide')
    currentScoreEl.classList.add('hide')
    clockEl.classList.add('hide')
    secondEl.classList.add('hide')
    countdownEl.classList.add('hide')
    secEl.classList.add('hide')
    currentScore.classList.add('hide')
    showScore.classList.remove('hide')
    let savedScore = localStorage.getItem('timeLeft');
    let savedInitials = localStorage.getItem('initials')
    if (savedScore === null || savedInitials === null) {
        showingScore.innerHTML = "No saved score"
    }
    else {
        showingScore.innerHTML = savedInitials + "-" + savedScore
     }
}

function back() {
    window.location.reload()
}

function deleteScore() {
    localStorage.clear(); 
    displayScore();
}

const questions = [
    {
        question: 'What food makes up nearly all (around 99%) of a Giant Panda’s diet?',
        answers: [
            { text: 'Hay', correct: false },
            { text: 'Bamboo', correct: true },
            { text: 'Leaves', correct: false },
            { text: 'All of the above', correct: false }
        ]
    },
    {
        question: 'Bees are found on every continent of earth except for one, which is it?',
        answers: [
            { text: 'Antarctica', correct: true },
            { text: 'Australia', correct: false },
            { text: 'North America', correct: false },
            { text: 'South America', correct: false }
        ]
    },
    {
        question: 'What is the largest land animal in the world?',
        answers: [
            { text: 'Gorilla', correct: false },
            { text: ' Elephant', correct: true },
            { text: 'Giraffe', correct: false },
            { text: 'Rhino', correct: false }
        ]
    },
    {
        question: 'Are butterflies insects?',
        answers: [
            { text: 'Yes', correct: true },
            { text: 'No', correct: false }
        ]
    }
]

initialButtonEl.addEventListener("click", saveScore);

viewScore.addEventListener("click", displayScore);
goBack.addEventListener("click", back);
clearBtn.addEventListener("click", deleteScore);