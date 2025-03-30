import { Character } from "../types";

export const charBackAlley1: Character = {
  name: "dansel2099",
  id: "charBackAlley1",
  left: "0.1%",
  bottom: "0.79%",
  height: "37.8%",
  mobilePositions: {
    bottom: "0px",
    height: "300px",
    left: "calc(45vw- 120px)",
    focusedBottom: "190px",
    focusedLeft: "calc(45vw- 120px)",
    focusedHeight: "417px",
  },
  dialogs: [
    {
      id: 0,
      text: "Hey buddy, first timer ey. This place is such a rathole. Why I am still here? Debts, bud. Plus Debbie is so hoooot - damn",
      nextDialog: 1,
    },
    {
      id: 1,
      text: "Think about investing first. If you're unsure, better set your brainthoughts broadcast to binance academy first.",
      nextDialog: 2,
    },
    {
      id: 2,
      text: "If all other things fail, there's an Amazon suicide cell behind the next corner! But if you consider that, you can reach over your cybars to me first haha jk",
      endsDialog: true,
    },
  ],
};
