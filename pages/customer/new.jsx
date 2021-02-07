/* eslint-disable no-underscore-dangle */
import React from 'react';
import Head from 'next/head';
import 'twin.macro';
import { Formik, Form, useFormikContext } from 'formik';

import { useService, useAuth } from '../../store';

import { SectionCardWrapper, RightCardWrapper, LeftCardWrapper } from '../../components/containers/FormPageContainers';
import {
  PredefinedCriterion,
  CustomCriterion,
  CertificationCheckboxField,
  NewCustomCriterionCardFooter,
} from '../../components/widgets/TransactionForm';

import {
  QuestionCheckboxField,
} from '../../components/blocks/StyledFormium';

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

const NewCustomerTransaction = () => {
  const { user } = useAuth();

  return (
    <div>
      <Head>
        <title>New transaction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Formik
          initialValues={{ customCriteria: {} }}
        >
          {({ isSubmitting, values = {} }) => (
            <Form>
              <div>
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
                              {/* <CustomCriterion
                                criterionName="test"
                                customCriterionPlaceholder="e.g. Do you use fluorinated items here?"
                                customCriterionInputName="test.2"
                                customCriterionRadioOptionArray={[{
                                  radioName: 'testradio',
                                  radioLabelText: 'Yes/No',
                                  radioLabelId: '1',
                                }, {
                                  radioName: 'testradio2',
                                  radioLabelText: 'Quantifiable',
                                  radioLabelId: '2',
                                }]}
                              /> */}
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
