import {useMemo} from "react";

import {WEB_SETTING} from "../config";
import {SIGNATURE_STORE_ABI} from "../constants";
import {useSingleContractMultipleMethods} from "../lib/hooks/multicall";
import useActiveWagmi from "../lib/hooks/useActiveWagmi";
import {useSupportedChainId} from "../lib/hooks/useSupportedChainId";
import {useSignatureStoreAddress} from "../state/chains";
import {TermsStatus} from "../state/user/types";

export function useCheckSignedMessage(account: string | undefined): {
  isTermsAccepted: TermsStatus;
} {
  const {chainId} = useActiveWagmi();
  const isSupportedChainId = useSupportedChainId();
  const SIGNATURE_STORE_ADDRESS = useSignatureStoreAddress();

  const calls =
    isSupportedChainId && WEB_SETTING.showSignModal
      ? account
        ? [
            {
              functionName: "hasCurrentVersionSignature",
              callInputs: [account],
            },
          ]
        : []
      : [];

  const {data: signResult} = useSingleContractMultipleMethods(
    chainId ? SIGNATURE_STORE_ADDRESS[chainId] : "",
    SIGNATURE_STORE_ABI,
    calls,
    {enabled: calls.length > 0},
  );

  const isTermsAccepted = useMemo(
    () =>
      signResult
        ? signResult[0].result
          ? TermsStatus.ACCEPTED
          : TermsStatus.NOT_ACCEPTED
        : TermsStatus.UNCLEAR,
    [signResult],
  );

  return useMemo(
    () => ({
      isTermsAccepted,
    }),
    [isTermsAccepted],
  );
}

export function useGetMessage(): string {
  const {chainId} = useActiveWagmi();
  const SIGNATURE_STORE_ADDRESS = useSignatureStoreAddress();
  const isSupportedChainId = useSupportedChainId();

  const calls =
    isSupportedChainId && WEB_SETTING.showSignModal
      ? [{functionName: "getCurrentVersionMessage", callInputs: []}]
      : [];

  const {data: messageResult} = useSingleContractMultipleMethods(
    chainId ? SIGNATURE_STORE_ADDRESS[chainId] : "",
    SIGNATURE_STORE_ABI,
    calls,
    {
      enabled: calls.length > 0,
    },
  );

  const message = useMemo(
    () =>
      messageResult && messageResult[0]
        ? (messageResult[0].result as string)
        : "",
    [messageResult],
  );

  return message;
}
