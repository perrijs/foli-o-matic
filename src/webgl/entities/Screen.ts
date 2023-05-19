import { PlaneGeometry, MeshBasicMaterial, Mesh } from "three";

import { Scene } from "@/webgl/globals/Scene";

export class Screen {
  scene: Scene;
  mesh?: Mesh;

  constructor(scene: Scene) {
    this.scene = scene;

    this.init();
  }

  init() {
    const screenGeometry = new PlaneGeometry(1.25, 0.25, 1);
    const screenMaterial = new MeshBasicMaterial({ color: 0x33312e });
    const screen = new Mesh(screenGeometry, screenMaterial);

    screen.position.set(1.525, 1.6, 3.002);

    this.mesh = screen;
    this.scene.add(this.mesh);
  }
}
