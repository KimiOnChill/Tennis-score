//ADD more variables to getElementById

//define all vars
const gameArray = [];
const setArray = [];

const serve1 = document.getElementById('first-to-serve');
const serve2 = document.getElementById('second-to-serve');
const button1 = document.getElementById('first-button');
const button2 = document.getElementById('second-button');
const resetButton = document.getElementById('reset');

const name1 = document.getElementById('first-name');
const name2 = document.getElementById('second-name');

const ball1 = document.getElementById('first-ball');
const ball2 = document.getElementById('second-ball');

const mainBlock = document.getElementById('main-block'); 
const matchScore = document.getElementById('match-score');
const setScore = document.getElementById('set-score');
const gameScore = document.getElementById('game-score');

const zeroLine = document.getElementById('zero-line');
const firstLine = document.getElementById('first-line');
const secondLine = document.getElementById('second-line');
const tableName1 = document.getElementById('table-name-1');
const tableName2 = document.getElementById('table-name-2');

let firstPoint = 0;
let firstPointSet = 0;
let firstPointMatch = 0;
let secondPoint = 0;
let secondPointSet = 0;
let secondPointMatch = 0;
let setAmmount;
let isTie = false;

//determine the amount of sets
const pickedRadio = () => {
    const radios = document.getElementsByName('option');
    for (const radio of radios){
        if (radio.checked){
            return parseInt(radio.value);
        }
    }
}
const radios = document.getElementsByName('option');
for (const radio of radios){
    radio.addEventListener('change', ()=>{
    if (radio.checked){
        document.getElementById('message').innerText = `${radio.value} sets are selected`;;
    }})
}

//3 letters of each name to button`s text
const nameTrim = (name) => {
    let a = name.split("");
    let trimResult = [];
    for (let i = 0; i <= 2; i++){
        trimResult.push (a[i]);
    }
    return trimResult.join("");
}
name1.addEventListener('input', () => {
    const nameValue1 = name1.value;
    serve1.textContent = `${nameTrim(nameValue1)} to serve`;
    button1.textContent = `Point to ${nameTrim(nameValue1)}`;
    tableName1.textContent = `${nameTrim(nameValue1)}`;
    }
);
name2.addEventListener('input', () => {
    const nameValue2 = name2.value;
    serve2.textContent = `${nameTrim(nameValue2)} to serve`;
    button2.textContent = `Point to ${nameTrim(nameValue2)}`;
    tableName2.textContent = `${nameTrim(nameValue2)}`;
    }
);

//determine who will serve first
serve1.addEventListener('click', () => {
    mainBlock.classList.toggle('hidden');
    ball1.classList.remove('hideWithColor');
    ball2.classList.remove('hideWithColor');
    ball1.classList.add('appearWithColor');
    ball2.classList.add('hideWithColor');
    serve1.classList.toggle('hidden');
    serve2.classList.toggle('hidden');
    }
);
serve2.addEventListener('click', () => {
    mainBlock.classList.toggle('hidden');
    ball1.classList.remove('hideWithColor');
    ball2.classList.remove('hideWithColor');
    ball1.classList.add('hideWithColor');
    ball2.classList.add('appearWithColor');
    serve1.classList.toggle('hidden');
    serve2.classList.toggle('hidden');
    }
);

//setting starting zeros
matchScore.innerText = `${firstPointMatch} : ${secondPointMatch}`;
setScore.innerText = `${firstPointSet} : ${secondPointSet}`;
gameScore.innerText = `${firstPoint} : ${secondPoint}`;
document.getElementById('message').innerText = `${pickedRadio()} sets are selected`;

//updates current game score
const updateScore = () => {
    matchScore.innerText = `${firstPointMatch} : ${secondPointMatch}`;
    setScore.innerText = `${firstPointSet} : ${secondPointSet}`;
    gameScore.innerText = `${firstPoint} : ${secondPoint}`;
}

//disables buttons for a short time when game is over
const disButtons = () => {
    button1.disabled = true;
    button2.disabled = true;
    setTimeout (() => {
        button1.disabled = false;
        button2.disabled = false;
    }, 2000)
}

//when first wins a game
const firstWinGame = () => {
    firstPoint = "Win";
    document.getElementById('message').innerText = `${name1.value} won this game!`;
    firstPointSet += 1;
    updateScore ();
    disButtons ();
    return setTimeout (finishGame, 2000);
}
//when second wins a game
const secondWinGame = () => {
    secondPoint = "Win";
    document.getElementById('message').innerText = `${name2.value} won this game!`;
    secondPointSet += 1;
    updateScore ();
    disButtons ();
    return setTimeout (finishGame, 2000);
}

//when first wins a set
const firstWinSet = () =>{
    document.getElementById('message').innerText = `${name1.value} won this set!`;
    firstPointMatch += 1;
    updateScore ();
    disButtons ();
    //add new column to game log
    firstLine.innerHTML +=`<td><strong>${firstPointSet}</strong></td>`;
    secondLine.innerHTML +=`<td>${secondPointSet}</td>`;
    //check if match is won by first
    setAmmount = pickedRadio();
    if (firstPointMatch === setAmmount){
        button1.disabled = true;
        button2.disabled = true;
        ball1.classList.remove('appearWithColor');
        ball1.classList.remove('hideWithColor');
        ball2.classList.remove('appearWithColor');
        ball2.classList.remove('hideWithColor');
        for (const radio of radios){
            radio.disabled = true;
        }
        document.getElementById('message').innerText = `Congratulations to ${name1.value} who won this match!`;
    }
    firstPointSet = 0;
    secondPointSet = 0;
    updateScore ();
}
//when second wins a set
const secondWinSet = () =>{
    document.getElementById('message').innerText = `${name2.value} won this set!`;
    secondPointMatch += 1;
    updateScore ();
    disButtons ();
    //add new column to game log
    secondLine.innerHTML +=`<td><strong>${secondPointSetfirstPointSet}</strong></td>`;
    firstLine.innerHTML +=`<td>${firstPointSet}</td>`;
    //check if match is won by second
    setAmmount = pickedRadio();
    if (secondPointMatch === setAmmount){
        button1.disabled = true;
        button2.disabled = true;
        ball1.classList.remove('appearWithColor');
        ball1.classList.remove('hideWithColor');
        ball2.classList.remove('appearWithColor');
        ball2.classList.remove('hideWithColor');
        for (const radio of radios){
            radio.disabled = true;
        }
        document.getElementById('message').innerText = `Congratulations to ${name2.value} who won this match!`;
    }
    firstPointSet = 0;
    secondPointSet = 0;
    updateScore ();
}

//function to update game, set and match (if nessesary) score and start new game
const finishGame = () =>{
    //reset game score
    firstPoint = 0;
    secondPoint = 0;
    gameScore.innerText = "0 : 0";
    document.getElementById('message').innerText = '';
    //change serving ball
    ball1.classList.toggle('appearWithColor');
    ball1.classList.toggle('hideWithColor');
    ball2.classList.toggle('appearWithColor');
    ball2.classList.toggle('hideWithColor');
    isTie = false;
    //check if current set sould be finished
    if (firstPointSet === 7){
        firstWinSet ();
    }
    else if (secondPointSet === 7){
        secondWinSet ();
    }
    else if (firstPointSet === 6 && secondPointSet < 5){
        firstWinSet ();
    }
    else if (secondPointSet === 6 && firstPointSet < 5){
        secondWinSet ();
    }
    else if (firstPointSet === 6 && secondPointSet === 6){
        document.getElementById('message').innerText = 'Now a tie break will be played';
        firstPoint = 0;
        secondPoint = 0;
        updateScore();
        playTieBreak();
    }
}

//inc by one point for tie break
const addOneToFirst = () => {
    firstPoint +=1;
    document.getElementById('message').innerText = '';
    updateScore();
    playTieBreak();
}
const addOneToSecond = () => {
    secondPoint +=1;
    document.getElementById('message').innerText = '';
    updateScore();
    playTieBreak();
}

//tie break function
const playTieBreak = () =>{
    isTie = true;
    //serve change
    if ((firstPoint + secondPoint)%2 !== 0){
        ball1.classList.toggle('appearWithColor');
        ball1.classList.toggle('hideWithColor');
        ball2.classList.toggle('appearWithColor');
        ball2.classList.toggle('hideWithColor');
    };
    //finish tie break
    if (firstPoint === 7 && secondPoint <= 5){
        firstWinGame ();
    }
    else if (firstPoint > 7 && firstPoint - secondPoint === 2){
        firstWinGame ();
    }
    else if (secondPoint > 7 && secondPoint - firstPoint === 2){
        secondWinGame ();
    }
    else if (firstPoint <= 5 && secondPoint === 7){
        secondWinGame ();
    }
}

//one game for first button
const addPointToFirst = () =>{
    document.getElementById('message').innerText = '';
    switch(firstPoint){
        case 0:
            firstPoint = 15;
            break;
        case 15:
            firstPoint = 30;
            break;
        case 30:
            firstPoint = 40;
            break;
        case 40:
            if (firstPoint === secondPoint){
                firstPoint = "AD"
            }
            else if (secondPoint === "AD") {
                firstPoint = 40;
                secondPoint = 40;
            }
            else {
                firstWinGame ();
            }
            break;
        case "AD":
            firstWinGame () 
    }
    updateScore ();
}
//one game for second button
const addPointToSecond = () =>{
    document.getElementById('message').innerText = '';
    switch(secondPoint){
        case 0:
            secondPoint = 15;
            break;
        case 15:
            secondPoint = 30;
            break;
        case 30:
            secondPoint = 40;
            break;
        case 40:
            if (firstPoint === secondPoint){
                secondPoint = "AD";
            }
            else if (firstPoint === "AD") {
                firstPoint = 40;
                secondPoint = 40;
            }
            else {
                secondWinGame ();
            }
            break;
        case 'AD':
            secondWinGame ();
    }
    updateScore ();
}

//clear and start again
const resetGame = () =>{
    isTie = false;
    mainBlock.classList.toggle('hidden');
    serve1.classList.toggle('hidden');
    serve2.classList.toggle('hidden');
    ball1.classList.remove('appearWithColor');
    ball1.classList.remove('hideWithColor');
    ball2.classList.remove('appearWithColor');
    ball2.classList.remove('hideWithColor');
    firstPoint = 0;
    firstPointSet = 0;
    firstPointMatch = 0;
    secondPoint = 0;
    secondPointSet = 0;
    secondPointMatch = 0;
    button1.disabled = false;
    button2.disabled = false;
    for (const radio of radios){
        radio.disabled = false;
    }
    document.getElementById('message').innerText = `${pickedRadio()} sets are selected`;
    updateScore ();
}

button1.addEventListener('click', () =>{
    for (const radio of radios){
        radio.disabled = true;
    }
    if (isTie === true){
        addOneToFirst();
    }
    else (addPointToFirst());
});

button2.addEventListener('click', () =>{
    for (const radio of radios){
        radio.disabled = true;
    }
    if (isTie === true){
        addOneToSecond();
    }
    else (addPointToSecond());
});

resetButton.addEventListener('click', ()=>{;
    if (confirm("Are you sure, you want to reset whole match?")){
        resetGame()
    } 
});