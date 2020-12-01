import React from 'react'
import styled from 'styled-components'
import { Step } from './Step'

const SolutionContainer = styled.div``

export const Solution = ({ solution }) => (
  <SolutionContainer>
    <h3>{`Distance: ${solution.distance}. Steps: ${solution.steps.length}.`}</h3>
    {solution.steps.map((step, index) => (
      <Step step={step} key={index}/>
    ))}
  </SolutionContainer>
)
