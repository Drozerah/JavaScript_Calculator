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
        splits = [],
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

        reduce = array.reduce(function (a, b) {

            return a + b;

        }, '');

        // on affiche toutes les saisies en live
        // 1 dans le cas de la première serie
        if (typeof splits == "undefined") {

            display.textContent = reduce;
            subDisplay.textContent = reduce;

        } else { // 2e serie

            // si init = false on vide le texte
            if (!init) {

                display.textContent = '';
                init = true;

            }

            display.textContent = display.textContent + str;
            subDisplay.textContent = reduce;

        }

        // si on tappe une touche d'opération
        //  on détermine la deuxieme serie de chiffres 
        if (str == "+" ||
            str == "*" ||
            str == "/" ||
            str == "-") {

            display.textContent = str;
            init = false
            // on eclate la chaine de caractère
            //  dans un tableau 
            splits = reduce.split(str);
            // si la longeur du tableau est 
            // supérieure à 3
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

        // round result
        // 2 decimal round
        result = Math.round(result * 100) / 100;
        // 3 decimal round
        //result = Math.round(result * 1000) / 1000;
        // 4 decimal round
        //result = Math.round(result * 10000) / 10000;

        console.log("result =>", result);

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

                            console.log('** ' + thisBtnValue + ' **');

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