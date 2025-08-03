const currentOperandElement = document.getElementById('current-operand');
        const previousOperandElement = document.getElementById('previous-operand');
        const buttons = document.querySelectorAll('button');
        
        let currentOperand = '0';
        let previousOperand = '';
        let operation = undefined;
        let resetScreen = false;

        function updateDisplay() {
            currentOperandElement.innerText = currentOperand;
            previousOperandElement.innerText = previousOperand;
        }

        function appendNumber(number) {
            if (currentOperand === '0' || resetScreen) {
                currentOperand = '';
                resetScreen = false;
            }
            if (number === '.' && currentOperand.includes('.')) return;
            currentOperand += number;
        }

        function chooseOperation(op) {
            if (currentOperand === '') return;
            if (previousOperand !== '') {
                compute();
            }
            operation = op;
            previousOperand = currentOperand + ' ' + operation;
            currentOperand = '';
            resetScreen = true;
        }

        function compute() {
            let computation;
            const prev = parseFloat(previousOperand);
            const current = parseFloat(currentOperand);
            if (isNaN(prev) || isNaN(current)) return;
            
            switch (operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                    computation = prev - current;
                    break;
                case '*':
                    computation = prev * current;
                    break;
                case '/':
                    computation = prev / current;
                    break;
                case '%':
                    computation = prev % current;
                    break;
                default:
                    return;
            }
            
            currentOperand = computation.toString();
            operation = undefined;
            previousOperand = '';
            resetScreen = true;
        }

        function clear() {
            currentOperand = '0';
            previousOperand = '';
            operation = undefined;
        }

        function deleteNumber() {
            if (currentOperand.length === 1 || (currentOperand.length === 2 && currentOperand.startsWith('-'))) {
                currentOperand = '0';
            } else {
                currentOperand = currentOperand.slice(0, -1);
            }
        }

        function handlePercentage() {
            currentOperand = (parseFloat(currentOperand) / 100).toString();
        }

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('operator') && !button.classList.contains('equals')) {
                    chooseOperation(button.innerText);
                } else if (button.classList.contains('equals')) {
                    compute();
                } else if (button.classList.contains('clear')) {
                    clear();
                } else if (button.classList.contains('delete')) {
                    deleteNumber();
                } else if (button.classList.contains('percentage')) {
                    handlePercentage();
                } else {
                    appendNumber(button.innerText);
                }
                updateDisplay();
            });
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
                appendNumber(e.key);
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                chooseOperation(e.key);
            } else if (e.key === 'Enter' || e.key === '=') {
                compute();
            } else if (e.key === 'Escape') {
                clear();
            } else if (e.key === 'Backspace') {
                deleteNumber();
            } else if (e.key === '%') {
                handlePercentage();
            }
            updateDisplay();
        });