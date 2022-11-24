import PubSub from "pubsub-js";
import gsap from "gsap";

import { Scene } from "@/webgl/globals/Scene";
import { Sprite } from "@/webgl/entities/Sprite";

import { SPRITES } from "@/webgl/config/sprites";
import { GL_DISPLAY_SPRITES } from "@/webgl/config/topics";

export class SpriteController {
  static instance: SpriteController;
  scene = Scene.getInstance();

  sprites?: Sprite[] = [];

  constructor() {
    this.init();
  }

  static getInstance() {
    if (!SpriteController.instance)
      SpriteController.instance = new SpriteController();

    return SpriteController.instance;
  }

  init() {
    SPRITES.forEach((spriteData) => {
      if (!this.sprites) return;

      const sprite = new Sprite(spriteData);

      this.sprites.push(sprite);
    });

    this.handleSubscriptions();
  }

  handleSpriteDisplay(_topic: string, data: string) {
    if (!this.sprites) return;

    const showSprite = Boolean(data);

    this.sprites.forEach((sprite) => {
      if (!sprite.sprite) return;

      gsap.fromTo(
        sprite.sprite.material,
        { opacity: showSprite ? 0 : 1 },
        {
          duration: 1,
          opacity: showSprite ? 1 : 0,
        }
      );
    });
  }

  handleSubscriptions() {
    PubSub.subscribe(GL_DISPLAY_SPRITES, this.handleSpriteDisplay.bind(this));
  }
}
