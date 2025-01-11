import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import {
  characterReducer,
  CharacterState,
  DispatchAction,
} from "./characterReducer";

export interface CharacterContextValue {
  characterState: CharacterState;
  characterDispatch: Dispatch<DispatchAction>;
}

// TODO: refactor to remove undefined
const CharacterContext = createContext<CharacterContextValue | undefined>(
  undefined,
);
interface Props {
  children: ReactNode;
}
export const CharacterContextProvider = ({children}: Props) => {
  const [characterState, characterDispatch] = useReducer(characterReducer, {
    dialog: undefined,
    character: undefined,
  });

  const contextValue: CharacterContextValue = {
    characterState,
    characterDispatch,
  };
  return (
    <CharacterContext.Provider value={contextValue}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error(
      "DialogContext must be used within a DialogContextProvider",
    );
  }
  return context;
};
