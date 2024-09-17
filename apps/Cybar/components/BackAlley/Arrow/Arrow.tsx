import styled, { DefaultTheme, keyframes, useTheme } from "styled-components";
import { glow, pulseAnimation } from "../Characters/character";
import css from "styled-jsx/css";
import { CSSProperties } from "react";
import Link from "next/link";

const slideDesktopArrowBackalley = keyframes`
  50% {
    left: 130px;
  }
  100% {
    left: 100px;
  }
`;

const glowAnimation = (theme: DefaultTheme) =>
  css`
    ${glow(theme)} 4s ${pulseAnimation}
  `;

const NavigationArrowBackalley = styled(Link)<Omit<Props, "direction">>`
  position: absolute;
  // left: ${(props) => `${"left" in props ? props.left : ""}`};
  right: ${(props) => `${"right" in props ? props.right : ""}`};
  width: 75px;
  height: 75px;
  animation: ${slideDesktopArrowBackalley} 1s forwards;
  animation-delay: 2s;
  top: 50%;
  translateY(-50%);
`;

const ArrowIcon = styled.div<Pick<Props, "direction">>`
  svg {
    width: 100%;
    height: 100%;
    ${({ direction }) =>
      `transform: scaleX(${direction === "Left" ? "-" : ""}1);`}
  }
`;

const DoubleArrowIcon = () => {
  const theme = useTheme();
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.5 5L11.7929 11.2929C12.1834 11.6834 12.1834 12.3166 11.7929 12.7071L5.5 19"
        strokeWidth="2"
        stroke={theme.characterAction}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 5L19.7929 11.2929C20.1834 11.6834 20.1834 12.3166 19.7929 12.7071L13.5 19"
        stroke={theme.characterAction}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

type Props = {
  direction?: "Right" | "Left";
  href: string;
} & ({ left: CSSProperties["left"] } | { right: CSSProperties["right"] });

export const NavigationArrow = ({ direction, href, ...props }: Props) => {
  return (
    <NavigationArrowBackalley href={href} {...props}>
      <ArrowIcon direction={direction ?? ("left" in props ? "Left" : "Right")}>
        <DoubleArrowIcon />
      </ArrowIcon>
    </NavigationArrowBackalley>
  );
};
