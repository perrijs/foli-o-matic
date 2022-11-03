import { TextureLoader, Texture } from "three";
import PubSub from "pubsub-js";

import { Scene } from "@/webgl/globals/Scene";
import { Button } from "@/webgl/entities/Button";

import { BUTTONS } from "@/webgl/config/buttons";
import { GL_SELECT_ITEM } from "@/webgl/config/topics";

export class ButtonController {
  static instance: ButtonController;
  scene = Scene.getInstance();

  matcap?: Texture;
  buttons?: Button[] = [];

  constructor() {
    this.load();
  }

  static getInstance() {
    if (!ButtonController.instance)
      ButtonController.instance = new ButtonController();

    return ButtonController.instance;
  }

  load() {
    const loader = new TextureLoader();

    loader.load("textures/matcaps/matcap_ivory.png", (texture) => {
      this.matcap = texture;

      this.init();
    });
  }

  init() {
    BUTTONS.forEach((buttonData) => {
      if (!this.buttons || !this.matcap) return;

      const button = new Button(buttonData, this.matcap);
      this.buttons.push(button);
    });
  }

  handleClick(id: string) {
    if (!this.buttons) return;

    this.buttons.forEach((button) => {
      if (button.buttonData.id === id) {
        PubSub.publish(GL_SELECT_ITEM, id);
      }
    });
  }
}
