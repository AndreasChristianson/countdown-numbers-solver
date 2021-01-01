import Chance from 'chance'
import { findSolutions as v1 } from './find-solutions'
import { findSolutions as v2 } from './find-solutions-v2'
import { findSolutions as v3 } from './find-solutions-v3'
import { findSolutions as v4 } from './find-solutions-v4.worker'
import ops from '../operations'

describe.each([v4])('find solutions %#', (findSolutions) => {
  const chance = new Chance()
  let parameters

  beforeEach(() => {
    const numbers = chance.n(chance.d20, chance.d6())
    const target = chance.natural({
      min: 100,
      max: 999,
    })
    const operations = [ops.add, ops.subtract, ops.multiply, ops.divide]
    parameters = { numbers, target, operations }
  })

  it('should return nothing given no numbers', () => {
    parameters.numbers = []

    const solutions = findSolutions(parameters)

    expect(solutions).toHaveLength(0)
  })

  it('should solve 1+1', () => {
    parameters.numbers = [1, 1]
    parameters.target = 2

    const solutions = findSolutions(parameters)

    expect(solutions).toContainEqual({
      distance: '0',
      steps: ['1 + 1 = 2'],
    })
  })

  it('should solve 1+1+1', () => {
    parameters.numbers = [1, 1, 1]
    parameters.target = 3

    const solutions = findSolutions(parameters)

    expect(solutions).toContainEqual({
      distance: '0',
      steps: ['1 + 1 = 2', '1 + 2 = 3'],
    })
  })

  it('should solve 1 4 12 50 6 25 => 987', () => {
    parameters.numbers = [1, 4, 12, 50, 6, 25]
    parameters.target = 987

    const solutions = findSolutions(parameters)

    expect(solutions).toContainEqual({
      distance: '0',
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

    const solutions = findSolutions(parameters)

    expect(solutions).toContainEqual({
      distance: '0',
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
