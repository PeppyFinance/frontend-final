import { CharacterEncoding } from "crypto";
import { DialogActions } from "./dialogActions";

type SetActive = {
  type: typeof DialogActions.SET_ACTIVE;
  characterId: CharacterEncoding;
};

type SetInactive = {
  type: typeof DialogActions.SET_INACTIVE;
};

interface DialogReducer {
  action: SetActive | SetInactive;
  state: object;
}

export const dialogReducer = () => {
  const reducer = ({ action, state }: DialogReducer) => {
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
  return reducer;
};
