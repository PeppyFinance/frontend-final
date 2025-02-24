import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

import {
  useFavorites,
  useToggleUserFavoriteCallback,
} from "@symmio/frontend-sdk/state/user/hooks";
import { Market } from "@symmio/frontend-sdk/types/market";
import { formatDollarAmount, toBN } from "@symmio/frontend-sdk/utils/numbers";

import useCurrencyLogo from "lib/hooks/useCurrencyLogo";

import { Star } from "components/Icons";
import { Row, RowBetween, RowCenter, RowStart } from "components/Row";

const TableStructure = styled(RowBetween)`
  font-size: 12px;
  font-weight: 500;
  text-align: left;

  & > * {
    width: 18%;

    &:nth-child(1) {
      width: 28px;
      margin-right: 12px;
    }
    &:nth-child(2) {
      width: 14%;
    }
    &:nth-child(3) {
      width: 12%;
    }

    ${({ theme }) => theme.mediaWidth.upToSmall`
      &:nth-child(1) {
        width: 14px;
        margin-right: 0;
      }
      &:nth-child(2) {
        width: 20%;
      }
      &:nth-child(4) {
        width: 16%;
      }
      &:nth-child(5) {
        display: none;
      }
      &:nth-child(6) {
        display: none;
      }
    `}
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      &:nth-child(2) {
        width: 27%;
      }
      &:nth-child(4) {
        display: none;
      }
    `}
  }
`;

const RowWrap = styled(TableStructure) <{ recommendation: boolean }>`
  height: 56px;
  color: ${({ theme }) => theme.text0};
  background: ${({ theme, recommendation }) => recommendation ? theme.bgMarketRecommendation : theme.bg0};
  padding: 12px 24px 12px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.bg};

  & > * {
    &:nth-child(1) {
      height: 100%;
    }
  }
`;

const StarWrapper = styled(RowCenter)`
  &:hover {
    cursor: pointer;
  }
`;

const Symbol = styled.div<{ recommendation: boolean }>`
  margin-bottom: 4px;
${({ recommendation, theme }) => recommendation && `color: ${theme.textMarketRecommendation} `}
`;

const MarketName = styled.span<{ recommendation: boolean }>`
  font-size: 10px;
${({ recommendation, theme }) => recommendation && `color: ${theme.textMarketRecommendation} `}
`;

const ColorLabel = styled(Row) <{ color: "green" | "red" | "gray" }>`
  color: ${({ color, theme }) =>
    color === "green"
      ? theme.positive
      : color === "red"
        ? theme.negative
        : theme.text2};
`;

const ActionBtn = styled.button<{ recommendation: boolean }>`
  box-sizing: border-box;
  width: 80px;
  height: 30px;
  padding: 8px 24px;
  color: ${({ theme, recommendation }) => recommendation ? theme.borderMarketRecommendation : theme.primary0};
  border: 1px solid ${({ theme, recommendation }) => recommendation ? theme.borderMarketRecommendation : theme.primary0};
  border-radius: 6px;
  font-weight: 600;

  &:hover {
    background: ${({ theme }) => theme.primary0};
    color: ${({ theme }) => theme.bg};
    transition: all 0.3s;
  }
`;

const RowItem = styled.div<{ recommendation: boolean }>`
${({ recommendation, theme }) => recommendation && `color: ${theme.textMarketRecommendation} `}
`

export default function MarketRow({
  market,
  marketInfo,
}: {
  market: Market;
  marketInfo?: {
    price: string;
    priceChangePercent: string;
    tradeVolume: string;
    notionalCap: string;
  };
}) {
  const { symbol, name, pricePrecision, id } = market;
  const { price, priceChangePercent, tradeVolume, notionalCap } =
    marketInfo || {};

  const router = useRouter();
  const favorites = useFavorites();
  const isFavorite = favorites?.includes(id);
  const icon = useCurrencyLogo(symbol);
  const toggleFavorite = useToggleUserFavoriteCallback(id);

  const onTradeClick = () => {
    router.push(`/trade/${id}`);
  };

  return (
    <RowWrap recommendation={!!market.recommendation}>
      <StarWrapper onClick={toggleFavorite}>
        <Star size={12.44} isFavorite={isFavorite} />
      </StarWrapper>
      <RowStart gap={"5px"} >
        <Image src={icon} alt={symbol} width={28} height={28} />
        <div>
          <Symbol recommendation={!!market.recommendation}>{symbol}{market.recommendation && ` (${market.recommendation})`}</Symbol>
          <ColorLabel color={"gray"}>
            <MarketName recommendation={!!market.recommendation}>{name}</MarketName>
          </ColorLabel>
        </div>
      </RowStart>
      <RowItem recommendation={!!market.recommendation}>{price ? `$${parseFloat(price).toFixed(pricePrecision)}` : "-"}</RowItem>
      <ColorLabel
        color={
          priceChangePercent
            ? toBN(priceChangePercent).isGreaterThan(0)
              ? "green"
              : "red"
            : "gray"
        }
        gap={"2px"}
      >
        <span>
          {(() => {
            if (!priceChangePercent) {
              return "-";
            }
            return `${toBN(priceChangePercent).isGreaterThan(0) ? "+" : ""
              }${priceChangePercent}%`;
          })()}
        </span>
      </ColorLabel>
      <RowItem recommendation={!!market.recommendation}>{formatDollarAmount(tradeVolume)}</RowItem>
      <RowItem recommendation={!!market.recommendation}>{formatDollarAmount(notionalCap)}</RowItem>
      <ActionBtn recommendation={!!market.recommendation} onClick={onTradeClick}>Trade</ActionBtn>
    </RowWrap>
  );
}
