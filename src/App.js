import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [prevValue, setPrevValue] = useState('');
  const [operator, setOperator] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleInput = (value) => {
    if (waitingForOperand) {
      setDisplayValue(value);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? value : displayValue + value);
    }
  };

  const handleDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
      setWaitingForOperand(false);
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (prevValue === '') {
      setPrevValue(inputValue);
    } else {
      const currentValue = prevValue || 0;
      const result = evaluate(prevValue, inputValue, operator);

      setDisplayValue(`${parseFloat(result.toFixed(7))}`);
      setPrevValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const evaluate = (firstOperand, secondOperand, operation) => {
    switch (operation) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const handleClear = () => {
    setDisplayValue('0');
    setPrevValue('');
    setOperator('');
    setWaitingForOperand(false);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(displayValue);

    if (prevValue === '') {
      return;
    } else {
      const currentValue = prevValue || 0;
      const result = evaluate(prevValue, inputValue, operator);

      setDisplayValue(`${parseFloat(result.toFixed(7))}`);
      setPrevValue('');
      setOperator('');
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="calculator">
      <div id="display" className="display">
        {displayValue}
      </div>
      <div className="buttons">
        <div></div>
        <div></div>
        <div></div>
        <button id="clear" onClick={handleClear}>AC</button>
        <button id="seven" onClick={() => handleInput('7')}>7</button>
        <button id="eight" onClick={() => handleInput('8')}>8</button>
        <button id="nine" onClick={() => handleInput('9')}>9</button>
        <button id="divide" onClick={() => handleOperator('/')}>/</button>
        <button id="four" onClick={() => handleInput('4')}>4</button>
        <button id="five" onClick={() => handleInput('5')}>5</button>
        <button id="six" onClick={() => handleInput('6')}>6</button>
        <button id="multiply" onClick={() => handleOperator('*')}>*</button>
        <button id="one" onClick={() => handleInput('1')}>1</button>
        <button id="two" onClick={() => handleInput('2')}>2</button>
        <button id="three" onClick={() => handleInput('3')}>3</button>
        <button id="subtract" onClick={() => handleOperator('-')}>-</button>
        <button id="decimal" onClick={handleDecimal}>.</button>
        <button id="zero" onClick={() => handleInput('0')}>0</button>
        <button id="equals" onClick={handleEquals}>=</button>

        <button id="add" onClick={() => handleOperator('+')}>+</button>

      </div>
    </div>
  );
};

export default App;
