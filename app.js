let screen = document.getElementById("screen");

screen.innerHTML = "0";

//HTML elements saved to variables

let numberButtons = document.getElementsByClassName("digit");
let operatorButtons = document.getElementsByClassName("operator");

//Callback functions

let updateVal = (button) => {
  screen.innerHTML = button.target.innerText;
}

let clear = () => {
  screen.innerHTML = "0";
}

//Event listeners

for (i=0; i<numberButtons.length; i++){
  numberButtons[i].addEventListener('click', updateVal);
};

document.getElementById('clear').addEventListener('click', clear);