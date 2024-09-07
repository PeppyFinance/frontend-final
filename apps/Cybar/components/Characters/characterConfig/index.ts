import { CharacterId } from "../characterIds.type";
import { charBackAlley1 } from "./charBackAlley1";
import { charBackAlley2 } from "./charBackAlley2";
import { charBackAlley3 } from "./charBackAlley3";

export interface CharacterProps {
  id: CharacterId;
  name: string;
  left: string;
  bottom: string;
  height: string;
  focusedBottom?: string;
  focusedLeft?: string;
  focusedHeight?: string;
}

export const BackAlleyChars = [charBackAlley1, charBackAlley2, charBackAlley3];
