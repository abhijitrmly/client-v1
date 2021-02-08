import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'twin.macro';
import { Formik, Form } from 'formik';

import { useService } from '../../../store';
import certifications from '../../../helpers/constants/certifications';
import categories from '../../../helpers/constants/categories';

import { SectionCardWrapper, RightCardWrapper, LeftCardWrapper } from '../../../components/containers/FormPageContainers';
import {
  CustomerCheckpointValidationCard,
} from '../../../components/widgets/TransactionForm';
import {
  CustomerViewPageHeader,
} from '../../../components/blocks/DisplayBlocks';

const certificationObject = certifications.reduce(
  (accumulator, currentValue) => (
    // eslint-disable-next-line no-underscore-dangle
    { ...accumulator, [currentValue._id]: currentValue.name }
  ), {},
);

const CustomerTransactionEditForm = () => {
  const router = useRouter();
  const { transaction: transactionId } = router.query;

  const [transactionData, setTransactionData] = useState({});

  const TransactionsService = useService('transaction');

  useEffect(() => {
    const loadTransaction = (async () => {
      if (transactionId) {
        const trResult = await TransactionsService.get(transactionId);
        setTransactionData(trResult);
      }
    });
    loadTransaction();
  }, [transactionId]);

  const { complianceCheckPoints = [] } = transactionData;

  return (
    <div>
      <Head>
        <title>Edit transaction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              await TransactionsService.patch(transactionId, {
                outgoingComplianceValidationData: { ...values },
              });
            }}
          >
            {() => (
              <Form>
                <CustomerViewPageHeader />
                {
            Object.entries(categories).map(
              ([categoryName, categoryDetails]) => {
                const { displayLabel, explanatoryText } = categoryDetails;

                const categoryCompliancePoints = complianceCheckPoints
                  .filter(({
                    businessCriterionDetails,
                  }) => {
                    const { category } = businessCriterionDetails;
                    return (categoryName === category);
                  });

                if (categoryCompliancePoints.length > 0) {
                  return (
                    <div>
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
                              {categoryCompliancePoints.map(
                                ({
                                  businessCriterionDetails = {},
                                  customerComplianceValidation = {},
                                  complianceData = {},
                                  _id: complianceCheckpointId,
                                }, index) => (
                                  <CustomerCheckpointValidationCard
                                    primaryQuestion={`${index + 1}. ${businessCriterionDetails.primaryQuestion}`}
                                    isMarkedCompliantByCustomer={
                                      customerComplianceValidation
                                      && customerComplianceValidation.isCompliant
                                    }
                                    complianceCheckpointId={complianceCheckpointId}
                                    providedExternalCertifications={(
                                      complianceData.providedExternalCertifications || []
                                    )
                                      .map((certification) => ({
                                        certificationLabel: certificationObject[certification],
                                      }))}
                                    providedAnswers={
                                      (complianceData.providedAnswers || [])
                                        .map((answerObject) => ({
                                          providedAnswer: (answerObject.value
                                        || answerObject.valueBoolean),
                                        }))
                                    }
                                    providedEvidences={
                                      ((complianceData.providedEvidence
                                      && complianceData.providedEvidence.otherUrls) || [])
                                        .map((url) => ({
                                          evidenceUrl: url,
                                        }))
                                      }
                                    validationCheckpointName={`complianceCheckPoints.${complianceCheckpointId}.isCompliant`}
                                  />
                                ),
                              )}
                            </div>
                          </>
                        </RightCardWrapper>
                      </SectionCardWrapper>
                    </div>
                  );
                }

                return <></>;
              },
            )
          }
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
};

export default CustomerTransactionEditForm;
