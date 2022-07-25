class Calculator {
    constructor(prevOperand, currentOperand) {
        this.prevOperandElement = prevOperand;
        this.currentOperandElement = currentOperand;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined
        this.updateDisplay()
    }

    delete() {
        console.log(this.currentOperand.toString().length)
        if(this.currentOperand.toString().length != 1 && this.currentOperand.toString().length != 0){
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
            this.currentOperand = parseFloat(this.currentOperand)
            this.updateDisplay();  
        }
        else {
            this.currentOperand = '';
            this.updateDisplay();
        }


        
    }

    appendNumber(number) {
       if(number != '.'){
        this.currentOperand = this.currentOperand + number.toString();
        this.currentOperand = parseFloat(this.currentOperand);
        this.updateDisplay();
       }
      
       else{
        this.currentOperand = this.currentOperand.toString() + '.'; 
        this.updateDisplay();

    }
    }
     
    chooseOperation(oper) {
        this.currentCheck = this.currentOperand.toString().slice(-1);

        if(this.currentCheck == '.'){
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
            this.currentOperand = parseInt(this.currentOperand);
            this.chooseOperation(oper);
        }
        else{
            if(this.operation != null){
                this.compute();
                this.operation = oper;
                this.previousOperand = this.computed;
                this.currentOperand = "";
                
                this.updateDisplay();
            }
            else{
                this.operation = oper;
                this.previousOperand = this.currentOperand;
                this.currentOperand = "";
                this.updateDisplay();
            }
        }
       

    }

    compute() {
        if(this.operation != null){
            switch(this.operation){
                case("+"):
                this.computed = this.previousOperand + this.currentOperand;
                break;
                case("-"):
                this.computed = this.previousOperand - this.currentOperand;
                break;
                case("*"):
                this.computed = this.previousOperand * this.currentOperand;
                break;
                case("÷"):
                this.computed = this.previousOperand / this.currentOperand;
                break;
            }
        }
        else{
            this.computed = this.currentOperand;
        }

    }

    finalDisplay(){
        this.compute();
        this.currentOperand = this.computed;
        this.operation = null;
        this.updateDisplay()
    }

    updateDisplay(){
        
            this.currentOperandElement.innerText = this.currentOperand;
            if(this.operation != null){
                this.prevOperandElement.innerText =`${this.previousOperand} ${this.operation}`
            }
            
            else {
                this.prevOperandElement.innerText = ""
            }
        


     }

}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach((button) => {
    button.addEventListener("click", function () {
        console.log(button.innerText)
        calculator.appendNumber(button.innerText);
    })
})
operationButtons.forEach((button) => {
    button.addEventListener("click", function () {
        calculator.chooseOperation(button.innerText);
    })
})


equalsButton.addEventListener("click", function () {
    calculator.finalDisplay();

})
allClearButton.addEventListener("click", function () {
    calculator.clear();

})
deleteButton.addEventListener("click", function () {
    calculator.delete();

})
