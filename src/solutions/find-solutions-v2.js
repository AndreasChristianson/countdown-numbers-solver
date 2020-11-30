import BigNumber from "bignumber.js"

const findSolutionsRecursive = ({
  numbers,
  operations,
  steps,
}) => {
  let solutions = []
  for (let i = 0; i < numbers.length; i++) {
    const left = numbers[i]
    for (let j = i + 1; j < numbers.length; j++) {
      const right = numbers[j]
      for (const operation of operations) {
        const combinePair = (l, r) => {
          const result = operation.applyOperation(l, r)
          const remaining = [
            result,
            ...numbers.slice(0, i),
            ...numbers.slice(i + 1, j),
            ...numbers.slice(j + 1)
          ]

          // console.log(`${l} ${operation.symbol} ${r} = ${result}`)
          // console.log(numbers.join(' '))
          // console.log(remaining.join(' '))
          // console.log(steps)
          // console.log(solutions)

          const step = {
            left: l,
            right: r,
            result,
            operation
          }
          const updatedSteps = [
            ...steps,
            step
          ]
          solutions = [
            ...solutions,
            updatedSteps
          ]
          const moreSolutions = findSolutionsRecursive({
            numbers: remaining,
            operations,
            steps: updatedSteps
          })
          solutions = [
            ...solutions,
            ...moreSolutions
          ]
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

const formatSolutions = (solutions, target) => {
  return solutions.map(solution => ({
    distance: solution.distance.toString(),
    steps: solution.steps.map(step => `${step.left} ${step.operation.symbol} ${step.right} = ${step.result}`)
  }))
  .sort((a, b) => a.steps.length - b.steps.length)
}

export const findSolutions = ({ numbers, target, operations }) => {
  const targetAsBigNumber = BigNumber(target)

  const allSolutions = findSolutionsRecursive({
    numbers: numbers.map(n => BigNumber(n)),
    operations,
    steps: []
  })

  const withDistances = allSolutions.map(steps => ({
    steps,
    distance: targetAsBigNumber.minus(steps.slice(-1)[0]?.result).abs()
  }))

  const shortestDistance = withDistances.reduce(
    (accum, { distance }) => accum.lt(distance) ? accum : distance,
    BigNumber(Infinity)
  )

  const solutions = withDistances.filter(({ distance }) => distance.eq(shortestDistance))

  return formatSolutions(solutions, targetAsBigNumber)
}