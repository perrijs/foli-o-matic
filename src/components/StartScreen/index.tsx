import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { useLoading } from "@/contexts/loadingContext";

import { BUTTONS } from "src/config/buttons";
import {
  AUDIO_PLAY_EFFECT,
  AUDIO_PLAY_TRACK,
  GL_ACTIVATE_SCENE,
} from "@/webgl/config/topics";

import {
  Container,
  Loader,
  LoaderScreen,
  LoaderButton,
  StartButton,
  HandWrapper,
  Pocket,
  CoinWrapper,
} from "./styles";
import { AudioEffects, AudioTracks, useAudio } from "@/contexts/audioContext";
import Image from "next/image";

interface Props {
  handleSetIsStarted: (isStarted: boolean) => void;
}

const StartScreen = ({ handleSetIsStarted }: Props) => {
  const { loaded } = useLoading();
  const { initiateAudio } = useAudio();

  const screenRef = useRef<HTMLSpanElement | null>(null);
  const [loadBuffer, setLoadBuffer] = useState<boolean>(false);
  const [timer, setTimer] = useState<ReturnType<typeof setInterval>>();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    setTimer(setInterval(() => highlightRandom(), 333));
  }, []);

  useEffect(() => {
    if (!loaded) return;

    setTimeout(() => {
      setLoadBuffer(true);
      highlightEnter();
    }, 2000);
  }, [loaded]);

  useEffect(() => {
    if (loadBuffer) {
      clearInterval(timer);
    }
  }, [loadBuffer, timer]);

  const highlightRandom = () => {
    const buttons = document.querySelectorAll(".loaderButton");

    if (buttons) {
      const randomEl = Math.floor(Math.random() * buttons.length);

      buttons.forEach((button) => {
        button.classList.remove("active");
      });

      if (buttons[randomEl]) buttons[randomEl].classList.add("active");
    }
  };

  const highlightEnter = () => {
    const buttons = document.querySelectorAll(".loaderButton");

    buttons.forEach((button) => {
      button.classList.remove("active");
    });

    buttons[buttons.length - 1].classList.add("active");

    if (screenRef.current) screenRef.current.innerHTML = "ENTER!";
  };

  return (
    <Container
      initial={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: { duration: 1, ease: "linear" },
      }}
    >
      <AnimatePresence>
        {!loadBuffer ? (
          <Loader
            key="loader"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: { duration: 1, ease: "linear" },
            }}
            exit={{
              opacity: 0,
              transition: { delay: 2, duration: 1, ease: "linear" },
            }}
          >
            <LoaderScreen ref={screenRef}>LOADING...</LoaderScreen>

            {BUTTONS.map((button) => (
              <LoaderButton key={button} className="loaderButton">
                {button}
              </LoaderButton>
            ))}
          </Loader>
        ) : (
          <StartButton
            key="startButton"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: { delay: 3, duration: 1, ease: "linear" },
            }}
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
            onClick={() => {
              setIsClicked(true);

              setTimeout(() => {
                initiateAudio();
                handleSetIsStarted(true);

                PubSub.publish(AUDIO_PLAY_TRACK, AudioTracks.HUM);

                setTimeout(() => {
                  PubSub.publish(GL_ACTIVATE_SCENE);
                  PubSub.publish(AUDIO_PLAY_EFFECT, AudioEffects.CIRCUIT_BREAKER);
                }, 3000);
              }, 1000)
            }}
          >
            <HandWrapper
              initial={{
                rotate: "180deg",
              }}
              animate={{
                y: isClicked ? 0 : isHovered ? 40 : 0,
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
            >
              <Image
                src="/images/icons/hand.svg"
                width="128"
                height="128"
                alt=""
              />
            </HandWrapper>

            <CoinWrapper
              animate={{
                y: isClicked ? 5 : 40,
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
            >
              $
            </CoinWrapper>

            <Pocket />
          </StartButton>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default StartScreen;
