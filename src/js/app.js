var Calculator = (function () {
    var self = {};

    // Variables
    var calculator = document.querySelector('.calculator'),
        display = calculator.querySelector('.display'),
        subDisplay = calculator.querySelector('.sub-display'),
        init = false,
        that,
        attributeName,
        isBtn,
        array = [];


    // private method
    function arrayPush(elm) {


    }

    // public method
    self.init = function () {
        
        // EventListener
        calculator.addEventListener('click', function (e) {
            
            that = e.target;
            attributeName = that.attributes[1].name; 
            isBtn = that.classList["0"];

            // is btn        
            if (isBtn == "btn") {
                
                // is key btn
                if (attributeName == "data-btn-value") {
                    
                    console.log(that);
                           
                }

                // is action btn
                if (attributeName == "data-btn-action") {
                    
                    console.log(that);
                    
                }

            }

        })        
    };

    return self;
})();