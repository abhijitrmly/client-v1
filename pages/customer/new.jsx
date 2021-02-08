/* eslint-disable no-underscore-dangle */
import React from 'react';
import Head from 'next/head';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'twin.macro';
import { Formik, Form, useFormikContext } from 'formik';

import { useService } from '../../store';

import { SectionCardWrapper, RightCardWrapper, LeftCardWrapper } from '../../components/containers/FormPageContainers';
import {
  PredefinedCriterion,
  CustomCriterion,
  CertificationCheckboxField,
  NewCustomCriterionCardFooter,
} from '../../components/widgets/TransactionForm';

import categories from '../../helpers/constants/categories';
import certifications from '../../helpers/constants/certifications';
import criteria from '../../helpers/constants/criteria';

const certificationObject = certifications.reduce(
  (accumulator, currentValue) => (
    // eslint-disable-next-line no-underscore-dangle
    { ...accumulator, [currentValue._id]: currentValue.name }
  ), {},
);

const CertificationSelector = () => {
  const {
    setFieldValue, values,
  } = useFormikContext();

  const handleCriteriaChange = (event = {}) => {
    const { target = {} } = event;
    const { name, checked = false } = target;

    setFieldValue(`${name}`, checked);

    const { predefinedQuestions = {} } = values;
    if (checked) {
      const listOfCertifierCriteria = criteria.filter((criterion) => criterion.certifier === name);
      const formCriteriaData = {};
      listOfCertifierCriteria.forEach(
        (criterion) => {
          formCriteriaData[criterion._id] = {
            information: { ...criterion },
            isVisible: true,
            isFinalSelected: true,
          };
        },
      );
      setFieldValue('predefinedQuestions', { ...predefinedQuestions, ...formCriteriaData });
    } else {
      const withUncheckedCriteria = {};
      Object.keys(predefinedQuestions).forEach(
        (criterionId) => {
          const { [criterionId]: criterion } = predefinedQuestions;
          const { information = {} } = criterion;
          const { certifier } = information;
          if (certifier === name) {
            criterion.isFinalSelected = false;
          }
          withUncheckedCriteria[criterionId] = criterion;
        },
      );
    }
  };

  return (
    <>
      <CertificationCheckboxField
        certificationsArray={
           Object.keys(certificationObject).map(
             (certificationId) => {
               const name = certificationObject[certificationId];
               // const isSelected = certificationState[certificationId];
               return ({
                 certificationName: certificationId,
                 certificationLabel: name,
               }
               );
             },
           )
        }
        onChange={handleCriteriaChange}
        productsArray={[
          {
            productName: 'Cotton',
            productLabel: 'Cotton',
          },
        ]}
        supplierName="supplierEmail"
        productName="productName"
      />
    </>
  );
};

// @TODO add button to remove custom criterion
const AddCustomCriteria = ({ criteriaCategory }) => {
  const {
    setFieldValue, values = {},
  } = useFormikContext();

  const handleClick = () => {
    const newCriteriaId = Object.keys(values.customCriteria || {}).length + 1;
    setFieldValue(`customCriteria.${newCriteriaId}`, ({
      tempId: newCriteriaId,
      isFinalSelected: true,
      category: criteriaCategory,
    }));
  };
  return (
    <NewCustomCriterionCardFooter
      onClick={() => handleClick()}
    />
  );
};

const NewCustomerTransaction = () => {
  const TransactionsService = useService('transaction');

  return (
    <div>
      <Head>
        <title>New transaction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Formik
          initialValues={{ customCriteria: {}, supplierEmail: '', productName: 'Cotton' }}
          onSubmit={async (values, { setSubmitting }) => {
            const {
              predefinedQuestions = {},
              customCriteria = {},
            } = values;
            const filteredPredefinedQuestionValues = Object
              .fromEntries(
                Object.entries(predefinedQuestions)
                  .filter(([, predefinedQuestion]) => !!predefinedQuestion.isFinalSelected),
              );
            const filteredcustomCriteriaValues = Object
              .fromEntries(
                Object.entries(customCriteria)
                  .filter(([, customCriterion]) => !!customCriterion.isFinalSelected),
              );
            await TransactionsService.create({
              filteredPredefinedQuestionValues,
              filteredcustomCriteriaValues,
            });
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, values = {} }) => (
            <Form>
              <div>
                <header tw="bg-white shadow">
                  <div tw="flex justify-between py-6 px-4 sm:px-6 lg:px-8">
                    <h1 tw="text-3xl font-bold leading-tight text-gray-900">
                      New Compliance Transaction
                    </h1>
                    <span>
                      <button type="submit" disabled={isSubmitting} tw="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg tw="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Submit requirement
                      </button>
                    </span>
                  </div>
                </header>

                {JSON.stringify(values)}
                <SectionCardWrapper>
                  <LeftCardWrapper>
                    <div tw="p-8 sm:px-0">
                      <h3 tw="text-lg font-medium leading-6 text-gray-900">Product, Supplier & Certifications</h3>
                      <p tw="mt-1 text-sm text-gray-600">
                        Add supplier details and product for which you would like to
                        initiate compliance transaction. You can also select existing certifications
                        whose criteria you would like to use for this transaction.
                      </p>
                    </div>
                  </LeftCardWrapper>
                  <RightCardWrapper>
                    <div tw="p-8">
                      <div tw="col-span-6 sm:col-span-3">
                        <CertificationSelector />
                      </div>
                    </div>
                  </RightCardWrapper>
                </SectionCardWrapper>
                {
                Object.entries(categories).map(
                  ([categoryName, categoryDetails]) => {
                    const { displayLabel, explanatoryText } = categoryDetails;
                    let predefinedCategoryCriteria = [];
                    let customCategoryCriteria = [];
                    if (values) {
                      const { predefinedQuestions = {}, customCriteria = {} } = values;
                      predefinedCategoryCriteria = Object.entries(predefinedQuestions)
                        .filter(([, criterionDetails]) => {
                          const { isVisible = false, information = {} } = criterionDetails;
                          if (!isVisible) {
                            return false;
                          }

                          const { category } = information;
                          return (categoryName === category);
                        });

                      customCategoryCriteria = Object.entries(customCriteria)
                        .filter(([, criterionDetails]) => {
                          const { category } = criterionDetails;
                          return (categoryName === category);
                        });
                    }
                    return (
                      <SectionCardWrapper>
                        <LeftCardWrapper>
                          <div tw="p-8 sm:px-0">
                            <h3 tw="text-lg font-medium leading-6 text-gray-900">{displayLabel}</h3>
                            <p tw="mt-1 text-sm text-gray-600">
                              {explanatoryText}
                            </p>
                          </div>
                        </LeftCardWrapper>
                        <RightCardWrapper>
                          <>
                            <div tw="p-8">
                              {
                                predefinedCategoryCriteria.length > 0 && (
                                <div>
                                  <legend tw="text-base font-medium text-gray-900">Criteria added from selected certifications</legend>
                                </div>
                                )
                              }

                              {
                              predefinedCategoryCriteria.map(
                                (([criterionId, criterionDetails]) => (
                                  <PredefinedCriterion
                                    predefinedCriterionCheckboxName={`predefinedQuestions.${criterionId}.isFinalSelected`}
                                    primaryQuestion={criterionDetails.information.primaryQuestion}
                                    predefinedCriterionId={`predefinedQuestions.${criterionId}.isFinalSelected`}
                                    primaryQuestionSubtext={criterionDetails
                                      .information.referenceTerm}
                                    secondaryQuestionCheckboxName={`predefinedQuestions.${criterionId}.isSelfCertificationAllowed`}
                                    secondaryQuestion="Is self certification accepted for this criterion?"
                                    secondaryQuestionId={`predefinedQuestions.${criterionId}.isSelfCertificationAllowed`}
                                    secondaryQuestionInputName={`predefinedQuestions.${criterionId}.selfCertificationComment`}
                                    secondaryQuestionInputPlaceholder="You can add comments here that will be shown to the supplier"
                                  />

                                )),
                              )
                            }
                              <br />
                              <hr />
                              <br />
                              {
                                customCategoryCriteria.length > 0 && (
                                <div>
                                  <legend tw="text-base font-medium text-gray-900">Criteria added by you</legend>
                                </div>
                                )
                              }
                              {
                              customCategoryCriteria.map(
                                ([criterionId]) => (
                                  <CustomCriterion
                                    criterionName={`customCriteria.${criterionId}.isFinalSelected`}
                                    customCriterionPlaceholder="e.g. Do you use Hydrofluoric acid in this process?"
                                    customCriterionInputName={`customCriteria.${criterionId}.primaryQuestion`}
                                    customCriterionRadioOptionArray={[{
                                      radioName: `customCriteria.${criterionId}.questionType`,
                                      radioLabelText: 'Yes/No',
                                      radioLabelId: '1',
                                      radioValue: 'isBoolean',
                                    }, {
                                      radioName: `customCriteria.${criterionId}.questionType`,
                                      radioLabelText: 'Quantifiable',
                                      radioLabelId: '2',
                                      radioValue: 'isQuantifiable',
                                    }]}
                                    customCriterionQuantifiableAnswer={
                                      (values.customCriteria[criterionId].questionType === 'isQuantifiable')
                                    }
                                    customCriterionBooleanAnswer={
                                      (values.customCriteria[criterionId].questionType === 'isBoolean')
                                    }
                                    customCriterionAnswerTypeName={`customCriteria.${criterionId}.correctAnswer.valueBoolean`}
                                    customCriterionQuantMinValueName={`customCriteria.${criterionId}.correctAnswer.minValueNumber`}
                                    customCriterionQuantMaxValueName={`customCriteria.${criterionId}.correctAnswer.maxValueNumber`}
                                    customCriterionQuantLabelName={`customCriteria.${criterionId}.correctAnswer.label`}
                                  />
                                ),
                              )
                            }
                            </div>
                            <AddCustomCriteria
                              criteriaCategory={categoryName}
                            />
                          </>
                        </RightCardWrapper>
                      </SectionCardWrapper>
                    );
                  },
                )
              }
              </div>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default NewCustomerTransaction;
