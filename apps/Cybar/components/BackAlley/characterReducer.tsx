import { CharacterId } from "components/Characters/characterIds.type";
import { CharacterActions } from "./characterActions";

type SetActive = {
  type: typeof CharacterActions.SET_ACTIVE;
  characterId: CharacterId;
};

type SetInactive = {
  type: typeof CharacterActions.SET_INACTIVE;
};

export interface CharacterState {
  characterId?: CharacterId;
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
      };
    }
    case "SET_INACTIVE": {
      return {
        ...state,
        characterId: undefined,
      };
    }
    default:
      throw new TypeError(`action ${action} is not defined`);
  }
};
