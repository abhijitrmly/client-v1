import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import 'twin.macro';
import { Formik, Form, useFormikContext } from 'formik';

import { useService, useAuth } from '../../../store';
import certifications from '../../../helpers/constants/certifications';
import { SectionCardWrapper, RightCardWrapper, LeftCardWrapper } from '../../../components/containers/FormPageContainers';
import {
  NewCertificationAdder,
  AddCertificationCardFooter,
} from '../../../components/widgets/TransactionForm';

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

  return (
    <div>
      <Head>
        <title>View transaction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          {certificationFormVisibility && (
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              const businessCertificationCreateResponse = await BusinessCertificationsService
                .create({
                  ...values,
                  user: user && user.user && user.user._id,
                });
            }}
          >
            {({ isSubmitting, values = {} }) => (
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
                      <AddCertificationCardFooter />
                    </div>
                  </RightCardWrapper>
                </SectionCardWrapper>
              </Form>
            )}
          </Formik>
          )}
        </div>
      </main>
    </div>
  );
};

export default SupplierTransactionForm;
