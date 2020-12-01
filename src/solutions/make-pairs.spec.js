import Chance from 'chance'
import {makePairs} from "./make-pairs"

describe('make pairs', () => {
  const chance = new Chance();

  it('should return the same two items provided', () => {
    const left = chance.string()
    const right = chance.string()
    const pairs = makePairs([left, right]);

    expect(pairs).toEqual([{
      left,
      right,
      remaining: []
    }])
  })

  it('should return the same two items provided', () => {
    const one = chance.string()
    const two = chance.string()
    const three = chance.string()
    const four = chance.string()
    const pairs = makePairs([one,two,three,four]);


    expect(pairs).toHaveLength(6) 
    expect(pairs).toContainEqual({left: one, right: three, remaining: [two, four]})
    expect(pairs).toContainEqual({left: one, right: four, remaining: [two, three]})
    expect(pairs).toContainEqual({left: one, right: two, remaining: [three, four]})
    expect(pairs).toContainEqual({left: two, right: three, remaining: [one, four]})
    expect(pairs).toContainEqual({left: two, right: four, remaining: [one, three]})
    expect(pairs).toContainEqual({left: three, right: four, remaining: [one, two]})
  })

  it.each([
    chance.d20(),
    chance.d20(),
    chance.d20(),
    chance.d20(),
    chance.d100(),
    1
  ])('https://oeis.org/A000217 n=%s', (n) => {
    const pairs = makePairs(chance.n(chance.string,n+1));

    expect(pairs).toHaveLength((n*(n+1))/2) 
  })
})