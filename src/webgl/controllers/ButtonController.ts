import PubSub from "pubsub-js";

import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";
import { Button } from "@/webgl/entities/Button";

import { BUTTONS } from "@/webgl/config/buttons";
import { GL_SELECT_ITEM } from "@/webgl/config/topics";

export class ButtonController {
  static instance: ButtonController;

  scene = Scene.getInstance();
  assetController = AssetController.getInstance();

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
    BUTTONS.forEach((buttonData, index) => {
      if (!this.buttons || !this.assetController.matcaps) return;

      const button = new Button(
        buttonData,
        this.assetController.matcaps[index]
      );
      this.buttons.push(button);
    });
  }

  handleClick(id: string) {
    if (!this.buttons) return;

    this.buttons.forEach((button) => {
      if (button.buttonData.id === id) {
        PubSub.publish(GL_SELECT_ITEM, id);

        button.press();
      }
    });
  }
}
