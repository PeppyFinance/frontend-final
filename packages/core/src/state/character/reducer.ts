import { createReducer } from "@reduxjs/toolkit";
import { setCharaterActive } from "./actions";
import { Characters } from "./character";
import { CharacterState } from "./types";

const initialState: CharacterState = {
  character: undefined,
};

export const characterReducer = createReducer(initialState, (build) =>
  build.addCase(setCharaterActive, (characterState, { payload }) => {
    characterState.character = Characters.find(
      (character) => character.id === payload,
    );
    return characterState;
  }),
);
