import { DoubleSide, Mesh, MeshLambertMaterial, PlaneGeometry } from "three";

import { Scene } from "@/webgl/globals/Scene";

export class Floor {
  scene = Scene.getInstance();

  mesh?: Mesh;

  constructor() {
    this.init();
  }

  init() {
    const geometry = new PlaneGeometry(10000, 10000, 1);
    const material = new MeshLambertMaterial({
      color: "#f5f5f5",
      side: DoubleSide,
    });
    const mesh = new Mesh(geometry, material);

    mesh.position.set(0, -3.75, 0);
    mesh.rotation.x = Math.PI / 2;
    mesh.receiveShadow = true;

    this.mesh = mesh;
    this.scene.add(this.mesh);
  }
}
