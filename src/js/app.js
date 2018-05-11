var Calculator = (function () {

    // Variables
    var self = {},
        calculator = document.querySelector('.calculator'),
        display = calculator.querySelector('.display'),
        subDisplay = calculator.querySelector('.sub-display'),
        init = false,
        thisBtn,
        attributeName,
        thisBtnValue,
        isBtn,
        reduce,
        array = [];


    // private method
    function arrayPush(str) {
        
        array.push(str);

        reduce = array.reduce(function(a, b){
            return a + b;
        },'');

        display.textContent = reduce;


        if ( str == "add" ) {

            var numbers = reduce.split("add");

            console.log("numbers ",numbers);
            
        }

        if ( str == "calculate" ) {
            
        }

    }

    function displayResult(){

        console.log(array);

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
    
                    //console.log(thisBtn);
                    //console.dir(thisBtn);
                    //console.log(typeof thisBtnValue);
                    //console.log(thisBtnValue);
                    arrayPush(thisBtnValue);
                    
                           
                }

                // is action btn
                if (attributeName == "data-btn-action") {
                    
                    //console.log(thisBtn);
                    //console.dir(thisBtn);
                    //console.log(typeof thisBtnValue);

                   

                    if (thisBtnValue == "add" ||
                        thisBtnValue == "multiply" ||
                        thisBtnValue == "divide" ||
                        thisBtnValue == "subtract" ) {

                        console.log('** '+ thisBtnValue +' **');
                        arrayPush(thisBtnValue);
                        console.log(array);


                    }


                    if (thisBtnValue == "clear") {
                        console.log('** clear **');
                        display.textContent = "0";
                        array = [];
                    }

                    if (thisBtnValue == "calculate") {
                        displayResult();    
                    }
                    
                }

            }

        })        
    };

    return self;
})();