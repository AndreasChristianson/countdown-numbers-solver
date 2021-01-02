export const formatSolution = (steps) => {
  return {
    steps: steps.map(
      (step) =>
        `${step.left} ${step.operation.symbol} ${step.right} = ${step.result}`
    ),
  }
}
