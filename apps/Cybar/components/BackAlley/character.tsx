import styled from "styled-components";
import { CharacterName } from "./characterNames.type";

export interface CharacterProps {
  left: string;
  bottom: string;
  height: string;
  characterName: CharacterName;
  onClick: (name: CharacterName) => void;
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

const CharacterImg = styled.img<
  Omit<CharacterProps, "characterName" | "onClick">
>`
  position: absolute;
  bottom: ${({ bottom }) => bottom};
  height: ${({ height }) => height};
  left: ${({ left }) => left};
  overflow: hidden;
  transition: ease-in-out 0.3s;
  ${({ isActive, focusedBottom, focusedLeft, focusedHeight }) =>
    isActive &&
    `
      z-index: 10;
      bottom: ${focusedBottom ?? "120px"};
      left: ${focusedLeft ?? "calc(45vw - 172px)"};
      height: ${focusedHeight ?? "500px"};
    `}
`;
