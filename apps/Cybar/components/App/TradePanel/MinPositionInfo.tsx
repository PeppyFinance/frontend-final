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
import { TradeValueButton } from "components/InputBox";

export default function MinAmountInfo() {
  const { chainId } = useActiveWagmi();
  const setTypedValue = useSetTypedValue();
  const COLLATERAL_TOKEN = useCollateralToken();
  const collateralCurrency = useGetTokenWithFallbackChainId(
    COLLATERAL_TOKEN,
    chainId,
  );
  const {
    minPositionValue: minAmountValue,
    pricePrecision,
    minPositionQuantity,
    outputTicker,
  } = usePositionInfo();

  const amount = `${minAmountValue} ${collateralCurrency?.symbol} (${
    toBN(minPositionQuantity).eq(0) ? "-" : minPositionQuantity
  } ${outputTicker})`;

  const balanceExact = formatPrice(
    minAmountValue,
    pricePrecision,
    false,
    RoundMode.ROUND_UP,
  );

  return (
    <InfoItem
      label={"Minimum amount:"}
      balanceExact={balanceExact}
      amount={""}
      onClick={(value) => setTypedValue(value, InputField.PRICE)}
    >
      <TradeValueButton
        onClick={() => setTypedValue(balanceExact, InputField.PRICE)}
      >
        {amount}
      </TradeValueButton>
    </InfoItem>
  );
}
