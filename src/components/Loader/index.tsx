import { useLoading } from "@/contexts/loadingContext";
import { useEffect, useState } from "react";

import { BUTTONS } from "src/config/buttons";

import { Container, LoaderBase, MachineScreen, Button } from "./styles";

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
    <Container
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: { duration: 0.25, ease: "linear" },
      }}
      exit={{
        opacity: 0,
        transition: { delay: 3, duration: 0.5, ease: "linear" },
      }}
    >
      <LoaderBase>
        <MachineScreen>
          {loadBuffer ? <span>ENTER!</span> : <span>LOADING...</span>}
        </MachineScreen>

        {BUTTONS.map((button) => (
          <Button key={button} className="loaderButton">
            {button}
          </Button>
        ))}
      </LoaderBase>
    </Container>
  );
};

export default Loader;
