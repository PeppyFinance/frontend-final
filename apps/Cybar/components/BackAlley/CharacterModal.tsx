import { Modal } from "components/Modal";
import { CharacterId } from "./characterIds.type";

interface CharacterModal {
  character?: CharacterId;
}

export const CharacterModal = ({ character }: CharacterModal) => {
  return (
    <Modal isOpen={!!character}>
      <div> Hello {character}</div>
    </Modal>
  );
};
