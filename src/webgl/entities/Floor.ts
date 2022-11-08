import {
  DoubleSide,
  Mesh,
  MeshLambertMaterial,
  PlaneGeometry,
  ShadowMaterial,
} from "three";

import { Scene } from "@/webgl/globals/Scene";

export class Floor {
  scene = Scene.getInstance();

  mesh?: Mesh;

  constructor() {
    this.init();
  }

  init() {
    const geometry = new PlaneGeometry(10000, 10000, 1);
    const material = new ShadowMaterial({ side: DoubleSide });
    const mesh = new Mesh(geometry, material);
    material.opacity = 0.6;

    mesh.position.set(0, -4, 0);
    mesh.rotation.x = Math.PI / 2;
    mesh.receiveShadow = true;

    this.mesh = mesh;
    this.scene.add(this.mesh);
  }
}
