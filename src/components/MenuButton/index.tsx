import { UI_HANDLE_TRANSITION } from "@/webgl/config/topics";
import { useEffect, useRef, useState } from "react";

import { BUTTONS } from "src/config/buttons";

import { Button, MenuWrapper, MachineScreen } from "./styles";

const MenuButton = () => {
  const buttons = useRef<NodeListOf<Element>>();
  const [buttonInterval, setButtonInterval] =
    useState<ReturnType<typeof setInterval>>();

  useEffect(() => {
    buttons.current = document.querySelectorAll(".menuButton");
  }, []);

  const openMenu = () => {
    //TODO(pschofield): Open Collection component overlay.
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
    <MenuWrapper
      onClick={openMenu}
      onMouseEnter={() => {
        setButtonInterval(
          setInterval(() => {
            highlightButtons();
          }, 333)
        );
      }}
      onMouseLeave={() => {
        clearInterval(buttonInterval);

        const buttons = document.querySelectorAll(".menuButton");
        buttons.forEach((button) => {
          button.classList.remove("active");
        });
      }}
    >
      <MachineScreen>
        <span>BROWSE...</span>
      </MachineScreen>

      {BUTTONS.map((button) => (
        <Button key={button} className="menuButton">
          {button}
        </Button>
      ))}
    </MenuWrapper>
  );
};

export default MenuButton;
