import styled, { keyframes } from "styled-components";
import { glow, pulseAnimation } from "../Characters/character";

const slideDesktopArrowBackalley = keyframes`
  50% {
    left: 130px;
  }
  100% {
    left: 100px;
  }
`;

export const NavigationArrowBackalley = styled.div`
  position: absolute;
  bottom: 400px;
  left: -100px;
  width: 75px;
  height: 75px;
  animation: ${slideDesktopArrowBackalley} 1s forwards,
    ${glow} 4s ${pulseAnimation};
  animation-delay: 2s;
`;

export const ArrowIcon = styled.div`
  svg {
    width: 100%;
    height: 100%;
    color: #91ede9;
    transform: scaleX(-1);
  }
`;
