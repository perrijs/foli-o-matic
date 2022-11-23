import { DirectionalLight as ThreeDirectionalLight } from "three";

export class DirectionalLight extends ThreeDirectionalLight {
  constructor() {
    super(0xf5f5f5, 0.75);
    this.position.set(0, 3, 3);
    this.castShadow = true;
  }
}
