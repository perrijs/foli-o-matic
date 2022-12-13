import React, { useState } from "react";

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
