import { CharacterActions } from "./characterActions";
import {
  BackAlleyChars,
  CharacterProps,
  Dialog,
} from "./Characters/characterConfig";
import { CharacterId } from "./Characters/characterIds.type";

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
  character?: CharacterProps;
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
        character,
        dialog: character?.dialogs.find((dialog) => dialog.id === 0),
      };
    }
    case "SET_INACTIVE": {
      return {
        ...state,
        character: undefined,
        dialog: undefined,
      };
    }
    case "SET_DIALOG": {
      return {
        ...state,
        dialog: state.character?.dialogs.find(
          (dialog) => dialog.id === action.dialogId
        ),
      };
    }
    default:
      throw new TypeError(`action ${action} is not defined`);
  }
};
