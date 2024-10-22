import { DefaultContainer } from "components/App/AccountData/MyAccount/styles";
import styled from "styled-components";
import { ClubEntranceChars } from "./Characters";
import { Character } from "components/BackAlley/Characters/character";
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
