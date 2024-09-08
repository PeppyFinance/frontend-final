import { CharacterId } from "components/Characters/characterIds.type";
import { CharacterActions } from "./characterActions";
import { BackAlleyChars, Dialog } from "components/Characters/characterConfig";

type SetActive = {
  type: typeof CharacterActions.SET_ACTIVE;
  characterId: CharacterId;
};

type SetInactive = {
  type: typeof CharacterActions.SET_INACTIVE;
};

export interface CharacterState {
  characterId?: CharacterId;
  dialog?: Dialog;
}

export type DispatchAction = SetActive | SetInactive;

export const characterReducer = (
  state: CharacterState,
  action: DispatchAction
) => {
  switch (action.type) {
    case "SET_ACTIVE": {
      return {
        ...state,
        characterId: action.characterId,
        dialog: BackAlleyChars.find(
          (character) => character.id === action.characterId
        )?.dialogs.find((dialog) => dialog.id === 0),
      };
    }
    case "SET_INACTIVE": {
      return {
        ...state,
        characterId: undefined,
        dialog: undefined,
      };
    }
    default:
      throw new TypeError(`action ${action} is not defined`);
  }
};
