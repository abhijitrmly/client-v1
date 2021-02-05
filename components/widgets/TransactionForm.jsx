import React from 'react';
import 'twin.macro';

import {
  QuestionCheckboxField,
  StyledInputField,
  StyledRadioField,
  StyledSelectField,
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

export const CustomCriterionRadioWrapper = ({ radioName, radioLabelText, radioLabelId }) => (
  <div tw="flex items-center">
    <StyledRadioField
      name={radioName}
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
          <div tw="flex items-center h-5">
            <QuestionCheckboxField
              name={customCriterionAnswerTypeName}
            />
          </div>
          <div tw="ml-3 text-base">
            <SecondaryLabel
              secondaryQuestion="Is the expected answer Yes/No type or a quantifiable value?"
              id={customCriterionAnswerTypeName}
            />
          </div>
        </div>
        {customCriterionRadioOptionArray.length && (
        <div tw="flex items-end space-x-12">
          {customCriterionRadioOptionArray.map(({ radioName, radioLabelText, radioLabelId }) => (
            <CustomCriterionRadioWrapper
              radioName={radioName}
              radioLabelText={radioLabelText}
              radioLabelId={radioLabelId}
            />
          ))}
        </div>
        )}
        {
          customCriterionBooleanAnswer ? (
            <div tw="flex items-start">
              <div tw="flex items-center h-5">
                <QuestionCheckboxField
                  name={customCriterionAnswerTypeName}
                />
              </div>
              <div tw="ml-3 text-base">
                <SecondaryLabel
                  secondaryQuestion="Is the expected answer Yes/No type or a quantifiable value?"
                  id={customCriterionAnswerTypeName}
                />
              </div>
            </div>
          ) : (
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
          )
        }
      </div>
    </div>
  </div>
);

export const CertificationCheckboxField = ({
  certificationsArray,
  supplierName,
  productName,
  productsArray
}) => (
  <div tw="space-y-6">
    <div tw="space-y-1">
      <PrimaryLabel
        primaryQuestion="Please enter email of customer"
        id={supplierName}
      />
      <StyledInputField
        name={supplierName}
      />
    </div>
    <div tw="space-y-1">
      <PrimaryLabel
        primaryQuestion="Please select product to apply certification"
        id={productName}
      />
      <StyledSelectField
        name={productName}
      >
        {productsArray.map(({ productName, productLabel }) => (
          <StyledOption
            value={productName}
            label={productLabel}
          />
        ))}
        <StyledOption
          value=""
        />
      </StyledSelectField>
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
  </div>
);
