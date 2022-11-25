import { useEffect, useState } from "react";

import { Load } from "@/webgl/load";

import { LOAD_COMPLETE } from "@/webgl/config/topics";

import { StartScreenWrapper } from "./styles";

const StartScreen = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  useEffect(() => {
    new Load();

    PubSub.subscribe(LOAD_COMPLETE, () => setIsLoaded(false));
  }, []);

  return (
    <StartScreenWrapper>
      {isLoaded && <p>LOADING</p>} {!isLoaded && <p>LOADED</p>}
    </StartScreenWrapper>
  );
};

export default StartScreen;
