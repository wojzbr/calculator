//Variables

let screen = document.getElementById("screen");

let numberButtons = document.getElementsByClassName("digit");
let operatorButtons = document.getElementsByClassName("operator");
let equalsButton = document.getElementById("equals");
let clearButton = document.getElementById('clear');
let decimalButton = document.getElementById('decimal');
let negativeButton = document.getElementById('negative');
let percentageButton = document.getElementById('percentage');

let pendingValue = "";
let currentOperator = "";
let currentValue = "0";
let isDecimalSet = false;

screen.innerText = "0";

//Callback functions

let updateScreen = (button) => {
  if (currentValue.length == 9 && !currentValue.includes('.')) {
    return
  };
  if (currentValue.length == 10 && currentValue.includes('.')) {
    return
  };
  if (screen.innerText === "0" && button.target.innerText === "0") { // blocks from writing multiple 0s in front of the number like 0000.2 (redundant)
    return;
  }
  if (currentOperator && !currentValue) {  //zeros out the text on the screen to start building another number
    screen.innerText = "";  
  }
  if (screen.innerText.charAt(0) === "0" && !screen.innerText.includes('.')) { //If the number is NOT a decimal and it has 0 in front, the zero is removed
    screen.innerText = screen.innerText.slice(1);
  }
  screen.innerText += button.target.innerText;
  currentValue = screen.innerText;

  updateScreenFontSize();
}

let updateScreenFontSize = () => {
  switch (true) {
    case screen.innerText.length < 6:
      screen.style.fontSize = "60px";
      break;
    case screen.innerText.length == 6:
      screen.style.fontSize = "56px";
      break;
    case screen.innerText.length == 7:
      screen.style.fontSize = "52px";
      break;
    case screen.innerText.length == 8:
      screen.style.fontSize = "48px";
      break;
    case screen.innerText.length >= 9:
      screen.style.fontSize = "44px";
      break;
  }
}

let setOperator = (button) => {
  currentOperator = button.target.innerText;
  pendingValue = screen.innerText;
  currentValue = "";
  console.log("operator set")
}

let clear = () => {
  pendingValue = "";
  currentValue = "";
  currentOperator = "";
  screen.innerText = "0";
}

let equals = () => {
  if (currentOperator === "+") {
    screen.innerText = (parseFloat(pendingValue)+parseFloat(currentValue)).toString();
  }
  if (currentOperator === "-") {
    screen.innerText = (parseFloat(pendingValue)-parseFloat(currentValue)).toString();
  }
  if (currentOperator === "*") {
    screen.innerText = (parseFloat(pendingValue)*parseFloat(currentValue)).toString();
  }
  if (currentOperator === "/") {
    screen.innerText = (parseFloat(pendingValue)/parseFloat(currentValue)).toString();
  }
  updateScreenFontSize();
}

let setDecimal = () => {
  if (screen.innerText.includes('.')) {
    return;
  }
  else {
    screen.innerText += ".";
  }
}

let setNegative = () => {

}

let setPercentage = () => {
  if (!currentValue) {
    return;
  }
  currentValue = (parseFloat(currentValue)/100).toString();
  screen.innerText = currentValue;
}

//Event listeners

for (i=0; i<numberButtons.length; i++){
  numberButtons[i].addEventListener('click', updateScreen);
};

for (i=0; i<operatorButtons.length; i++){
  operatorButtons[i].addEventListener('click', setOperator);
};

clearButton.addEventListener('click', clear);

equalsButton.addEventListener('click', equals);

decimalButton.addEventListener('click', setDecimal);

negativeButton.addEventListener('click', setNegative);

percentageButton.addEventListener('click', setPercentage);

