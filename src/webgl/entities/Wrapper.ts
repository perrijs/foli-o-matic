import {
  TextureLoader,
  Group,
  Mesh,
  PlaneGeometry,
  MeshPhysicalMaterial,
  MeshLambertMaterial,
  DoubleSide,
} from "three";

import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";

export class Wrapper {
  assetController = AssetController.getInstance();

  scene: Scene;
  parent: Group;

  constructor(scene: Scene, parent: Group) {
    this.scene = scene;
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
      model.scale.set(0.275, 0.15, 0.275);

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

    this.addCard();
  }

  async addCard() {
    const textureLoader = new TextureLoader();

    const texture = await textureLoader.load("/textures/wrapper/item_card.png");

    const geometry = new PlaneGeometry(0.55, 0.309, 1);
    const material = new MeshLambertMaterial({
      map: texture,
      side: DoubleSide,
    });
    const frontCardMesh = new Mesh(geometry, material);
    frontCardMesh.position.y = 0.4;
    frontCardMesh.position.z = 0.015;
    frontCardMesh.rotation.x = -0.08;

    const backCardMesh = new Mesh(geometry, material);
    backCardMesh.scale.x = -1;
    backCardMesh.position.y = 0.4;
    backCardMesh.position.z = -0.015;
    backCardMesh.rotation.x = 0.08;

    this.parent.add(frontCardMesh);
    this.parent.add(backCardMesh);
  }
}
