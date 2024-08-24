import styled from "styled-components";

interface CharacterImageProps {
  left: string;
  bottom: string;
  height: string;
  characterName: string;
  toggleDialog: string;
  focusedBottom?: string;
  focusedLeft?: string;
  focusedHeight?: string;
}

export const Character = ({ characterName, ...props }: CharacterImageProps) => {
  return (
    <CharacterImg src={`/images/characters/${characterName}.wepb`} {...props} />
  );
};

const CharacterImg = styled.img<Omit<CharacterImageProps, "characterName">>`
  position: absolute;
  bottom: ${({ bottom }) => bottom};
  height: ${({ height }) => height};
  left: ${({ left }) => left};
  overflow: hidden;
  transition: ease-in-out 0.3s;
  &-focused {
    z-index: 10;
    position: absolute;
    bottom: ${({ focusedBottom }) => focusedBottom ?? "120px"};
    left: ${({ focusedLeft }) => focusedLeft ?? "calc(45vw - 172px)"};
    height: ${({ focusedHeight }) => focusedHeight ?? "500px"};
    transition: ease-in-out 0.3s;
  }
`;

const CharacterName = {
  charBackAlley1,
} as const;
