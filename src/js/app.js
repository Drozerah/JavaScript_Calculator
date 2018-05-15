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
        result;


    // fix onfocus bug
    calculator.onfocus = function () {

        this.blur();

    };

    // private method
    function updateArray(str) {

        // generer la concaténation 
        //  des chiffres pour affichage en live

        array.push(str);

        current = str;
            console.log('current =>', current);

        // Display live results on screen from array 
        // reduce array and return a string 
        reduce = array.reduce(function (a, b) {

            return a + b;

        }, '');


        // path 1 - first serie
        // display both main and sub text content before an operator btn is clicked
        // if isOperator == false so, an operator has allready been clicked

            // path 2 - second serie
            // update text content after an operator btn is clicked

            // if variable isInit = false
            if (!isInit) {

                // empty main text content
                display.textContent = '';

                // turn isInit to true
                isInit = true;

            }

            // update both main and sub text content
            //display.textContent = display.textContent + str;
            display.textContent += current;
            subDisplay.textContent = reduce;

        // path 2 - second serie
        // update text content when an operator btn is clicked
        // split reduce string to indicate an operator has been cliked to path 1 
        if (str == "+" ||
            str == "*" ||
            str == "/" ||
            str == "-") {

            // update main text content    
            display.textContent = str;

            // turn isInit to false to fill main text content again 
            isInit = false

            // turn to false so we know when an operator is cliked
            isOperator = false;
                console.log("isOperator", isOperator);

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

        console.log(array);

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
        array = [result];
            console.log('array => ',array);
        
        // update main text content
        display.textContent = result;

        // update sub text content
        // text options               
         subDisplay.textContent += thisBtnValue + result; // => '1+1=2'
        // subDisplay.textContent = 'answ' + thisBtnValue + result; // => 'answ=2'
        //subDisplay.textContent += thisBtnValue; // => '1+1='

        // return the final mathematical operation result
        return result;

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

                        // unlock operator btn
                        isOperator = true;

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

                                // activate decimal's btn
                                isDecimalActive = true;
                                console.log("isDecimalActive = ", isDecimalActive);

                                // deactivate number's keyboard
                                isBtnNumActive = false;

                                // calculate the result
                                result = execute(arrayConverter(array));

                            }
                        } //


                        // clear action|| isBtnNumActive == false
                        if (thisBtnValue == "clear") {

                            console.log('** Clear **');

                            // update both main and sub text content
                            subDisplay.textContent = "0";
                            display.textContent = "0";

                            // empty the array
                            array = [];
                            console.log('array => ', array);

                            // turn isInit to false    
                            isInit = false;
                            console.log('isInit = ', isInit);

                            // activate decimal's btn
                            isDecimalActive = true;
                            console.log("isDecimalActive = ", isDecimalActive);

                            // turn isExecuted to false
                            isExecuted = false;
                            console.log("isExecuted = ", isExecuted);

                            // activate numbers keyboard
                            isBtnNumActive = true;

                            console.log('*************');

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