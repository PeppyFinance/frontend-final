import {Quote} from "@symmio/frontend-sdk/types/quote";
import {Account} from "@symmio/frontend-sdk/types/user";

import {useMarket} from "@symmio/frontend-sdk/hooks/useMarkets";
import {NotificationDetails} from "@symmio/frontend-sdk/state/notifications/types";
import useCurrencyLogo, {useCollateralLogo} from "lib/hooks/useCurrencyLogo";

import BaseItem from "components/Notifications/Cards/BaseCard";
import ShimmerAnimation from "components/ShimmerAnimation";
import {PartiallyFillTitle} from "./styles";

export default function Default({
  notification,
  account,
  quote,
  loading,
}: {
  notification: NotificationDetails;
  account: Account;
  quote?: Quote;
  loading?: boolean;
}): JSX.Element {
  const {modifyTime, actionStatus, failureMessage, lastSeenAction, quoteId} =
    notification;
  const {symbol, asset} = useMarket(quote?.marketId) || {};
  const token1 = useCurrencyLogo(symbol);
  const token2 = useCollateralLogo();

  return (
    <BaseItem
      title={
        <PartiallyFillTitle>
          {loading ? (
            <ShimmerAnimation width={"55px"} height={"14px"} />
          ) : (
            <div>
              {symbol}-{asset}{" "}
            </div>
          )}
          <div> - Q{quoteId}</div>
        </PartiallyFillTitle>
      }
      text={`${failureMessage} - ${lastSeenAction} - ${actionStatus}`}
      token1={token1}
      token2={token2}
      timestamp={modifyTime}
      accountName={account.name}
      loading={loading}
    />
  );
}
