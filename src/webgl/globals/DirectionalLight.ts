import { DirectionalLight as ThreeDirectionalLight } from "three";

import { Scene } from "./Scene";

export class DirectionalLight extends ThreeDirectionalLight {
  static instance: DirectionalLight;
  scene = Scene.getInstance();

  constructor() {
    super(0xf5f5f5, 0.75);
    this.position.set(0, 3, 3);
    this.castShadow = true;

    this.scene.add(this);
  }

  static getInstance() {
    if (!DirectionalLight.instance)
      DirectionalLight.instance = new DirectionalLight();

    return DirectionalLight.instance;
  }
}
