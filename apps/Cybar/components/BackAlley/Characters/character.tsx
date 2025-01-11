import {useCallback} from "react";
import styled, {css, DefaultTheme, keyframes} from "styled-components";
import {Z_INDEX} from "theme";
import {CharacterProps} from "./characterConfig";
import {CharacterId} from "./characterIds.type";

export interface CharacterInteractiveProps extends CharacterProps {
  onClick?: (name: CharacterId) => void;
  isActive: boolean;
}

export const Character = ({
  id: characterId,
  onClick,
  ...props
}: CharacterInteractiveProps) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(characterId);
    }
  }, [onClick, characterId]);
  return (
    <CharacterImg
      onClick={onClick ? handleClick : undefined}
      src={`/images/characters/${characterId}.webp`}
      {...props}
    />
  );
};

export const pulseAnimation = "ease-in-out infinite";

export const glow = (theme: DefaultTheme) => keyframes`
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
  cursor: ${({onClick}) => (onClick ? "pointer" : "default")};
  bottom: ${({bottom}) => bottom};
  height: ${({height}) => height};
  left: ${({left}) => left};
  z-index: ${({zIndex}) => (zIndex ? zIndex : "0")};
  overflow: hidden;
  transition: ease-in-out 0.3s;
  animation: ${({onClick, theme}) =>
    onClick && css`${glow(theme)} 4s ${pulseAnimation}}`};
  ${({isActive, focusedBottom, focusedLeft, focusedHeight}) =>
    isActive &&
    css`
      z-index: ${Z_INDEX.modalBackdrop - 1};
      bottom: ${focusedBottom ?? "120px"};
      left: ${focusedLeft ?? "calc(45vw - 172px)"};
      height: ${focusedHeight ?? "500px"};
    `}
`;
