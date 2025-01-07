import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useContext } from "react";

// Define the context value type
interface IdeaContextType {
  text: string | undefined; // Adjust based on your actual use case
  setText: Dispatch<SetStateAction<string | undefined>>;
}

// Create the context with a default value of `null`
const IdeaContext = createContext<IdeaContextType | null>(null);

// Define the props for the provider
interface IdeaProviderProps {
  children: ReactNode;
}

export const IdeaProvider: React.FC<IdeaProviderProps> = ({ children }) => {
  const [text, setText] = useState<string | undefined>(undefined);

  return (
    <IdeaContext.Provider
      value={{
        text,
        setText,
      }}
    >
      {children}
    </IdeaContext.Provider>
  );
};


export const useIdea = () => {
    const context = useContext(IdeaContext);
    if (!context) {
      throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
  };





  
export default IdeaContext;
