const previousOperationtext = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll('#buttons-container');

class Calculator {
    constructor(previousOperationtext, currentOperationText) {
        this.currentOperationText = currentOperationText;
        this.previousOperationtext = previousOperationtext;
        this.currentOperation = "";
    }
    //Add digit to calculator screen (mostra os digitos no visor)
    addDigit(digit) {
        //Verificar se tem um ponto
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();//Este método atualiza a tela
    }

    //Processso de calcular operações
    processOperation(operation) {
        //Checar se o valor atual e vazio
        if(this.currentOperationText.innerText == "" && operation !== "C") {
            //Change operation(mudar operaçao)
            if(this.previousOperationtext.innerText !== "") {
                this.changeOperation(operation)
            }
            return;
        }
        //Get current and previos value(Obter o valor atual e o valor anterior)
        let operationValue
        let previous = +this.previousOperationtext.innerText.split(" ")[0] //pega o valor anterior
        let current = +this.currentOperationText.innerText; //pega o valor atual

        switch(operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "DEL":
                this.processDelOperator();
                break;

            case "CE":
                this.processClearCurrentOperation();
                break;

            case "C":
                this.processClearAllOperation();
                break;

            case "=":
                this.processEqualOperation();
                break;

            default:
                return;
        }
    }

    //Change values of the calculator screen
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
    ) {
        if(operation === null){
        this.currentOperationText.innerText += this.currentOperation;
        } else {
            //Check if value is zero if it is add current(Verifique se o valor é zero, se for, adicione o atua
            if(previous === 0) {
                operationValue = current;
            }
            //Add current value previous
            this.previousOperationtext.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
        
    }

    //Change math operation
    changeOperation(operation) {
        const mathOperation = ["*", "/", "+", "-"];
        if(!mathOperation.includes(operation)) {
            return
        }

        this.previousOperationtext.innerText = this.previousOperationtext.innerText.slice(0, -1) + operation
    }
    //Delete the lst digit
    processDelOperator () {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    //Clear current operation
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    //Clear all operations
    processClearAllOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationtext.innerText = "";
    }

    //Process an operation
    processEqualOperation() {
        const operation = previousOperationtext.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationtext, currentOperationText);

//Este bloco abaixo ira adc eventos  ao clicar nos botoes, e ainda pegar o valor do botao clicado pois a const value pega o innerText do elemento clicado
buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === "."){
            calc.addDigit(value);
        } else {
            calc.processOperation(value)
        }
    })
})