import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";

import Loader from "@/components/Loader";
import CoinSlot from "@/components/CoinSlot";

import { Load } from "@/webgl/load";
import {
  GL_START_VENDING_MACHINE,
  GL_ZOOM_VENDING_MACHINE,
  LOAD_COMPLETE,
} from "@/webgl/config/topics";

import { CopyContainer, Credit, StartScreenWrapper, Title } from "./styles";

const StartScreen = () => {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  const creditRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const startScreenRef = useRef<HTMLDivElement>(null);

  const handleSubscriptions = useCallback(() => {
    PubSub.subscribe(LOAD_COMPLETE, () => {
      setTimeout(() => {
        setHasLoaded(true);
      }, 2000);
    });
    PubSub.subscribe(GL_START_VENDING_MACHINE, () => removeStartScreen());
  }, []);

  useEffect(() => {
    new Load();

    handleSubscriptions();
  }, [handleSubscriptions]);

  useEffect(() => {
    if (!hasLoaded) return;

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
  }, [hasLoaded]);

  const removeStartScreen = () => {
    gsap.to(startScreenRef.current, {
      duration: 1,
      opacity: 0,
      onComplete: () => {
        if (!startScreenRef.current) return;

        PubSub.publish(GL_ZOOM_VENDING_MACHINE);

        startScreenRef.current.style.display = "none";
      },
    });
  };

  return (
    <StartScreenWrapper ref={startScreenRef}>
      {hasLoaded ? (
        <>
          <CopyContainer>
            <Title ref={titleRef}>foli-o-matic!</Title>
            <Credit ref={creditRef}>
              <span>by</span> PERRI SCHOFIELD
            </Credit>
          </CopyContainer>
        </>
      ) : (
        <Loader />
      )}

      <CoinSlot />
    </StartScreenWrapper>
  );
};

export default StartScreen;
