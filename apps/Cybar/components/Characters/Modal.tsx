import { useCharacterContext } from "components/BackAlley/characterContext";
import { Modal as BaseModal } from "components/Modal";
import styled, { keyframes } from "styled-components";
import { DialogButton, DialogButtonText } from "./DialogButton";
import { Header } from "./Header";

const growAnimation = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const Modal = styled(BaseModal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 80%;
  position: fixed;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 1px 8px 1px rgba(145, 237, 233, 0.9);
  border-radius: 4px 18px 18px 18px;

  @media screen and (min-width: 600px) {
    height: 241px;
    width: 700px;
    top: 70%;
  }

  @media screen and (min-width: 990px) {
    top: 80%;
  }
`;

const ModalBody = styled.div`
  height: auto;
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(90, 73, 89, 0.71) 0%,
    var(--token-f561eca8-ae2a-43a4-97d4-884eb9fc7492, rgb(100, 144, 142)) 100%
  );
  overflow: visible;
  border-radius: 0px 0px 18px 18px;
  padding: 24px 16px 16px 16px;

  @media screen and (min-width: 600px) {
    padding: 48px 48px 24px 48px;
  }
`;

const ModalBodyText = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  font-weight: 400;
  font-style: normal;
  font-family: "Share Tech", serif;
  color: #ffffff;
  font-size: 16px;
  letter-spacing: 1.4px;
  line-height: 1.4;
  text-align: left;
  margin-bottom: 24px;
  animation-duration: 0.75s;
  animation-name: ${growAnimation};

  @media screen and (min-width: 600px) {
    width: auto;
    color: #ffffff;
    font-size: 20px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 12px;
  animation-duration: 0.75s;
  animation-name: ${growAnimation};
`;

export const CharacterModal = () => {
  const { characterState, characterDispatch } = useCharacterContext();
  const onClose = () => {
    characterDispatch({ type: "SET_INACTIVE" });
  };
  return (
    <Modal isOpen={!!characterState.characterId}>
      <Header characterName="Cybar Peep" onClose={onClose} />
      <ModalBody>
        <ModalBodyText>Hllo Cybar Degens</ModalBodyText>
        <ButtonWrapper>
          <DialogButton>
            <DialogButtonText>{characterState.characterId}</DialogButtonText>
          </DialogButton>
          <DialogButton>
            <DialogButtonText>{characterState.characterId}</DialogButtonText>
          </DialogButton>
        </ButtonWrapper>
      </ModalBody>
    </Modal>
  );
};
export { ButtonWrapper, Modal, ModalBody, ModalBodyText };