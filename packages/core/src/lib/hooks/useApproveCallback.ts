import { Currency } from "@uniswap/sdk-core";
import BigNumber from "bignumber.js";
import { useCallback } from "react";
import { ApprovalState, useApproval } from "./useApproval";

import {
  useHasPendingApproval,
  useTransactionAdder,
} from "../../state/transactions/hooks";
import { TransactionType } from "../../state/transactions/types";
import useWagmi from "./useWagmi";

function useGetAndTrackApproval(
  getApproval: ReturnType<typeof useApproval>[1],
) {
  const addTransaction = useTransactionAdder();
  return useCallback(() => {
    return getApproval().then((pending) => {
      if (pending) {
        const { response, tokenAddress, spenderAddress: spender } = pending;
        addTransaction(response, {
          type: TransactionType.APPROVAL,
          tokenAddress,
          spender,
        });
      }
    });
  }, [addTransaction, getApproval]);
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
  currency?: Currency,
  amountToApprove?: BigNumber.Value,
  spender?: string,
): [ApprovalState, () => Promise<void>] {
  const { account } = useWagmi();
  const [approval, getApproval] = useApproval(
    currency,
    amountToApprove,
    account,
    spender,
    useHasPendingApproval,
  );
  return [approval, useGetAndTrackApproval(getApproval)];
}
