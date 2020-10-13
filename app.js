//Variables

let screen = document.getElementById("screen");

let numberButtons = document.getElementsByClassName("digit");
let operatorButtons = document.getElementsByClassName("operator");
let equalsButton = document.getElementById("equals");
let clearButton = document.getElementById('clear');
let decimalButton = document.getElementById('decimal');
let negativeButton = document.getElementById('negative');
let percentageButton = document.getElementById('percentage');

let pendingValue;
let currentOperator;
let currentValue;
let isDecimalSet = false;

screen.innerText = "0";

//Callback functions

let updateScreen = (button) => {

  if (screen.innerText == "-0") {
    screen.innerText = "-";
  }
  if (!pendingValue && !currentValue && !currentOperator) {
    screen.innerText = "";
  }
  if (pendingValue && !currentValue && currentOperator) {
    screen.innerText = "";
  }
  screen.innerText += button.target.innerText;
  currentValue = screen.innerText;
}


let setOperator = (button) => {
  if (!currentOperator) {
    currentOperator = button.target.innerText;
    pendingValue = currentValue;
    currentValue = undefined;
    isDecimalSet = false;
  }
  else if (pendingValue && currentValue && currentOperator) {
    equals();
  }
  else {
    currentOperator = button.target.innerText;
  }
  if (currentOperator == "÷") { //Compensate for the iPhone notation, which isn't valid operator sign in js mathematical notation
    currentOperator = "/";
  }
  if (currentOperator == "x") { //Compensate for the iPhone notation, which isn't valid operator sign in js mathematical notation
    currentOperator = "*";
  }
}

let clear = () => {
  screen.innerText = "0";
  currentValue = undefined;
  pendingValue = undefined;
  currentOperator = undefined;
}

let equals = () => {
  if (pendingValue && currentValue) {
    let equation = `${pendingValue}${currentOperator} ${currentValue}`;
    screen.innerText = eval(equation);
    pendingValue = eval(equation);
    currentValue = undefined;
    isDecimalSet = false;
  }
}

let setDecimal = () => {
  if (!isDecimalSet) {
    if (currentValue) {
      screen.innerText += ".";
      currentValue = screen.innerText;
      isDecimalSet = true;
    }
    if (!currentValue) {
      screen.innerText = "0.";
      currentValue = screen.innerText;
      isDecimalSet = true;
    }
  }
}

let setNegative = () => {
  if (currentOperator && !currentValue) {
    screen.innerText = "-0";
    currentValue = screen.innerText;  
  }
  else if (!currentValue) {
    if (pendingValue) {
      if (screen.innerText.charAt(0) == "-") {
        screen.innerText = screen.innerText.substring(1);
        currentValue = screen.innerText;
      }
      else if (currentValue) {
        screen.innerText = "-" + currentValue;
        currentValue = screen.innerText;  
      }
    }
    else {
    screen.innerText = "-0";
    currentValue = screen.innerText;  
    }
  }
  else if (screen.innerText.length > 0 && screen.innerText.charAt(0) == "-") {
    screen.innerText = screen.innerText.substring(1);
    currentValue = screen.innerText;
  }
  else {
    screen.innerText = "-" + screen.innerText;
    currentValue = screen.innerText;
  }
}

let setPercentage = () => {
  screen.innerText = eval(screen.innerText/100);
  currentValue = screen.innerText;
};

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

