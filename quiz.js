//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "What is the best strategy for preventing drug abuse?",
        options: ["Ignoring the issue", "Open communication and education", " Encouraging isolation", "Promoting experimentation"],
        correct: "Open communication and education",
    },
    {
        id: "1",
        question: "Which factor is NOT a protective factor against drug abuse in adolescents??",
        options: ["Academic success", "Peer pressure", "Positive role models", "Strong family bonds"],
        correct: "Peer pressure",
    },
    {
        id: "2",
        question: "What is a common warning sign that someone may be struggling with substance abuse?",
        options: ["Regular exercise routine", " Changes in behavior and mood", "Improved academic performance", "Increased social activities"],
        correct: " Changes in behavior and mood",
    },
    {
        id: "3",
        question: "Which of the following is an effective prevention approach for schools?",
        options: ["Ignoring the issue to avoid sensationalizing it", "Punishing students who admit drug use", "Providing accurate information and life skills training", "Limiting access to extracurricular activities"],
        correct: "Providing accurate information and life skills training",
    },
    {
        id: "4",
        question: "What role can parents play in preventing drug abuse in their children?",
        options: ["Disregard their child's friends", " Avoid discussing the topic", "Set clear expectations and consequences", "Encourage secrecy"],
        correct: "Set clear expectations and consequences",
    }, 
    {
        id: "5",
        question: "Which of the following is an example of a refusal skill?",
        options: ["Giving in to peer pressure", "Ignoring the situation", "Saying no assertively", " Going along with the crowd"],
        correct: "Saying no assertively",
    },
    {
        id: "6",
        question: "What is the key message of prevention programs aimed at children and teenagers?",
        options: [" Experimenting with drugs is cool", "Ignoring the issue is the best approach", "There are consequences to drug use", "Peer pressure should be embraced"],
        correct: "There are consequences to drug use",
    },
    {
        id: "7",
        question: "How can communities contribute to drug prevention efforts?",
        options: ["Focusing solely on punishment", " Avoiding community engagement", "Creating supportive environments and resources", "Isolating individuals with a history of drug use"],
        correct: "Creating supportive environments and resources",
    },
    {
        id: "8",
        question: "What is the purpose of drug-free workplace policies?",
        options: ["To increase stress and anxiety", "To create a safe and healthy work environment", "To provide free drugs to employees", "To encourage substance abuse"],
        correct: "To create a safe and healthy work environment",
    },
    {
        id: "9",
        question: "What is the role of healthcare professionals in drug prevention?",
        options: ["Ignoring signs of substance abuse", "Prescribing drugs without assessing the patient's needs", " Providing education and early intervention", " Encouraging excessive drug use"],
        correct: "Providing education and early intervention",
    },
  
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};