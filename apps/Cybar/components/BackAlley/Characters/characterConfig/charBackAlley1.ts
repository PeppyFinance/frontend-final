import { CharacterProps } from ".";

export const charBackAlley1: CharacterProps = {
  name: "dansel2099",
  id: "charBackAlley1",
  left: "calc(45vw - 370px)",
  bottom: "120px",
  height: "240px",
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
      text: "If all other things fail, there's an Amazon suicide cell behind the next corner!But if you consider that, you can reach over your cybars to me first haha jk",
      endsDialog: true,
    },
  ],
};
