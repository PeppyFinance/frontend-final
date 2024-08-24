import { DefaultContainer } from "components/App/AccountData/MyAccount/styles";
import styled from "styled-components";

const Container = styled(DefaultContainer)`
  display: block;
  bottom: auto;
  background-image: url("/images/backgrounds/backalley.wepb");
  background-size: cover;
  height: 500px;
  background-position: center bottom;
`;

export default function Trade() {
  return <Container />;
}
