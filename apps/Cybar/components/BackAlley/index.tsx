import { DefaultContainer } from "components/App/AccountData/MyAccount/styles";
import styled from "styled-components";
import { useState } from "react";
import { Character, CharacterProps } from "components/Characters/character";
import { CharacterId } from "components/Characters/characterIds.type";
import { CharacterModal } from "components/Characters/Modal";
import { DialogContextProvider } from "./dialogContext";

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
  const [activeCharacter, setActiveCharacter] = useState<
    CharacterId | undefined
  >(undefined);

  const onClickCharacter = (id: CharacterId) =>
    id === activeCharacter
      ? setActiveCharacter(undefined)
      : setActiveCharacter(id);

  return (
    <DialogContextProvider>
      <BackAlleyContainer
        onClick={() => {
          if (activeCharacter) {
            setActiveCharacter(undefined);
          }
        }}
      >
        <CharacterModal character={activeCharacter} />
        {BackAlleyCharacters({
          onClick: onClickCharacter,
          activeCharacter,
        }).map((props) => (
          <Character key={props.id} {...props} />
        ))}
      </BackAlleyContainer>
    </DialogContextProvider>
  );
};
