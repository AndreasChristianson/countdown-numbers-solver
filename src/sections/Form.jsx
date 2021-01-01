import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import ops from '../operations'
import styled from 'styled-components'

const InputField = styled(Field)`
  width: 100%;
`

export const CalculatorForm = ({ formData, setFormData }) => {
  return (
    <Formik
      initialValues={formData}
      validationSchema={Yup.object({
        numbersAsString: Yup.string()
          .matches(
            /^(-?(\d+)(\.\d+)?\s*){2,}$/u,
            'At least two, base 10, whitespace delineated, numbers.'
          )
          .required('Required'),
        target: Yup.number().required('Required'),
      })}
      onSubmit={(values) => {
        setFormData(values)
      }}
    >
      <Form>
        <fieldset>
          <legend>Input game parameters</legend>
          <label htmlFor="numbersAsString">Numbers: (space separated)</label>
          <div>
            <InputField name="numbersAsString" type="text" />
            <ErrorMessage name="numbersAsString" />
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
