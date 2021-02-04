import React from 'react';
import 'twin.macro';

import {
  QuestionCheckboxField,
  StyledInputField,
  StyledRadioField,
} from '../blocks/StyledFormium';

import {
  PrimaryLabel,
  PrimarySubtext,
  SecondaryLabel,
  RadioLabel,
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
      {customCriterionRadioOptionArray.length && (
      <div tw="flex items-end mt-2 space-x-12 space-y-2">
        {customCriterionRadioOptionArray.map(({ radioName, radioLabelText, radioLabelId }) => (
          <CustomCriterionRadioWrapper
            radioName={radioName}
            radioLabelText={radioLabelText}
            radioLabelId={radioLabelId}
          />
        ))}
      </div>
      )}
    </div>
  </div>
);
