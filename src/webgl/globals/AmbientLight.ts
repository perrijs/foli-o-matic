import { AmbientLight as ThreeAmbientLight } from "three";

import { Scene } from "./Scene";

export class AmbientLight extends ThreeAmbientLight {
  static instance: AmbientLight;
  scene = Scene.getInstance();

  constructor() {
    super(0xf5f5f5, 0.5);

    this.scene.add(this);
  }

  static getInstance() {
    if (!AmbientLight.instance) AmbientLight.instance = new AmbientLight();

    return AmbientLight.instance;
  }
}
