import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

import { Load } from "@/webgl/load";
import { GL_START_VENDING_MACHINE } from "@/webgl/config/topics";

import CoinSlot from "@/components/CoinSlot";

import { StartScreenWrapper } from "./styles";

const StartScreen = () => {
  const startScreenRef = useRef<HTMLDivElement>(null);

  const handleSubscriptions = useCallback(() => {
    PubSub.subscribe(GL_START_VENDING_MACHINE, () => removeStartScreen());
  }, []);

  useEffect(() => {
    new Load();

    handleSubscriptions();
  }, [handleSubscriptions]);

  const removeStartScreen = () => {
    gsap.to(startScreenRef.current, {
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
      <CoinSlot />
    </StartScreenWrapper>
  );
};

export default StartScreen;
