import { Quote, QuoteStatus } from "@symmio/frontend-sdk/types/quote";
import { OrderType } from "@symmio/frontend-sdk/types/trade";
import { toBN } from "@symmio/frontend-sdk/utils/numbers";
import React from "react";

import { useMarket } from "@symmio/frontend-sdk/hooks/useMarkets";
import { useIsMobile } from "lib/hooks/useWindowSize";

import CanceledQuoteDetails from "./CanceledQuoteDetails";
import EmptyDetails from "./EmptyDetails";
import LiquidatedQuoteDetails from "./LiquidatedQuoteDetails";
import OpenedQuoteDetails from "./OpenedQuoteDetails";
import PendingQuoteDetails from "./PendingsQuoteDetails";

export default function PositionDetails({
  quote,
  buttonText,
  disableButton,
  onClickButton,
}: {
  quote: Quote | null;
  buttonText?: string | JSX.Element;
  disableButton?: boolean;
  onClickButton?: (event: React.MouseEvent<HTMLDivElement>) => void;
}): JSX.Element {
  const { quantity, marketPrice, requestedOpenPrice, orderType, quoteStatus } =
    quote || {};
  const { tradingFee } = useMarket(quote?.marketId) || {};
  const mobileVersion = useIsMobile();

  const platformFee = (() => {
    if (!quantity || !marketPrice || !tradingFee || !requestedOpenPrice) {
      return "0";
    }
    if (orderType === OrderType.LIMIT) {
      return toBN(quantity)
        .times(requestedOpenPrice)
        .times(tradingFee)
        .toString();
    }
    return toBN(quantity).times(marketPrice).times(tradingFee).toString();
  })();

  if (!quote) {
    return <EmptyDetails />;
  }

  switch (quoteStatus) {
    case QuoteStatus.PENDING:
    case QuoteStatus.LOCKED:
    case QuoteStatus.CANCEL_PENDING:
      return (
        <PendingQuoteDetails
          quote={quote}
          mobileVersion={mobileVersion}
          platformFee={platformFee}
          buttonText={buttonText}
          disableButton={disableButton}
          onClickButton={onClickButton}
        />
      );
    case QuoteStatus.OPENED:
    case QuoteStatus.CLOSED:
    case QuoteStatus.CLOSE_PENDING:
    case QuoteStatus.CANCEL_CLOSE_PENDING:
      return (
        <OpenedQuoteDetails
          quote={quote}
          platformFee={platformFee}
          mobileVersion={mobileVersion}
          buttonText={buttonText}
          disableButton={disableButton}
          onClickButton={onClickButton}
        />
      );
    case QuoteStatus.CANCELED:
    case QuoteStatus.EXPIRED:
      return (
        <CanceledQuoteDetails quote={quote} mobileVersion={mobileVersion} />
      );
    case QuoteStatus.LIQUIDATED:
      return (
        <LiquidatedQuoteDetails
          quote={quote}
          platformFee={platformFee}
          mobileVersion={mobileVersion}
        />
      );
    default:
      return <EmptyDetails />;
  }
}
