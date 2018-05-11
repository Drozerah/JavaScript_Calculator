// app.js


var calculator = document.querySelector('.calculator');
var display = calculator.querySelector('.display');
var subDisplay = calculator.querySelector('.sub-display');
var subArray = [];
var currentNum,
    currentAction,
    firstNum,
    secondNum;

function calculate(num1, num2, operator) {

    var result;

    if (operator === 'add') {
        result = num1 + num2
    } else if (operator === 'subtract') {
        result = num1 - num2
    } else if (operator === 'multiply') {
        result = num1 * num2
    } else if (operator === 'divide') {
        result = num1 / num2
    }

    return result

}

function push(value){
    subArray.push(value);
    console.log('subString',str)

    if (value = "clear") {
        subArray = ["0"];
    }

    var str = subArray.reduce(function(a, b){
        return a + b;
    },'');

    return console.log('subString',str);

}

// var ripple = document.createElement('div');
// ripple.classList.add("ripple");

// Keyboard click 
calculator.addEventListener('click', function (e) {
    
    // Current displayed number
    currentNum = display.textContent;

    // Updating current number
    if (e.target.matches('.key')) {
        // Get key number
        var keyValue = e.target.dataset.value;

        if (typeof firstNum == "undefined") {


            if (currentNum == '0') {

                display.textContent = keyValue;


            } else {

                display.textContent = currentNum + keyValue;

            }

        } else {
            console.log('=====to second num=====');
            console.log('firstNum', firstNum);
            console.log("currentNum", currentNum);
            display.textContent = currentNum + keyValue;
        }

        console.log("currentNum ===> ", display.textContent);
        push(keyValue);

    }
    // Fire actions by types
    if (e.target.matches('.action')) {

        // Get action
        var action = e.target.dataset.action;

        // Operators action

        if (!(action === "clear" || action === "calculate" || action === "decimal")) {

            // if (typeof firstNum == "undefined") {} 
            firstNum = currentNum;
            console.log("firstNum =>", firstNum);
            currentAction = action;
            display.textContent = "";
            push(action);

        }

        // Add decimal to current number
        if (action === "decimal") {

            // Check if string already contains decimal
            if (!display.textContent.includes(".")) { // todo includes() method polyfill IE https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/includes
                console.log('this =>', action);
                display.textContent = currentNum + '.';
                console.log(display.textContent.includes("."));
                push('.');
            }

        }

        // Clear current number to "0"
        if (action === "clear") {
            console.log('this action =>', action);
            display.textContent = "0";
            firstNum = undefined;
            secondNum = undefined;
            push(action);
        }

        // Resolve caculate action
        if (action === "calculate") {

            console.log('this action =>', action);

            if (typeof firstNum !== "undefined") {
                console.log("currentAction", currentAction);
                console.log("firstNum =", firstNum);
                // console.log("secondNum =", secondNum);
                secondNum = currentNum;
                console.log("secondNum =", secondNum);

                display.textContent = calculate(Number(firstNum), Number(secondNum), currentAction);
                firstNum = display.textContent;


            }
        }
    }

}); // End eventLstener