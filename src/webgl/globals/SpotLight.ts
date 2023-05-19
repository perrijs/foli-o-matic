import { SpotLight as ThreeSpotLight } from "three";

export class SpotLight extends ThreeSpotLight {
  constructor() {
    super("#f5f5f5", 2);

    this.position.set(0, 50, 0);
    this.penumbra = 0;
    this.decay = 1;
    this.distance = 200;
    this.scale.x = 0.1125;
  }
}
