import { CharacterProps } from ".";

export const charBackAlley2: CharacterProps = {
  name: "Coomer",
  id: "charBackAlley2",
  left: "calc(45vw + 80px)",
  bottom: "120px",
  height: "333px",
  dialogs: [
    {
      id: 0,
      text: "Jooo. he.he. Heey. Do you remember SONIC THE HEDGEHOG?",
      answers: [
        {
          text: "YEAH!",
          nextDialog: 2,
        },
        {
          text: "nah",
          nextDialog: 6,
        },
      ],
    },
    {
      id: 2,
      text: "Oh ha.ha. I R E A L L Y want to B A N G him good.Every day I think about it.",
      nextDialog: 3,
    },
    {
      id: 3,
      text: "I've had surgery to make orgasmsmore powerful but everything I canthink about is SONICs Weiner haha.He likes Chili Dogs you remember lol",
      nextDialog: 4,
    },
    {
      id: 4,
      text: "*He appears to zone out*You back off to not get splurted on through his throbbing ejaculate enhancers.",
      answers: [
        {
          text: "tap him with a stick",
          nextDialog: 5,
        },
      ],
    },
    {
      id: 5,
      text: "Oooo I have to recalibrate those enhancers. Or maybe take less pills he he. Anyways, you want to take a look in that suitcase?",
      answers: [
        {
          text: "Sure!",
        },
        {
          text: "Nah",
          // action: "BACK TO AREA",
        },
      ],
    },

    {
      id: 6,
      text: "Ah. You think you're better than me anyways. Just come back when you had your memory enhanced.",
      nextDialog: 7,
    },
    {
      id: 7,
      text: "Heeeey miner! You look like the person ordering blue pills from spam mails, no offense he he.",
      answers: [
        {
          text: "I tried my luck",
          nextDialog: 8,
        },
        {
          text: "Don't need it yet",
          nextDialog: 9,
        },
      ],
    },
    {
      id: 8,
      text: "Well well well, how about something that really makes you expand... Y O U R  M I N D?",
      answers: [
        {
          text: "Show me",
        },
      ],
    },
    {
      id: 9,
      text: "Oh you think you're better? Wait until YOU get shocked with phosphor rods straight in your groin by BOG strikebreakers!",
    },
  ],
};
