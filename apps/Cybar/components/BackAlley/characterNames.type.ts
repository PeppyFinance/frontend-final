export const CharacterName = {
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

export type CharacterName = ObjectValues<typeof CharacterName>;
