import { DefaultContainer } from "components/App/AccountData/MyAccount/styles";
import styled from "styled-components";
import { Character, CharacterProps } from "./character";
import { CharacterName } from "./characterNames.type";
import { useState } from "react";

const BackAlleyContainer = styled(DefaultContainer)`
  position: relative;
  bottom: auto;
  background-image: url("/images/backgrounds/backalley.wepb");
  background-size: cover;
  min-height: calc(100vh - 60px);
  background-position: center bottom;
  border: none;
`;

const BackAlleyCharacters = ({
  onClick,
  activeCharacter,
}: {
  onClick: CharacterProps["onClick"];
  activeCharacter: CharacterName | undefined;
}): CharacterProps[] => [
  {
    characterName: "charBackAlley1",
    left: "calc(45vw - 370px)",
    bottom: "120px",
    height: "240px",
    onClick,
    isActive: activeCharacter === "charBackAlley1",
  },
  {
    characterName: "charBackAlley2",
    left: "calc(45vw + 80px)",
    bottom: "120px",
    height: "333px",
    onClick,
    isActive: activeCharacter === "charBackAlley2",
  },
  {
    characterName: "charBackAlley3",
    left: "calc(45vw + 400px)",
    bottom: "80px",
    height: "210px",
    onClick,
    isActive: activeCharacter === "charBackAlley3",
  },
];

export const BackAlley = () => {
  const [activeCharacter, setActiveCharacter] = useState<
    CharacterName | undefined
  >(undefined);

  const onClickCharacter = (name: CharacterName) =>
    name === activeCharacter
      ? setActiveCharacter(undefined)
      : setActiveCharacter(name);

  return (
    <BackAlleyContainer>
      {BackAlleyCharacters({
        onClick: onClickCharacter,
        activeCharacter,
      }).map((props) => (
        <Character key={props.characterName} {...props} />
      ))}
    </BackAlleyContainer>
  );
};
