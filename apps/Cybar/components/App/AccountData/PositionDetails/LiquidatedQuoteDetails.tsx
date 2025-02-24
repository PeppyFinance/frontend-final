import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import { Quote } from "@symmio/frontend-sdk/types/quote";
import { PositionType } from "@symmio/frontend-sdk/types/trade";
import { formatAmount, toBN } from "@symmio/frontend-sdk/utils/numbers";
import { formatTimestamp } from "@symmio/frontend-sdk/utils/time";

import { useMarketData } from "@symmio/frontend-sdk/state/hedger/hooks";

import { useMarket } from "@symmio/frontend-sdk/hooks/useMarkets";
import {
  useLockedMargin,
  useQuoteLeverage,
  useQuoteSize,
  useQuoteUpnlAndPnl,
} from "@symmio/frontend-sdk/hooks/useQuotes";

import { useCollateralToken } from "@symmio/frontend-sdk/constants/tokens";
import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";
import { useGetTokenWithFallbackChainId } from "@symmio/frontend-sdk/utils/token";
import {
  Chevron,
  ContentWrapper,
  DataWrap,
  FlexColumn,
  Label,
  Leverage,
  MarketName,
  PositionInfoBox,
  PositionPnl,
  QuoteData,
  Row,
  RowPnl,
  TopWrap,
  Value,
  Wrapper,
} from "components/App/AccountData/PositionDetails/styles";
import { LongArrow, ShortArrow } from "components/Icons";
import { Row as RowComponent, RowEnd } from "components/Row";
import ClosedAmountDetails from "./ClosedSizeDetails/ClosedAmountDetails";
import PositionDetailsNavigator from "./PositionDetailsNavigator";

const LiquidateWrap = styled(DataWrap)`
  background: ${({ theme }) => theme.bgLoose};
`;

const LiquidateLabel = styled(Label)`
  color: ${({ theme }) => theme.negative};
`;

export default function LiquidatedQuoteDetails({
  quote,
  platformFee,
  mobileVersion = false,
}: {
  quote: Quote;
  platformFee: string;
  mobileVersion: boolean;
}): JSX.Element {
  const theme = useTheme();
  const { chainId } = useActiveWagmi();
  const {
    id,
    positionType,
    marketId,
    createTimestamp,
    statusModifyTimestamp,
    liquidateAmount,
    liquidatePrice,
    openedPrice,
  } = quote;
  const { symbol, name, asset } = useMarket(marketId) || {};
  const marketData = useMarketData(name);
  const COLLATERAL_TOKEN = useCollateralToken();
  const collateralCurrency = useGetTokenWithFallbackChainId(
    COLLATERAL_TOKEN,
    chainId,
  );

  const quoteSize = useQuoteSize(quote);
  const leverage = useQuoteLeverage(quote);
  const lockedAmount = useLockedMargin(quote);
  const [, pnl] = useQuoteUpnlAndPnl(quote, marketData?.markPrice || 0);
  const [expanded, setExpanded] = useState(!mobileVersion);
  useEffect(() => {
    if (!mobileVersion) {
      setExpanded(true);
    }
  }, [mobileVersion]);
  function getPnlData(value: string) {
    const valueBN = toBN(value);
    const valuePercent = valueBN
      .div(quoteSize)
      .div(openedPrice)
      .times(leverage)
      .times(100)
      .toFixed(2);

    if (valueBN.isGreaterThan(0)) {
      return [`+ $${formatAmount(valueBN)}`, valuePercent, theme.positive];
    } else if (valueBN.isLessThan(0)) {
      return [
        `- $${formatAmount(Math.abs(valueBN.toNumber()))}`,
        valuePercent,
        theme.negative,
      ];
    }
    return [`$${formatAmount(valueBN)}`, valuePercent, theme.text1];
  }

  const [PNL, PNLPercent, PNLColor] = getPnlData(pnl);

  return (
    <>
      <TopWrap
        onClick={() => {
          if (mobileVersion) {
            setExpanded(!expanded);
          }
        }}
        mobileVersion={mobileVersion}
        expand={expanded}
      >
        <FlexColumn flex={4} alignItems={"flex-start"}>
          <PositionInfoBox>
            <RowComponent width={"initial"}>
              <MarketName>
                <div>
                  {symbol}-{asset}
                </div>
                <div>-Q{id}</div>
              </MarketName>
              <Leverage>{leverage}x</Leverage>
              <QuoteData>
                {positionType}
                {positionType === PositionType.LONG ? (
                  <LongArrow width={16} height={12} color={theme.positive} />
                ) : (
                  <ShortArrow width={16} height={12} color={theme.negative} />
                )}
              </QuoteData>
            </RowComponent>

            {!mobileVersion && <PositionDetailsNavigator />}
          </PositionInfoBox>

          {mobileVersion && (
            <RowPnl>
              <Label>PNL:</Label>
              <PositionPnl color={PNLColor}>{`${PNL} (${Math.abs(
                Number(PNLPercent),
              )}%)`}</PositionPnl>
            </RowPnl>
          )}
        </FlexColumn>
        {mobileVersion && (
          <FlexColumn flex={1} alignItems={"flex-end"}>
            <Chevron open={expanded} />
          </FlexColumn>
        )}
      </TopWrap>
      {expanded && (
        <Wrapper>
          <LiquidateWrap>
            <Row>
              <LiquidateLabel>PNL:</LiquidateLabel>
              <RowEnd>
                <PositionPnl color={PNLColor}>{`${PNL} (${Math.abs(
                  Number(PNLPercent),
                )}%)`}</PositionPnl>
              </RowEnd>
            </Row>
            <Row>
              <LiquidateLabel>Liquidated Size:</LiquidateLabel>
              <Value>{`${formatAmount(
                liquidateAmount,
                6,
                true,
              )} ${symbol}`}</Value>
            </Row>
            <Row>
              <LiquidateLabel>Liquidated Price:</LiquidateLabel>
              <Value>{`${formatAmount(
                liquidatePrice,
                6,
                true,
              )} ${asset}`}</Value>
            </Row>
          </LiquidateWrap>
          <ClosedAmountDetails quote={quote} />
          <ContentWrapper>
            <Row>
              <Label>Liquidated Time:</Label>
              <Value>{formatTimestamp(statusModifyTimestamp * 1000)}</Value>
            </Row>
            <Row>
              <Label>Created Time:</Label>
              <Value>{formatTimestamp(createTimestamp * 1000)}</Value>
            </Row>

            <Row>
              <Label>Locked Amount:</Label>
              <Value>{`${formatAmount(lockedAmount, 6, true)} ${
                collateralCurrency?.symbol
              }`}</Value>
            </Row>
            <Row>
              <Label>Platform Fee:</Label>
              <Value>{`${formatAmount(
                toBN(platformFee).div(2),
                3,
                true,
              )} (OPEN) / ${formatAmount(
                toBN(platformFee).div(2),
                3,
                true,
              )} (CLOSE) ${collateralCurrency?.symbol}`}</Value>
            </Row>
          </ContentWrapper>
        </Wrapper>
      )}
    </>
  );
}
