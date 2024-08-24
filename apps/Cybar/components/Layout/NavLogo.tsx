import React from "react";
import styled from "styled-components";

import { ExternalLink } from "components/Link";
import { RowCenter } from "components/Row";
import { APP_URL } from "constants/chains/misc";
import { RowStart } from "components/Row";
import CYBAR_HEADER_LOGO from "/public/static/images/cybar-header.svg";
import Image from "next/legacy/image";

const Wrapper = styled(RowCenter)`
  width: fit-content;

  &:hover {
    cursor: pointer;
  }

  & > div {
    &:first-child {
      margin-right: 10px;
    }
  }
`;

const TextWrapper = styled(RowStart)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
  flex-direction: column;
  align-items: flex-start;
`};
`;

const Text = styled.div`
  font-size: 24px;
  margin-left: 6px;
  font-weight: normal;
  background: ${({ theme }) => theme.gradLight};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 10px;
  `};
`;

const SymmetrialText = styled.div`
  gap: 4px;
  font-size: 12px;
  font-weight: 400;
  margin: 6px 4px 0px 4px;
  color: ${({ theme }) => theme.text0};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 10px;
  `};
`;

export default function NavLogo() {
  return (
    <div>
      <Wrapper>
        <TextWrapper>
          <Image
            height={60}
            width={120}
            src={CYBAR_HEADER_LOGO}
            alt="cybar header logo"
          />
          <ExternalLink href={APP_URL} target="_self" passHref></ExternalLink>
        </TextWrapper>
      </Wrapper>
    </div>
  );
}
