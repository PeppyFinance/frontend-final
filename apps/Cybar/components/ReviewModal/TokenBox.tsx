import { Token } from "@uniswap/sdk-core";
import { isMobile } from "react-device-detect";
import styled from "styled-components";

import ImageWithFallback from "components/ImageWithFallback";
import { RowBetween, RowStart } from "components/Row";
import useCurrencyLogo from "lib/hooks/useCurrencyLogo";

const Wrapper = styled(RowBetween).attrs({
  align: "center",
})`
  display: flex;
  border-radius: 16px;
  background: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text2};
  white-space: nowrap;
  height: 60px;
  gap: 10px;
  padding: 0px 1rem;
  margin: 0 1rem;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0.5rem;
  `}
`;

const Row = styled(RowStart)`
  flex-flow: row nowrap;
  font-size: 1.5rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    gap: 3px;
  `}
`;

const Balance = styled.div`
  font-size: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.text1};
`;

const Symbol = styled.p`
  margin-left: 8px;
  font-size: 1rem;
  color: ${({ theme }) => theme.text1};
`;

export default function TokenBox({
  currency,
  value,
}: {
  currency: Token;
  value: string;
}) {
  const logo = useCurrencyLogo(currency?.address);

  function getImageSize() {
    return isMobile ? 20 : 24;
  }

  return (
    <>
      <Wrapper>
        <Balance>{value}</Balance>
        <div>
          <Row>
            <ImageWithFallback
              src={logo}
              width={getImageSize()}
              height={getImageSize()}
              alt={`${currency?.symbol} Logo`}
              round
            />
            <Symbol>{currency?.symbol}</Symbol>
          </Row>
        </div>
      </Wrapper>
    </>
  );
}
