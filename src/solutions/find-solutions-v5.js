import ops from '../operations'
import { SolutionEvaluator } from './SolutionEvaluator'

const iterateSolutions = (numbers, operations, evaluator) => {
  const used = new Array(numbers.length)

  const findSolutionsRecursive = ({ steps }) => {
    const len = numbers.length
    for (let i = 0; i < len - 1; i++) {
      if (used[i]) continue
      const left = numbers[i]
      for (let j = i + 1; j < len; j++) {
        if (used[j]) continue
        const right = numbers[j]
        for (const operation of operations) {
          const combinePair = (l, r) => {
            const result = operation.applyNativeOperation(l, r)
            numbers.push(result)
            used[i] = true
            used[j] = true

            const step = {
              left: l,
              right: r,
              result,
              operation,
            }

            steps.push(step)
            evaluator.evaluateSolution(steps, result)
            findSolutionsRecursive({
              steps,
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
  }

  findSolutionsRecursive({
    steps: [],
  })
  evaluator.postCounts()
}

export const findSolutions = (data, postMessage) => {
  const { target, numbers, operations: rawOperations } = data
  const operations = rawOperations.map((opCode) => ops[opCode])

  const evaluator = new SolutionEvaluator(target, postMessage)

  iterateSolutions(numbers, operations, evaluator)
  postMessage({
    opType: 'overallStatus',
    status: 'complete',
  })
}
