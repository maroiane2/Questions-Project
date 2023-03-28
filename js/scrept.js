// Select Elements
let countSpan = document.querySelector(" .count span");
let bulletsElment = document.querySelector(".bullets")
let bulletspanContainer = document.querySelector(".bullets .spans ");
let quizArea = document.querySelector(" .Quest")
let answersArea = document.querySelector(" .answer_area")
let submitButton = document.querySelector(".boxAll .Question button")
let timeer = document.querySelector(".time")
let resultsContainer = document.querySelector(".results")
let countdownElement = document.querySelector(".time")


// Set Options
let currentIndex = 0;
let RightAnswer = 0;
let countdownInterval;

function getQuestions() {

    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questionsObject = JSON.parse(this.responseText);
            let qCount = questionsObject.length;

            //Creat Bullets +set Questions Count
            createBullets(qCount)

            // Add Question Data
            addQuestionData(questionsObject[currentIndex], qCount);

            // Start CountDown
            countdown(5, qCount);

            // Click on Submit 
            submitButton.onclick = () => {
                // Get figh answer
                let theRightAnswer = questionsObject[currentIndex].right_answer;

                // Increase index
                currentIndex++;

                // Check the Answer
                checkAnswer(theRightAnswer, qCount);

                // remove Previous QUestion
                quizArea.innerHTML = "";
                answersArea.innerHTML = "";

                // Add Question Data
                addQuestionData(questionsObject[currentIndex], qCount);

                // handle bullets Class
                handleBullets();

                // Start CountDown
                clearInterval(countdownInterval);
                countdown(5, qCount);

                // show Results
                showResults(qCount);
            };
        }
    };

    myRequest.open("GET", "js/example.json", true);
    myRequest.send();
}

getQuestions();


function createBullets(num) {
    countSpan.innerHTML = num;

    // Create Spans
    for (let i = 0; i < num; i++) {

        // Create Spans
        let theBullet = document.createElement("span");

        // Check if Its First Span
        if (i === 0) {
            theBullet.className = "on";
        }

        // Append Bullets To Main Bullet Container
        bulletspanContainer.appendChild(theBullet);
    }
}

function addQuestionData(obj, count) {
    if (currentIndex < count) {
        //Create H2 Question title
        let questionstitle = document.createElement("h2");

        // Create Question Text
        let questionsText = document.createTextNode(obj['title'])

        // append Text to h2
        questionstitle.appendChild(questionsText);

        // append the h2 to the Quiz Area
        quizArea.appendChild(questionstitle);

        //Create The Answers
        for (let i = 1; i <= 4; i++) {
            // Create Main Answer div
            let mainDiv = document.createElement("div");

            // add class to main Div
            mainDiv.className = 'answer';

            // create A B C D
            let h2ABCD = document.createElement("h2");
            const letter = String.fromCharCode(64 + i);
            h2ABCD.innerHTML = letter;

            //Create Radio Input
            let radioInput = document.createElement("input");

            // add type + name + Id + DAta-attribute
            radioInput.name = 'questions';
            radioInput.type = 'radio';
            radioInput.id = `answer_${i}`;
            radioInput.dataset.answer = obj[`answer_${i}`];

            // // Make first Option selcted
            // if (i === 1) {
            //     radioInput.checked = true;///////////////////////////
            // }

            // create label
            let theLabal = document.createElement("label");

            // add for Attribute
            theLabal.htmlFor = `answer_${i}`;

            // create label Text
            let theLabalText = document.createTextNode(obj[`answer_${i}`]);

            //add the Text to label
            theLabal.appendChild(theLabalText)

            // add input + label to main div
            mainDiv.appendChild(h2ABCD);
            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(theLabal);

            // append all divs to answer area
            answersArea.appendChild(mainDiv)
        }
    }
}

function checkAnswer(rAnswer, count) {
    let answers = document.getElementsByName("questions")
    let theChoosenAnswer;

    for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            theChoosenAnswer = answers[i].dataset.answer;
        };

    };

    if (rAnswer === theChoosenAnswer) {
        RightAnswer++;
        console.log("good Answer");
    }
};

function handleBullets() {
    let bulletsSpans = document.querySelectorAll(" .bullets .spans span");
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span, index) => {
        if (currentIndex === index) {
            span.className = "on";
        }
    })
}

function showResults(count) {
    let theResults;
    if (currentIndex === count) {
        quizArea.remove();
        answersArea.remove();
        submitButton.remove();
        bulletsElment.remove();
        timeer.remove();

        if (RightAnswer > count / 2 && RightAnswer < count) {
            theResults = `<span class="good">Good</span>, ${RightAnswer} from ${count} this Is Good.`;
        } else if (RightAnswer === count) {
            theResults = `<span class="perfect">perfect</span>, All Answers Is Good.`;
        } else {
            theResults = `<span class="bad">bad</span>, ${RightAnswer} from ${count} this Is not Good.`;
        }
        // resultsContainer.styl.display= "au";
        resultsContainer.innerHTML = theResults;
        resultsContainer.style.margin = '227px';
        resultsContainer.style.border = '#000 solid px';
    }
}

function countdown(duration, count) {
    if (currentIndex < count) {
        let minutes, seconds;
        countdownInterval = setInterval(function () {
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);

            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;

            countdownElement.innerHTML = `${minutes}:${seconds}`;

            if (--duration < 0) {
                clearInterval(countdownInterval);
                submitButton.click()
            }

        }, 1000);
    }
}