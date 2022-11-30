import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

import { Load } from "@/webgl/load";
import { GL_START_VENDING_MACHINE, LOAD_COMPLETE } from "@/webgl/config/topics";

import CoinSlot from "@/components/CoinSlot";

import { CopyContainer, Credit, StartScreenWrapper, Title } from "./styles";

const StartScreen = () => {
  const creditRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const startScreenRef = useRef<HTMLDivElement>(null);

  const handleSubscriptions = useCallback(() => {
    PubSub.subscribe(LOAD_COMPLETE, () => {
      gsap.to(titleRef.current, {
        delay: 1,
        duration: 1,
        opacity: 1,
      });

      gsap.to(creditRef.current, {
        delay: 1,
        duration: 1,
        opacity: 1,
      });
    });

    PubSub.subscribe(GL_START_VENDING_MACHINE, () => removeStartScreen());
  }, []);

  useEffect(() => {
    new Load();

    console.log("running?");

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
      <CopyContainer>
        <Title ref={titleRef}>foli-o-matic!</Title>
        <Credit ref={creditRef}>
          <span>by</span> PERRI SCHOFIELD
        </Credit>
      </CopyContainer>

      <CoinSlot />
    </StartScreenWrapper>
  );
};

export default StartScreen;
