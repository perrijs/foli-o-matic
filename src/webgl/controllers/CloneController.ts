import { Group } from "three";
import PubSub from "pubsub-js";

import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";
import { UI_NEXT_ITEM, UI_PREV_ITEM } from "../config/topics";

export class CloneController {
  static instance: CloneController;

  scene = Scene.getInstance();
  assetController = AssetController.getInstance();

  items: Group[] = [];
  activeIndex: number = 0;

  constructor() {
    this.handleSubscriptions();
  }

  static getInstance() {
    if (!CloneController.instance)
      CloneController.instance = new CloneController();

    return CloneController.instance;
  }

  handleSubscriptions() {
    PubSub.subscribe(UI_NEXT_ITEM, () => this.nextItem());
    PubSub.subscribe(UI_PREV_ITEM, () => this.prevItem());
  }

  init() {
    this.assetController.models?.forEach((model: Group) => {
      const clone = model.clone();

      this.items.push(clone);
      this.scene.add(clone);
      clone.position.set(-3, 0, 9);
    });
  }

  nextItem() {
    console.log("initial index", this.activeIndex);

    this.activeIndex += 1;

    console.log("new index:", this.activeIndex);
  }

  prevItem() {
    console.log("initial index", this.activeIndex);

    this.activeIndex -= 1;

    console.log("new index:", this.activeIndex);
  }
}
