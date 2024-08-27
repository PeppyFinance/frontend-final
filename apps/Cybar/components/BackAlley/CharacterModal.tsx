import { Modal } from "components/Modal";
import { DialogButton, DialogButtonText } from "./characterButton";
import { CharacterId } from "./characterIds.type";

interface CharacterModal {
  character?: CharacterId;
}

export const CharacterModal = ({ character }: CharacterModal) => {
  return (
    <Modal isOpen={!!character}>
      <div> Hello {character}</div>
      <DialogButton>
        <DialogButtonText>{character}</DialogButtonText>
      </DialogButton>
    </Modal>
  );
};
