// Select Elements
let countSpan = document.querySelector(" .count span");
let bulletspanContainer = document.querySelector(".bullets .spans ");
let quizArea = document.querySelector(" .Quest")
let answersArea = document.querySelector(" .answer_area")



// Set Options
let currentIndex = 0;

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
        }
    };

    myRequest.open("GET", "js/example.json", true);
    myRequest.send();
}

getQuestions();


function createBullets(num) {
    countSpan.innerHTML = num;

    // Create Spans
    for (let i = 0 ; i < num; i++) {

    // Create Spans
        let theBullet = document.createElement("span");

        // Check if Its First Span
        if (i === 0 ) {
            theBullet.className = "on";
        }

    // Append Bullets To Main Bullet Container
    bulletspanContainer.appendChild(theBullet);
    }
}

function addQuestionData(obj, count) {
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

        // Make first Option selcted
        if (i === 1) {
            radioInput.checked = true;
        }

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