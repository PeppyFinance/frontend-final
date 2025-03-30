export { charBackAlley1 } from "./characterBackAlley1";
export { charBackAlley2 } from "./characterBackAlley2";
export { charBackAlley3 } from "./characterBackAlley3";
import { bouncer1 } from "./bouncer1";
import { bouncer2 } from "./bouncer2";
import { visitor1 } from "./visitor1";
import { visitor2 } from "./visitor2";
import { visitor3 } from "./visitor3";
import { visitor4 } from "./visitor4";
import { visitor5 } from "./visitor5";
import { visitor6 } from "./visitor6";
import { visitor7 } from "./visitor7";

import { charBackAlley1 } from "./characterBackAlley1";
import { charBackAlley2 } from "./characterBackAlley2";
import { charBackAlley3 } from "./characterBackAlley3";

export const BackAlleyCharacters = [charBackAlley1, charBackAlley2, charBackAlley3];

export const ClubEntranceCharacters = [
  bouncer1,
  bouncer2,
  visitor1,
  visitor2,
  visitor3,
  visitor4,
  visitor5,
  visitor6,
  visitor7,
];

export const Characters = [...BackAlleyCharacters, ...ClubEntranceCharacters]
