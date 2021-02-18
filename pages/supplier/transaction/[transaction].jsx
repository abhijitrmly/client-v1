import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import 'twin.macro';
import { Formik, Form, useFormikContext } from 'formik';

import { useService, useAuth } from '../../../store';
import certifications from '../../../helpers/constants/certifications';
import categories from '../../../helpers/constants/categories';

import { SectionCardWrapper, RightCardWrapper, LeftCardWrapper } from '../../../components/containers/FormPageContainers';
import {
  NewCertificationAdder,
  AddCertificationCardFooter,
  CustomComplianceCard,
} from '../../../components/widgets/TransactionForm';
import {
  SupplierPageHeader, SuccessAlert,
} from '../../../components/blocks/DisplayBlocks';
import { SuccessPatchSupplierCard } from '../../../components/blocks/MessageCards';

const intersectionArray = (array1, array2) => array1.filter((value) => array2.includes(value));

const certificationObject = certifications.reduce(
  (accumulator, currentValue) => (
    // eslint-disable-next-line no-underscore-dangle
    { ...accumulator, [currentValue._id]: currentValue.name }
  ), {},
);

const SupplierTransactionForm = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { transaction: transactionId } = router.query;

  const [transactionData, setTransactionData] = useState({});
  const [certificationsData, setCertificationsData] = useState([]);
  const [certificationFormVisibility, setCertificationForm] = useState(false);
  const [showTransactionPatchCard, setTransactionPatchVisibility] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const TransactionsService = useService('transaction');
  const BusinessCertificationsService = useService('business-certifications');

  useEffect(() => {
    const businessCertificationGetter = (async () => {
      if (user && user.user && user.user._id) {
        const crResult = await BusinessCertificationsService
          .find({ query: { user: user.user._id } });
        const { data: certificationsDataInitial = [] } = crResult;
        const validUserCertifications = certificationsDataInitial.map(
          (cert) => cert.baseStandard,
        );

        setCertificationsData(validUserCertifications);
      }
    });
    businessCertificationGetter();
  }, [user]);

  useEffect(() => {
    const loadTransaction = (async () => {
      if (transactionId) {
        const trResult = await TransactionsService.get(transactionId);
        setTransactionData(trResult);
      }
    });
    loadTransaction();
  }, [transactionId]);

  let defaultComplianceFormValues = {};
  const { complianceCheckPoints = [] } = transactionData;

  defaultComplianceFormValues = useMemo(
    () => complianceCheckPoints.reduce((accumulator, currentValue) => {
      const {
        _id: complianceId,
        businessCriterionDetails = {},
        customerComplianceValidation = {},
      } = currentValue;
      const {
        validExternalCertifications = [],
        primaryQuestion,
        isSelfCertificationEvidenceAllowed = {},
        category,
      } = businessCriterionDetails;

      const acceptableCertifications = intersectionArray(
        certificationsData,
        validExternalCertifications,
      );

      const acceptableCertificationsObject = acceptableCertifications
        .reduce((accumulatorCertification, currentCertificationValue) => ({
          ...accumulatorCertification,
          [currentCertificationValue]: true,
        }), {});

      return ({
        ...accumulator,
        [complianceId]: {
          acceptableCertificationsObject,
          primaryQuestion,
          category,
          ...businessCriterionDetails,
          customerComplianceValidation: (
            customerComplianceValidation && customerComplianceValidation.isCompliant),
          isSelfCertificationEvidenceAllowed: !!isSelfCertificationEvidenceAllowed.value,
        },
      });
    }, {}), [certificationsData, transactionData],
  );

  if (showTransactionPatchCard) {
    return (
      <SuccessPatchSupplierCard />
    );
  }

  return (
    <div>
      <Head>
        <title>View transaction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div tw="my-4">
          {alertMessage && (
          <SuccessAlert
            alertMessage={alertMessage}
          />
          )}
        </div>
        <div>
          {certificationFormVisibility && (
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              await BusinessCertificationsService
                .create({
                  ...values,
                  user: user && user.user && user.user._id,
                });
              setCertificationForm(false);
              setAlertMessage('Your certification has been registered. The registration number will be verified with the certifiers data.');
              setTimeout(() => {
                setAlertMessage('');
              }, 4000);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <SectionCardWrapper>
                  <LeftCardWrapper>
                    <div tw="p-8 sm:px-0">
                      <h3 tw="text-lg font-medium leading-6 text-gray-900">Register your certifications</h3>
                      <p tw="mt-1 text-sm text-gray-600">
                        You can add relevant and valid certifications in this section.
                        The compliance for relevant criteria will be automatically
                        validated based on your certifications.
                      </p>
                    </div>
                  </LeftCardWrapper>
                  <RightCardWrapper>
                    <div>
                      <div tw="p-8 col-span-6 sm:col-span-3">
                        <NewCertificationAdder
                          certificationName="baseStandard"
                          newRecordId="certificationId"
                          certificationsArray={Object.entries(certificationObject).map(
                            ([certificationId, name]) => (
                              {
                                certificationId,
                                certificationLabel: name,
                              }
                            ),
                          )}
                        />
                      </div>
                      <AddCertificationCardFooter
                        isSubmitting={isSubmitting}
                      />
                    </div>
                  </RightCardWrapper>
                </SectionCardWrapper>
              </Form>
            )}
          </Formik>
          )}
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              await TransactionsService.patch(transactionId, {
                outgoingComplianceData: { ...values },
              });
              setTransactionPatchVisibility(true);
            }}
          >
            {({ isSubmitting, values = {} }) => (

              <Form>
                <SupplierPageHeader
                  certificationButtonCallback={
                    () => setCertificationForm(!certificationFormVisibility)
                  }
                  isSubmitting={isSubmitting}
                />
                {
            Object.entries(categories).map(
              ([categoryName, categoryDetails]) => {
                const { displayLabel, explanatoryText } = categoryDetails;

                const categoryCompliancePoints = Object.entries(defaultComplianceFormValues)
                  .filter(([, criterionDetails]) => {
                    const { category } = criterionDetails;
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
                                ([complianceCheckpointId, complianceCheckpointDetails], index) => (
                                  <CustomComplianceCard
                                    primaryQuestion={`${index + 1}. ${complianceCheckpointDetails.primaryQuestion}`}
                                    isCompliantWithCertification={
                                      Object
                                        .keys(complianceCheckpointDetails
                                          .acceptableCertificationsObject)
                                        .length > 0
                                    }
                                    acceptableCertificationsArray={
                                      Object
                                        .keys(
                                          complianceCheckpointDetails
                                            .acceptableCertificationsObject,
                                        )
                                        .map(
                                          (certificationId) => ({
                                            certificationName: `${complianceCheckpointId}.acceptableCertificationsObject.${certificationId}`,
                                            certificationLabel:
                                              certificationObject[certificationId],
                                          }),
                                        )
                                    }
                                    complianceCheckpointId={complianceCheckpointId}
                                    isSelfCertificationEvidenceAllowed={
                                      complianceCheckpointDetails.isSelfCertificationEvidenceAllowed
                                    }
                                    acceptableAnswers={
                                      complianceCheckpointDetails.acceptableAnswers
                                    }
                                    values={values}
                                    isMarkedCompliantByCustomer={
                                      complianceCheckpointDetails.customerComplianceValidation
                                    }
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

export default SupplierTransactionForm;
