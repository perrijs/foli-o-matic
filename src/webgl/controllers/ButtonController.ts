import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";
import { Button } from "@/webgl/entities/Button";

import { BUTTONS } from "@/webgl/config/buttons";

export class ButtonController {
  assetController = AssetController.getInstance();

  scene: Scene;
  buttons?: Button[] = [];

  constructor(scene: Scene) {
    this.scene = scene;

    this.init();
  }

  init() {
    BUTTONS.forEach((buttonData, index) => {
      if (!this.buttons) return;

      const button = new Button(this.scene, buttonData, index);
      this.buttons.push(button);
    });
  }

  handleClick(keyValue: string) {
    if (!this.buttons) return;

    this.buttons.forEach((button) => {
      if (button.buttonData.key_value === keyValue) button.press();
    });
  }
}
