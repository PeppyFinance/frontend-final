import styled, { css, DefaultTheme, keyframes } from "styled-components";
import { CharacterId } from "./characterIds.type";

export interface CharacterProps {
  left: string;
  bottom: string;
  height: string;
  characterId: CharacterId;
  onClick?: (name: CharacterId) => void;
  isActive: boolean;
  focusedBottom?: string;
  focusedLeft?: string;
  focusedHeight?: string;
}

export const Character = ({
  characterId,
  onClick,
  ...props
}: CharacterProps) => {
  return (
    <CharacterImg
      onClick={(e) => {
        e.stopPropagation();
        onClick ? onClick(characterId) : null;
      }}
      src={`/images/characters/${characterId}.webp`}
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

const CharacterImg = styled.img<Omit<CharacterProps, "characterId">>`
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
