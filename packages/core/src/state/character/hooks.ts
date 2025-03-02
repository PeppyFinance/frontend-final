import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../declaration";
import { setCharaterActive, setCharaterInactive, setDialog } from "./actions";
import { CharacterId, CharacterState } from "./types";

export function useSetCharacterActive() {
  const dispatch = useAppDispatch();

  return useCallback(
    (id: CharacterId) => {
      dispatch(setCharaterActive(id));
    },
    [dispatch],
  );
}

export function useSetCharacterInactive() {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    dispatch(setCharaterInactive());
  }, [dispatch]);
}

export function useSetDialog() {
  const dispatch = useAppDispatch();

  return useCallback(
    (dialogId: number) => {
      dispatch(setDialog(dialogId));
    },
    [dispatch],
  );
}

export function useCharacterState(): CharacterState {
  const state = useAppSelector((state) => state.character);
  console.log({ state });
  return state;
}
