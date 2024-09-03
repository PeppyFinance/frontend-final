import { CharacterId } from "components/Characters/characterIds.type";
import { createContext, ReactNode, useContext } from "react";

const DialogContext = createContext<CharacterId | undefined>(undefined);

interface Props {
  children: ReactNode;
}
export const DialogContextProvider = ({ children }: Props) => {
  return (
    <DialogContext.Provider value="charBackAlley1">
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error(
      "DialogContext must be used within a DialogContextProvider"
    );
  }
  return context;
};
