import React from "react";
import styled from "styled-components";

import MarketsTable from "./MarketsTable";
import WrapperBanner from "components/Banner";
import { RowCenter } from "components/Row";

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  border-radius: 4px;
`;

const TableWrapper = styled.div`
  position: relative;
  margin-top: -85px;
  z-index: 9;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: -65px;
  `}
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-top: -35px;
  `}
`;

export default function Markets() {
  return (
    <Container>
      <WrapperBanner />
      <TableWrapper>
        <MarketsTable />
      </TableWrapper>
    </Container>
  );
}
