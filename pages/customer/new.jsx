import React from 'react';
import Head from 'next/head';
import 'twin.macro';
import { Formik, Form } from 'formik';

import { useService, useAuth } from '../../store';

import { PredefinedCriterion, CustomCriterion } from '../../components/widgets/TransactionForm';

const NewCustomerTransaction = (props) => {
  const { user } = useAuth();

  return (
    <div>
      <Head>
        <title>New transaction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Formik>
          <Form>
            <PredefinedCriterion
              predefinedCriterionCheckboxName="test"
              primaryQuestion="1. Is any aromatic and/or halogenated solvents used in your manufacturing process?"
              predefinedCriterionId="test"
              primaryQuestionSubtext="GOTS 2.3.1 Prohibited and restricted inputs"
              secondaryQuestionCheckboxName="test.isSelf"
              secondaryQuestion="Is self certification accepted for this criterion?"
              secondaryQuestionId="test.isSelf"
              secondaryQuestionInputName="test.isSelf.value"
              secondaryQuestionInputPlaceholder="You can add comments here that will be shown to the supplierx"
            />
            <br />
            <CustomCriterion
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
            />
          </Form>
        </Formik>
      </main>
    </div>
  );
};

export default NewCustomerTransaction;
