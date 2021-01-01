export default {
  add: {
    opCode: 'add',
    description: 'Addition',
    applyNativeOperation: (left, right) => left + right,
    symmetric: true,
    symbol: '+'
  },
  subtract: {
    opCode: 'subtract',
    description: 'Subtraction',
    applyNativeOperation: (left, right) => left - right,
    symmetric: false,
    symbol: '-'
  },
  multiply: {
    opCode: 'multiply',
    description: 'Multiplication',
    applyNativeOperation: (left, right) => left * right,
    symmetric: true,
    symbol: '*'
  },
  divide: {
    opCode: 'divide',
    description: 'Division',
    applyNativeOperation: (left, right) => left / right,
    symmetric: false,
    symbol: '/'
  },
  exponentiation: {
    opCode: 'exponentiation',
    description: 'Power',
    applyNativeOperation: (left, right) => left ** right,
    symmetric: false,
    symbol: '^'
  },
}
