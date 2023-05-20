import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { useLoading } from "@/contexts/loadingContext";

import { BUTTONS } from "src/config/buttons";
import { GL_ACTIVATE_SCENE } from "@/webgl/config/topics";

import {
  Container,
  Loader,
  LoaderScreen,
  LoaderButton,
  StartButton,
} from "./styles";

const StartScreen = () => {
  const { loaded } = useLoading();

  const screenRef = useRef<HTMLSpanElement | null>(null);
  const [loadBuffer, setLoadBuffer] = useState<boolean>(false);
  const [timer, setTimer] = useState<ReturnType<typeof setInterval>>();

  useEffect(() => {
    setTimer(setInterval(() => highlightRandom(), 1000));
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
            onClick={() => PubSub.publish(GL_ACTIVATE_SCENE)}
          >
            DIG FOR COINS
          </StartButton>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default StartScreen;
