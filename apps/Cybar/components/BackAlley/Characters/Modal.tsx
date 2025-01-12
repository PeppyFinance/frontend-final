import { useCharacterContext } from "components/BackAlley/characterContext";
import styled, { keyframes } from "styled-components";
import { Z_INDEX } from "theme";
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

const DialogWindow = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  z-index: ${Z_INDEX.modalBackdrop};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

// TODO: use theme breakpoints in media queries
const Modal = styled.div`
  position: relative;
  z-index: ${Z_INDEX.modal};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 1px 8px 1px rgba(145, 237, 233, 0.9);
  border-radius: 4px 18px 18px 18px;

  @media screen and (min-width: 720px) {
    height: 241px;
    width: 700px;
    top: 60%;
  }

  @media screen and (min-width: 960px) {
    top: 70%;
  }
`;

const ModalBody = styled.div<{ isClickable: boolean }>`
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
  cursor: ${(props) => (props.isClickable ? "pointer" : "default")};

  @media screen and (min-width: 720px) {
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

  @media screen and (min-width: 720px) {
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

  const onAnswer = (dialogId: number | undefined) => {
    if (dialogId) {
      characterDispatch({
        type: "SET_DIALOG",
        dialogId,
      });
    }
  };

  const onNextDialog = () => {
    if (characterState.dialog?.nextDialog) {
      characterDispatch({
        type: "SET_DIALOG",
        dialogId: characterState.dialog.nextDialog,
      });
    } else {
      if (
        characterState.dialog?.answers &&
        characterState.dialog.answers.length > 0
      ) {
        console.log("handle by answers");
        return null;
      }
      console.log("No next dialog, closing...");
      onClose();
    }
  };
  if (!characterState.character) return null;

  return (
    <DialogWindow>
      <Modal>
        <Header
          characterName={characterState.character.name}
          onClose={onClose}
        />
        {characterState.dialog && (
          <ModalBody
            onClick={() => onNextDialog()}
            isClickable={
              !(
                characterState.dialog?.answers &&
                characterState.dialog.answers.length > 0
              )
            }
          >
            <ModalBodyText>{characterState.dialog.text}</ModalBodyText>
            <ButtonWrapper>
              <>
                {characterState.dialog.answers?.map((answer) => (
                  <DialogButton
                    key={answer.text}
                    onClick={() => onAnswer(answer.nextDialog)}
                  >
                    <DialogButtonText>{answer.text}</DialogButtonText>
                  </DialogButton>
                ))}
              </>
            </ButtonWrapper>
          </ModalBody>
        )}
      </Modal>
    </DialogWindow>
  );
};
