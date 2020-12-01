import React from 'react'
import { Solution } from '../components/Solution'
import { findSolutions } from '../solutions/find-solutions-v4'

export const Solutions = ({ numbers, target, operations }) => {
  const solutions = findSolutions({ numbers, target, operations })
  return <div>
    {solutions.map((solution, index) => <Solution solution={solution} key={index}/>)}
  </div>
}

