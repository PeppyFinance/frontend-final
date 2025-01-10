import styled from "styled-components";

import { useMarketsSearch } from "@symmio/frontend-sdk/hooks/useMarkets";
import {
  OrderMarktes,
  Direction,
} from "@symmio/frontend-sdk/state/hedger/hooks";
import { InputField } from "components/App/MarketBar/InputField";
import { RowBetween } from "components/Row";
import TableBody from "./Body";
import TableHeader from "./Header";
import { useMemo, useState } from "react";

const TableWrapper = styled.div`
  border-radius: 4px;
`;

const Title = styled(RowBetween)`
  padding: 8px 12px 0 16px;
  border-radius: 4px 4px 0 0;
  background-color: ${({ theme }) => theme.bg0};
`;

const InputWrapper = styled.div`
  width: 244px;

  & > * {
    &:first-child {
      & > * {
        &:first-child {
          border-right: none;
        }
        &:last-child::placeholder {
          color: ${({ theme }) => theme.text4};
          font-size: 12px;
        }
      }
    }
  }
`;

export interface MarketsTableProps {
  direction: Direction;
  orderBy: OrderMarktes;
}
export default function Table({ direction, orderBy }: MarketsTableProps) {
  const { markets } = useMarketsSearch({
    orderBy,
    direction,
  });

  const [search, setSearch] = useState("");

  const { filtered } = useMemo(() => {
    const filtered = markets.filter((market) =>
      market.name.toLowerCase().includes(search)
    );

    return { filtered };
  }, [search, markets]);

  return (
    <TableWrapper>
      <Title>
        <div>Markets</div>
        <InputWrapper>
          <InputField setSearch={setSearch} placeholder={"Search Name"} />
        </InputWrapper>
      </Title>
      <TableHeader
        HEADERS={[
          { name: "" },
          { name: "Name" },
          { name: "Price", orderBy: "price" },
          { name: "24h Change", orderBy: "priceChangePercent" },
          { name: "24h Volume", orderBy: "tradeVolume" },
          { name: "Notional Cap", orderBy: "notionalCap" },
          { name: "Action" },
        ]}
        orderedBy={orderBy}
        direction={direction}
      />
      <TableBody markets={filtered} searchValue={search} />
    </TableWrapper>
  );
}
