import { AmbientLight as ThreeAmbientLight } from "three";

import { Scene } from "./Scene";

export class AmbientLight extends ThreeAmbientLight {
  constructor() {
    super(0xf5f5f5, 0.5);
  }
}
