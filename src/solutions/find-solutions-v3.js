import BigNumber from "bignumber.js"

const formatSolutions = (solutions, target) => {
  return solutions.map(solution => ({
    distance: solution.distance.toString(),
    steps: solution.steps.map(step => `${step.left} ${step.operation.symbol} ${step.right} = ${step.result}`)
  }))
    .sort((a, b) => a.steps.length - b.steps.length)
}

export const findSolutions = ({ numbers: numbersRaw, target: targetRaw, operations }) => {
  let solutions = []
  let record = BigNumber(Infinity)
  const numbers = numbersRaw.map(n => BigNumber(n))
  const used = new Array(numbers.length)
  const target = BigNumber(targetRaw)

  const findSolutionsRecursive = ({
    steps,
  }) => {
    const len = numbers.length
    for (let i = 0; i < len - 1; i++) {
      if (used[i])
        continue
      const left = numbers[i]
      for (let j = i + 1; j < len; j++) {
        if (used[j])
          continue
        const right = numbers[j]
        for (const operation of operations) {
          const combinePair = (l, r) => {
            const result = operation.applyOperation(l, r)
            const position = numbers.push(result) - 1
            used[i] = true
            used[j] = true

            const step = {
              left: l,
              right: r,
              result,
              operation
            }

            steps.push(step)
            const distance = target.minus(result).abs()
            if (distance.lt(record)) {
              record = distance
              solutions = [{
                distance,
                steps: Array.from(steps)
              }]
            } else if (distance.eq(record)) {
              solutions.push({
                distance,
                steps: Array.from(steps)
              })
            }
            findSolutionsRecursive({
              steps
            })

            numbers.pop()
            used[i] = false
            used[j] = false
            steps.pop()
          }
          combinePair(left, right)
          if (!operation.symmetric) {
            combinePair(right, left)
          }
        }
      }
    }
    return solutions
  }

  findSolutionsRecursive({
    steps: []
  })

  return formatSolutions(solutions, target)
}