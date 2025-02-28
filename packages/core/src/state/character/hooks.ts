import { useCallback } from "react";
import { useAppDispatch } from "../declaration";
import { setCharaterActive } from "./actions";
import { CharacterId } from "./types";

export function useSetCharacter() {
  const dispatch = useAppDispatch();

  return useCallback(
    (id: CharacterId) => {
      dispatch(setCharaterActive(id));
    },
    [dispatch],
  );
}
