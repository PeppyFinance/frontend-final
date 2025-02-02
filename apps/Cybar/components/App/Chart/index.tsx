import { useDetectAdBlock } from "adblock-detect-react";
import Image from "next/legacy/image";
import styled from "styled-components";

import LOADING_CHART from "/public/static/images/etc/LoadChart.svg";

import { useActiveMarket } from "@symmio/frontend-sdk/state/trade/hooks";

import { Card } from "components/Card";
// TODO: replace icon
import TVChart from "components/App/Chart/TVChart";
import { LottieCloverfield } from "components/Icons";
import { RowCenter } from "components/Row";

const Wrapper = styled(Card)`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
  justify-content: center;
  background: ${({ theme }) => theme.bg0};
  border: none;
`;

const AdBlockText = styled(RowCenter)`
  width: 100%;
  font-size: 16px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text1};
`;

const WarningText = styled.span`
  font-size: 16px;
  margin: 0px 4px;
  color: ${({ theme }) => theme.warning0};
`;

const LoadChartImage = styled.div`
  text-align: center;
`;

export default function Chart() {
  const adBlockDetected = useDetectAdBlock();
  const market = useActiveMarket();

  return (
    <Wrapper>
      {adBlockDetected ? (
        <>
          <LoadChartImage>
            <Image
              src={LOADING_CHART}
              alt={"load_chart"}
              width={182}
              height={184}
            />
          </LoadChartImage>
          <AdBlockText>Cannot load chart</AdBlockText>
          <AdBlockText>
            (The chart can not be loaded while your
            <WarningText>ad blocker</WarningText> is ON)
          </AdBlockText>
        </>
      ) : !market ? (
        <LottieCloverfield />
      ) : (
        <TVChart symbol={`BINANCE:${market?.name}.P`} />
      )}
    </Wrapper>
  );
}
