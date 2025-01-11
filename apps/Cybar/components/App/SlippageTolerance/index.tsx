import styled from "styled-components";

import {Row, RowCenter} from "components/Row";
import Image from "next/legacy/image";
import CYBAR_LOGO_SHORT from "/public/static/images/cybar-short.svg";

const AutoSlippageContainer = styled.div`
  padding: 1px;
  width: 125px;
  height: 28px;
  border-radius: 4px;
  background: ${({theme}) => theme.gradLight};
`;

const AutoSlippageWrapper = styled(Row)`
  height: 100%;
  font-size: 10px;
  padding: 0px 6px;
  border-radius: 4px;
  color: ${({theme}) => theme.text0};
  background: ${({theme}) => theme.bg4};
`;

export default function SlippageTolerance() {
  return (
    <AutoSlippageContainer>
      <AutoSlippageWrapper>
        <RowCenter>Auto slippage</RowCenter>
        <RowCenter width={"20%"}>
          <Image
            width={12}
            height={13}
            src={CYBAR_LOGO_SHORT}
            alt="cybar logo"
          />
        </RowCenter>
      </AutoSlippageWrapper>
    </AutoSlippageContainer>
  );
}
