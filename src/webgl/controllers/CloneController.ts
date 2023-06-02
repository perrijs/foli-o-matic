import { Group } from "three";
import PubSub from "pubsub-js";

import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";
import { UI_NEXT_ITEM, UI_PREV_ITEM } from "../config/topics";

export class CloneController {
  assetController = AssetController.getInstance();

  scene: Scene;
  items?: Group[] = [];

  constructor(scene: Scene) {
    this.scene = scene;

    this.handleSubscriptions();
  }

  handleSubscriptions() {
    PubSub.subscribe(UI_NEXT_ITEM, () => this.nextItem());
    PubSub.subscribe(UI_PREV_ITEM, () => this.prevItem());
  }

  init() {
    this.assetController.models?.forEach((model: Group) => {
      const clone = model.clone();

      this.items?.push(clone);
      this.scene.add(clone);
      clone.position.set(-3, 0, 9);
    });
  }

  nextItem() {
    console.log("got here next");
  }

  prevItem() {
    console.log("got here prev");
  }
}
