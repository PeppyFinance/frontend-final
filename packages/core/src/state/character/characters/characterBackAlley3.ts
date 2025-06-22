import { Character } from "../types";

export const charBackAlley3: Character = {
  name: "discloomer",
  id: "charBackAlley3",
  left: "85%",
  bottom: "0%",
  height: "33.1%",
  mobilePositions: {
    left: "80px",
    bottom: "0px",
    height: "300px",
  },
  dialogs: [
    {
      id: 0,
      text: "hmmm? aaaough....",
      answers: [
        {
          text: "poke him",
          nextDialog: 1,
        },
        {
          text: "wait",
          nextDialog: 4,
        },
      ],
    },
    {
      id: 1,
      text: "oh you are real I thought you were the little pony i was talking in eyesight vr",
      nextDialog: 2,
    },
    {
      id: 2,
      text: "i didn't have much before i started gambling here but at least it was fun it's all over now and i only rot in a man made hell devoured by all those big megacorps",
      nextDialog: 3,
    },
    {
      id: 3,
      text: "maybe you should at least read the disclaimer when you enter the bar basic precautions",
      endsDialog: true,
    },
    {
      id: 4,
      text: "hmmm? aaaough....",
      answers: [
        {
          text: "wait more",
          nextDialog: 5,
        },
      ],
    },
    {
      id: 5,
      text: "*groans* ah i wish I had read that disclaimer",
      // action: "OPEN DISCLAIMER WINDOW",
      answers: [
        {
          text: "wait",
          nextDialog: 6,
        },
      ],
    },
    {
      id: 6,
      text: "i was such a promising kid in a promising future what happened to this world",
      // action: "OPEN DISCLAIMER WINDOW",
      answers: [
        {
          text: "leave",
          // action: characterDis
          endsDialog: true,
        },
      ],
    },
  ],
};
