// script.js

document.addEventListener('DOMContentLoaded', function () {
    const result = document.getElementById('result');
    const keys = document.querySelector('.keys');
    let currentInput = '';
    let previousInput = '';
    let operator = '';
    let shouldResetDisplay = false;

    keys.addEventListener('click', function (event) {
        const target = event.target;
        const value = target.textContent;
        const action = target.dataset.action;

        if (!target.classList.contains('key')) return;

        if (action === 'clear') {
            clearCalculator();
        } else if (action === 'sign') {
            toggleSign();
        } else if (action === 'percent') {
            convertToPercent();
        } else if (action === 'calculate') {
            calculate();
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
            chooseOperator(action);
        } else {
            handleNumberInput(value);
        }
    });

    function clearCalculator() {
        currentInput = '';
        previousInput = '';
        operator = '';
        shouldResetDisplay = false;
        updateDisplay('0');
    }

    function toggleSign() {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay(currentInput);
    }

    function convertToPercent() {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay(currentInput);
    }

    function chooseOperator(op) {
        if (currentInput === '') return;

        if (previousInput !== '') {
            calculate();
        } else {
            previousInput = currentInput;
        }

        currentInput = '';
        operator = op;
        shouldResetDisplay = true;
    }

    function calculate() {
        let resultValue;

        if (operator === '') return;

        switch (operator) {
            case 'add':
                resultValue = parseFloat(previousInput) + parseFloat(currentInput);
                break;
            case 'subtract':
                resultValue = parseFloat(previousInput) - parseFloat(currentInput);
                break;
            case 'multiply':
                resultValue = parseFloat(previousInput) * parseFloat(currentInput);
                break;
            case 'divide':
                resultValue = parseFloat(previousInput) / parseFloat(currentInput);
                break;
            default:
                return;
        }

        currentInput = resultValue.toString();
        operator = '';
        previousInput = '';
        shouldResetDisplay = true;
        updateDisplay(currentInput);
    }

    function handleNumberInput(value) {
        if (shouldResetDisplay) {
            currentInput = value;
            shouldResetDisplay = false;
        } else {
            currentInput = currentInput === '0' ? value : currentInput + value;
        }

        updateDisplay(currentInput);
    }

    function updateDisplay(value) {
        result.textContent = value;
    }
});

