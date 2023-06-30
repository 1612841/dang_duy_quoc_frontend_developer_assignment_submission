import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Data } from "../../types/axios.type";

type TContext = {  
  contextSearchData: Data[],
  contextData: Data[];
  setContext: (value: Data[], type: 'search' | 'normal') => void;
};

const HomeContext = createContext<TContext>({
  contextSearchData: [],
  contextData: [],
  setContext: () => {},
});

export const HomeProvider = ({ children }: PropsWithChildren) => {
  const [contextData, setContextData] = useState<Data[]>([]);
  const [contextSearchData, setSearchData] = useState<Data[]>([])

  const setContext = (value: Data[], type: 'search' | 'normal') => {
    if (type === "search") return setSearchData(value)
    setContextData(value)
  }
  return (
    <HomeContext.Provider value={{contextSearchData, contextData, setContext }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);
