import "@rainbow-me/rainbowkit/styles.css";
import React from "react";
import styled from "styled-components";

import {UNDER_MAINTENANCE} from "@symmio/frontend-sdk/constants/misc";

import {UnderMaintenance} from "components/Icons";
import {RowCenter} from "components/Row";
import NavBar from "./NavBar";
// import Footer from 'components/Disclaimer'

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  position: relative;
  flex-flow: column nowrap;
  background: ${({theme}) => theme.bg};
`;
const HeaderWrap = styled.div`
  width: 100%;
  top: 0;
  z-index: 300;
  background: ${({theme}) => theme.bg};
`;

const Content = styled.div`
  position: relative;
  height: 100%;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  background: ${({theme}) => theme.bg};

  ${({theme}) => theme.mediaWidth.upToMedium`
    min-height: calc(100vh - 60px);
  `}

  ${({theme}) => theme.mediaWidth.upToSmall`
    padding-bottom: 30px;
  `}
`;

const UnderMaintenanceWrap = styled(RowCenter)`
  height: 100%;
  z-index: 1000;
  position: absolute;
  background: rgba(18, 20, 25, 0.8);
  backdrop-filter: blur(6px);
`;

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <Wrapper>
      {UNDER_MAINTENANCE && (
        <UnderMaintenanceWrap>
          <UnderMaintenance />
        </UnderMaintenanceWrap>
      )}
      <HeaderWrap>
        <NavBar />
      </HeaderWrap>
      <Content>{children}</Content>
      {/* <Footer /> */}
    </Wrapper>
  );
}
