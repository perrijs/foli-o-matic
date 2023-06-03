import { Mesh, MeshBasicMaterial, ConeGeometry } from "three";

import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";

export class LightCone {
  assetController = AssetController.getInstance();
  scene = Scene.getInstance();

  mesh?: Mesh;

  constructor() {
    this.init();
  }

  init() {
    const geometry = new ConeGeometry(20, 100, 32);
    const material = new MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const cone = new Mesh(geometry, material);

    cone.position.set(0, 0, 0);

    this.mesh = cone;
    this.scene.add(this.mesh);
  }
}
