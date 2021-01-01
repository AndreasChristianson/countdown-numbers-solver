import React from 'react'
import styled from 'styled-components'
import { Step } from './Step'

const SolutionContainer = styled.div``

export const Solution = ({ solution, index }) => (
  <SolutionContainer>
    <h3>{`Solution #${index + 1}`}</h3>
    <p>{`Steps: ${solution.steps.length}`}</p>
    {solution.steps.map((step, index) => (
      <Step step={step} key={index} />
    ))}
  </SolutionContainer>
)
