import React, { useEffect, useState } from 'react'
import { Solution } from '../components/Solution'
import Worker from '../solutions/find-solutions.worker'

export const Solutions = ({ formData }) => {
  const [worker, setWorker] = useState(new Worker())
  const [distance, setDistance] = useState(Infinity)
  const [solutions, setSolutions] = useState([])
  const [solutionsEvaluated, setSolutionsEvaluated] = useState(0)
  const cleanup = () => {
    worker.terminate()
  }
  useEffect(() => {
    const numbers = formData.numbersAsString.split(/\s+/).map(Number)
    cleanup()
    const newWorker = new Worker()
    setWorker(newWorker)
    setDistance(Infinity)
    setSolutions([])
    setSolutionsEvaluated(0)
    newWorker.postMessage({
      numbers,
      target: formData.target,
      operations: formData.operations,
    })
    return cleanup
  }, [formData])

  worker.onmessage = ({ data: { opType, ...data } }) => {
    switch (opType) {
      case 'updateEvalCount':
        setSolutionsEvaluated(data.evalCount)
        break
      case 'newMinDistanceFound':
        setSolutions([])
        setDistance(data.distance)
        break
      case 'addSolution':
        setSolutions((oldSolutions) => {
          oldSolutions.unshift(data.solution)
          return oldSolutions
        })
        break
      default:
        console.log({opType, data})
    }
  }

  return (
    <div>
      <div>{`Solutions evaluated: ${solutionsEvaluated.toLocaleString()}`}</div>
      <div>{`${solutions.length.toLocaleString()} solutions found with distance to target of ${distance}`}</div>
      <div>{`Displaying up to 10 of them`}</div>
      {solutions.slice(0, 10).map((solution, index) => (
        <Solution solution={solution} key={index} index={index} />
      ))}
    </div>
  )
}
