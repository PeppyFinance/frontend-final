import { ClubEntranceChars } from "@symmio/frontend-sdk/state/character/characters";
import { DefaultContainer } from "components/App/AccountData/MyAccount/styles";
import { Character } from "components/Characters/character";
import styled from "styled-components";
import { NavigationArrow } from "./Arrow";

const ClubEntranceContainer = styled(DefaultContainer)`
  position: relative;
  bottom: auto;
  background-image: url("/images/backgrounds/clubentrance.webp");
  background-size: cover;
  min-height: calc(100vh - 60px);
  background-position: center bottom;
  border: none;
`;

export const ClubEntrance = () => {
  return (
    <ClubEntranceContainer>
      {ClubEntranceChars.map((props) => (
        <Character key={props.id} {...props} isActive={false} />
      ))}
      <NavigationArrow href="/" display />
    </ClubEntranceContainer>
  );
};
