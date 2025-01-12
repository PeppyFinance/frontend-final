import NextLink from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import styled from "styled-components";

import { RowBetween, RowCenter } from "components/Row";

const Container = styled(RowCenter)`
  padding-left: 36px;
  overflow: hidden;
  flex-flow: row nowrap;
  width: unset;
  height: 40px;

  & > * + * {
    margin-left: 24px;
  }
`;

const Row = styled(RowBetween)<{ active?: boolean }>`
  width: unset;
  height: 40px;
  color: ${({ theme }) => theme.text0};
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.text1};
  }

  ${({ active, theme }) =>
    active &&
    ` color: ${theme.primary0};
      pointer-events: none;
  `};
`;

const Link = styled(NextLink)`
  text-decoration: none;
`;

export default function Menu() {
  const ref = useRef(null);
  const router = useRouter();

  return (
    <Container ref={ref}>
      <Link href="/trade" passHref>
        <Row active={router.route.includes("/trade")}>
          <div>Trade</div>
        </Row>
      </Link>
      <Link href="/my-account" passHref>
        <Row active={router.route.includes("/my-account")}>
          <div>Account</div>
        </Row>
      </Link>
      <Link href="/markets" passHref>
        <Row active={router.route.includes("/markets")}>
          <div>Markets</div>
        </Row>
      </Link>
    </Container>
  );
}
