import { createReducer } from "@reduxjs/toolkit";
import { setCharaterActive, setCharaterInactive, setDialog } from "./actions";
import { Characters } from "./characters";
import { CharacterState } from "./types";

const initialState: CharacterState = {
  character: undefined,
  dialog: undefined,
};

export const characterReducer = createReducer(initialState, (build) =>
  build
    .addCase(setCharaterActive, (state, { payload }) => {
      const character = Characters.find(
        (character) => character.id === payload,
      );
      const dialog = character?.dialogs?.find((dialog) => dialog.id === 0);
      return { ...state, character, dialog };
    })
    .addCase(setCharaterInactive, (state) => {
      return { ...state, character: undefined, dialog: undefined };
    })
    .addCase(setDialog, (state, { payload }) => {
      const { character } = state;
      const dialog = character?.dialogs?.find(
        (dialog) => dialog.id === payload,
      );
      return { ...state, dialog };
    }),
);
