import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";
import { Button } from "@/webgl/entities/Button";

import { setVisibility } from "@/webgl/utils/setVisibility";

import { BUTTONS } from "@/webgl/config/buttons";
import { GL_SHOW_CAB } from "@/webgl/config/topics";

export class ButtonController {
  assetController = AssetController.getInstance();

  scene: Scene;
  buttons?: Button[] = [];

  constructor(scene: Scene) {
    this.scene = scene;

    this.addEventListeners();
    this.init();
  }

  addEventListeners() {
    PubSub.subscribe(GL_SHOW_CAB, () => {
      if (!this.buttons) return;

      this.buttons.forEach((button) => {
        if (button.mesh) setVisibility(button.mesh, true);
      });
    });
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
