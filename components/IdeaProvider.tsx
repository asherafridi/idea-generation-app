import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

// Define the shape of an Idea (replace with your actual structure)
interface Idea {
  idea_id: number; // Example field, adjust as per your use case
  title: string;
  idea: string;
}

// Define the context value type
interface IdeaContextType {
  text: string | undefined;
  setText: Dispatch<SetStateAction<string | undefined>>;
  ideas: Idea[]; // Array of ideas
  setIdeas: Dispatch<SetStateAction<Idea[]>>;
  selectedIdeas: Idea[]; // Selected ideas
  setSelectedIdeas: Dispatch<SetStateAction<Idea[]>>;
}

// Create the context with a default value of `null`
const IdeaContext = createContext<IdeaContextType | null>(null);

// Define the props for the provider
interface IdeaProviderProps {
  children: ReactNode;
}

export const IdeaProvider: React.FC<IdeaProviderProps> = ({ children }) => {
  const [text, setText] = useState<string | undefined>(undefined);
  const [ideas, setIdeas] = useState<Idea[]>([]); // Default empty array
  const [selectedIdeas, setSelectedIdeas] = useState<Idea[]>([]);

  return (
    <IdeaContext.Provider
      value={{
        text,
        setText,
        ideas,
        setIdeas,
        selectedIdeas,
        setSelectedIdeas,
      }}
    >
      {children}
    </IdeaContext.Provider>
  );
};

// Custom hook to use the context
export const useIdea = (): IdeaContextType => {
  const context = useContext(IdeaContext);
  if (!context) {
    throw new Error("useIdea must be used within an IdeaProvider");
  }
  return context;
};

export default IdeaContext;
