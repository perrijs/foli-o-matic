import React, { useEffect, useState } from "react";

import { LOAD_COMPLETE } from "@/webgl/config/topics";

interface ContextProps {
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
}

interface ProviderProps {
  children?: React.ReactNode;
}

const LoadingContext = React.createContext<ContextProps>({} as ContextProps);

const LoadingProvider = ({ children }: ProviderProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    PubSub.subscribe(LOAD_COMPLETE, () => setLoaded(true));
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        loaded,
        setLoaded,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

const useLoading = () => React.useContext(LoadingContext);

export { LoadingProvider, useLoading };
