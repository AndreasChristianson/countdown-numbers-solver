import React from 'react'
import { findSolutions } from '../solutions/find-solutions'

export const Solutions = ({ numbers, target, operations }) => {
  const solutions = findSolutions({ numbers, target, operations })
  return <div>{JSON.stringify(solutions)}</div>
}

