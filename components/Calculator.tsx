
import React, { useState, useEffect, useCallback } from 'react';
import Button from './Button';
import { Operation, Calculation } from '../types';

interface CalculatorProps {
  onCalculate: (calc: Calculation) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onCalculate }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<Operation>(Operation.NONE);
  const [shouldReset, setShouldReset] = useState(false);

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(Operation.NONE);
    setShouldReset(false);
  };

  const handleNumber = (num: string) => {
    if (display === '0' || shouldReset) {
      setDisplay(num);
      setShouldReset(false);
    } else {
      if (display.length < 15) {
        setDisplay(display + num);
      }
    }
  };

  const handleDecimal = () => {
    if (shouldReset) {
      setDisplay('0.');
      setShouldReset(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleToggleSign = () => {
    setDisplay((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
  };

  const handlePercentage = () => {
    const value = parseFloat(display) / 100;
    setDisplay(value.toString());
  };

  const handleOperation = (op: Operation) => {
    if (operation !== Operation.NONE) {
      calculateResult();
    }
    setPreviousValue(display);
    setOperation(op);
    setShouldReset(true);
  };

  const calculateResult = useCallback(() => {
    if (operation === Operation.NONE || !previousValue) return;

    const prev = parseFloat(previousValue);
    const curr = parseFloat(display);
    let result = 0;

    switch (operation) {
      case Operation.ADD:
        result = prev + curr;
        break;
      case Operation.SUBTRACT:
        result = prev - curr;
        break;
      case Operation.MULTIPLY:
        result = prev * curr;
        break;
      case Operation.DIVIDE:
        result = curr === 0 ? NaN : prev / curr;
        break;
      default:
        return;
    }

    const resultStr = Number.isNaN(result) ? 'Error' : result.toString().slice(0, 15);
    const expression = `${previousValue} ${operation} ${display}`;
    
    setDisplay(resultStr);
    setPreviousValue(null);
    setOperation(Operation.NONE);
    setShouldReset(true);

    if (resultStr !== 'Error') {
      onCalculate({
        id: crypto.randomUUID(),
        expression,
        result: resultStr,
        timestamp: Date.now(),
      });
    }
  }, [display, operation, previousValue, onCalculate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/[0-9]/.test(e.key)) handleNumber(e.key);
      if (e.key === '.') handleDecimal();
      if (e.key === '+') handleOperation(Operation.ADD);
      if (e.key === '-') handleOperation(Operation.SUBTRACT);
      if (e.key === '*') handleOperation(Operation.MULTIPLY);
      if (e.key === '/') handleOperation(Operation.DIVIDE);
      if (e.key === 'Enter' || e.key === '=') calculateResult();
      if (e.key === 'Escape' || e.key === 'Backspace') {
        if (e.key === 'Escape') handleClear();
        else {
          setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, operation, previousValue, calculateResult]);

  return (
    <div className="glass rounded-[48px] p-8 w-full max-w-[400px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden group">
      {/* Elegant Inner Shadow / Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      {/* Display Section */}
      <div className="mb-10 pt-10 flex flex-col items-end justify-end min-h-[160px] px-2">
        <div className="text-slate-500 text-lg font-light mono h-8 overflow-hidden transition-all">
          {previousValue && `${previousValue} ${operation}`}
        </div>
        <div className={`
          text-white mono tracking-tighter font-semibold transition-all duration-300 w-full text-right overflow-hidden
          ${display.length > 10 ? 'text-4xl' : display.length > 7 ? 'text-5xl' : 'text-6xl'}
        `}>
          {display}
        </div>
      </div>

      {/* Keypad Section */}
      <div className="grid grid-cols-4 gap-4">
        <Button label="AC" variant="action" onClick={handleClear} />
        <Button label="+/-" variant="action" onClick={handleToggleSign} />
        <Button label="%" variant="action" onClick={handlePercentage} />
        <Button label={<i className="fa-solid fa-divide text-sm"></i>} variant="operator" onClick={() => handleOperation(Operation.DIVIDE)} />
        
        <Button label="7" onClick={() => handleNumber('7')} />
        <Button label="8" onClick={() => handleNumber('8')} />
        <Button label="9" onClick={() => handleNumber('9')} />
        <Button label={<i className="fa-solid fa-xmark text-sm"></i>} variant="operator" onClick={() => handleOperation(Operation.MULTIPLY)} />
        
        <Button label="4" onClick={() => handleNumber('4')} />
        <Button label="5" onClick={() => handleNumber('5')} />
        <Button label="6" onClick={() => handleNumber('6')} />
        <Button label={<i className="fa-solid fa-minus text-sm"></i>} variant="operator" onClick={() => handleOperation(Operation.SUBTRACT)} />
        
        <Button label="1" onClick={() => handleNumber('1')} />
        <Button label="2" onClick={() => handleNumber('2')} />
        <Button label="3" onClick={() => handleNumber('3')} />
        <Button label={<i className="fa-solid fa-plus text-sm"></i>} variant="operator" onClick={() => handleOperation(Operation.ADD)} />
        
        <Button label="0" span={2} onClick={() => handleNumber('0')} />
        <Button label="." onClick={handleDecimal} />
        <Button label={<i className="fa-solid fa-equals text-sm"></i>} variant="equal" onClick={calculateResult} />
      </div>
    </div>
  );
};

export default Calculator;
