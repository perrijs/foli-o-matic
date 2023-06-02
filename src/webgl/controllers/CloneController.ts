import { Group } from "three";
import gsap from "gsap";
import PubSub from "pubsub-js";

import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";
import { UI_NEXT_ITEM, UI_PREV_ITEM } from "../config/topics";

export class CloneController {
  static instance: CloneController;

  scene = Scene.getInstance();
  assetController = AssetController.getInstance();

  items: Group[] = [];
  currentIndex: number = 0;
  isAnimating: boolean = false;

  constructor() {
    this.handleSubscriptions();
  }

  static getInstance() {
    if (!CloneController.instance)
      CloneController.instance = new CloneController();

    return CloneController.instance;
  }

  handleSubscriptions() {
    PubSub.subscribe(UI_NEXT_ITEM, () => this.newItem(true));
    PubSub.subscribe(UI_PREV_ITEM, () => this.newItem(false));
  }

  init() {
    if (!this.assetController.models) return;

    this.assetController.models.forEach((model: Group, index) => {
      if (index === this.currentIndex) return;

      const clone = model.clone();

      this.items.push(clone);
      this.scene.add(clone);
      clone.position.set(-3, 0, 9);
    });

    this.items.splice(
      this.currentIndex,
      0,
      this.assetController.models[this.currentIndex]
    );
  }

  newItem(isNext: boolean) {
    if (
      this.isAnimating ||
      (!isNext && this.currentIndex === 0) ||
      (isNext && this.currentIndex === this.items.length - 1)
    )
      return;

    const currentModel = this.items[this.currentIndex];
    const newModel = this.items[this.currentIndex + (isNext ? 1 : -1)];

    gsap.fromTo(
      currentModel.position,
      {
        x: 0,
      },
      {
        x: isNext ? 3 : -3,
      }
    );

    gsap.fromTo(
      newModel.position,
      {
        x: isNext ? -3 : 3,
      },
      {
        x: 0,
        onStart: () => {
          this.isAnimating = true;
        },
        onComplete: () => {
          this.isAnimating = false;
          this.currentIndex += isNext ? 1 : -1;
        },
      }
    );
  }
}
