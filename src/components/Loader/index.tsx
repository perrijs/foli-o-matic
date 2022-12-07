import { useEffect, useRef } from "react";
import gsap from "gsap";

import { LOAD_COMPLETE } from "@/webgl/config/topics";

import { Button, LoaderWrapper, MachineScreen } from "./styles";

const BUTTONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "E"];

const Loader = () => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const buttons = document.querySelectorAll(".loaderButton");

    setInterval(() => {
      highlightButtons(buttons);
    }, 500);

    handleSubscriptions();
  }, []);

  const handleSubscriptions = () => {
    PubSub.subscribe(LOAD_COMPLETE, () => {
      gsap.to(loaderRef.current, {
        delay: 1,
        duration: 1,
        opacity: 0,
      });
    });
  };

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
    <LoaderWrapper ref={loaderRef}>
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
