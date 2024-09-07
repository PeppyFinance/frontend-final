import { DefaultContainer } from "components/App/AccountData/MyAccount/styles";
import { Character } from "components/Characters/character";
import { BackAlleyChars } from "components/Characters/characterConfig";
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
      {BackAlleyChars.map((props) => (
        <Character
          key={props.id}
          onClick={onClickCharacter}
          isActive={props.id === characterState.characterId}
          {...props}
        />
      ))}
    </BackAlleyContainer>
  );
};
