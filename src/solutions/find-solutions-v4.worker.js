import ops from '../operations'

const formatSolutions = (solutions, target) => {
  return solutions.map(solution => ({
    distance: solution.distance.toString(),
    steps: solution.steps.map(step => `${step.left} ${step.operation.symbol} ${step.right} = ${step.result}`)
  }))
    .sort((a, b) => a.steps.length - b.steps.length)
}

onmessage = ({ data: { numbers: rawNumbers, target: rawTarget, operations: rawOperations } }) => {
  let solutions = []
  let record = Infinity
  const operations = rawOperations.map(opCode => ops[opCode])
  const numbers = rawNumbers.map(Number)
  const used = new Array(numbers.length)
  const target = Number(rawTarget)
  let solutionsEvaluated = 0;
  let lastUpdate = Date.now()

  const postUpdate = () => {
    postMessage({
      inProgress: solutionsEvaluated
    });
  }

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
            const result = operation.applyNativeOperation(l, r)
            numbers.push(result) - 1
            used[i] = true
            used[j] = true
            solutionsEvaluated++

            const step = {
              left: l,
              right: r,
              result,
              operation
            }

            steps.push(step)
            const distance = Math.abs(target - result)
            if (distance < record) {
              record = distance
              solutions = [{
                distance,
                steps: Array.from(steps)
              }]
            } else if (distance === record) {
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
          if(Date.now() - lastUpdate>1000){
            lastUpdate = Date.now();
            postUpdate()
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
    steps: []
  })

  postUpdate()

  const formattedSolutions = formatSolutions(solutions, target)

  postMessage({
    solutions: formattedSolutions.slice(0, 100),
    numberFound: solutions.length,
    offBy: solutions[0]?.distance,
    shortest: formattedSolutions[0]?.steps.length
  })
}