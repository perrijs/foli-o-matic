import { useEffect } from "react";

import { BUTTONS } from "src/config/buttons";

import { Button, LoaderWrapper, MachineScreen } from "./styles";

const Loader = () => {
  useEffect(() => {
    const buttons = document.querySelectorAll(".loaderButton");

    setInterval(() => {
      highlightButtons(buttons);
    }, 333);
  }, []);

  const highlightButtons = (buttons: NodeListOf<Element>) => {
    if (buttons) {
      const randomEl = Math.floor(Math.random() * buttons.length);

      buttons.forEach((button) => {
        button.classList.remove("active");
      });

      if (buttons[randomEl]) buttons[randomEl].classList.add("active");
    }
  };

  return (
    <LoaderWrapper
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 3, duration: 0.5, ease: "easeOut" }}
    >
      <MachineScreen>
        <span>LOADING...</span>
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
