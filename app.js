//Elements

let calculator = document.getElementById("calculator");

let screen = document.getElementById("screen");

let sizeUnit;

  if (window.innerWidth > 500) {
    sizeUnit = 300;
  }
  else {
    sizeUnit = window.innerWidth;
  }

let buttons = document.getElementsByTagName("button");
let numberButtons = document.getElementsByClassName("digit");
let operatorButtons = document.getElementsByClassName("operator");
let equalsButton = document.getElementById("equals");
let clearButton = document.getElementById('clear');
let decimalButton = document.getElementById('decimal');
let negativeButton = document.getElementById('negative');
let percentageButton = document.getElementById('percentage');
let zeroButton = document.getElementById('zero');

//Variables

let pendingValue = "";
let currentOperator = "";
let currentValue = "0";

screen.innerText = "0";


//Styling

calculator.style.width = `${sizeUnit}px`  //Make callculator full width on mobile or maximum of 300px width on bigger screens

if (window.innerWidth <= 500) {           
  screen.style.height = `${window.innerHeight - (sizeUnit/4 * 5)}px`;   //Make screen height the full remaining space above buttons
}
else {
  screen.style.height = `${sizeUnit/3}px`;  //Make screen height smallet than the full remaining space above buttons if the device's screen is big
  calculator.style.borderRadius = `${sizeUnit/50}px`; //give calculator some rounded corners on big screens
}
screen.style.fontSize = `${sizeUnit/4}px`

for (i=0; i<buttons.length; i++){
  buttons[i].style.width = `${sizeUnit/4 - sizeUnit/50}px`;
  buttons[i].style.height = `${sizeUnit/4 - sizeUnit/50}px`;
  buttons[i].style.margin = `${sizeUnit/100}px`;
  buttons[i].style.fontSize = `${sizeUnit/8}px`
};

zeroButton.style.width = `${sizeUnit/2 - sizeUnit/50}px`;

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
      screen.style.fontSize = `${sizeUnit/4}px`
      break;
    case screen.innerText.length == 6:
      screen.style.fontSize = `${sizeUnit/4.4}px`
      break;
    case screen.innerText.length == 7:
      screen.style.fontSize = `${sizeUnit/4.8}px`
      break;
    case screen.innerText.length == 8:
      screen.style.fontSize = `${sizeUnit/5.2}px`
      break;
    case screen.innerText.length >= 9:
      screen.style.fontSize = `${sizeUnit/5.6}px`
      break;
  }
}

let setOperator = (button) => {
  currentOperator = button.target.innerText;
  if (currentOperator === "÷") {  //compensate for custom division sign
    currentOperator = "/";
  }
  if (currentOperator === "x") {   //compensate for custom multiplication sign
    currentOperator = "*";
  }
  pendingValue = screen.innerText;
  currentValue = "";
  console.log("operator set")
}

let clear = () => {
  pendingValue = "";
  currentValue = "";
  currentOperator = "";
  screen.innerText = "0";
  screen.style.fontSize = `${sizeUnit/4}px`
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
  if (screen.innerText.includes('-')) {
    screen.innerText = screen.innerText.substring(1);
    currentValue = screen.innerText;
  }
  else {
    screen.innerText = "-" + screen.innerText;
    currentValue = screen.innerText;
  }
}

let setPercentage = () => {
  screen.innerText = (parseFloat(screen.innerText)/100).toString();
  currentValue = screen.innerText;
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

