import { PlaneGeometry, MeshBasicMaterial, Mesh, Material } from "three";

import { Scene } from "@/webgl/globals/Scene";

export class Screen {
  scene = Scene.getInstance();

  mesh?: Mesh;

  constructor() {
    this.init();
  }

  init() {
    const screenGeometry = new PlaneGeometry(1.4, 0.4, 1);
    const screenMaterial = new MeshBasicMaterial({ color: 0x33312e });
    const screen = new Mesh(screenGeometry, screenMaterial);

    screen.position.set(1.633, 1.6, 3.002);

    this.mesh = screen;
    this.scene.add(this.mesh);
  }
}
