import styled from "styled-components";

import {
  Direction,
  OrderMarktes,
} from "@symmio/frontend-sdk/state/hedger/hooks";
import { DownArrow } from "assets/icons/DownArrow";
import { NoStyleButton } from "components/Button";
import { RowBetween } from "components/Row";
import { useRouter } from "next/router";

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

const HeaderWrap = styled(TableStructure)`
  color: ${({ theme }) => theme.text4};
  background-color: ${({ theme }) => theme.bg0};
  padding: 24px 24px 15px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.border3};

  & > * {
    &:last-child {
      width: 85px;
      text-align: right;
    }
  }
`;

// TODO: rename to ordered
interface Props {
  HEADERS: {
    name: string;
    orderBy?: OrderMarktes;
  }[];
  orderedBy: OrderMarktes;
  direction: Direction;
}
export default function TableHeader({
  HEADERS,
  orderedBy: orderedBy,
  direction,
}: Props) {
  const router = useRouter();

  const onClick = (orderBy: OrderMarktes) => {
    if (orderBy === orderedBy) {
      router.query.direction = direction === "asc" ? "desc" : "asc";
    } else {
      router.query.direction = "desc";
    }
    router.query.orderby = orderBy;
    router.push(router);
  };

  return (
    <HeaderWrap>
      {HEADERS.map((header) => {
        return (
          <NoStyleButton
            disabled={!header.orderBy}
            key={header.name}
            isActive={header.orderBy === orderedBy}
            onClick={() => onClick(header.orderBy ?? "tradeVolume")}
          >
            {header.name}
            <DownArrow
              direction={direction === "asc" ? "up" : "down"}
              isActive={header.orderBy === orderedBy}
            />
          </NoStyleButton>
        );
      })}
    </HeaderWrap>
  );
}
