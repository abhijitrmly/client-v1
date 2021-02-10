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
} from '../blocks/StyledFormium';

import {
  PrimaryLabel,
  PrimarySubtext,
  SecondaryLabel,
  RadioLabel,
  PrimaryText,
  StyledOption,
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
  name, secondaryQuestion, id, showSecondaryQuestionInput = true, secondaryQuestionInputName, secondaryQuestionInputPlaceholder,
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
        <StyledInputField
          name={supplierName}
        />
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

export const AddCertificationCardFooter = () => (
  <div tw="px-4 py-3 bg-gray-50 text-right sm:px-6">
    <button
      type="submit"
      tw="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
}) => (
  <>
    <div tw="ml-4 space-y-2">
      <div tw="text-base">
        <PrimaryLabel
          primaryQuestion={primaryQuestion}
        />
      </div>
      {
        isCompliantWithCertification && (
        <div tw="ml-4 space-y-2">
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
      isSelfCertificationEvidenceAllowed && (
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
                </div>
              );
            },
          )}
        </>
      )
    }
      <SecondaryLabel
        secondaryQuestion="Please upload evidence/s for the answer above"
      />
      <CriterionEvidenceWidget
        complianceCheckpointId={complianceCheckpointId}
        values={values}
      />
    </div>
  </>
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
}) => (
  <>
    <div tw="ml-4 space-y-2">
      <div tw="text-base">
        <PrimaryLabel
          primaryQuestion={primaryQuestion}
        />
      </div>
      {
        isMarkedCompliantByCustomer && (
        <div tw="ml-4 space-y-2">
          <div tw="flex items-center">
            <span tw="h-6 flex items-center sm:h-7">
              <svg tw="flex-shrink-0 h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </span>
            <p tw="ml-2 text-xs">You have already marked this checkpoint as compliant.</p>
          </div>
        </div>
        )
      }
      {providedExternalCertifications.length > 0
        && (
        <PrimarySubtext
          primaryQuestionSubtext="External certifications provided by supplier-"
        />
        )}
      {
      providedExternalCertifications.map(({ certificationLabel }) => (
        <div tw="flex mt-1 items-start">
          <div tw="ml-3 -mt-0.5 text-base">
            <PrimaryText
              primaryText={certificationLabel}
            />
          </div>
        </div>
      ))
    }
      {providedEvidences.length > 0
        && (
        <PrimarySubtext
          primaryQuestionSubtext="Evidences for self-auditing claim provided by supplier-"
        />
        )}
      {
      providedEvidences.map(({ evidenceUrl }) => (
        <div tw="flex mt-1 items-start">
          <div tw="ml-3 -mt-0.5 text-base">
            <PrimaryText
              primaryText={evidenceUrl}
            />
          </div>
        </div>
      ))
    }
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
      {!isMarkedCompliantByCustomer && (
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
    </div>
  </>
);
