
// const Questions = {
//     Questions01: {
//         QuesName: "What is he capital of Italy?",
//         Answer: {
//             A: "Venice",
//             B: "Florence",
//             C: "Rome",
//             D: "Naples",
//             right_answer: "Rome"
//         }
//     }
// }

// var { Questions01: { QuesName, Answer: { A, B, C, D, right_answer } } } = Questions;
// let QuesNames = document.getElementById('Ques-name')

// window.onload = function () {
//     // QuesNames.innerHTML = QuesName;
//     var info = Ques01 = [A, B, C, D];
//     var divs = document.getElementsByTagName('main');
//     var divsArray = Array.prototype.slice.call(divs);
//     var randomDivs = [];
//     for (var i = 0; i < 4; i++) {
//         var randomIndex = Math.floor(Math.random() * divsArray.length);
//         randomDivs.push(divsArray[randomIndex]);
//         divsArray.splice(randomIndex, 1);
//     }
//     for (var i = 0; i < info.length; i++) {
//         var element = document.createElement('p');
//         element.innerHTML = info[i];
//         randomDivs[i].appendChild(element);
//     }
// }











window.onload = function () {
    let QuesNames = document.getElementById('Ques-name')
    var xReq = new XMLHttpRequest();
    xReq.open('GET', 'js/example.json');
    xReq.onload = function () {
        var xData = JSON.parse(xReq.responseText);
        const [{title ,A, B, C, D, right_answer},{},{},{},{},{},{} ] = xData;

        var info = [A, B, C, D];
        QuesNames.innerHTML = title;
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
        
    };
    xReq.send();

}

// let Ans = document.getElementsByTagName('p')