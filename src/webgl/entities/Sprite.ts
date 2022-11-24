import { TextureLoader, Sprite as ThreeSprite, SpriteMaterial } from "three";

import { Scene } from "@/webgl/globals/Scene";

import { SpriteData } from "@/webgl/config/types";

export class Sprite {
  scene = Scene.getInstance();

  sprite?: ThreeSprite;
  spriteData: SpriteData;

  constructor(spriteData: SpriteData) {
    this.spriteData = spriteData;

    this.init();
  }

  init() {
    const map = new TextureLoader().load("/textures/zoom_in.png");
    const material = new SpriteMaterial({
      map: map,
      transparent: true,
      opacity: 0,
    });

    this.sprite = new ThreeSprite(material);
    this.sprite.position.set(
      this.spriteData.position.x,
      this.spriteData.position.y,
      this.spriteData.position.z
    );
    this.sprite.scale.setScalar(this.spriteData.scalar);
    this.scene.add(this.sprite);
  }
}
