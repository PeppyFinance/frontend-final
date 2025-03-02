import { useCallback } from "react";
import { useAppDispatch } from "../declaration";
import { setCharaterActive, setCharaterInactive } from "./actions";
import { CharacterId } from "./types";

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
