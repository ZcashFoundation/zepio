// @flow
import electronStore from '../config/electron-store';

const STORE_KEY = 'SHIELDED_TRANSACTIONS';

type ShieldedTransaction = {|
  txid: string,
  category: 'send' | 'receive',
  time: number,
  address: string,
  amount: number,
  memo: ?string,
|};

// eslint-disable-next-line
export const listShieldedTransactions = (
  pagination: ?{
    offset: number,
    count: number,
  },
): Array<ShieldedTransaction> => {
  const transactions = electronStore.has(STORE_KEY) ? electronStore.get(STORE_KEY) : [];

  if (!pagination) return transactions;

  const { offset = 0, count = 10 } = pagination;

  return transactions.slice(offset - 1, offset + count);
};

export const saveShieldedTransaction = ({
  txid,
  category,
  time,
  address,
  amount,
  memo,
}: ShieldedTransaction): void => {
  electronStore.set(
    STORE_KEY,
    listShieldedTransactions().concat({
      txid,
      category,
      time,
      address,
      amount,
      memo: memo || '',
    }),
  );
};
