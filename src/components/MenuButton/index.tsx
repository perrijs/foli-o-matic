import { useEffect, useRef, useState } from "react";

import { BUTTONS } from "src/config/buttons";

import { Wrapper, MachineScreen, MachineButton } from "./styles";

interface Props {
  onClick: () => void;
}

const MenuButton = ({ onClick }: Props) => {
  const buttons = useRef<NodeListOf<Element>>();

  const buttonIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    buttons.current = document.querySelectorAll(".menu-button");
  }, []);

  const handleOnFocus = () => {
    if(buttonIntervalRef.current) return;

    buttonIntervalRef.current = setInterval(() => {
      highlightButtons();
    }, 333)
  };

  const handleOnBlur = () => {
    if(!buttonIntervalRef.current) return;
    
    clearInterval(buttonIntervalRef.current);
    buttonIntervalRef.current = null;

    buttons.current?.forEach((button) => {
      button.classList.remove("active");
    });
  };

  const highlightButtons = () => {
    if (buttons.current) {
      const randomEl = Math.floor(Math.random() * buttons.current.length);

      buttons.current.forEach((button) => {
        button.classList.remove("active");
      });

      if (buttons.current[randomEl])
        buttons.current[randomEl].classList.add("active");
    }
  };

  return (
    <Wrapper
      key="menu-button"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: { duration: 1, ease: "linear" },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 1, ease: "linear" },
      }}
      onClick={onClick}
      onMouseEnter={() => handleOnFocus()}
      onFocus={() => handleOnFocus()}
      onBlur={() => handleOnBlur()}
      onMouseLeave={() => handleOnBlur()}
    >
      <MachineScreen>
        <span>BROWSE...</span>
      </MachineScreen>

      {BUTTONS.map((button) => (
        <MachineButton key={button} className={"menu-button"}>
          {button}
        </MachineButton>
      ))}
    </Wrapper>
  );
};

export default MenuButton;
