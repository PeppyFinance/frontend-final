import styled from "styled-components";

import {
  Direction,
  OrderMarktes,
} from "@symmio/frontend-sdk/state/hedger/hooks";
import { useCoinCategories } from "@symmio/frontend-sdk/state/market/hooks";
import Markets from "components/App/Markets";
import { useRouter } from "next/router";
import { Container } from "pages/trade/[id]";

const Wrapper = styled(Container)`
  padding: 0px 12px;
`;

type RouterParam = string | string[] | undefined;

const cleanOrderParam = (param: RouterParam): OrderMarktes => {
  if (typeof param !== "string") {
    return "tradeVolume";
  }
  return (["price", "priceChangePercent", "tradeVolume", "notionalCap"].find(
    (order) => order.toLowerCase() === param.toLowerCase(),
  ) ?? "tradeVolume") as OrderMarktes;
};

const cleanDirectionParam = (param: RouterParam): Direction => {
  if (typeof param === "string" && param.toLowerCase() === "asc") {
    return "asc";
  } else {
    return "desc";
  }
};

const cleanCoinCategoriesParam = (
  param: RouterParam,
  coinCategories: string[],
): string | undefined => {
  if (typeof param === "string") {
    coinCategories = coinCategories.map((cat) => cat.toUpperCase());
    const paramUpper = param.toUpperCase();
    return coinCategories.find((cat) => cat === paramUpper);
  }
};

export default function MarketsPage() {
  const { query } = useRouter();
  const coinCategoriesObj = useCoinCategories();
  const coinCategories = Object.keys(coinCategoriesObj ?? []);

  const direction = cleanDirectionParam(query.direction);
  const orderBy = cleanOrderParam(query.orderby);
  const coinCategory = cleanCoinCategoriesParam(
    query.coinCategory,
    coinCategories,
  );

  return (
    <Wrapper>
      <Markets
        orderBy={orderBy}
        direction={direction}
        coinCategory={coinCategory}
      />
    </Wrapper>
  );
}
