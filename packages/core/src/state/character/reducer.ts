import { createReducer } from "@reduxjs/toolkit";
import { setCharaterActive, setCharaterInactive } from "./actions";
import { Characters } from "./character";
import { CharacterState } from "./types";

const initialState: CharacterState = {
  character: undefined,
};

export const characterReducer = createReducer(initialState, (build) =>
  build
    .addCase(setCharaterActive, (state, { payload }) => {
      state.character = Characters.find(
        (character) => character.id === payload,
      );
      return state;
    })
    .addCase(setCharaterInactive, (state) => {
      state.character = undefined;
      return state;
    }),
);
