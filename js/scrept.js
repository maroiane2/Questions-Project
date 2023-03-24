const Questions = {
    Questions01: {
        QuesName: "What is he capital of Italy?",
        Answer: {
            A: "Venice",
            B: "Florence",
            C: "Rome",
            D: "Naples",
            right_answer: "Rome"
        }
    }
}

var { Questions01: { QuesName, Answer: { A, B, C, D, right_answer } } } = Questions;
let QuesNames = document.getElementById('Ques-name')

window.onload = function () {
    QuesNames.innerHTML = QuesName;
    var info = Ques01 = [A, B, C, D];
    var divs = document.getElementsByTagName('main');
    var divsArray = Array.prototype.slice.call(divs);
    var randomDivs = [];
    for (var i = 0; i < 4; i++) {
        var randomIndex = Math.floor(Math.random() * divsArray.length);
        randomDivs.push(divsArray[randomIndex]);
        divsArray.splice(randomIndex, 1);
    }
    for (var i = 0; i < info.length; i++) {
        var element = document.createElement('p');
        element.innerHTML = info[i];
        randomDivs[i].appendChild(element);
    }
}












// var xReq = new XMLHttpRequest();

// xReq.open('GET', 'js/example.json');
// xReq.onload = function() {
//     var xData = JSON.parse(xReq.responseText)
//     QuesNames.innerHTML = xData[2];
// };
// xReq.send();












//let Quest01 = document.getElementById('Quest01')
// let ANswer = document.getElementById('ANswer')
// let ANswer1 = document.getElementById('ANswer1')
// let ANswer2 = document.getElementById('ANswer2')
// let ANswer3 = document.getElementById('ANswer3')
// let ANswer4 = document.getElementById('ANswer4')

// ANswer.onclick =  () =>{
//     if (ANswer1 == right_answer) {
//         Quest01.style.background = "green"
//     }

//     else if (ANswer2 == right_answer) {
//         Quest01.style.background = "green"
//     }

//     else if (ANswer3 == right_answer) {
//         Quest01.style.background = "green"
//     }

//     else if (ANswer4 == right_answer) {
//         Quest01.style.background = "green"
//     }

//     else {
//         Quest01.style.background = "red"
//     }
// };