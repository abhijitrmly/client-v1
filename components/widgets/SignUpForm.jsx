import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import 'twin.macro';
import { func } from 'prop-types';

import { AuthStyledFormField, AuthStyledForm } from '../blocks/StyledFormium';
import { StyledFormSubmitButton } from '../blocks/Buttons';

const SignUpForm = ({ onSubmit }) => (
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
      onSubmit(values.email, values.password).then(
        () => {
          setSubmitting(false);
        },
      );
    }}
  >
    {({ isSubmitting }) => (
      <AuthStyledForm>
        <div tw="rounded-md shadow-sm -space-y-px">
          <div tw="mt-8 space-y-6">
            <label htmlFor="email-address" tw="sr-only">Email address</label>
            <AuthStyledFormField type="email" name="email" placeholder="Email address" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="password" tw="sr-only">Password</label>
            <AuthStyledFormField type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
          </div>
        </div>
        <StyledFormSubmitButton disabled={isSubmitting} buttonTitle="Submit" />
      </AuthStyledForm>
    )}
  </Formik>
);

export default SignUpForm;

SignUpForm.propTypes = {
  onSubmit: func,
};
