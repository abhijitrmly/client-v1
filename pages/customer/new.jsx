/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import Head from 'next/head';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'twin.macro';
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';

import { useService } from '../../store';

import { SectionCardWrapper, RightCardWrapper, LeftCardWrapper } from '../../components/containers/FormPageContainers';
import {
  PredefinedCriterion,
  CustomCriterion,
  CertificationCheckboxField,
  NewCustomCriterionCardFooter,
} from '../../components/widgets/TransactionForm';

import { PrimaryText } from '../../components/blocks/DisplayBlocks';
import { SuccessCustomerCard } from '../../components/blocks/MessageCards';

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
            value: 'Cotton',
            label: 'Cotton',
          },
        ]}
        supplierName="supplierEmail"
        productName="productName"
      />
    </>
  );
};

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

const mapRules = (map, rule) => (Object
  .keys(map).reduce((newMap, key) => ({ ...newMap, [key]: rule }), {}));

const SupplierDetailsSchema = Yup.object().shape({
  supplierEmail: Yup.string().trim()
    .email('Invalid email')
    .required('Required'),
  customCriteria: Yup.lazy((map) => Yup.object(
    mapRules(map, Yup.object({
      primaryQuestion: Yup.string().trim().required('Question is required for custom criterion'),
      questionType: Yup.string().required('Answer type is required'),
    })),
  )),
});

const NewCustomerTransaction = () => {
  const [transactionCreationId, setTransactionCreationId] = useState('');
  const TransactionsService = useService('transaction');

  if (transactionCreationId) {
    return (
      <div tw="m-1">
        <SuccessCustomerCard
          transactionLink={`/customer/transaction/${transactionCreationId}`}
        />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>New transaction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Formik
          initialValues={{ customCriteria: {}, supplierEmail: '', productName: 'Cotton' }}
          validationSchema={SupplierDetailsSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const {
              predefinedQuestions = {},
              customCriteria = {},
              supplierEmail,
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
            const transactionCreationResult = await TransactionsService.create({
              filteredPredefinedQuestionValues,
              filteredcustomCriteriaValues,
              supplierEmail,
            });

            const { _id: transactionCreationResultId } = transactionCreationResult;
            setTransactionCreationId(transactionCreationResultId);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, values = {} }) => (
            <Form>
              <div>
                <header tw="bg-white">
                  <div tw="flex justify-between py-6 px-4 sm:px-6 lg:px-8">
                    <h1 tw="text-3xl font-bold leading-tight text-gray-900">
                      New Compliance Transaction
                    </h1>
                    <span>
                      <button type="submit" disabled={isSubmitting} tw="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {!isSubmitting ? (
                          <>
                            <svg tw="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Submit information
                          </>
                        ) : (
                          <>
                            <svg tw="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle tw="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path tw="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Processing
                          </>
                        )}
                      </button>
                    </span>
                  </div>
                </header>
                <div tw="px-16">
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
                                predefinedCategoryCriteria.length === 0 && customCategoryCriteria.length === 0 && (
                                  <PrimaryText
                                    primaryText="You have not selected any criterion for this catgeory.
                                    You can add criteria by selecting one of the pre-defined certifications above, or by adding your own custom criterion by clicking button below."
                                  />
                                )
                              }
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
              </div>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default NewCustomerTransaction;
