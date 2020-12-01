import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import ops from '../operations'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'

const InputField = styled(Field)`
  width: 100%;
`

export const CalculatorForm = ({
  operations,
  setOperations,
  numbers: initialNumbers,
  setNumbers,
  target,
  setTarget,
}) => {
  return (
    <Formik
      initialValues={{
        operations: operations.map(({ opCode }) => opCode),
        numbers: initialNumbers.join(' '),
        target,
      }}
      validationSchema={Yup.object({
        numbers: Yup.string()
          .matches(/^(-?(\d+)(\.\d+)?\s*){2,}$/u, 'At least two, base 10, whitespace delineated, numbers.')
          .required('Required'),
        target: Yup.number().required('Required'),
      })}
      onSubmit={(values) => {
        setOperations(values.operations.map((opCode) => ops[opCode]))
        const numbers = values.numbers.split(/\s+/u)
        setNumbers(numbers)
        setTarget(values.target)
        // console.log(numbers, values.target, values.operations)
      }}
    >
      <Form>
        <fieldset>
          <legend>Input game parameters</legend>
          <label htmlFor="numbers">Numbers: (space separated)</label>
          <div>
            <InputField name="numbers" type="text" />
            <ErrorMessage name="numbers" />
          </div>
          <label htmlFor="target">Target Number:</label>
          <div>
            <InputField name="target" type="number" />
            <ErrorMessage name="target" />
          </div>
          <div id="checkbox-group">Allowed Operations:</div>
          <div role="group" aria-labelledby="checkbox-group">
            {Object.values(ops).map(({ opCode, description }) => (
              <label key={opCode}>
                <Field type="checkbox" name="operations" value={opCode} />
                {description}
              </label>
            ))}
          </div>
          <button type="submit">Solve</button>
        </fieldset>
      </Form>
    </Formik>
  )
}
