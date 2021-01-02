import { formatSolution } from "./format-solution"

export class SolutionEvaluator {
  constructor(target, postMessage) {
    this.target = target
    this.postMessage = postMessage
    this.distance = Infinity
    this.solutionsEvaluated = 0
    this.lastUpdate = Date.now()
  }

  evaluateSolution(solution, result) {
    this.solutionsEvaluated++
    if (Date.now() - this.lastUpdate > 1000) {
      this.postCounts()
    }
    const distance = Math.abs(result - this.target)
    if (Number.isNaN(distance) || distance > this.distance) {
      return
    }
    if (distance < this.distance) {
      this.distance = distance
      this.postMessage({
        opType: 'newMinDistanceFound',
        distance,
      })
    }
    this.postMessage({
      opType: 'addSolution',
      solution: formatSolution(solution),
    })
  }

  postCounts() {
    this.lastUpdate = Date.now()
    this.postMessage({
      opType: 'updateEvalCount',
      evalCount: this.solutionsEvaluated,
    })
  }
}
