import { Address } from "viem";
import { useInjectedAddress } from "../../state/application/hooks";
import useWagmi from "./useWagmi";

export default function useActiveWagmi() {
  const wagmiData = useWagmi();
  const injectedAddress = useInjectedAddress();
  const context =
    injectedAddress === ""
      ? wagmiData
      : { ...wagmiData, account: injectedAddress as Address };

  return context;
}
