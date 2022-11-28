import { Scene as ThreeScene } from "three";

export class Scene extends ThreeScene {
  constructor() {
    super();
  }

  cleanup() {
    while (this.children.length > 0) {
      this.remove(this.children[0]);
    }
  }
}
