import { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";

import { Load } from "@/webgl/load";
import { GL_START_VENDING_MACHINE, LOAD_COMPLETE } from "@/webgl/config/topics";

import CoinSlot from "@/components/CoinSlot";

import { StartScreenWrapper } from "./styles";

const StartScreen = () => {
  const startScreenRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  const handleSubscriptions = useCallback(() => {
    PubSub.subscribe(LOAD_COMPLETE, () => setIsLoaded(false));
    PubSub.subscribe(GL_START_VENDING_MACHINE, () => removeStartScreen());
  }, []);

  useEffect(() => {
    new Load();

    handleSubscriptions();
  }, [handleSubscriptions]);

  const removeStartScreen = () => {
    gsap.to(startScreenRef.current, {
      delay: 1,
      duration: 1,
      opacity: 0,
      onComplete: () => {
        if (!startScreenRef.current) return;

        startScreenRef.current.style.display = "none";
      },
    });
  };

  return (
    <StartScreenWrapper ref={startScreenRef}>
      {isLoaded && <p>LOADING</p>} {!isLoaded && <p>LOADED</p>}
      <CoinSlot />
    </StartScreenWrapper>
  );
};

export default StartScreen;
