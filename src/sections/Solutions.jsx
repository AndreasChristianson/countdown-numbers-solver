import React from 'react'
import { findSolutions } from '../solutions/find-solutions-v4'

export const Solutions = ({ numbers, target, operations }) => {
  const solutions = findSolutions({ numbers, target, operations })
  return <div>{JSON.stringify(solutions)}</div>
}

