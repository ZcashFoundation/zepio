// @flow
import electronStore from '../config/electron-store';

const STORE_KEY = 'SHIELDED_TRANSACTIONS';

type ShieldedTransaction = {|
  category: 'send' | 'receive',
  time: number,
  address: string,
  amount: number,
  memo: ?string,
|};

// eslint-disable-next-line
export const listShieldedTransactions = (): Array<ShieldedTransaction> => electronStore.has(STORE_KEY) ? electronStore.get(STORE_KEY) : [];

export const saveShieldedTransaction = ({
  category,
  time,
  address,
  amount,
  memo,
}: ShieldedTransaction): void => {
  electronStore.set(
    STORE_KEY,
    listShieldedTransactions().concat({
      category,
      time,
      address,
      amount,
      memo: memo || '',
    }),
  );
};
