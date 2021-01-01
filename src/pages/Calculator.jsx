import React, { useState } from 'react'
import styled from 'styled-components'
import { CalculatorForm } from '../sections/Form'
import { Solutions } from '../sections/Solutions'
import { Title } from '../sections/Title'

const PageContainer = styled.div``

export const Calculator = () => {
  const [formData, setFormData] = useState({
    numbersAsString: '',
    target: 0,
    operations: ['add', 'subtract', 'multiply', 'divide'],
  })

  return (
    <PageContainer>
      <Title />
      <CalculatorForm formData={formData} setFormData={setFormData} />
      <Solutions formData={formData} />
    </PageContainer>
  )
}
