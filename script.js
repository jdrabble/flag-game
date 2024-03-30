//console.log(data);
//console.log(Object.keys(data).length);
const countries = Object.entries(data);
let correctAnswers = 0;
let secondsRemaining = 61;
let clock;

// console.log(countries);
let randomisedCountries;
let countryShortList; 
let countryShortListReshuffled = [];

const btn = document.querySelector('button');
const boardSquares = document.querySelectorAll('.gameBoard > div');
const flags = document.querySelector('.flags');
const timer = document.querySelector('#timer');
const message = document.querySelector('#message');
const score = document.querySelector('#score');

btn.addEventListener('click', renderGame);

function initalizeGame() {
randomisedCountries = countries.sort(() => Math.random() - 0.5);
// console.log(randomisedCountries);

countryShortList = randomisedCountries.splice(0, 9);

countryShortList.forEach(item => {
  countryShortListReshuffled.push(item);
  countryShortListReshuffled.sort(() => Math.random() - 0.5);
});
// console.log(countryShortList);
// console.log(countryShortListReshuffled);
};

function renderGame(){
// console.log(e.target.id);
// console.log(boardSquares);

for (i = 0; i < countryShortList.length; i++) {
  const flag = document.createElement('img');
  flag.setAttribute('id', countryShortList[i][0]);
  flag.setAttribute('class', 'draggable');
  flag.setAttribute('draggable', 'true');
  flag.src = `https://flagcdn.com/112x84/${countryShortList[i][0]}.png`;
  flag.addEventListener("dragstart", dragStart);
  flag.addEventListener("dragend", dragEnd);
  flags.appendChild(flag);
}

for (i = 0; i < countryShortListReshuffled.length; i++) {
  boardSquares[i].setAttribute('id', countryShortListReshuffled[i][0]);
  boardSquares[i].setAttribute('class', 'droppable');
  boardSquares[i].innerHTML = `${countryShortListReshuffled[i][1]}`
  boardSquares[i].addEventListener("dragover", dragOver);
  boardSquares[i].addEventListener("drop", drop);
}

btn.style.display = "none";

countDownWinCheck();

clock = setInterval(countDownWinCheck, 1000);

};

function dropMovePlayerMessage(color, text) {
  message.style.color = color;
  message.innerText = text;
};

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  e.target.classList.add("dragging");
  // console.log('dragstart');
}

function dragEnd(e){
  e.target.classList.remove("dragging");
  // console.log('dragend');
}

function dragOver(e){
  e.preventDefault();
  // console.log('dragover');
}

function drop(e){
  e.preventDefault();
  // console.log(drop);
  droppableElementData = e.target.getAttribute("id");
  const data = e.dataTransfer.getData('text/plain');
  
  if (data === droppableElementData && secondsRemaining !== 0){
   e.target.innerText = "";
   e.target.style.border = "3px solid green";
   e.target.appendChild(document.getElementById(data));
   correctAnswers++;
  //  console.log(correctAnswers);
   dropMovePlayerMessage("green", "Correct answer!");
   score.innerText = `Completed score: ${Math.round((correctAnswers/9)*100)}%`;
   e.target.removeEventListener("drop", drop);
   const droppedImage = document.querySelector(`#${data} >img`);
   droppedImage.setAttribute('draggable', 'false');
  }
  else if (data !== droppableElementData && secondsRemaining !== 0){
    e.target.style.border = "3px solid red";
    // console.log("wrong");
    dropMovePlayerMessage("red", "Wrong answer!");
    score.innerText = `Completed score: ${Math.round((correctAnswers/9)*100)}%`;
  }
}

function countDownWinCheck(){
  secondsRemaining--;
  //console.log(secondsRemaining, correctAnswers);
  if (secondsRemaining === 0 && correctAnswers <9){
    //console.log("time over due to out of time");
    dropMovePlayerMessage("red", "Out of time, game over!");
    clearInterval(clock);
    stopGame();
  }
  else if (correctAnswers === 9){
    //console.log("time over due to winner");
    clearInterval(clock);
    dropMovePlayerMessage("green", "Congratulations, you win!");
    stopGame();
  }
  timer.innerHTML = `Seconds remaining: ${secondsRemaining}`;
};

function stopGame(){
  //console.log("stopGame function called");
  const allFlagImages = document.querySelectorAll('img');
  for (i=0; i<allFlagImages.length; i++) {
    allFlagImages[i].setAttribute('draggable', 'false');
  }
  displayButton();
}

function displayButton() {
  btn.style.display = "inline-block";
  btn.innerText = "Refresh";
  btn.addEventListener('click', refresh);
}

function refresh() {
  window.location.reload();
}

initalizeGame();


