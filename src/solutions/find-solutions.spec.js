import Chance from 'chance'
import { findSolutions } from './find-solutions-v5'
import ops from '../operations'

describe('find solutions', () => {
  const chance = new Chance()
  let parameters

  beforeEach(() => {
    const numbers = chance.n(chance.d20, chance.d6())
    const target = chance.natural({
      min: 100,
      max: 999,
    })
    const operations = ['add', 'subtract', 'multiply', 'divide']
    parameters = { numbers, target, operations }
  })

  const getCallback = () => {
    const callback = (message) => {
      switch (message.opType) {
        case 'addSolution':
          callback.solutions.push(message.solution)
          break;
      
          case 'newMinDistanceFound':
            callback.solutions = []
            break;
      }
    }
    callback.solutions = []

    return callback
  }

  it('should return nothing given no numbers', () => {
    parameters.numbers = []
    const callback = getCallback()

    findSolutions(parameters, callback)

    expect(callback.solutions).toHaveLength(0)
  })

  it('should solve 1+1', () => {
    parameters.numbers = [1, 1]
    parameters.target = 2
    const callback = getCallback()

    findSolutions(parameters, callback)

    expect(callback.solutions).toContainEqual({
      steps: ['1 + 1 = 2'],
    })
  })

  it('should solve 1+1+1', () => {
    parameters.numbers = [1, 1, 1]
    parameters.target = 3
    const callback = getCallback()

    findSolutions(parameters, callback)

    expect(callback.solutions).toContainEqual({
      steps: ['1 + 1 = 2', '1 + 2 = 3'],
    })
  })

  it('should solve 1 4 12 50 6 25 => 987', () => {
    parameters.numbers = [1, 4, 12, 50, 6, 25]
    parameters.target = 987
    const callback = getCallback()

    findSolutions(parameters, callback)

    expect(callback.solutions).toContainEqual({
      steps: [
        '4 + 6 = 10',
        '50 - 10 = 40',
        '25 * 40 = 1000',
        '1 + 12 = 13',
        '1000 - 13 = 987',
      ],
    })
  })

  it('should solve 7 4 12 50 6 25 => 5692', () => {
    parameters.numbers = [7, 4, 12, 50, 6, 25]
    parameters.target = 5692
    const callback = getCallback()

    findSolutions(parameters, callback)

    expect(callback.solutions).toContainEqual({
      steps: [
        '7 + 50 = 57',
        '25 * 57 = 1425',
        '12 / 6 = 2',
        '1425 - 2 = 1423',
        '4 * 1423 = 5692',
      ],
    })
  })
})
