"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (currentValue === null) {
      setCurrentValue(inputValue);
    } else if (operator) {
      const result = calculate(currentValue, inputValue, operator);
      setCurrentValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };
  
  const calculate = (firstOperand: number, secondOperand: number, operator: string) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      case '=':
        return secondOperand;
      default:
        return secondOperand;
    }
  };
  
  const handleEquals = () => {
    const inputValue = parseFloat(display);
    if (operator && currentValue !== null) {
      const result = calculate(currentValue, inputValue, operator);
      setCurrentValue(result);
      setDisplay(String(result));
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const buttons = [
    { label: 'AC', handler: clearDisplay, className: "col-span-2 bg-destructive/80 hover:bg-destructive" },
    { label: 'C', handler: clearDisplay, className: "bg-destructive/80 hover:bg-destructive" },
    { label: '/', handler: () => performOperation('/'), className: "bg-primary/80 hover:bg-primary" },
    { label: '7', handler: () => inputDigit('7') },
    { label: '8', handler: () => inputDigit('8') },
    { label: '9', handler: () => inputDigit('9') },
    { label: '*', handler: () => performOperation('*'), className: "bg-primary/80 hover:bg-primary" },
    { label: '4', handler: () => inputDigit('4') },
    { label: '5', handler: () => inputDigit('5') },
    { label: '6', handler: () => inputDigit('6') },
    { label: '-', handler: () => performOperation('-'), className: "bg-primary/80 hover:bg-primary" },
    { label: '1', handler: () => inputDigit('1') },
    { label: '2', handler: () => inputDigit('2') },
    { label: '3', handler: () => inputDigit('3') },
    { label: '+', handler: () => performOperation('+'), className: "bg-primary/80 hover:bg-primary" },
    { label: '0', handler: () => inputDigit('0'), className: "col-span-2" },
    { label: '.', handler: inputDecimal },
    { label: '=', handler: handleEquals, className: "bg-primary/80 hover:bg-primary" },
  ];

  return (
    <div className="w-full h-full bg-background flex flex-col p-2">
      <Card className="flex-grow flex flex-col border-0 shadow-none">
        <CardContent className="p-2 flex-grow flex flex-col">
          <div className="bg-muted text-right p-4 rounded-lg mb-2 text-3xl font-mono break-all">
            {display}
          </div>
          <div className="grid grid-cols-4 gap-2 flex-grow">
            {buttons.map(btn => (
              <Button key={btn.label} onClick={btn.handler} className={`text-xl h-full w-full ${btn.className || ''}`} variant="secondary">
                {btn.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculatorApp;
