var Calculator = (function () {

    // Variables
    var self = {},
        calculator = document.getElementById('calculator'),
        display = document.getElementById('display'),
        subDisplay = document.getElementById('sub-display'),
        isInit = false,
        isDecimalActive = true,
        isBtnNumActive = true,
        isExecuteActive = true,
        thisBtn,
        attributeName,
        thisBtnValue,
        isBtn,
        reduce,
        array = [],
        isOperator = false,
        isExecuted = false,
        current,
        result;

    // fix onfocus issue
    calculator.onfocus = function () {

        this.blur();

    };

    // update array
    function updateArray(str) {


        // Display live results on screen from array 

        // update array
        array.push(str);

        current = str;
        //current = current.replace("/", "÷").replace("*", "×");
        console.log('current =>', current);

        // stringify array 
        // reduce array and return a string 
        reduce = array.reduce(function (a, b) {

            return a + b.replace("/", "÷").replace("*", "×");

        }, '');

        // remove default zero
        // if isInit = false
        if (!isInit) {

            // empty main text content
            display.textContent = '';
            subDisplay.textContent = '';

            // turn isInit to true
            isInit = true;

        }

        // if isInit = true
        if (isInit) {


            // update both display and subDisplay
            display.textContent += str;
            subDisplay.textContent = reduce;


            // Digit Limit
            if (display.textContent.length > 10) {

                // update subDisplay
                subDisplay.textContent = 'Digit Limit Met';

                // clear
                clear();

                // update display
                display.textContent = '0';

            }


            if (str == "+" || str == "*" || str == "/" || str == "-") {


                // update display text content 
                display.textContent = str;

                // if an execution has already happened
                //      update array & subDisplay
                if (isExecuted) {

                    // empty existing array
                    array = [];

                    // push execution result
                    array.push(result.toString());

                    // push the operator string
                    array.push(str);

                    console.log("array is executed ===>", array);
                }

                // turn isInit to false to fill main text content again 
                isInit = false

                // turn to false so we know when an operator is cliked
                isOperator = false;
            }

        }

    }
    
    // convert strings
    function arrayConverter(array) {

        // convert the indexes from strings to numbers 
        //      if they are not operators 
        //      ["3", "+", "5", "/", "2", "*", "3"] => [3, "+", 5, "/", 2, "*", 3]
        //      return new array

        var accumulator = [],
            output = [];

        for (var i = 0; i < array.length; i++) {

            if (!(array[i] == '+' || array[i] == '*' || array[i] == '/' || array[i] == '-')) {

                accumulator.push(array[i]);

            } else {

                output.push(Number(accumulator.join('')));
                output.push(array[i]);
                accumulator = [];

            }

        }

        output.push(Number(accumulator.join('')));

        return output;

    }

    // execute mathematical operations
    function execute(array) {

        // sort operators and numbers using kind of a dispatcher.
        //      1 - sort the indexes by types in 2 new arrays
        //      [3, "+", 5, "/", 2, "*", 3] => [3, 5, 2, 3] & ["+", "/", "*"]

        var numbers = [];
        var operators = [];

        for (var i = 0; i < array.length; i++) {


            if (typeof array[i] === 'number') {

                // type === number
                numbers.push(array[i]);

            } else {

                // else type === string
                operators.push(array[i]);

            }

        }

        // depending on the operator 
        //      the first index become the mathematical
        //      operations result between the indexes 0 and 1
        //      then, the second index is removed from the array.
        //      The array length of operators indicates how many 
        //      iterations are needed to complete the mathematical task 
        //      until the end. The task is executed with a do while loop.
        //      ["+", "/", "*"] => .length = 3 operations/iterations
        //      [3, 5, 2, 3] => [8, 2, 3] => [4, 3] => [12]

        var i = 0;
        do {

            if (operators[i] == "+") {

                numbers[0] = numbers[0] + numbers[1];

            }
            if (operators[i] == "-") {

                numbers[0] = numbers[0] - numbers[1];

            }
            if (operators[i] == "*") {

                numbers[0] = numbers[0] * numbers[1];

            }
            if (operators[i] == "/") {

                numbers[0] = numbers[0] / numbers[1];

            }

            numbers.splice(1, 1);

            i++;
        }
        while (i < operators.length);


        console.log("------ EXECUTE ------");

        // turn to true so we know an aperation is done
        isExecuted = true;
        console.log("isExecuted =", isExecuted);

        result = numbers[0];

        // rounded result options
        // 2 decimal
        result = Math.round(result * 100) / 100;
        // 3 decimal
        // result = Math.round(result * 1000) / 1000;
        // 4 decimal
        // result = Math.round(result * 10000) / 10000;
        console.log("result =>", result);

        // if result = infinity, case number ÷ 0 
        if (result == "Infinity") {
            result = 0;
        }
        // if result = NaN, case 0 ÷ 0
        if (isNaN(result)) {
            result = 0;
            subDisplay.textContent = "Error";

        }

        // update array
        array = [];
        array.push(result);
        console.log('updatted array = ', array);

        // update main text content
        display.textContent = result;

        // update sub text content
        // text options               
        //subDisplay.textContent += thisBtnValue + result; // => '1+1=2'
        // subDisplay.textContent = 'answ' + thisBtnValue + result; // => 'answ=2'
         subDisplay.textContent += thisBtnValue; // => '1+1='

        // fix display content 
        subDisplay.textContent = subDisplay.textContent.replace(".=", "=");
        subDisplay.textContent = subDisplay.textContent.replace("0.0=", "0=");
        subDisplay.textContent = subDisplay.textContent.replace("Error=0", "Error");

        // return the final mathematical operation result
        return result;

    }

    // clear data
    function clear() {

        console.log('------- CLEAR -------');

        // empty the array
        array = [];
        console.log('array = ', array);

        // empty result
        result = false;
        console.log('result = ', result);

        // turn isInit to false    
        isInit = false;
        console.log('isInit = ', isInit);

        // activate decimal's btn
        isDecimalActive = true;
        console.log("isDecimalActive = ", isDecimalActive);

        // isOperator
        isOperator = false;
        console.log("isOperator = ", isOperator);

        // activate numbers keyboard
        isBtnNumActive = true;

        // turn isExecuted to false
        // to activate the "=" btn back
        isExecuted = false;
        console.log("isExecuted = ", isExecuted);

        isExecuteActive = true;
        console.log("isExecuteActive = ", isExecuteActive);

        console.log('---------------------');

    }

    // offset position
    function offset(elt) {
        var rect = elt.getBoundingClientRect(), bodyElt = document.body;
        return {
            top: rect.top + bodyElt .scrollTop,
            left: rect.left + bodyElt .scrollLeft
        }
    }

    // Ripple effect
    function ripple(thisBtn, ePageX, ePageY) {
    
        var offsetElt = offset(thisBtn),
        cursorX = (ePageX + 5) - offsetElt.left,
        cursorY  = (ePageY + 5) - offsetElt.top,
        thisRipple = thisBtn.children[0];

        // create element
        node = document.createElement("div");

        // add class ripple
        node.className += "ripple"; 

        // if children already exists then remove it
        if (thisBtn.children.length > 0) {

            thisBtn.removeChild(thisRipple);

        }

        // add ripple element
        thisBtn.appendChild(node); 
        
        // added children position
        thisBtn.children[0].style.left = cursorX + "px";
        thisBtn.children[0].style.top = cursorY + "px";   
    }

    // Init Caculator
    self.init = function () {

        // EventListener
        calculator.addEventListener('click', function (e) {


            // element has data attributes 
            if ((e.target.getAttribute("data-btn-value") || e.target.getAttribute("data-btn-action"))) {

                // data attribute exists or is empty

                thisBtn = e.target;
                attributeName = thisBtn.attributes[1].name;
                thisBtnValue = thisBtn.getAttribute(attributeName);
                isBtn = thisBtn.classList["0"];

                // apply ripple effect
                ripple(thisBtn, e.pageX, e.pageY);

                // is btn        
                if (isBtn == "btn") {

                    // is key btn
                    if (attributeName == "data-btn-value") {

                        // if the array is empty and if the first value is "0" or "."
                        //      then, the operators are first disabled
                        if (array.length == 0 && (thisBtnValue == "0" || thisBtnValue == ".")) {

                            // deactivate operators btn
                            isOperator = false;

                            // deactivate decimal's btn
                            isDecimalActive = false;

                            // if thisBtnValue == "." then
                            if (thisBtnValue == ".") {

                                // update array
                                updateArray("0");
                                updateArray(".");

                                // operators are available again
                                isOperator = true;
                            }

                        } else {

                            // activate execute btn
                            isExecuteActive = true;

                            // if a key btn is clicked just after an execution
                            if (isExecuted) {

                                // call clear method
                                clear();

                            }

                            // if key btn is number
                            if (thisBtnValue !== ".") {

                                updateArray(thisBtnValue);

                            }

                            // if key btn is decimal
                            if (thisBtnValue == ".") {

                                // if decimal's btn is active
                                if (isDecimalActive) {

                                    // update array
                                    updateArray(thisBtnValue);

                                    // deactivate decimal's btn 
                                    isDecimalActive = false;

                                    console.log("isDecimalActive =", isDecimalActive);

                                }

                                // if first entry is decimal, remove "."
                                //      update array to "0" and "."
                                if (array[0] == ".") {

                                    // empty the array
                                    array = [];

                                    // empty the main text content
                                    display.textContent = "";

                                    // update the array
                                    updateArray("0");
                                    updateArray(".");
                                }
                            }


                            // fix entry 
                            //      [..."+","."] => [..."+","0","."]
                            //      if the current value is "." and if the previous value is 
                            //      an operator, a 0 is missing so we add it
                            var lastOperator = array[array.length - 2];

                            if ((thisBtnValue == ".") && (lastOperator == "+" || lastOperator == "*" || lastOperator == "/" || lastOperator == "-")) {

                                array[array.length - 1] = "0";
                                array.push(".");
                                display.textContent = "0.";

                                // update subDisplay.textContent
                                subDisplay.textContent = subDisplay.textContent.replace(lastOperator + thisBtnValue, lastOperator + display.textContent);

                            }

                            // unlock operator btn
                            isOperator = true;

                        }

                    }


                    // is operator btn
                    if (attributeName == "data-btn-action") {

                        // if Digit Limit Met 
                        if (subDisplay.textContent == 'Digit Limit Met') {

                            isOperator = false;

                        }
                        // if operator's keyboard is activated
                        if (isOperator) {

                            // if operators action
                            if (thisBtnValue == "+" || thisBtnValue == "*" || thisBtnValue == "/" || thisBtnValue == "-") {

                                // deactivate number's keyboard
                                isBtnNumActive = false;

                                // if ["0", "."] => ["0", "operator"]
                                if (array.length == 2 && (array[0] == "0" && array[1] == ".")) {

                                    array[array.length - 1] = thisBtnValue;
                                    subDisplay.textContent = "0";
                                    display.textContent = thisBtnValue;
                                    isInit = false;
                                    isOperator = false;
                                    isExecuteActive = false;

                                    console.log("current =>", thisBtnValue);

                                } else {

                                    // update array
                                    updateArray(thisBtnValue);

                                    // activate decimal's btn
                                    isDecimalActive = true;

                                }

                                // if an operator is clicked just after an execution
                                if (isExecuted) {

                                    // reference the existing result in new variable
                                    var lastResult = result;

                                    // call clear method
                                    clear();

                                    // update the array
                                    updateArray(lastResult.toString());
                                    updateArray(thisBtnValue);

                                }

                            }


                            // if calculate action && calculate btn is active
                            if (thisBtnValue == "=" && isExecuteActive == true) {

                                // activate decimal's btn
                                isDecimalActive = true;

                                // deactivate number's keyboard
                                isBtnNumActive = false;

                                // calculate the result
                                result = execute(arrayConverter(array));

                                // an execution has happened
                                isExecuted = true;

                                // deactivate this btn to prevent multiple "="
                                isExecuteActive = false;

                                console.log("isExecuteActive = ", isExecuteActive);
                                console.log("---------------------");

                            }
                        } //


                        // clear action 
                        if (thisBtnValue == "clear") {

                            // update both main and sub text content
                            subDisplay.textContent = "0";
                            display.textContent = "0";

                            // call clear method
                            clear();
                        }

                    }

                    // fix displayed characters
                    display.textContent = display.textContent.replace("/", "÷").replace("*", "×");
                    subDisplay.textContent = subDisplay.textContent.replace(".+", "+").replace(".-", "-").replace(".÷", "÷").replace(".×", "×");

                }

            } // end listener

        })

    };

    return self;

})();