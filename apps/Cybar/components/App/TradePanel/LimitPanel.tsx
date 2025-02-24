import { useCollateralToken } from "@symmio/frontend-sdk/constants/tokens";
import { PositionType } from "@symmio/frontend-sdk/types/trade";
import { toBN } from "@symmio/frontend-sdk/utils/numbers";
import { useGetTokenWithFallbackChainId } from "@symmio/frontend-sdk/utils/token";

import useBidAskPrice from "@symmio/frontend-sdk/hooks/useBidAskPrice";
import useTradePage from "@symmio/frontend-sdk/hooks/useTradePage";
import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";

import {
  useActiveMarket,
  usePositionType,
  useSetLimitPrice,
} from "@symmio/frontend-sdk/state/trade/hooks";

import { useExpertMode } from "@symmio/frontend-sdk/state/user/hooks";
import { CustomInputBox2 } from "components/InputBox";
import { useMemo } from "react";

export default function LimitPricePanel(): JSX.Element | null {
  const { chainId } = useActiveWagmi();
  const { price } = useTradePage();
  const market = useActiveMarket();
  const userExpertMode = useExpertMode();
  const positionType = usePositionType();
  const setLimitPrice = useSetLimitPrice();
  const COLLATERAL_TOKEN = useCollateralToken();
  const collateralCurrency = useGetTokenWithFallbackChainId(
    COLLATERAL_TOKEN,
    chainId,
  );
  const { ask, bid } = useBidAskPrice(market);

  const lastMarketPrice = (() => {
    if (positionType === PositionType.LONG) {
      return ask;
    } else {
      return bid;
    }
  })();

  const balanceTitle = (() => {
    if (positionType === PositionType.LONG) {
      return "Ask Price:";
    } else {
      return "Bid Price:";
    }
  })();

  const precision = useMemo(
    () => (userExpertMode ? undefined : market?.pricePrecision),
    [userExpertMode, market?.pricePrecision],
  );

  return (
    <>
      <CustomInputBox2
        value={price}
        onChange={setLimitPrice}
        precision={precision}
        title="Price"
        symbol={collateralCurrency?.symbol}
        balanceDisplay={toBN(lastMarketPrice).toFormat()}
        balanceExact={lastMarketPrice}
        balanceTitle={balanceTitle ?? "Offer Price:"}
      />
    </>
  );
}
