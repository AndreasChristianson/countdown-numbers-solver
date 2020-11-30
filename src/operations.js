export default {
  add: {
    opCode: 'add',
    description: 'Addition',
    applyOperation: (left, right) => left.plus(right),
    applyNativeOperation: (left, right) => left + right,
    symmetric: true,
    symbol: '+'
  },
  subtract: {
    opCode: 'subtract',
    description: 'Subtraction',
    applyOperation: (left, right) => left.minus(right),
    applyNativeOperation: (left, right) => left - right,
    symmetric: false,
    symbol: '-'
  },
  multiply: {
    opCode: 'multiply',
    description: 'Multiplication',
    applyOperation: (left, right) => left.times(right),
    applyNativeOperation: (left, right) => left * right,
    symmetric: true,
    symbol: '*'
  },
  divide: {
    opCode: 'divide',
    description: 'Division',
    applyOperation: (left, right) => left.div(right),
    applyNativeOperation: (left, right) => left / right,
    symmetric: false,
    symbol: '/'
  },
  exponentiation: {
    opCode: 'exponentiation',
    description: 'Power',
    applyOperation: (left, right) => left.pow(right),
    applyNativeOperation: (left, right) => left ** right,
    symmetric: false,
    symbol: '^'
  },
}
