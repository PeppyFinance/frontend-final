import { DefaultContainer } from "components/App/AccountData/MyAccount/styles";
import styled from "styled-components";

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
  return (
    <BackAlleyContainer>
      <div>TODO</div>
    </BackAlleyContainer>
  );
};
