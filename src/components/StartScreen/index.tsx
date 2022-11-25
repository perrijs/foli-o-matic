import { useEffect } from "react";

import { Load } from "@/webgl/load";

import { StartScreenWrapper } from "./styles";

const StartScreen = () => {
  useEffect(() => {
    new Load();
  }, []);

  return <StartScreenWrapper />;
};

export default StartScreen;
