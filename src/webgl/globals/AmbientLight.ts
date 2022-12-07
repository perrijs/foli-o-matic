import { AmbientLight as ThreeAmbientLight } from "three";

export class AmbientLight extends ThreeAmbientLight {
  constructor() {
    super(0xf5f5f5, 0.5);
  }
}
