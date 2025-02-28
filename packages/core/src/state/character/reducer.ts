import { createReducer } from "@reduxjs/toolkit";
import { CharacterState } from "./types";
import { setCharaterActive } from "./actions";
import { Characters } from "./character";



const initialState: CharacterState = {
  character: undefined
}

export const characterReducer = createReducer(initialState, (build) =>
  build
    .addCase(setCharaterActive, (characterState, { payload }) => {
      characterState.character = Characters.find(character => character.id === payload);
      return characterState;
    })
)

