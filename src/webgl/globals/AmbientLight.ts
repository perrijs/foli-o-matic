import { AmbientLight as ThreeAmbientLight } from "three";

import { Scene } from "./Scene";

export class AmbientLight extends ThreeAmbientLight {
  static instance: AmbientLight;
  scene = Scene.getInstance();

  constructor() {
    super(0xffffff, 0.3);

    this.scene.add(this);
  }

  static getInstance() {
    if (!AmbientLight.instance) AmbientLight.instance = new AmbientLight();

    return AmbientLight.instance;
  }
}
