'use client';

import { useState } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';

type CalculatorButton = {
  label: string;
  type: 'number' | 'operator' | 'function';
  value?: string;
  span?: number;
};

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const { accentColor } = useTheme();

  const buttons: CalculatorButton[] = [
    // Row 1
    { label: 'C', type: 'function' },
    { label: '(', type: 'function' },
    { label: ')', type: 'function' },
    { label: '±', type: 'function' },
    { label: '%', type: 'function' },
    { label: '÷', type: 'operator', value: '/' },
    // Row 2
    { label: 'sin', type: 'function' },
    { label: '7', type: 'number' },
    { label: '8', type: 'number' },
    { label: '9', type: 'number' },
    { label: 'DEL', type: 'function' },
    { label: '×', type: 'operator', value: '*' },
    // Row 3
    { label: 'cos', type: 'function' },
    { label: '4', type: 'number' },
    { label: '5', type: 'number' },
    { label: '6', type: 'number' },
    { label: 'π', type: 'function' },
    { label: '−', type: 'operator', value: '-' },
    // Row 4
    { label: 'tan', type: 'function' },
    { label: '1', type: 'number' },
    { label: '2', type: 'number' },
    { label: '3', type: 'number' },
    { label: 'e', type: 'function' },
    { label: '+', type: 'operator' },
    // Row 5
    { label: 'x²', type: 'function' },
    { label: '0', type: 'number', span: 2 },
    { label: '.', type: 'number' },
    { label: '√', type: 'function' },
    { label: '=', type: 'operator' },
  ];

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      default: return b;
    }
  };

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(prev => prev === '0' ? num : prev + num);
    }
  };

  const handleOperator = (op: string) => {
    const currentValue = parseFloat(display);
    
    if (op === '=') {
      if (storedValue !== null && operator) {
        const result = calculate(storedValue, currentValue, operator);
        setDisplay(result.toString());
        setStoredValue(null);
        setOperator(null);
      }
    } else {
      if (storedValue === null) {
        setStoredValue(currentValue);
      } else if (operator) {
        const result = calculate(storedValue, currentValue, operator);
        setDisplay(result.toString());
        setStoredValue(result);
      }
      setOperator(op);
      setNewNumber(true);
    }
  };

  const handleFunction = (func: string) => {
    switch (func) {
      case 'C':
        setDisplay('0');
        setStoredValue(null);
        setOperator(null);
        setNewNumber(true);
        break;
      case '±':
        setDisplay(prev => (parseFloat(prev) * -1).toString());
        break;
      case '%':
        setDisplay(prev => (parseFloat(prev) / 100).toString());
        break;
    }
  };

  const handleClick = (button: CalculatorButton) => {
    if (button.type === 'number') {
      handleNumber(button.label);
    } else if (button.type === 'operator') {
      handleOperator(button.value || button.label);
    } else {
      handleFunction(button.label);
    }
  };

  const getButtonClass = (button: CalculatorButton) => {
    const base = 'h-14 text-lg font-medium rounded-lg transition-all duration-200 flex items-center justify-center';
    const span = button.span ? `col-span-${button.span}` : '';
    
    if (button.type === 'operator') {
      return `${base} ${span} bg-${accentColor}-500 text-white hover:bg-${accentColor}-600 active:bg-${accentColor}-700`;
    }
    if (button.type === 'function') {
      return `${base} ${span} bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600`;
    }
    return `${base} ${span} bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-gray-700`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Display */}
      <div className="bg-black/5 dark:bg-white/5 backdrop-blur-sm p-4">
        <div className="text-4xl font-mono text-right truncate">
          {display}
        </div>
        {operator && (
          <div className="text-sm text-right text-gray-500 dark:text-gray-400 h-6 mt-1">
            {storedValue} {operator}
          </div>
        )}
      </div>

      {/* Keypad */}
      <div className="flex-1 grid grid-cols-6 gap-2 p-2">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => handleClick(button)}
            className={getButtonClass(button)}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
} 