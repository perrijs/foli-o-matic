import {
  Group,
  BoxGeometry,
  Mesh,
  MeshPhysicalMaterial,
  EquirectangularReflectionMapping,
  MeshMatcapMaterial,
} from "three";

import { Scene } from "@/webgl/globals/Scene";

import { AssetController } from "@/webgl/controllers/AssetController";
import { ScreenController } from "@/webgl/controllers/ScreenController";
import { Screen } from "@/webgl/entities/Screen";
import { Flap } from "@/webgl/entities/Flap";

export class Cabinet {
  scene = Scene.getInstance();
  assetController = AssetController.getInstance();
  screenController = ScreenController.getInstance();

  matcapMain?: MeshMatcapMaterial;
  matcapSub?: MeshMatcapMaterial;
  cabinet: Group;

  constructor() {
    this.cabinet = new Group();

    this.init();
  }

  init() {
    if (this.assetController.matcaps) {
      this.assetController.matcaps.forEach((item) => {
        if (item.name === "matcap_cosmic_latte") this.matcapMain = item.matcap;
        if (item.name === "matcap_cosmic_americano")
          this.matcapSub = item.matcap;
      });
    }

    this.createBackPanel();
    this.createTopPanel();
    this.createBottomPanel();
    this.createBottomFiller();
    this.createSidePanel(-2.25, 0, 1.5);
    this.createSidePanel(2.25, 0, 1.5);
    this.createInsidePanel();
    this.createFacePanel();
    this.createWindow();

    this.createTray(-0.5, 1.75, 1);
    this.createTray(-0.5, 0.25, 1);
    this.createTray(-0.5, -1.25, 1);

    this.createFoot(-2.25, -3.75, 2.75);
    this.createFoot(2.25, -3.75, 2.75);
    this.createFoot(-2.25, -3.75, 0);
    this.createFoot(2.25, -3.75, 0);

    this.screenController.init();
    new Flap();

    this.cabinet.castShadow = true;
    this.scene.add(this.cabinet);
  }

  createBackPanel() {
    const geometry = new BoxGeometry(5, 7.5, 0.5);
    const material = this.matcapMain;
    const mesh = new Mesh(geometry, material);

    mesh.name = "matcapMain";
    mesh.castShadow = true;

    this.cabinet.add(mesh);
  }

  createSidePanel(x: number, y: number, z: number) {
    const geometry = new BoxGeometry(3, 7.5, 0.5);
    const material = this.matcapMain;
    const mesh = new Mesh(geometry, material);

    mesh.position.set(x, y, z);
    mesh.rotation.y = Math.PI / 2;

    mesh.name = "matcapMain";
    mesh.castShadow = true;

    this.cabinet.add(mesh);
  }

  createTopPanel() {
    const geometry = new BoxGeometry(5, 3, 0.5);
    const material = this.matcapMain;
    const mesh = new Mesh(geometry, material);

    mesh.position.set(0, 3.5, 1.5);
    mesh.rotation.x = Math.PI / 2;

    mesh.name = "matcapMain";
    mesh.castShadow = true;

    this.cabinet.add(mesh);
  }

  createBottomPanel() {
    const geometry = new BoxGeometry(5, 3, 0.5);
    const material = this.matcapMain;
    const mesh = new Mesh(geometry, material);

    mesh.position.set(0, -3.5, 1.5);
    mesh.rotation.x = Math.PI / 2;

    mesh.name = "matcapMain";
    mesh.castShadow = true;

    this.cabinet.add(mesh);
  }

  createBottomFiller() {
    const geometry = new BoxGeometry(3, 1, 3);
    const material = this.matcapMain;
    const mesh = new Mesh(geometry, material);

    mesh.position.set(-0.75, -2.8, 1.5);

    mesh.name = "matcapMain";

    this.cabinet.add(mesh);
  }

  createInsidePanel() {
    const geometry = new BoxGeometry(3, 7.5, 0.5);
    const material = this.matcapMain;
    const mesh = new Mesh(geometry, material);

    mesh.position.set(1, 0, 1.45);
    mesh.rotation.y = Math.PI / 2;

    mesh.name = "matcapMain";

    this.cabinet.add(mesh);
  }

  createFacePanel() {
    const geometry = new BoxGeometry(1.5, 7.5, 0.5);
    const material = this.matcapMain;
    const mesh = new Mesh(geometry, material);

    mesh.position.set(1.5, 0, 2.75);

    mesh.name = "matcapMain";

    this.cabinet.add(mesh);
  }

  createTray(x: number, y: number, z: number) {
    if (!this.assetController.matcaps) return;

    const geometry = new BoxGeometry(3.5, 2, 0.1);
    const material = this.matcapSub;
    const mesh = new Mesh(geometry, material);

    mesh.position.set(x, y, z);
    mesh.rotation.x = Math.PI / 2;

    this.cabinet.add(mesh);
  }

  createFoot(x: number, y: number, z: number) {
    if (!this.assetController.matcaps) return;

    const geometry = new BoxGeometry(0.25, 0.5, 0.25);
    const material = this.matcapSub;
    const mesh = new Mesh(geometry, material);

    mesh.castShadow = true;
    mesh.position.set(x, y, z);

    this.cabinet.add(mesh);
  }

  createWindow() {
    if (!this.assetController.hdrs) return;

    const texture = this.assetController.hdrs[0];
    texture.mapping = EquirectangularReflectionMapping;

    this.scene.environment = texture;

    const geometry = new BoxGeometry(3.5, 5.25, 0.1);
    const material = new MeshPhysicalMaterial({
      color: 0x666d70,
      emissive: 0x000000,
      transparent: true,
      opacity: 0.2,
      roughness: 0,
      metalness: 0,
      transmission: 0,
      reflectivity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0,
      ior: 2.3,
    });
    const mesh = new Mesh(geometry, material);

    mesh.position.set(-0.5, 1, 2.75);
    mesh.name = "glass";

    this.cabinet.add(mesh);
  }
}
