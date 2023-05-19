import { DirectionalLight as ThreeDirectionalLight } from "three";

export class DirectionalLight extends ThreeDirectionalLight {
  constructor() {
    super(0xf5f5f5, 0.25);
    this.position.set(0, 3, 3);
    this.lookAt(0, 0, 0);
    this.castShadow = true;
  }
}
