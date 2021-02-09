import React, { useEffect, useState } from 'react';

import { useAuth, useService } from '../../store';
import { TransactionsTable } from '../../components/widgets/Tables';

const SupplierTransactionIndex = () => {
  const [transactionData, setTransactionData] = useState([]);

  const { user: userObject = {} } = useAuth();
  const { user = {} } = userObject ?? {};
  const { _id: userId } = user;

  const TransactionsService = useService('transaction');

  useEffect(() => {
    const loadTransactions = (async () => {
      if (userId) {
        const trResult = await TransactionsService.find({
          query: {
            supplier: '602255a805295f1e02a47b4a',
            // @TODO delete the hard coded text
            // supplier: userId,
          },
        });
        const { data: trResultData = [] } = trResult;
        setTransactionData(trResultData);
      }
    });
    loadTransactions();
  }, [userId]);

  return (
    <div tw="flex flex-col">
      <TransactionsTable
        transactionsArray={
          transactionData.map(
            ({
              _id, customerPopulated, createdAt, complianceCheckPoints = [],
            }) => ({
              editLink: _id ? `/supplier/transaction/${_id}` : '/',
              customerName: customerPopulated.name || '',
              customerEmail: customerPopulated.email,
              createdAtDate: createdAt.split('T')[0],
              statistics: `${complianceCheckPoints.length} checkpoints covered`,
            }),
          )
        }
      />
    </div>
  );
};

export default SupplierTransactionIndex;
