import { CharacterContextValue } from "components/BackAlley/characterContext";
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
export interface CharacterProps {
  id: CharacterId;
  name: string;
  left: string;
  bottom: string;
  height: string;
  zIndex?: string;
  focusedBottom?: string;
  focusedLeft?: string;
  focusedHeight?: string;
  dialogs?: Dialog[];
}

export const BackAlleyChars = [charBackAlley1, charBackAlley2, charBackAlley3];
