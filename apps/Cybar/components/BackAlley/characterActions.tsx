export const CharacterActions = {
  SET_ACTIVE: "SET_ACTIVE",
  SET_INACTIVE: "SET_INACTIVE",
} as const;

type ObjectValues<T> = T[keyof T];

export type CharacterAction = ObjectValues<typeof CharacterActions>;
