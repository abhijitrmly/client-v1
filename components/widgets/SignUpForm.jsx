import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import 'twin.macro';

import { AuthStyledFormField } from '../blocks/StyledFormium';
import { StyledFormSubmitButton } from '../blocks/Buttons';

const SignUpForm = () => (
  <Formik
    initialValues={{ email: '', password: '' }}
    validate={(values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <div tw="mt-8 space-y-6">
          <label htmlFor="email-address" tw="sr-only">Email address</label>
          <AuthStyledFormField type="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </div>
        <div>
          <label htmlFor="password" tw="sr-only">Password</label>
          <AuthStyledFormField type="password" name="password" />
          <ErrorMessage name="password" component="div" />
        </div>
        <StyledFormSubmitButton disabled={isSubmitting}>
          Submit
        </StyledFormSubmitButton>
      </Form>
    )}
  </Formik>
);

export default SignUpForm;
