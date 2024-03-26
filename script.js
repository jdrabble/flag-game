//console.log(countries);
// console.log(Object.keys(countries).length);

const arrayCountries = Object.entries(countries);

//console.log(arrayCountries);

const sortedCountries = arrayCountries.sort(() => Math.random() - 0.5);

//console.log(sortedCountries);

const shortList = sortedCountries.splice(0, 9);

let shortListReshuffled = [];

shortList.forEach(item => {
  shortListReshuffled.push(item);
  shortListReshuffled.sort(() => Math.random() - 0.5);
});

//console.log(shortList);
//console.log(shortListReshuffled);

let correct = 0;
let secondsAllowed = 10;

const btn = document.querySelector('button');
const cells = document.querySelectorAll('.gameBoard div');
const flags = document.querySelector('.flags');
const timer = document.querySelector('#timer');
const message = document.querySelector('#message');
const score = document.querySelector('#score');

btn.addEventListener('click', render);

function render(){
// console.log(e.target.id);
// console.log(cells);

for (i = 0; i < shortList.length; i++) {
  const flag = document.createElement('img');
  flag.setAttribute('id', shortList[i][0]);
  flag.setAttribute('data-country', shortList[i][1]);
  flag.setAttribute('class', 'draggable');
  flag.setAttribute('draggable', 'true');
  flag.src = `https://flagcdn.com/112x84/${shortList[i][0]}.png`;
  flag.addEventListener("dragstart", dragStart);
  flag.addEventListener("dragend", dragEnd);
  flags.appendChild(flag);
}

for (i = 0; i < shortListReshuffled.length; i++) {
  cells[i].setAttribute('id', shortListReshuffled[i][0]);
  cells[i].setAttribute('class', 'droppable');
  cells[i].innerHTML = `${shortListReshuffled[i][1]}`
  cells[i].addEventListener("dragover", dragOver);
  cells[i].addEventListener("drop", drop);
    }

function countDown (){
  secondsAllowed--;
  //console.log(secondsAllowed, correct);
  if (secondsAllowed === 0 && correct <9){
    console.log("time over due to out of time");
    message.style.color = "red"
    message.innerText = "Out of time, game over!"
    clearInterval(clock);
    stopGame();
  }
  else if (correct === 9){
    console.log("time over due to winner");
    clearInterval(clock);
    message.style.color = "green"
    message.innerText = "Congratulations, you win!"
    stopGame();
  }
  timer.innerHTML = `Seconds remaining: ${secondsAllowed}`;
};

const clock = setInterval(countDown, 1000);

btn.style.display = "none";

};

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  e.target.classList.add("dragging");
  console.log('dragstart');
}

function dragEnd(e){
  e.target.classList.remove("dragging");
  console.log('dragend');
}

function dragOver(e){
  e.preventDefault();
  console.log('dragover');
}

function drop(e){
  e.preventDefault();
  console.log(drop);
  droppableElementData = e.target.getAttribute("id");
  const data = e.dataTransfer.getData('text/plain');
  if (data === droppableElementData && secondsAllowed !== 0){
  e.target.innerText = "";
  e.target.style.border = "3px solid green";
   e.target.appendChild(document.getElementById(data));
   correct++;
   console.log(correct);
   message.style.color = "green"
   message.innerText = "Correct answer!"
   score.innerText = `Completed score: ${Math.round((correct/9)*100)}%`;
   e.target.removeEventListener("drop", drop);
  }
  else if (data !== droppableElementData && secondsAllowed !== 0){
    e.target.style.border = "3px solid red";
    console.log("wrong");
    message.style.color = "red"
    message.innerText = "Wrong answer!"
    score.innerText = `Completed score: ${Math.round((correct/9)*100)}%`;
  }
  //winCheck();
}

// function winCheck() {
//   if (correct === 9 && secondsAllowed >0) {
//     console.log("game completed", secondsAllowed );
//     message.style.color = "green"
//     message.innerText = "Congratulations, you win!"
//     stopGame();
//   }
//  }

function stopGame(){
  console.log("stopGame function called");

  const allFlags = document.querySelectorAll('.flags>img');
  for (i=0; i<allFlags.length; i++) {
    allFlags[i].setAttribute('draggable', 'false');
  }

  btn.style.display = "inline";
  btn.innerText = "Refresh";
  btn.addEventListener('click', refresh);
}

function refresh() {
  window.location.reload();
}






