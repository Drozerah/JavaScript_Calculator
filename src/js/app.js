var Calculator = (function () {
    var self = {};

    // Variables
    var init = false,
        calculator,
        isBtn;


    // private method
    function test() {


    }

    // public method
    self.init = function () {
        
        calculator = document.querySelector('.calculator');

        
        // EventListener
        calculator.addEventListener('click', function (elm) {

            isBtn = elm.target.classList["0"];
            // is btn        
            if (isBtn == "btn") {
                
                // is key
                if (elm.target.attributes[1].name == "data-value") {
                    
                    console.log(elm.target);
                    
                }

                // is action
                if (elm.target.attributes[1].name == "data-action") {
                    
                    console.log(elm.target);
                    
                }

            }

        })        
    };

    return self;
})();