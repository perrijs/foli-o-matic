import { UI_HANDLE_TRANSITION } from "@/webgl/config/topics";

import { Button } from "./styles";

const MenuButton = () => {
  const openMenu = () => {
    PubSub.publish(UI_HANDLE_TRANSITION, {
      slug: "/collection",
      color: "#f5a3a3",
    });
  };

  return <Button onClick={openMenu}>MENU</Button>;
};

export default MenuButton;
