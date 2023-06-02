import { Scene as ThreeScene } from "three";

export class Scene extends ThreeScene {
  static instance: Scene;

  constructor() {
    super();
  }

  static getInstance() {
    if (!Scene.instance) Scene.instance = new Scene();

    return Scene.instance;
  }

  cleanup() {
    while (this.children.length > 0) {
      this.remove(this.children[0]);
    }
  }
}
