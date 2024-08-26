import styled, { css, DefaultTheme, keyframes } from "styled-components";
import { CharacterName } from "./characterNames.type";

export interface CharacterProps {
  left: string;
  bottom: string;
  height: string;
  characterName: CharacterName;
  onClick?: (name: CharacterName) => void;
  isActive: boolean;
  focusedBottom?: string;
  focusedLeft?: string;
  focusedHeight?: string;
}

export const Character = ({
  characterName,
  onClick,
  ...props
}: CharacterProps) => {
  return (
    <CharacterImg
      onClick={() => onClick}
      src={`/images/characters/${characterName}.webp`}
      {...props}
    />
  );
};

const pulseAnimation = "ease-in-out infinite";

const glow = (theme: DefaultTheme) => keyframes`
    0% {
        filter: drop-shadow(0px 0px 0px ${theme.characterAction})
    }
    50% {
        filter: drop-shadow(0px 0px 16px ${theme.characterAction})
    }
    100% {
        filter: drop-shadow(0px 0px 0px ${theme.characterAction})
    }
`;

const CharacterImg = styled.img<Omit<CharacterProps, "characterName">>`
  position: absolute;
  cursor: pointer;
  bottom: ${({ bottom }) => bottom};
  height: ${({ height }) => height};
  left: ${({ left }) => left};
  overflow: hidden;
  transition: ease-in-out 0.3s;
  animation: ${({ onClick, theme }) =>
    onClick && css`${glow(theme)} 4s ${pulseAnimation}}`};
  ${({ isActive, focusedBottom, focusedLeft, focusedHeight }) =>
    isActive &&
    css`
      z-index: 10;
      bottom: ${focusedBottom ?? "120px"};
      left: ${focusedLeft ?? "calc(45vw - 172px)"};
      height: ${focusedHeight ?? "500px"};
    `}
`;
