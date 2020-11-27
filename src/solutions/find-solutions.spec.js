import Chance from 'chance'
import { findSolutions } from './find-solutions'
import ops from '../operations'
import BigNumber from 'bignumber.js'

describe('find solutions', () => {
  const chance = new Chance()
  let parameters

  beforeEach(() => {
    const numbers = chance.n(() => BigNumber(chance.d20()), chance.d6())
    const target = BigNumber(chance.natural({
      min: 100,
      max: 999
    }))
    const operations = [
      ops.add,
      ops.subtract,
      ops.multiply,
      ops.divide,
    ]
    parameters = { numbers, target, operations }
  })

  it('should return nothing given no numbers',() =>{
    parameters.numbers = []

    const solutions = findSolutions(parameters)

    expect(solutions).toHaveLength(0)
  })
})
