import styled from "styled-components";

const Wrapper = styled.div`
  color: #000000;
  padding: 10px 10px;
  text-align: center;
  background-color: #f66;
  font-weight: 600;
  width: 100%;
  z-index: 1020;
`;

export default function Warning({ message }: { message: string }) {
  return <Wrapper>{message}</Wrapper>;
}
