import PubSub from "pubsub-js";

import { Scene } from "@/webgl/globals/Scene";
import { Button } from "@/webgl/entities/Button";

import { BUTTONS } from "@/webgl/config/buttons";
import { GL_ROTATE_COIL } from "@/webgl/config/topics";

export class ButtonController {
  static instance: ButtonController;
  scene = Scene.getInstance();

  buttons?: Button[] = [];

  constructor() {
    this.init();
  }

  static getInstance() {
    if (!ButtonController.instance)
      ButtonController.instance = new ButtonController();

    return ButtonController.instance;
  }

  init() {
    BUTTONS.forEach((buttonData) => {
      if (!this.buttons) return;

      const button = new Button(buttonData);
      this.buttons.push(button);
    });
  }

  handleClick(id: string) {
    if (!this.buttons) return;

    this.buttons.forEach((button) => {
      if (button.buttonData.id === id) {
        PubSub.publish(GL_ROTATE_COIL, id);
      }
    });
  }
}
