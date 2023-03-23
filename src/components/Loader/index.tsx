import { useLoading } from "@/contexts/loadingContext";
import { useEffect, useState } from "react";

import { BUTTONS } from "src/config/buttons";

import { Button, LoaderWrapper, MachineScreen } from "./styles";

const Loader = () => {
  const { loaded } = useLoading();
  const [loadBuffer, setLoaderBuffer] = useState<boolean>(false);
  const [timer, setTimer] = useState<ReturnType<typeof setInterval>>();

  useEffect(() => {
    setTimer(setInterval(() => highlightRandom(), 500));
  }, []);

  useEffect(() => {
    if (loaded)
      setTimeout(() => {
        setLoaderBuffer(true);
        highlightEnter();
      }, 2000);
  }, [loaded]);

  useEffect(() => {
    if (loadBuffer) clearInterval(timer);
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
  };

  return (
    <LoaderWrapper
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: { duration: 0.35, ease: "easeIn" },
      }}
      exit={{
        opacity: 0,
        transition: { delay: 2, duration: 0.5, ease: "easeOut" },
      }}
    >
      <MachineScreen>
        {loadBuffer ? <span>ENTER!</span> : <span>LOADING...</span>}
      </MachineScreen>

      {BUTTONS.map((button) => (
        <Button key={button} className="loaderButton">
          {button}
        </Button>
      ))}
    </LoaderWrapper>
  );
};

export default Loader;
