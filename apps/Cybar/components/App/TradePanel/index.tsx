import React from "react";
import styled from "styled-components";

import { WEB_SETTING } from "@symmio/frontend-sdk/config";
import { useModalOpen } from "@symmio/frontend-sdk/state/application/hooks";
import { ApplicationModal } from "@symmio/frontend-sdk/state/application/reducer";

import Column from "components/Column";

import PositionTypeTab from "components/App/TradePanel/PositionTypeTab";
import TradeOverview from "components/App/TradePanel/TradeOverview";

import { OpenPositionModal } from "components/ReviewModal/OpenPosition";
import { TpSlChecker } from "../TPSL/TpSlChecker";
import { BlackList, Suspend } from "./AccessControlPanel";
import AmountsPanel from "./AmountsPanel";
import MinPositionInfo from "./MinPositionInfo";
import OrderTypeTab from "./OrderTypeTab";
import TradeActionButtons from "./TradeActionButton";

const Wrapper = styled.div<{ showTpSl?: boolean }>`
  position: relative;

  width: 100%;
  max-width: 480px;
  border-radius: ${({ theme }) => theme.borderRadius0};
  border: 1px solid ${({ theme }) => theme.border1};
  height: ${({ showTpSl }) => (showTpSl ? "735px" : "635px")};
  overflow: scroll;
  background: ${({ theme }) => theme.bg0};
  & > * {
    &:first-child {
      border-radius: 0px;
      & > * {
        &:first-child {
          border-bottom-left-radius: 0;
        }
        &:last-child {
          border-bottom-right-radius: 0;
        }
      }
    }
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
  max-width: unset;
`};
`;

const Container = styled(Column)`
  padding: 12px;
  gap: 20px;
  border-radius: ${({ theme }) => theme.borderRadius0};
  /* overflow-x: hidden; // for some reason this panel can overflow horizontally */
  & > * {
    &:first-child {
      margin-top: 8px;
    }
  }
`;

const TabWrapper = styled.div`
  & > * {
    &:first-child {
      border-radius: 0px;
      & > * {
        &:first-child {
          border-bottom-left-radius: 0;
        }
        &:last-child {
          border-bottom-right-radius: 0;
        }
      }
    }
  }
`;

export default function TradePanel() {
  const showTpSl = WEB_SETTING.showTpSl;
  const showTradeInfoModal = useModalOpen(ApplicationModal.OPEN_POSITION);

  // TODO: add this two variables in trade action buttons
  const isSuspended = false;
  const isBlacklisted = false;

  return (
    <Wrapper showTpSl={showTpSl}>
      <React.Fragment>
        {isBlacklisted && <BlackList />}
        {isSuspended && <Suspend />}
        <TabWrapper>
          <OrderTypeTab />
        </TabWrapper>
        <Container>
          <PositionTypeTab />
          <AmountsPanel />
          <TpSlChecker />
          <MinPositionInfo />

          <TradeActionButtons />
          <TradeOverview />
        </Container>
        {showTradeInfoModal && <OpenPositionModal />}
      </React.Fragment>
    </Wrapper>
  );
}
