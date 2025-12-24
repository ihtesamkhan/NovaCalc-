
export interface Calculation {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export enum Operation {
  NONE = '',
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '×',
  DIVIDE = '÷',
  PERCENT = '%',
}
