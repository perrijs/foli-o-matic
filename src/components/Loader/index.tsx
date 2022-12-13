import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";

import { useLoading } from "@/contexts/loadingContext";
import { LOAD_COMPLETE } from "@/webgl/config/topics";

import { Button, LoaderWrapper, MachineScreen } from "./styles";

const BUTTONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "E"];

const Loader = () => {
  const { setLoaded } = useLoading();

  const loaderRef = useRef<HTMLDivElement>(null);

  const handleSubscriptions = useCallback(() => {
    PubSub.subscribe(LOAD_COMPLETE, () => {
      setLoaded(true);

      gsap.to(loaderRef.current, {
        delay: 1,
        duration: 1,
        opacity: 0,
      });
    });
  }, [setLoaded]);

  useEffect(() => {
    const buttons = document.querySelectorAll(".loaderButton");

    setInterval(() => {
      highlightButtons(buttons);
    }, 500);

    handleSubscriptions();
  }, [handleSubscriptions]);

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
