import { useSetInjectedAddressCallback } from "@symmio/frontend-sdk/state/application/hooks";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { isAddress } from "viem";

export function useInjectedAddress() {
  const router = useRouter();
  const WalletAddress = router.query?.address;
  const setInjectedAddress = useSetInjectedAddressCallback();

  useEffect(() => {
    if (WalletAddress && isAddress(WalletAddress.toString())) {
      setInjectedAddress(WalletAddress.toString());
    } else {
      setInjectedAddress("");
    }
  }, [WalletAddress, setInjectedAddress]);

  return useMemo(
    () =>
      WalletAddress && isAddress(WalletAddress.toString())
        ? WalletAddress.toString()
        : "",
    [WalletAddress],
  );
}
