import styled, {useTheme} from "styled-components";

import {Quote} from "@symmio/frontend-sdk/types/quote";
import {Account} from "@symmio/frontend-sdk/types/user";
import HEDGER_ALERT_ICON from "/public/static/images/etc/ErrorTriangle.svg";

import {NotificationDetails} from "@symmio/frontend-sdk/state/notifications/types";

import {
  useErrorMessage,
  useMarket,
} from "@symmio/frontend-sdk/hooks/useMarkets";

import BaseItem from "components/Notifications/Cards/BaseCard";
import ShimmerAnimation from "components/ShimmerAnimation";
import {PartiallyFillTitle} from "./styles";

const ErrorMessage = styled.div`
  font-size: 12px;
  font-weight: 400;

  & > * {
    &:first-child {
      margin-bottom: 4px;
      color: ${({theme}) => theme.primaryDark};
    }
    &:last-child {
      color: ${({theme}) => theme.text0};
    }
  }
`;

export default function ErrorCard({
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
  const theme = useTheme();
  const {symbol, asset} = useMarket(quote?.marketId) || {};
  const {modifyTime, quoteId, errorCode} = notification;
  const errorMessage = useErrorMessage(errorCode);

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
      text={
        <ErrorMessage>
          <div>Hedger (Rasa Capital):</div>
          <div>{errorMessage ?? "Hedger Error"}</div>
        </ErrorMessage>
      }
      icon={HEDGER_ALERT_ICON}
      timestamp={modifyTime}
      loading={loading}
      accountName={account.name}
      bg={theme.bgWarning}
      border={theme.warning0}
    />
  );
}
