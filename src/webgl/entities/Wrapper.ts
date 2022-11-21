import { Group, Mesh, MeshPhysicalMaterial } from "three";

import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";

export class Wrapper {
  scene = Scene.getInstance();
  assetController = AssetController.getInstance();

  parent: Group;

  constructor(parent: Group) {
    this.parent = parent;

    this.init();
  }

  init() {
    if (!this.assetController) return;

    if (this.assetController.wrapper) {
      const gltf = this.assetController.wrapper.scene.clone();
      const model = gltf.children[0] as Mesh;

      model.rotation.z = Math.PI / 2;
      model.rotation.y = Math.PI / 2;
      model.scale.set(0.33, 0.1, 0.33);

      model.material = new MeshPhysicalMaterial({
        transparent: true,
        opacity: 0.3,
        color: "#89b1c8",
        emissive: "#a8a8a8",
        roughness: 0,
        metalness: 1,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0,
      });

      this.parent.add(model);
    }
  }
}
