import { pulseAnimation } from "components/BackAlley/Characters/character";
import Link from "next/link";
import styled, { keyframes, useTheme } from "styled-components";

const slideDesktopArrowBackalley = keyframes`
  50% {
    left: 130px;
  }
  100% {
    left: 100px;
  }
`;

const glow = keyframes`
    0% {
        filter: drop-shadow(0px 0px 0px #6bdbd6)
    }
    50% {
        filter: drop-shadow(0px 0px 16px #6bdbd6)
    }
    100% {
        filter: drop-shadow(0px 0px 0px #6bdbd6)
    }
`;

const NavigationArrowLeft = styled(Link)`
  position: absolute;
  left: -100px;
  width: 75px;
  height: 75px;
  animation: ${slideDesktopArrowBackalley} 1s forwards, ${glow} 4s ${pulseAnimation}; 
  animation-delay: 2s;
  top: 50%;
  translateY(-50%);
  z-index: 2;
`;

const ArrowIcon = styled.div`
  svg {
    width: 100%;
    height: 100%;
    transform: scaleX(-1);
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
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M13.5 5L19.7929 11.2929C20.1834 11.6834 20.1834 12.3166 19.7929 12.7071L13.5 19"
        stroke={theme.characterAction}
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
};

type Props = {
  href: string;
  display: boolean;
};

export const NavigationArrow = ({ href, display = true }: Props) => {
  if (!display) {
    return null;
  }
  return (
    <NavigationArrowLeft href={href}>
      <ArrowIcon>
        <DoubleArrowIcon />
      </ArrowIcon>
    </NavigationArrowLeft>
  );
};
