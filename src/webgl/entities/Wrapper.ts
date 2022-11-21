import {
  TextureLoader,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  PlaneGeometry,
  MeshLambertMaterial,
  MeshBasicMaterial,
  DoubleSide,
} from "three";

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
      model.scale.set(0.275, 0.175, 0.275);

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

    const texture = await textureLoader.load(
      "/textures/wrapper/placeholder_card.jpg"
    );

    const frontCardGeometry = new PlaneGeometry(0.55, 0.309, 1);
    const frontCardMaterial = new MeshLambertMaterial({
      map: texture,
      side: DoubleSide,
    });
    const frontCardMesh = new Mesh(frontCardGeometry, frontCardMaterial);

    frontCardMesh.position.y = 0.4;
    frontCardMesh.position.z = 0.015;
    frontCardMesh.rotation.x = -0.1;

    const backCardGeometry = new PlaneGeometry(0.55, 0.309, 1);
    const backCardMaterial = new MeshLambertMaterial({
      color: "#fff",
    });
    const backCardMesh = new Mesh(backCardGeometry, backCardMaterial);

    backCardMesh.position.y = 0.4;
    backCardMesh.position.z = -0.015;
    backCardMesh.rotation.x = 0.1;

    this.parent.add(frontCardMesh);
    this.parent.add(backCardMesh);
  }
}
