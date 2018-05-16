var Calculator = (function () {

    // Variables
    var self = {},
        calculator = document.getElementById('calculator'),
        display = document.getElementById('display'),
        subDisplay = document.getElementById('sub-display'),
        isInit = false,
        isDecimalActive = true,
        isBtnNumActive = true,
        thisBtn,
        attributeName,
        thisBtnValue,
        isBtn,
        reduce,
        array = [],
        isOperator = false,
        isExecuted = false,
        current,
        result,
        errorString,
        fixedString;


    // fix onfocus bug
    calculator.onfocus = function () {

        this.blur();

    };

    // private method
    function updateArray(str) {


        // Display live results on screen from array 
        
        // update array
        array.push(str);
  
        current = str;
        console.log('current =>', current);
        
        // stringify array 
        // reduce array and return a string 
        reduce = array.reduce(function (a, b) {

            return a + b;

        }, '');

        // fix operator character
        reduce = reduce.replace("/", "÷").replace("*", "×");
        
        // remove default zero
        // if isInit = false
        if (isInit == false) {

            // empty main text content
            display.textContent = '';
            subDisplay.textContent = '';
            
            // turn isInit to true
            isInit = true;
            
            console.log('Zero removed isInit = ',isInit);
        }
        
        // if isInit = true
        if (isInit) {

            console.log("B");
            console.log("B result", result);
            console.log('B isInit',isInit);
            console.log("B isOperator", isOperator);
            console.log("B array", array);

            display.textContent += str;
            subDisplay.textContent = reduce;

            var displayedStr = display.textContent;
            if (displayedStr.length >= 12) {

                
                console.log("!!!!!!!!!!!!", displayedStr.length);
                subDisplay.textContent = 'Digit Limit Met';
                clear();
                display.textContent = '0';
            }
            
            
            
            if (str == "+" ||str == "*" || str == "/" || str == "-") {

                // update main text content + fix characters    
                display.textContent = str.replace("/", "÷").replace("*", "×");
                
                // if an execution has already happened
                // update array & subDisplay
                if (isExecuted) {
                    // empty existing array
                    array = [];
                    // push execution result
                    array.push(result.toString());
                    // push the operator string
                    array.push(str);
                    console.log("array is executed ===>", array);
                    // update text content
                    subDisplay.textContent = result+str.replace("/", "÷").replace("*", "×");
                }

                // turn isInit to false to fill main text content again 
                isInit = false

                // turn to false so we know when an operator is cliked
                isOperator = false;
                    console.log("C isOperator",isOperator );
            }

        }

    }

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

    function execute(array) {

        console.log("execute ",array);
        

        // happy path
        // sort operators and numbers using a dispatcher.
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
        //      until the end which is executed with a do while loop.
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

        result = numbers[0];

        // rounded result options
        // 2 decimal
        result = Math.round(result * 100) / 100;
        // 3 decimal
        //result = Math.round(result * 1000) / 1000;
        // 4 decimal
        //result = Math.round(result * 10000) / 10000;
            console.log("result =>", result);

        // turn to true so we know an aperation is done
        isExecuted = true;
            console.log("isExecuted =", isExecuted);

        // update array
        array = [];
        array.push(result);

            console.log('array result => ',array);

        // update main text content
        display.textContent = result;

        // update sub text content
        // text options               
         subDisplay.textContent += thisBtnValue + result; // => '1+1=2'
        // subDisplay.textContent = 'answ' + thisBtnValue + result; // => 'answ=2'
        //subDisplay.textContent += thisBtnValue; // => '1+1='

        // fix display content 
        subDisplay.textContent = subDisplay.textContent.replace(".=", "=");
        subDisplay.textContent = subDisplay.textContent.replace("0.0=", "0=");

        // return the final mathematical operation result
        return result;

    }

    function clear(){

        console.log('** Clear **');

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

        // turn isExecuted to false
        isExecuted = false;
        console.log("isExecuted = ", isExecuted);

        // activate numbers keyboard
        isBtnNumActive = true;

        // turn isExecuted to false
        // to activate the "=" btn back
        isExecuted = false;

        console.log('*************');

    }

    // public method
    self.init = function () {

        // EventListener
        calculator.addEventListener('click', function (e) {

            // element has data attributes 
            if ((e.target.getAttribute("data-btn-value") || e.target.getAttribute("data-btn-action"))) {
                // data attribute exist or is empty

                thisBtn = e.target;
                attributeName = thisBtn.attributes[1].name;
                thisBtnValue = thisBtn.getAttribute(attributeName);
                isBtn = thisBtn.classList["0"];

                // is btn        
                if (isBtn == "btn") {

                    // is key btn
                    if (attributeName == "data-btn-value") {

                       
                        // key btn is number
                        if (thisBtnValue !== ".") {

                            updateArray(thisBtnValue);

                        }

                        // key btn is decimal
                        if (thisBtnValue == ".") {

                            // if decimal's btn is active
                            if (isDecimalActive) {

                                // update array
                                updateArray(thisBtnValue);

                                // deactivate decimal's btn 
                                isDecimalActive = false;
                                console.log("isDecimalActive =", isDecimalActive);

                            }

                            // if first entry is decimal
                            // remove "." update array to "0" and "."
                            if (array[0] == ".") {

                                // empty array
                                array = [];

                                // empty main text content
                                display.textContent = "";

                                // update array
                                updateArray("0");
                                updateArray(".");
                            }
                        }


                        // fix entry 
                        // [..."+","."] => [..."+","0","."]
                        // if the current value is "." and if the previous value is 
                        // an operator, 0 is missing so we add it
                        var lastOperator = array[array.length-2];

                        if ((thisBtnValue == ".") && (lastOperator == "+" || lastOperator == "*" || lastOperator == "/" || lastOperator == "-" )) {

                            array[array.length-1] = 0;
                            array.push(".");
                            display.textContent = "0.";
                            // update subDisplay.textContent
                            errorString = lastOperator+thisBtnValue;
                            fixedString = lastOperator+display.textContent; 
                            subDisplay.textContent = subDisplay.textContent.replace(errorString, fixedString);
                                                   
                        }
                        
                        // unlock operator btn
                        isOperator = true;
                    }

                    // is operator btn
                    if (attributeName == "data-btn-action") {

                        // if operator's keyboard activated
                        if (isOperator) {

                            // if operators action
                            if (thisBtnValue == "+" ||
                                thisBtnValue == "*" ||
                                thisBtnValue == "/" ||
                                thisBtnValue == "-") {

                                // deactivate number's keyboard
                                isBtnNumActive = false;

                                // if decimal's btn is clicked
                                if (current == '.') {

                                    // deactivate decimal's btn
                                    isDecimalActive = false;

                                } else {

                                    // update array
                                    updateArray(thisBtnValue);

                                    // activate decimal's btn
                                    isDecimalActive = true;

                                }

                            }


                            
                            // calculate action
                            if (thisBtnValue == "=") {


                                //if (!isExecuted) {}
                                // activate decimal's btn
                                isDecimalActive = true;
                                console.log("isDecimalActive = ", isDecimalActive);

                                // deactivate number's keyboard
                                isBtnNumActive = false;

                                // calculate the result
                                result = execute(arrayConverter(array));

                                // deactivate this btn to prevent multiple "====="
                                isExecuted = true;

                                
                            }
                        } //


                        // clear action|| isBtnNumActive == false
                        if (thisBtnValue == "clear") {

                            // update both main and sub text content
                            subDisplay.textContent = "0";
                            display.textContent = "0";

                            clear();


                        }



                    }

                }

            } // end listener

            // console.log('** Any Btn **');
            // console.log("isDecimalActive =", isDecimalActive);
            // console.log('array => ',array);
            // console.log('*************');

        })

    };

    return self;

})();