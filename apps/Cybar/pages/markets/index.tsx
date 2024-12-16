import styled from "styled-components";

import { Container } from "pages/trade/[id]";
import Markets from "components/App/Markets";
import {
  Direction,
  OrderMarktes,
} from "@symmio/frontend-sdk/state/hedger/hooks";
import { useRouter } from "next/router";

const Wrapper = styled(Container)`
  padding: 0px 12px;
`;

const cleanOrderParam = (
  param: string | string[] | undefined
): OrderMarktes => {
  if (typeof param !== "string") {
    return "tradeVolume";
  }
  return (["price", "priceChangePercent", "tradeVolume", "notionalCap"].find(
    (order) => order.toLowerCase() === param.toLowerCase()
  ) ?? "tradeVolume") as OrderMarktes;
};

export default function MarketsPage() {
  const { query } = useRouter();
  const directionParam = query.direction;
  let direction: Direction = "desc";
  if (
    directionParam &&
    !Array.isArray(directionParam) &&
    directionParam.toLowerCase() === "asc"
  ) {
    direction = "asc";
  }

  const orderBy = cleanOrderParam(query.orderby);

  return (
    <Wrapper>
      <Markets orderBy={orderBy} direction={direction} />
    </Wrapper>
  );
}
