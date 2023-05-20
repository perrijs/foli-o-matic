import {
  TextureLoader,
  Mesh,
  PlaneGeometry,
  DoubleSide,
  MeshStandardMaterial,
} from "three";

import { Scene } from "@/webgl/globals/Scene";

import { CardData } from "@/webgl/config/types";

export class Card {
  scene: Scene;

  cardData: CardData;
  mesh?: Mesh;

  constructor(scene: Scene, cardData: CardData) {
    this.scene = scene;
    this.cardData = cardData;

    this.init();
  }

  async init() {
    const textureLoader = new TextureLoader();

    const texture = await textureLoader.load(
      "/textures/cards/sold_out_card.png"
    );

    const geometry = new PlaneGeometry(0.55, 0.309, 1);
    const material = new MeshStandardMaterial({
      map: texture,
      side: DoubleSide,
    });
    this.mesh = new Mesh(geometry, material);

    this.mesh.position.set(
      this.cardData.position.x,
      this.cardData.position.y,
      this.cardData.position.z
    );
    this.mesh.rotation.set(
      this.cardData.rotation.x,
      this.cardData.rotation.y,
      this.cardData.rotation.z
    );

    this.scene.add(this.mesh);
  }
}
