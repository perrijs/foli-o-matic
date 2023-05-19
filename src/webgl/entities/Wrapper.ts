import {
  TextureLoader,
  Group,
  Mesh,
  PlaneGeometry,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  DoubleSide,
} from "three";

import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";

export class Wrapper {
  assetController = AssetController.getInstance();

  scene: Scene;
  parent: Group;
  mesh?: Mesh;
  cards?: Mesh[] = [];

  constructor(scene: Scene, parent: Group) {
    this.scene = scene;
    this.parent = parent;

    this.init();
  }

  init() {
    if (!this.assetController) return;

    if (this.assetController.wrapper) {
      const gltf = this.assetController.wrapper.scene.clone();
      this.mesh = gltf.children[0] as Mesh;

      this.mesh.rotation.z = Math.PI / 2;
      this.mesh.rotation.y = Math.PI / 2;
      this.mesh.scale.set(0.275, 0.15, 0.275);

      this.mesh.material = new MeshPhysicalMaterial({
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

      this.parent.add(this.mesh);
    }

    this.addCard();
  }

  async addCard() {
    if (!this.cards) return;

    const textureLoader = new TextureLoader();

    const texture = await textureLoader.load(
      "/textures/cards/wrapper_card.png"
    );

    const geometry = new PlaneGeometry(0.55, 0.309, 1);
    const material = new MeshStandardMaterial({
      map: texture,
      side: DoubleSide,
    });
    const frontCardMesh = new Mesh(geometry, material);
    frontCardMesh.position.y = 0.4;
    frontCardMesh.position.z = 0.015;
    frontCardMesh.rotation.x = -0.08;
    this.cards.push(frontCardMesh);

    const backCardMesh = new Mesh(geometry, material);
    backCardMesh.scale.x = -1;
    backCardMesh.position.y = 0.4;
    backCardMesh.position.z = -0.015;
    backCardMesh.rotation.x = 0.08;
    this.cards.push(backCardMesh);

    this.parent.add(frontCardMesh);
    this.parent.add(backCardMesh);
  }
}
