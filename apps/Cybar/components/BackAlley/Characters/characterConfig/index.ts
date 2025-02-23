import { CharacterContextValue } from "components/BackAlley/characterContext";
import { CSSProperties } from "react";
import { CharacterId } from "../characterIds.type";
import { charBackAlley1 } from "./charBackAlley1";
import { charBackAlley2 } from "./charBackAlley2";
import { charBackAlley3 } from "./charBackAlley3";

interface DialogContent {
  text: string;
  nextDialog?: number;
  endsDialog?: boolean;
  action?: CharacterContextValue["characterDispatch"];
}

export interface Dialog extends DialogContent {
  id: number;
  answers?: DialogContent[];
}

interface CharacterPositions {
  left: CSSProperties["left"];
  bottom: CSSProperties["left"];
  height: CSSProperties["bottom"];
  zIndex?: CSSProperties["zIndex"];
  focusedBottom?: CSSProperties["bottom"];
  focusedLeft?: CSSProperties["left"];
  focusedHeight?: CSSProperties["height"];
}
export interface CharacterProps extends CharacterPositions {
  id: CharacterId;
  name: string;
  mobilePositions?: CharacterPositions;
  dialogs?: Dialog[];
}

export const BackAlleyChars = [charBackAlley1, charBackAlley2, charBackAlley3];
