import {
  DoubleSide,
  Mesh,
  MeshPhongMaterial,
  PlaneGeometry,
  ShadowMaterial,
} from "three";

import { Scene } from "@/webgl/globals/Scene";

export class Floor {
  scene: Scene;
  mesh?: Mesh;

  constructor(scene: Scene) {
    this.scene = scene;
    this.init();
  }

  init() {
    const geometry = new PlaneGeometry(1000, 1000);
    /* TODO(pschofield): Transition from color black to pink when coin is inserted. */
    const material = new MeshPhongMaterial({
      color: "#080808",
      side: DoubleSide,
    });
    const mesh = new Mesh(geometry, material);

    mesh.position.set(0, -4, 0);
    mesh.rotation.x = Math.PI / 2;
    mesh.receiveShadow = true;

    this.mesh = mesh;
    this.scene.add(this.mesh);
  }
}
