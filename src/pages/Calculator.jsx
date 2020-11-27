import React, { useState } from 'react'
import styled from 'styled-components'
import ops from '../operations'
import { CalculatorForm } from '../sections/Form'
import { Solutions } from '../sections/Solutions'
import { Title } from '../sections/Title'

const PageContainer = styled.div``

export const Calculator = () => {
  const [operations, setOperations] = useState([
    ops.add,
    ops.subtract,
    ops.multiply,
    ops.divide,
  ])
  const [numbers, setNumbers] = useState([])
  const [target, setTarget] = useState(0)

  return (
    <PageContainer>
      <Title />
      <CalculatorForm
        operations={operations}
        setOperations={setOperations}
        numbers={numbers}
        setNumbers={setNumbers}
        target={target}
        setTarget={setTarget}
      />
      <Solutions
        operations={operations}
        numbers={numbers}
        target={target}
      />
    </PageContainer>
  )
}
