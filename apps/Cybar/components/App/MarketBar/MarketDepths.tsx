import styled from "styled-components";

import useBidAskPrice from "@symmio/frontend-sdk/hooks/useBidAskPrice";
import {useActiveMarket} from "@symmio/frontend-sdk/state/trade/hooks";

import BlinkingPrice from "components/App/FavoriteBar/BlinkingPrice";
import {ColumnCenter} from "components/Column";
import {RowEnd} from "components/Row";
import {Name, Separator, Value} from ".";

const MarginColumn = styled(ColumnCenter)`
  ${({theme}) => theme.mediaWidth.upToMedium` 
      margin-right: 5px;
      margin-left: unset;
  `};
`;

const MarketInfos = styled(RowEnd)`
  gap: 10px;
  flex: 1;

  ${({theme}) => theme.mediaWidth.upToMedium`
    gap: 10px;
    justify-content: space-between;
    flex-direction: row-reverse;
    width:100%;
  `};
`;

const MarketDepth = styled(RowEnd)`
  gap: 20px;
  width: unset;

  ${({theme}) => theme.mediaWidth.upToMedium`
    justify-content: flex-start;

  `};
`;

export default function MarketDepths() {
  const activeMarket = useActiveMarket();
  const {ask, bid, spread} = useBidAskPrice(activeMarket);

  return (
    <MarketInfos>
      <MarginColumn>
        <Name>Spread(bps)</Name>
        <Value>{spread}</Value>
      </MarginColumn>
      <Separator />
      <MarketDepth>
        <ColumnCenter>
          <Name>Bid</Name>
          <BlinkingPrice data={bid} textSize={"12px"} textAlign={"right"} />
        </ColumnCenter>
        <Separator />
        <ColumnCenter>
          <Name>Ask</Name>
          <BlinkingPrice data={ask} textSize={"12px"} textAlign={"right"} />
        </ColumnCenter>
      </MarketDepth>
    </MarketInfos>
  );
}
