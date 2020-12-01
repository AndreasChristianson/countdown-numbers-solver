import BigNumber from "bignumber.js"
import { makePairs } from "./make-pairs";

const extractDistance = (solution, target) =>
  target.minus(solution.slice(-1)[0]?.result).abs()

const findSolutionsRecursive = ({
  numbers,
  target,
  operations,
  steps,
  closestDistanceSoFar
}) => {
  let closestDistance = closestDistanceSoFar
  let solutions = []
  const evaluateSolutions = (potentialSolutions) => {
    potentialSolutions.forEach(solution => {
      const distance = extractDistance(solution, target)

      if (distance.lt(closestDistance)) {
        solutions = [solution]
        closestDistance = distance
      } else if (distance.eq(closestDistance)) {
        solutions.push(solution)
      }
    });
  }
  const pairs = makePairs(numbers)

  pairs.forEach(pair => {
    operations.forEach(operation => {
      const left = pair.left
      const right = pair.right
      const result = operation.applyOperation(left, right)
      const mutatedNumbers = pair.remaining.concat()
      mutatedNumbers.unshift(result)
      const newSteps = [
        ...steps,
        {
          left,
          right,
          result,
          operation
        }]
      evaluateSolutions([newSteps])
      evaluateSolutions(findSolutionsRecursive({
        numbers: mutatedNumbers,
        target,
        operations,
        steps: newSteps,
        closestDistanceSoFar: closestDistance
      }))
      if (!operation.symmetric) {
        const resultReversed = operation.applyOperation(right, left)
        const mutatedNumbersReversed = pair.remaining.concat()
        mutatedNumbersReversed.unshift(resultReversed)
        const newStepsReversed = [
          ...steps,
          {
            left: right,
            right: left,
            result: resultReversed,
            operation
          }]
        evaluateSolutions([newStepsReversed])
        evaluateSolutions(findSolutionsRecursive({
          numbers: mutatedNumbersReversed,
          target,
          operations,
          steps: newStepsReversed,
          closestDistanceSoFar: closestDistance
        }))
      }
    })
  })

  return solutions
}
const formatSolutions = (solutions, target) => {
  return solutions.map(solution => ({
    distance: extractDistance(solution, target).toString(),
    steps: solution.map(step => `${step.left} ${step.operation.symbol} ${step.right} = ${step.result}`)
  }))
}

export const findSolutions = ({ numbers, target, operations }) => {
  const targetAsBigNumber = BigNumber(target)

  const solutions = findSolutionsRecursive({
    target: targetAsBigNumber,
    numbers: numbers.map(n => BigNumber(n)),
    operations,
    steps: [],
    closestDistanceSoFar: BigNumber(Infinity)
  })

  return formatSolutions(solutions, targetAsBigNumber)
}