import { DefaultContainer } from "components/App/AccountData/MyAccount/styles";
import { Character, CharacterProps } from "components/Characters/character";
import { CharacterId } from "components/Characters/characterIds.type";
import { CharacterModal } from "components/Characters/Modal";
import styled from "styled-components";
import { useCharacterContext } from "./characterContext";

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
  activeCharacter: CharacterId | undefined;
}): CharacterProps[] => [
  {
    name: "dansel2099",
    id: "charBackAlley1",
    left: "calc(45vw - 370px)",
    bottom: "120px",
    height: "240px",
    onClick,
    isActive: activeCharacter === "charBackAlley1",
  },
  {
    name: "Coomer",
    id: "charBackAlley2",
    left: "calc(45vw + 80px)",
    bottom: "120px",
    height: "333px",
    onClick,
    isActive: activeCharacter === "charBackAlley2",
  },
  {
    name: "discloomer",
    id: "charBackAlley3",
    left: "calc(45vw + 400px)",
    bottom: "80px",
    height: "210px",
    onClick,
    isActive: activeCharacter === "charBackAlley3",
  },
];

export const BackAlley = () => {
  const { characterState, characterDispatch } = useCharacterContext();
  const onClickCharacter = (characterId: CharacterId) => {
    characterDispatch({
      type: "SET_ACTIVE",
      characterId,
    });
  };

  return (
    <BackAlleyContainer>
      <CharacterModal />
      {BackAlleyCharacters({
        onClick: onClickCharacter,
        activeCharacter: characterState.characterId,
      }).map((props) => (
        <Character key={props.id} {...props} />
      ))}
    </BackAlleyContainer>
  );
};
