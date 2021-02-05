import React from 'react';
import Head from 'next/head';
import 'twin.macro';
import { Formik, Form } from 'formik';

import { useService, useAuth } from '../../store';

import { SectionCardWrapper, RightCardWrapper, LeftCardWrapper } from '../../components/containers/FormPageContainers';
import {
  PredefinedCriterion,
  CustomCriterion,
  CertificationCheckboxField,
} from '../../components/widgets/TransactionForm';

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
            <div>
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
                      <CertificationCheckboxField
                        certificationsArray={[
                          {
                            certificationName: 'GOTS',
                            certificationLabel: 'GOTS',
                          },
                          {
                            certificationName: 'FT',
                            certificationLabel: 'Fair Trade',
                          },
                        ]}
                        productsArray={[
                          {
                            productName: 'Cotton',
                            productLabel: 'Cotton',
                          },
                        ]}
                      />
                    </div>
                  </div>
                </RightCardWrapper>
              </SectionCardWrapper>
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
                  </div>
                </RightCardWrapper>
              </SectionCardWrapper>
            </div>
          </Form>
        </Formik>
      </main>
    </div>
  );
};

export default NewCustomerTransaction;
