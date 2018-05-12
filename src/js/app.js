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
        calculator.onfocus = function() {
            this.blur();
        };    
        

    // private method
    function arrayPush(str) {

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

    function calculate(fn) {
        console.log('array',array);
        return new Function('return ' + fn)();
    }

    // public method
    self.init = function () {
        


        // EventListener
        calculator.addEventListener('click', function (e) {
            
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

                        arrayPush(thisBtnValue);

                    } else { // key btn is decimal

                        // if isDecimalFrozen = false is true
                        // the btn is not frozen
                        if (!isDecimalFrozen) {
                            console.log('the decimal btn is not frozen');
                            arrayPush(thisBtnValue);
                            // freaze 
                            isDecimalFrozen = true;

                        } else {
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
                        thisBtnValue == "-" ) {

                        console.log('** ' + thisBtnValue + ' **');
                        arrayPush(thisBtnValue);

                    }

                    // calculate action
                    if (thisBtnValue == "=") {

                        // unfreaze decimal btn
                        isDecimalFrozen = false;

                        result =  calculate(reduce);

                        display.textContent = result;
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

        })
    };

    return self;
})();