export default {
  add: {
    opCode: 'add',
    description: 'Addition',
    apply: (left, right) => left.plus(right),
  },
  subtract: {
    opCode: 'subtract',
    description: 'Subtraction',
    apply: (left, right) => left.minus(right),
  },
  multiply: {
    opCode: 'multiply',
    description: 'Multiplication',
    apply: (left, right) => left.times(right),
  },
  divide: {
    opCode: 'divide',
    description: 'Division',
    apply: (left, right) => left.div(right),
  }
}
