import { CSSProperties } from "react";

export type CharacterState = {
  character?: Character;
  dialog?: Dialog;
};

type DialogContent = {
  text: string;
  nextDialog?: number;
  endsDialog?: boolean;
  // FIX: add redux action
  // action?: CharacterContextValue["characterDispatch"];
};

type Dialog = {
  id: number;
  answers?: DialogContent[];
} & DialogContent;

type CharacterPositions = {
  left: CSSProperties["left"];
  bottom: CSSProperties["left"];
  height: CSSProperties["bottom"];
  zIndex?: CSSProperties["zIndex"];
  focusedBottom?: CSSProperties["bottom"];
  focusedLeft?: CSSProperties["left"];
  focusedHeight?: CSSProperties["height"];
};

export type Character = {
  id: CharacterId;
  name: string;
  mobilePositions?: CharacterPositions;
  dialogs?: Dialog[];
} & CharacterPositions;

export const CharacterId = {
  charBackAlley1: "charBackAlley1",
  charBackAlley2: "charBackAlley2",
  charBackAlley3: "charBackAlley3",
  bouncer1: "bouncer1",
  bouncer2: "bouncer2",
  visitor1: "visitor1",
  visitor2: "visitor2",
  visitor3: "visitor3",
  visitor4: "visitor4",
  visitor5: "visitor5",
  visitor6: "visitor6",
  visitor7: "visitor7",
} as const;

type ObjectValues<T> = T[keyof T];

export type CharacterId = ObjectValues<typeof CharacterId>;
