import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import {
  Config,
  estimateGas,
  sendTransaction,
  waitForTransactionReceipt,
} from "@wagmi/core";
import {
  BaseError,
  ContractFunctionRevertedError,
  UserRejectedRequestError,
  parseEther,
} from "viem";

import { WEB_SETTING } from "../config";
import { useTransactionAdder } from "../state/transactions/hooks";
import { TransactionInfo } from "../state/transactions/types";
import { useExpertMode } from "../state/user/hooks";
import { ConstructCallReturnType } from "../types/web3";
import { toBN } from "./numbers";

export function calculateGasMargin(value: bigint): bigint {
  return BigInt(toBN(value.toString()).times(12_000).div(10_000).toFixed(0));
}

export enum TransactionCallbackState {
  INVALID = "INVALID",
  PENDING = "PENDING",
  VALID = "VALID",
}

export async function createTransactionCallback(
  functionName: string,
  constructCall: () => ConstructCallReturnType,
  addTransaction: ReturnType<typeof useTransactionAdder>,
  addRecentTransaction: ReturnType<typeof useAddRecentTransaction>,
  txInfo: TransactionInfo,
  wagmiConfig: Config,
  summary?: string,
  expertMode?: ReturnType<typeof useExpertMode>,
) {
  let call: any;
  try {
    if (WEB_SETTING.notAllowedMethods.includes(functionName)) {
      throw new Error(`${functionName} not allowed`);
    }

    call = await constructCall();

    let gas: bigint;
    try {
      gas = await estimateGas(wagmiConfig, call.config);
    } catch (e) {
      console.error("Error estimating gas", e);
      gas = BigInt(21000);
    }

    let hash = await sendTransaction(wagmiConfig, {
      ...call.config,
      gas: calculateGasMargin(gas),
    });

    await waitForTransactionReceipt(wagmiConfig, {
      hash,
      onReplaced: (replace) => {
        hash = replace.transaction.hash;
      },
    });

    addTransaction(hash, txInfo, summary);
    addRecentTransaction({
      hash,
      description: summary || "-------",
    });
    return hash;
  } catch (error) {
    if (error instanceof Error) {
      if (
        error instanceof UserRejectedRequestError ||
        error.message.includes("User rejected the request")
      ) {
        throw new Error("Transaction rejected by user");
      }

      if (expertMode && call?.config) {
        console.warn(
          "Expert mode: bypassing gas estimation failure for",
          functionName,
          error.message,
        );

        const config = call.config;
        const tx = !config.value
          ? { from: config.account, to: config.to, data: config.data }
          : {
              from: config.account,
              to: config.to,
              data: config.data,
              value: parseEther(config.value),
            };
        const hash = await sendTransaction(wagmiConfig, tx);
        addTransaction(hash, txInfo, summary);
        addRecentTransaction({
          hash,
          description: summary || "-------",
        });
        return hash;
      }

      if (error instanceof BaseError) {
        if (error instanceof ContractFunctionRevertedError) {
          throw new Error(
            `Transaction reverted: ${error.shortMessage || error.message}`,
          );
        }
        throw new Error(error.shortMessage || error.message);
      }

      throw error;
    }
    throw new Error("Unexpected error constructing transaction");
  }
}
