import styled from "styled-components";

const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  height: 52px;
  width: 100%;
  box-shadow:
    0px 1px 11px 0px #c6f0ee,
    0px 11px 12px 0px rgba(107, 219, 214, 0.9);
  background-color: rgba(17, 18, 18, 0.95);
  overflow: visible;
  border-radius: 4px 18px 0px 0px;
  border: 3px solid rgba(130, 237, 232, 0.91);
  padding-left: 48px;
  padding-right: 48px;
`;

const ModalHeaderText = styled.div`
  width: auto;
  height: auto;
  white-space: pre;
  font-weight: 400;
  font-style: normal;
  font-family: "Share Tech", serif;
  color: #ffffff;
  font-size: 30px;
  letter-spacing: 2.6px;
  line-height: 1.1;
  text-align: left;
`;

const ModalCloseButton = styled.div`
  margin-left: auto;
  color: rgba(130, 237, 232, 0.91);
  font-size: 1.5rem;
  cursor: pointer;
  width: 2rem;
  display: flex;
  justify-content: center;
  transition: transform ease-in-out 0.15s;

  &:hover {
    transform: scale(1.1);
  }
`;

interface Props {
  characterName: string;
  onClose: () => void;
}

export const Header = ({ characterName, onClose }: Props) => {
  return (
    <ModalHeader>
      <ModalHeaderText>{characterName}</ModalHeaderText>
      <ModalCloseButton onClick={() => onClose()}>X</ModalCloseButton>
    </ModalHeader>
  );
};
