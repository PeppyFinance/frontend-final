import { useCollateralToken } from "@symmio/frontend-sdk/constants/tokens";
import { InputField } from "@symmio/frontend-sdk/types/trade";
import {
  RoundMode,
  formatPrice,
  toBN,
} from "@symmio/frontend-sdk/utils/numbers";
import { useGetTokenWithFallbackChainId } from "@symmio/frontend-sdk/utils/token";

import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";
import {
  usePositionInfo,
  useSetTypedValue,
} from "@symmio/frontend-sdk/state/trade/hooks";

import InfoItem from "components/InfoItem";

export default function MinPositionInfo() {
  const { chainId } = useActiveWagmi();
  const setTypedValue = useSetTypedValue();
  const COLLATERAL_TOKEN = useCollateralToken();
  const collateralCurrency = useGetTokenWithFallbackChainId(
    COLLATERAL_TOKEN,
    chainId,
  );
  const {
    minPositionValue,
    pricePrecision,
    minPositionQuantity,
    outputTicker,
  } = usePositionInfo();

  return (
    <InfoItem
      label={"Minimum position size:"}
      balanceExact={formatPrice(
        minPositionValue,
        pricePrecision,
        false,
        RoundMode.ROUND_UP,
      )}
      amount={`${minPositionValue} ${collateralCurrency?.symbol} (${
        toBN(minPositionQuantity).eq(0) ? "-" : minPositionQuantity
      } ${outputTicker})`}
      onClick={(value) => setTypedValue(value, InputField.PRICE)}
    />
  );
}
