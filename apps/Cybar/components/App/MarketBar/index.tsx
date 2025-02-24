import { useMemo } from "react";
import styled from "styled-components";

import {
  useMarketNotionalCap,
  useMarketOpenInterest,
} from "@symmio/frontend-sdk/state/hedger/hooks";
import { useActiveMarket } from "@symmio/frontend-sdk/state/trade/hooks";
import { ApiState } from "@symmio/frontend-sdk/types/api";
import { formatDollarAmount } from "@symmio/frontend-sdk/utils/numbers";

import BlinkingPrice from "components/App/FavoriteBar/BlinkingPrice";
import MarketInfo from "components/App/MarketBar/MarketInfo";
import { ColumnCenter } from "components/Column";
import { Loader } from "components/Icons";
import { Row, RowBetween } from "components/Row";
import MarketDepths from "./MarketDepths";
import MarketFundingRate from "./MarketFundingRate";

const Wrapper = styled(Row)`
  min-height: 56px;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius0};
  border: 1px solid ${({ theme }) => theme.border1};
  background: ${({ theme }) => theme.bg0};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;   
    min-height: unset;
    gap:16px; 
  `};
`;

const DataWrap = styled(Row)`
  gap: 20px;
  border-radius: ${({ theme }) => theme.borderRadius0};
  flex: 2;
  background: ${({ theme }) => theme.bg0};

  ${({ theme }) => theme.mediaWidth.upToMedium` 
    & > * {
      &:nth-child(2) {
        display: none;
      }
    }
  `};
`;

const HedgerInfos = styled(RowBetween)`
  gap: 10px;
  width: unset;

  ${({ theme }) => theme.mediaWidth.upToMedium` 
    gap: 10px;
    width: 100%;
    & > * {
      &:nth-child(3) {
        display: none;
      }
    }
  `};
`;

export const Separator = styled.div`
  width: 2px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius0};
  margin-right: 2px;
  background: ${({ theme }) => theme.bg5};
`;

export const Name = styled.div`
  font-weight: 400;
  font-size: 12px;
  margin-bottom: 8px;
  text-align: center;
  color: ${({ theme }) => theme.text2};
`;

export const Value = styled.div<{
  textAlign?: string;
  textAlignMedium?: string;
}>`
  font-weight: 500;
  font-size: 12px;
  text-align: ${({ textAlign }) => textAlign ?? "left"};
  color: ${({ theme }) => theme.text0};
  ${({ theme, textAlignMedium }) => theme.mediaWidth.upToMedium`
    text-align: ${textAlignMedium ?? "left"};
  `};
`;

export default function MarketBar() {
  const openInterest = useMarketOpenInterest();
  const { marketNotionalCap, marketNotionalCapStatus } = useMarketNotionalCap();
  const activeMarket = useActiveMarket();

  const [used, total] = useMemo(
    () => [openInterest?.used, openInterest?.total],
    [openInterest],
  );
  const [notionalCapUsed, totalCap] = useMemo(() => {
    return activeMarket?.name === marketNotionalCap.name &&
      marketNotionalCapStatus !== ApiState.ERROR
      ? [marketNotionalCap?.used, marketNotionalCap?.totalCap]
      : [-1, -1];
  }, [activeMarket?.name, marketNotionalCapStatus, marketNotionalCap]);

  return (
    <Wrapper>
      <DataWrap>
        <MarketInfo />
        <HedgerInfos>
          <ColumnCenter>
            <Name>Last Price</Name>
            {activeMarket ? (
              <BlinkingPrice market={activeMarket} priceWidth={"66"} />
            ) : (
              <Loader size={"12px"} stroke="#EBEBEC" />
            )}
          </ColumnCenter>
          <Separator />
          <ColumnCenter>
            <Name>Open Interest</Name>
            <Value>
              {used === -1 ? (
                <Loader size={"12px"} stroke="#EBEBEC" />
              ) : (
                formatDollarAmount(used)
              )}{" "}
              /{" "}
              {total === -1 ? (
                <Loader size={"12px"} stroke="#EBEBEC" />
              ) : (
                formatDollarAmount(total)
              )}
            </Value>
          </ColumnCenter>
          <Separator />
          <ColumnCenter>
            <Name>{activeMarket?.symbol} Notional Cap</Name>
            <Value>
              {notionalCapUsed === -1 ? (
                <Loader size={"12px"} stroke="#EBEBEC" />
              ) : (
                formatDollarAmount(notionalCapUsed)
              )}{" "}
              /{" "}
              {totalCap === -1 ? (
                <Loader size={"12px"} stroke="#EBEBEC" />
              ) : (
                formatDollarAmount(totalCap)
              )}
            </Value>
          </ColumnCenter>
          <Separator />
          <MarketFundingRate />
          <Separator />
          <MarketDepths />
        </HedgerInfos>
      </DataWrap>
    </Wrapper>
  );
}
