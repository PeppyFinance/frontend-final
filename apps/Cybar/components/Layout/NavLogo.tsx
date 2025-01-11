import styled from "styled-components";

import {ExternalLink} from "components/Link";
import {RowCenter, RowStart} from "components/Row";
import {APP_URL} from "constants/chains/misc";
import Image from "next/legacy/image";
import {useRouter} from "next/router";
import CYBAR_HEADER_LOGO from "/public/static/images/cybar-long.svg";

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
  ${({theme}) => theme.mediaWidth.upToMedium`
  flex-direction: column;
  align-items: flex-start;
`};
`;

export default function NavLogo() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <div>
      <Wrapper>
        <TextWrapper>
          <Image
            height={60}
            width={120}
            src={CYBAR_HEADER_LOGO}
            alt="cybar header logo"
            onClick={handleLogoClick}
          />
          <ExternalLink href={APP_URL} target="_self" passHref></ExternalLink>
        </TextWrapper>
      </Wrapper>
    </div>
  );
}
