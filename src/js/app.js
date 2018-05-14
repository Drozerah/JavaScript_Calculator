var Calculator = (function () {

    // Variables
    var self = {},
        calculator = document.getElementById('calculator'),
        display = document.getElementById('display'),
        subDisplay = document.getElementById('sub-display'),
        init = false,
        isDecimalFrozen = false,
        thisBtn,
        attributeName,
        thisBtnValue,
        isBtn,
        reduce,
        array = [],
        isOperator = false,
        isExecuted = false,
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

        console.log('=>', str);

        // Display live results on screen from array 
        // reduce array and return a string 
        reduce = array.reduce(function (a, b) {

            return a + b;

        }, '');


        // path 1 - first serie
        // display both main and sub text content before an operator btn is clicked
        // if isOperator == true so, an operator has allready been clicked
        if (isOperator) {
        
            display.textContent = reduce;
            subDisplay.textContent = reduce;

        } else { 

            // path 2 - second serie
            // update text content after an operator btn is clicked

            // if variable init = false
            if (!init) {
                
                // empty main text content
                display.textContent = '';

                // turn init to true
                init = true;

            }

            // update both main and sub text content
            display.textContent = display.textContent + str;
            subDisplay.textContent = reduce;

        }

        // path 2 - second serie
        // update text content when an operator btn is clicked
        // split reduce string to indicate an operator has been cliked to path 1 
        if (str == "+" ||
            str == "*" ||
            str == "/" ||
            str == "-") {

            // update main text content    
            display.textContent = str;

            // turn init to false to fill main text content again 
            init = false

            // turn to true so we know when an operator is cliked
            isOperator = true;
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

                        // key btn is not decimal 
                        if (thisBtnValue !== ".") {

                            updateArray(thisBtnValue);

                        } else { // key btn is decimal

                            // if isDecimalFrozen = false is true
                            // the btn is not frozen
                            if (!isDecimalFrozen) {

                                console.log('the decimal btn is not frozen');

                                updateArray(thisBtnValue);

                                // freaze decimal btn
                                isDecimalFrozen = true;

                            } else {

                                // todo remove 
                                console.log('the decimal btn is frozen');

                            }
                        }
                    }

                    // is operator btn
                    if (attributeName == "data-btn-action") {

                        // operators action
                        if (thisBtnValue == "+" ||
                            thisBtnValue == "*" ||
                            thisBtnValue == "/" ||
                            thisBtnValue == "-") {

                            //console.log('** ' + thisBtnValue + ' **');

                            updateArray(thisBtnValue);

                        }

                        // calculate action
                        if (thisBtnValue == "=") {

                            // unfreaze decimal btn
                            isDecimalFrozen = false;
                            // https://stackoverflow.com/questions/13077923/how-can-i-convert-a-string-into-a-math-operator-in-javascript

                            result = execute(arrayConverter(array));

                            display.textContent = result;
                            // subDisplay.textContent = 'answ' + thisBtnValue + result;
                            subDisplay.textContent += thisBtnValue + result;

                        }

                        // clear action
                        if (thisBtnValue == "clear") {

                            console.log('** clear **');

                            subDisplay.textContent = "0";
                            display.textContent = "0";
                            array = [];
                            init = false;
                            console.log('clear init =', init);

                            isExecuted = false;
                            console.log("isExecuted =", isExecuted);

                        }

                        // unfreaze decimal btn
                        isDecimalFrozen = false;

                    }

                }

            } // end listener

        })
    };

    return self;

})();