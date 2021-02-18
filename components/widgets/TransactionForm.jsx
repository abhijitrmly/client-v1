/* eslint-disable react/prop-types */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'twin.macro';
import { Field, FieldArray, useFormikContext } from 'formik';

import {
  QuestionCheckboxField,
  StyledInputField,
  StyledRadioField,
  StyledSelectField,
  QuestionCheckboxWithOnChangeField,
  StyledErrorMessage,
} from '../blocks/StyledFormium';

import {
  PrimaryLabel,
  PrimarySubtext,
  SecondaryLabel,
  RadioLabel,
  PrimaryText,
} from '../blocks/DisplayBlocks';

export const PredefinedCriterionCheckbox = ({
  name, primaryQuestion, id, primaryQuestionSubtext,
}) => (
  <div tw="mt-4 flex items-start">
    <div tw="flex items-center h-5">
      <QuestionCheckboxField
        name={name}
      />
    </div>
    <div tw="ml-3 text-base">
      <PrimaryLabel
        primaryQuestion={primaryQuestion}
        id={id}
      />
      <PrimarySubtext
        primaryQuestionSubtext={primaryQuestionSubtext}
      />
    </div>
  </div>
);

export const PredefinedCriterionSecondaryCheckbox = ({
  name,
  secondaryQuestion,
  id,
  showSecondaryQuestionInput = true,
  secondaryQuestionInputName,
  secondaryQuestionInputPlaceholder,
}) => (
  <div tw="mt-4">
    <div tw="flex items-start">
      <div tw="flex items-center h-5">
        <QuestionCheckboxField
          name={name}
        />
      </div>
      <div tw="ml-3 text-base">
        <SecondaryLabel
          secondaryQuestion={secondaryQuestion}
          id={id}
        />
      </div>
    </div>
    <br />
    {showSecondaryQuestionInput && (
      <div tw="col-span-2 sm:col-span-3 space-y-2">
        <StyledInputField
          name={secondaryQuestionInputName}
          placeholder={secondaryQuestionInputPlaceholder}
          isTextArea
        />
      </div>
    )}
  </div>
);

export const PredefinedCriterion = ({
  predefinedCriterionCheckboxName,
  primaryQuestion,
  predefinedCriterionId,
  primaryQuestionSubtext,
  secondaryQuestionCheckboxName,
  secondaryQuestion,
  secondaryQuestionId,
  secondaryQuestionInputName,
  secondaryQuestionInputPlaceholder,
}) => (
  <>
    <PredefinedCriterionCheckbox
      name={predefinedCriterionCheckboxName}
      primaryQuestion={primaryQuestion}
      id={predefinedCriterionId}
      primaryQuestionSubtext={primaryQuestionSubtext}
    />
    <div tw="ml-8 text-xs">
      <PredefinedCriterionSecondaryCheckbox
        name={secondaryQuestionCheckboxName}
        secondaryQuestion={secondaryQuestion}
        secondaryQuestionInputName={secondaryQuestionInputName}
        secondaryQuestionInputPlaceholder={secondaryQuestionInputPlaceholder}
        id={secondaryQuestionId}
      />
    </div>
  </>
);

export const CustomCriterionRadioWrapper = ({
  radioName, radioLabelText, radioLabelId, radioValue,
}) => (
  <div tw="flex items-center">
    <StyledRadioField
      name={radioName}
      value={radioValue}
    />
    <RadioLabel
      labelText={radioLabelText}
      id={radioLabelId}
    />
  </div>
);

export const CustomCriterion = ({
  criterionName,
  customCriterionPlaceholder,
  customCriterionInputName,
  customCriterionRadioOptionArray,
  customCriterionAnswerTypeName,
  customCriterionBooleanAnswer,
  customCriterionQuantifiableAnswer,
  customCriterionQuantMinValueName,
  customCriterionQuantMaxValueName,
  customCriterionQuantLabelName,
}) => (
  <div tw="mt-4">
    <div tw="flex items-center h-5">
      <QuestionCheckboxField
        name={criterionName}
      />
    </div>
    <div tw="ml-8">
      <div tw="-mt-4">
        <StyledInputField
          name={customCriterionInputName}
          placeholder={customCriterionPlaceholder}
          isTextArea
        />
        <StyledErrorMessage
          name={customCriterionInputName}
        />
      </div>
      <div tw="space-y-2 mt-4">
        <div tw="flex items-start">
          {/* <div tw="flex items-center h-5">
            <QuestionCheckboxField
              name={customCriterionAnswerTypeName}
            />
          </div> */}
          <div tw="text-base">
            <SecondaryLabel
              secondaryQuestion="Is the expected answer Yes/No type or a quantifiable value?"
              id={customCriterionAnswerTypeName}
            />
          </div>
        </div>
        {customCriterionRadioOptionArray.length && (
        <div tw="flex items-end space-x-12">
          {customCriterionRadioOptionArray.map(({
            radioName, radioLabelText, radioLabelId, radioValue,
          }) => (
            <CustomCriterionRadioWrapper
              radioName={radioName}
              radioLabelText={radioLabelText}
              radioLabelId={radioLabelId}
              radioValue={radioValue}
            />
          ))}
        </div>
        )}
        {
          customCriterionBooleanAnswer && (
            <div tw="flex items-start">
              <div tw="flex items-center h-5">
                <QuestionCheckboxField
                  name={customCriterionAnswerTypeName}
                />
              </div>
              <div tw="ml-3 text-base">
                <SecondaryLabel
                  secondaryQuestion="Is the accepted answer Yes?"
                  id={customCriterionAnswerTypeName}
                />
              </div>
            </div>
          )
}
        {customCriterionQuantifiableAnswer && (
        <div tw="grid grid-cols-3 gap-4">
          <div>
            <SecondaryLabel
              secondaryQuestion="Mimumum acceptable quantity?"
              id={customCriterionQuantMinValueName}
            />
            <StyledInputField
              name={customCriterionQuantMinValueName}
            />
          </div>
          <div>
            <SecondaryLabel
              secondaryQuestion="Maximum acceptable quantity?"
              id={customCriterionQuantMaxValueName}
            />
            <StyledInputField
              name={customCriterionQuantMaxValueName}
            />
          </div>
          <div>
            <SecondaryLabel
              secondaryQuestion="Unit of quantity"
              id={customCriterionQuantLabelName}
            />
            <StyledInputField
              name={customCriterionQuantLabelName}
            />
          </div>
        </div>
        )}
      </div>
    </div>
  </div>
);

export const CertificationCheckboxField = ({
  certificationsArray,
  supplierName,
  productName,
  productsArray,
  onChange,
}) => (
  <div tw="space-y-6">
    <div tw="space-y-1">
      <div>
        <PrimaryLabel
          primaryQuestion="Please enter email of customer"
          id={supplierName}
        />
      </div>
      <div>
        <div>
          <StyledInputField
            name={supplierName}
          />
        </div>
        <div>
          <StyledErrorMessage
            name={supplierName}
          />
        </div>
      </div>
    </div>
    <div tw="space-y-1">
      <PrimaryLabel
        primaryQuestion="Please select product to apply certification"
        id={productName}
      />
      <StyledSelectField
        name={productName}
        certificationsArray={productsArray
          .map(({ value, label }) => ({
            certificationId: value,
            certificationLabel: label,
          }))}
      />
    </div>
    <div>
      <PrimaryText
        primaryText="Check all certifications whose criteria you would like to consider"
      />
      <div tw="mt-2">
        {
      certificationsArray.map(({ certificationName, certificationLabel }) => (
        <div tw="flex mt-1 items-start">
          <div tw="flex items-center h-5">
            <QuestionCheckboxWithOnChangeField
              name={certificationName}
              onChange={onChange}
            />
          </div>
          <div tw="ml-3 -mt-0.5 text-base">
            <PrimaryLabel
              primaryQuestion={certificationLabel}
              id={certificationName}
            />
          </div>
        </div>
      ))
    }
      </div>
    </div>
  </div>
);

export const NewCustomCriterionCardFooter = ({ onClick }) => (
  <div tw="px-4 py-3 bg-gray-50 text-right sm:px-6">
    <button
      type="button"
      onClick={() => onClick()}
      tw="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Add custom criterion
    </button>
  </div>
);

export const AddCertificationCardFooter = ({ isSubmitting = false }) => (
  <div tw="px-4 py-3 bg-gray-50 text-right sm:px-6">
    <button
      type="submit"
      tw="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      disabled={isSubmitting}
    >
      Add new certification
    </button>
  </div>
);

export const NewCertificationAdder = ({
  certificationName,
  certificationsArray = [],
  newRecordId,
}) => (
  <div tw="space-y-6">
    <div tw="flex-col space-y-1">
      <PrimaryLabel
        primaryQuestion="Please select certification to add"
        id={certificationName}
      />
      <div>
        <Field as="select" name="baseStandard">
          {certificationsArray.map(
            ({ certificationId, certificationLabel }) => (
              <option value={certificationId}>{certificationLabel}</option>
            ),
          )}
        </Field>
      </div>
    </div>
    <div tw="space-y-1">
      <PrimaryLabel
        primaryQuestion="Please enter certification identification number"
        id={newRecordId}
      />
      <StyledInputField
        name={newRecordId}
      />
    </div>
  </div>
);

export const CustomComplianceCard = ({
  primaryQuestion,
  isCompliantWithCertification,
  acceptableCertificationsArray = [],
  isSelfCertificationEvidenceAllowed = true,
  acceptableAnswers = [],
  complianceCheckpointId,
  values = {},
  isMarkedCompliantByCustomer = false,
}) => (
  <div tw="mt-2 mb-4">
    <div tw="ml-4 space-y-2">
      <div tw="text-base">
        <PrimaryLabel
          primaryQuestion={primaryQuestion}
        />
      </div>
      {isMarkedCompliantByCustomer ? (
        <div tw="flex items-center">
          <span tw="h-6 flex items-center sm:h-7">
            <svg tw="flex-shrink-0 h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="green">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </span>
          <p tw="ml-2 text-base">Customer has marked your evidence as compliant.</p>
        </div>
      )
        : (
          <div tw="ml-4">
            {
        isCompliantWithCertification && (
        <div tw="space-y-2">
          <div tw="flex items-center">
            <span tw="h-6 flex items-center sm:h-7">
              <svg tw="flex-shrink-0 h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </span>
            <p tw="ml-2 text-xs">Your certification covers this compliance criterion. Please tick the certification below to use it as evidence.</p>
          </div>
          <div tw="mt-2">
            {
              acceptableCertificationsArray.map(({ certificationName, certificationLabel }) => (
                <div tw="flex mt-1 items-start">
                  <div tw="flex items-center h-5">
                    <QuestionCheckboxField
                      name={certificationName}
                    />
                  </div>
                  <div tw="ml-3 -mt-0.5 text-base">
                    <PrimaryLabel
                      primaryQuestion={certificationLabel}
                      id={certificationName}
                    />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        )
      }
            {
        isSelfCertificationEvidenceAllowed && !isCompliantWithCertification && (
          <>
            {acceptableAnswers.map(
              (acceptableAnswer) => {
                const {
                  valueBoolean, label, _id: acceptableAnswerId,
                } = acceptableAnswer;

                if (!(typeof valueBoolean === 'undefined' || valueBoolean === null)) {
                  return (
                    <div tw="space-x-2">
                      <QuestionCheckboxField
                        name={`${complianceCheckpointId}.acceptableCertificationsObject.answers.${acceptableAnswerId}.valueBoolean`}
                      />
                      <SecondaryLabel
                        id={`${complianceCheckpointId}.acceptableCertificationsObject.answers.${acceptableAnswerId}`}
                        secondaryQuestion="Is your answer 'Yes'?"
                      />
                    </div>
                  );
                }

                return (
                  <div>
                    <div tw="block">
                      <PrimaryLabel
                        id={`${complianceCheckpointId}.acceptableCertificationsObject.answers.${acceptableAnswerId}`}
                        primaryQuestion={`Enter the answer in ${label}`}
                      />
                    </div>
                    <StyledInputField
                      name={`${complianceCheckpointId}.acceptableCertificationsObject.answers.${acceptableAnswerId}.value`}
                    />
                    <SecondaryLabel
                      secondaryQuestion="Please upload evidence/s for the answer above"
                    />
                    <CriterionEvidenceWidget
                      complianceCheckpointId={complianceCheckpointId}
                      values={values}
                    />
                  </div>
                );
              },
            )}
          </>
        )
      }
          </div>
        )}
    </div>
  </div>
);

const SelfEvidenceField = (props) => {
  const {
    setFieldValue,
  } = useFormikContext();

  const {
    index,
    complianceCheckpointId,
  } = props;

  const handleCriteriaChange = (event = {}) => {
    const { target = {} } = event;
    const { value } = target;
    setFieldValue(`${complianceCheckpointId}.selfEvidences[${index}].url`, value);
    setFieldValue(`${complianceCheckpointId}.selfEvidences[${index}].type`, 'other');
  };

  return (
    <StyledInputField
      name={`${complianceCheckpointId}.selfEvidences[${index}].url`}
                    // checked={isSelected}
      onChange={handleCriteriaChange}
    />
  );
};

const CriterionEvidenceWidget = ({
  complianceCheckpointId,
  values,
}) => (
  <FieldArray
    name={`[${complianceCheckpointId}].selfEvidences`}
    render={(arrayHelpers) => (
      <div tw="space-y-1">
        {values[complianceCheckpointId]
          && values[complianceCheckpointId].selfEvidences
          && values[complianceCheckpointId].selfEvidences.length > 0
          && (values[complianceCheckpointId].selfEvidences)
            .map((evidence, index) => (
              <div key={evidence.tempId} tw="space-x-2 mb-2">
                {/** both these conventions do the same */}
                {/* <Field name={`friends[${index}].name`} />
                      <Field name={`friends.${index}.age`} /> */}
                <SelfEvidenceField
                  complianceCheckpointId={complianceCheckpointId}
                  index={index}
                />
                <button
                  tw="bg-red-500 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-full"
                  type="button"
                  onClick={() => arrayHelpers.remove(index)}
                >
                  Remove
                </button>
              </div>
            ))}
        <button
          tw="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white text-sm py-2 px-4 mt-2 rounded inline-flex items-center"
          type="button"
          onClick={() => arrayHelpers.push({ tempId: Date.now() })}
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z" />
          </svg>
          <span>Add evidence</span>
        </button>
      </div>
    )}
  />
);

export const CustomerCheckpointValidationCard = ({
  primaryQuestion,
  isMarkedCompliantByCustomer,
  providedExternalCertifications = [],
  providedAnswers = [],
  providedEvidences = [],
  complianceCheckpointId,
  validationCheckpointName,
  supplierComplianceDataExists = false,
}) => (
  <>
    <div tw="ml-4 mt-4 space-y-2">
      <div tw="text-base">
        <PrimaryLabel
          primaryQuestion={primaryQuestion}
        />
      </div>
      <div tw="ml-4 space-y-1">
        {
        isMarkedCompliantByCustomer && (
        <div tw="space-y-2">
          <div tw="flex items-center">
            <span tw="h-6 flex items-center sm:h-7">
              <svg tw="flex-shrink-0 h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="green">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </span>
            <p tw="ml-2 text-xs">You have already marked this checkpoint as compliant.</p>
          </div>
        </div>
        )
      }
        {
        providedExternalCertifications.length > 0
        && (
        <PrimarySubtext
          primaryQuestionSubtext="External certifications provided by supplier-"
        />
        )
        }
        {
      providedExternalCertifications.map(({ certificationLabel }) => (
        <div tw="flex mt-1 items-start">
          <div tw="-mt-0.5 text-base">
            <PrimaryText
              primaryText={certificationLabel}
            />
          </div>
        </div>
      ))
    }
        {providedEvidences.length > 0
        && (
          <div>
            <PrimarySubtext
              primaryQuestionSubtext="Evidences for self-auditing claim provided by supplier-"
            />
            {
          providedEvidences.map(({ evidenceUrl }) => (
            <div tw="flex mt-0.5 items-start">
              <div tw="-mt-0.5 text-base">
                <PrimaryText
                  primaryText={evidenceUrl}
                />
              </div>
            </div>
          ))
        }
          </div>
        )}
        {providedAnswers.length > 0
        && (
        <PrimarySubtext
          primaryQuestionSubtext="Answers for self-auditing claims provided by supplier-"
        />
        )}
        {
      providedAnswers.map(({ providedAnswer }) => (
        <div tw="flex mt-1 items-start">
          <div tw="ml-3 -mt-0.5 text-base">
            <PrimaryText
              primaryText={providedAnswer}
            />
          </div>
        </div>
      ))
    }
        {(!isMarkedCompliantByCustomer) && (
        <div tw="flex mt-1 items-start">
          <div tw="flex items-center h-5">
            <QuestionCheckboxField
              name={validationCheckpointName}
            />
          </div>
          <div tw="ml-3 -mt-0.5 text-base">
            <PrimaryLabel
              primaryQuestion="Mark this checkbox to accept compliance for this criterion by supplier"
              id={validationCheckpointName}
            />
          </div>
        </div>
        )}
        {' '}
        {!supplierComplianceDataExists && !isMarkedCompliantByCustomer && (
        <div tw="space-y-2">
          <div tw="flex items-center">
            <span tw="h-6 flex items-center sm:h-7">
              <svg tw="flex-shrink-0 h-4 w-4 text-blue-900" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M11.088,2.542c0.063-0.146,0.103-0.306,0.103-0.476c0-0.657-0.534-1.19-1.19-1.19c-0.657,0-1.19,0.533-1.19,1.19c0,0.17,0.038,0.33,0.102,0.476c-4.085,0.535-7.243,4.021-7.243,8.252c0,4.601,3.73,8.332,8.332,8.332c4.601,0,8.331-3.73,8.331-8.332C18.331,6.562,15.173,3.076,11.088,2.542z M10,1.669c0.219,0,0.396,0.177,0.396,0.396S10.219,2.462,10,2.462c-0.22,0-0.397-0.177-0.397-0.396S9.78,1.669,10,1.669z M10,18.332c-4.163,0-7.538-3.375-7.538-7.539c0-4.163,3.375-7.538,7.538-7.538c4.162,0,7.538,3.375,7.538,7.538C17.538,14.957,14.162,18.332,10,18.332z M10.386,9.26c0.002-0.018,0.011-0.034,0.011-0.053V5.24c0-0.219-0.177-0.396-0.396-0.396c-0.22,0-0.397,0.177-0.397,0.396v3.967c0,0.019,0.008,0.035,0.011,0.053c-0.689,0.173-1.201,0.792-1.201,1.534c0,0.324,0.098,0.625,0.264,0.875c-0.079,0.014-0.155,0.043-0.216,0.104l-2.244,2.244c-0.155,0.154-0.155,0.406,0,0.561s0.406,0.154,0.561,0l2.244-2.242c0.061-0.062,0.091-0.139,0.104-0.217c0.251,0.166,0.551,0.264,0.875,0.264c0.876,0,1.587-0.711,1.587-1.587C11.587,10.052,11.075,9.433,10.386,9.26z M10,11.586c-0.438,0-0.793-0.354-0.793-0.792c0-0.438,0.355-0.792,0.793-0.792c0.438,0,0.793,0.355,0.793,0.792C10.793,11.232,10.438,11.586,10,11.586z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <p tw="ml-2 text-xs">Compliance data addition is pending from supplier.</p>
          </div>
        </div>
        )}
      </div>
    </div>
  </>
);
