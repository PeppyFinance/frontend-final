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

type SetDialog = {
  type: typeof CharacterActions.SET_DIALOG;
  dialogId: number;
};

export interface CharacterState {
  characterId?: CharacterId;
  name?: string;
  dialog?: Dialog;
}

export type DispatchAction = SetActive | SetInactive | SetDialog;

export const characterReducer = (
  state: CharacterState,
  action: DispatchAction
) => {
  switch (action.type) {
    case "SET_ACTIVE": {
      const character = BackAlleyChars.find(
        (character) => character.id === action.characterId
      );
      return {
        ...state,
        characterId: action.characterId,
        name: character?.name,
        dialog: character?.dialogs.find((dialog) => dialog.id === 0),
      };
    }
    case "SET_INACTIVE": {
      return {
        ...state,
        characterId: undefined,
        dialog: undefined,
      };
    }
    case "SET_DIALOG": {
      return {
        ...state,
        dialog: BackAlleyChars.find(
          (character) => character.id === state.characterId
        )?.dialogs.find((dialog) => dialog.id === action.dialogId),
      };
    }
    default:
      throw new TypeError(`action ${action} is not defined`);
  }
};
