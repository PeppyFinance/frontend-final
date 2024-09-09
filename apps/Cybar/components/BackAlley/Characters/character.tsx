import styled, { css, DefaultTheme, keyframes } from "styled-components";
import { CharacterId } from "./characterIds.type";
import { CharacterProps } from "./characterConfig";
import { Z_INDEX } from "theme";

export interface CharacterInteractiveProps extends CharacterProps {
  onClick?: (name: CharacterId) => void;
  isActive: boolean;
}

export const Character = ({
  id: characterId,
  onClick,
  ...props
}: CharacterInteractiveProps) => {
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

const CharacterImg = styled.img<Omit<CharacterInteractiveProps, "id">>`
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
      z-index: ${Z_INDEX.modalBackdrop - 1};
      bottom: ${focusedBottom ?? "120px"};
      left: ${focusedLeft ?? "calc(45vw - 172px)"};
      height: ${focusedHeight ?? "500px"};
    `}
`;
