import { useState } from "react";
import styled from "styled-components";
import { Z_INDEX } from "theme";

import { useNewNotification } from "@symmio/frontend-sdk/state/notifications/hooks";
import { useInjectedAddress } from "lib/hooks/useInjectedAddress";
import { useIsMobile } from "lib/hooks/useWindowSize";

import { Row } from "components/Row";
import Web3Network from "components/Web3Network";

import useActiveWagmi from "@symmio/frontend-sdk/lib/hooks/useActiveWagmi";
import {
  useModalOpen,
  useWithdrawBarModalToggle,
} from "@symmio/frontend-sdk/state/application/hooks";
import { ApplicationModal } from "@symmio/frontend-sdk/state/application/reducer";
import WithdrawCooldown from "components/App/AccountData/WithdrawCooldown";
import Column from "components/Column";
import HedgerSelector from "components/HedgerSelector";
import { InfoHeader } from "components/InfoHeader";
import Notifications from "components/Notifications";
import WithdrawBarModal from "components/ReviewModal/WithdrawBarModal";
import Web3Status from "components/Web3Status";
import Menu from "./Menu";
import NavLogo from "./NavLogo";
import Warning from "./Warning";

const Wrapper = styled(Row)`
  gap: 5px;
  font-size: 16px;
  flex-wrap: nowrap;
  padding: 10px 32px;
  position: relative;
  z-index: ${Z_INDEX.fixed};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    background-color: ${({ theme }) => theme.bg};
    padding: 0px 1.25rem;
  `};
`;

const BackgroundWrapper = styled(Wrapper)<{ newNotification?: boolean }>`
  @keyframes fade {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  padding: 0px;
  overflow: hidden;
  position: absolute;
  background: ${({ theme, newNotification }) =>
    newNotification ? theme.primaryDisable : theme.bg};
  animation: ${({ newNotification }) =>
    newNotification ? "fade 1s linear 1" : "none"};
`;

const MobileWrapper = styled(Wrapper)`
  justify-content: flex-end;
  font-size: 12px;
  flex-wrap: wrap;
  padding: 16px 16px 8px 16px;
  background-color: ${({ theme }) => theme.bg};

  & > * {
    &:first-child {
      margin-right: auto;
    }
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
  padding: 16px 12px 8px 12px;
  & > * {

    &:nth-child(2) {
      width: 100%;
      order: 2;
      margin-top: 12px;
    }
    &:nth-child(1),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6) {
      order: 1;
    }
  }
  `};
`;

export const NavbarContentWrap = styled.div`
  list-style: none;
  margin: auto;
  margin-left: 15px;
  margin-right: 15px;
  cursor: pointer;
  padding: 10px 0;
  position: relative;

  &:hover {
    display: block;
    & > ul {
      display: block;
    }
  }
`;

const Items = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  gap: 12px;
  flex: 1;

  ${({ theme }) => theme.mediaWidth.upToSmall`
      gap: 5px;
  `};
`;

const StatusWrapper = styled(Column)`
  & > * {
    width: 100%;
  }
  gap: 12px;
  z-index: -1;
`;

const CooldownWrapper = styled(Column)<{ width?: string }>`
  ${({ width }) => width && `width: ${width};`}
  & > * {
    width: 100%;
    cursor: pointer;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    z-index: -1;
  `}
`;

const BannerWrapper = styled.div`
  margin-top: 15px;
  padding: 0px 8px;
`;

export default function NavBar() {
  const { chainId } = useActiveWagmi();
  const showWithdrawBarModal = useModalOpen(ApplicationModal.WITHDRAW_BAR);
  const toggleWithdrawBarModal = useWithdrawBarModalToggle();

  const hasInjected = useInjectedAddress();
  const isNewNotification = useNewNotification();
  const showBanner =
    typeof window !== "undefined" &&
    localStorage.getItem("risk_warning") === "true"
      ? false
      : true;
  const [showTopBanner, setShowTopBanner] = useState(showBanner);
  const bannerText =
    "Users interacting with this software do so entirely at their own risk";

  function setShowBanner(inp: boolean) {
    if (!inp && typeof window !== "undefined") {
      localStorage.setItem("risk_warning", "true");
      setShowTopBanner(false);
    }
  }

  function getMobileContent() {
    return (
      <>
        <BackgroundWrapper newNotification={isNewNotification} />
        <MobileWrapper>
          <NavLogo />
          <Menu />
          <StatusWrapper>
            <Web3Status />
            <CooldownWrapper onClick={() => toggleWithdrawBarModal()}>
              <WithdrawCooldown formatedAmount={false} />
            </CooldownWrapper>
          </StatusWrapper>
          <Notifications />
          <Web3Network />

          {chainId && <HedgerSelector />}
        </MobileWrapper>
        {showWithdrawBarModal && <WithdrawBarModal />}
        {showTopBanner && (
          <InfoHeader
            onClose={setShowBanner}
            hasInfoIcon={true}
            text={bannerText}
          />
        )}
      </>
    );
  }

  function getDefaultContent() {
    return (
      <>
        <BackgroundWrapper newNotification={isNewNotification} />
        <Wrapper>
          <NavLogo />
          <Menu />
          <Items>
            <CooldownWrapper
              width={"240px"}
              onClick={() => toggleWithdrawBarModal()}
            >
              <WithdrawCooldown formatedAmount={true} />
            </CooldownWrapper>
            {chainId && <HedgerSelector />}
            <Web3Status />
            <Notifications />
            <Web3Network />
          </Items>
        </Wrapper>
        {(showTopBanner || hasInjected) && (
          <BannerWrapper>
            {showTopBanner && (
              <InfoHeader
                onClose={setShowBanner}
                hasInfoIcon={true}
                text={bannerText}
              />
            )}
            {hasInjected && (
              <Warning
                message={`❌ You are in "READ-ONLY" mode. Please do not confirm any transactions! ❌ `}
              />
            )}
          </BannerWrapper>
        )}
        {showWithdrawBarModal && <WithdrawBarModal />}
      </>
    );
  }

  const isMobile = useIsMobile();
  return isMobile ? getMobileContent() : getDefaultContent();
}
