import {
  Group,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  EquirectangularReflectionMapping,
} from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import { Scene } from "@/webgl/globals/Scene";
import { Screen } from "@/webgl/entities/Screen";
import { Flap } from "@/webgl/entities/Flap";

export class Cabinet {
  scene = Scene.getInstance();

  cabinet: Group;

  constructor() {
    this.cabinet = new Group();

    this.init();
  }

  init() {
    this.createBackPanel();
    this.createTopPanel();
    this.createBottomPanel();
    this.createSidePanel(-2.5, 0, 1.5);
    this.createSidePanel(2.5, 0, 1.5);
    this.createInsidePanel();
    this.createFacePanel();
    this.createWindow();

    this.createTray(-0.5, 1.75, 1);
    this.createTray(-0.5, -0.25, 1);

    new Screen();
    new Flap();

    this.scene.add(this.cabinet);
  }

  createBackPanel() {
    const backPanelGeometry = new BoxGeometry(5.5, 7.5, 0.5);
    const backPanelMaterial = new MeshBasicMaterial({ color: 0xffc0cb });
    const backPanel = new Mesh(backPanelGeometry, backPanelMaterial);

    this.cabinet.add(backPanel);
  }

  createSidePanel(x: number, y: number, z: number) {
    const sidePanelGeometry = new BoxGeometry(3, 7.5, 0.5);
    const sidePanelMaterial = new MeshBasicMaterial({ color: 0xffc0cb });
    const sidePanel = new Mesh(sidePanelGeometry, sidePanelMaterial);

    sidePanel.position.set(x, y, z);
    sidePanel.rotation.y = Math.PI / 2;

    this.cabinet.add(sidePanel);
  }

  createTopPanel() {
    const topPanelGeometry = new BoxGeometry(5.5, 3, 0.5);
    const topPanelMaterial = new MeshBasicMaterial({ color: 0xffc0cb });
    const topPanel = new Mesh(topPanelGeometry, topPanelMaterial);

    topPanel.position.set(0, 3.5, 1.5);
    topPanel.rotation.x = Math.PI / 2;

    this.cabinet.add(topPanel);
  }

  createBottomPanel() {
    const bottomPanelGeometry = new BoxGeometry(5.5, 3, 0.5);
    const bottomPanelMaterial = new MeshBasicMaterial({ color: 0xffc0cb });
    const bottomPanel = new Mesh(bottomPanelGeometry, bottomPanelMaterial);

    bottomPanel.position.set(0, -3.5, 1.5);
    bottomPanel.rotation.x = Math.PI / 2;

    this.cabinet.add(bottomPanel);
  }

  createInsidePanel() {
    const insidePanelGeometry = new BoxGeometry(3, 7.5, 0.5);
    const insidePanelMaterial = new MeshBasicMaterial({ color: 0xffc0cb });
    const insidePanel = new Mesh(insidePanelGeometry, insidePanelMaterial);

    insidePanel.position.set(1, 0, 1.5);
    insidePanel.rotation.y = Math.PI / 2;

    this.cabinet.add(insidePanel);
  }

  createFacePanel() {
    const facePanelGeometry = new BoxGeometry(1.5, 7.5, 0.5);
    const facePanelMaterial = new MeshBasicMaterial({ color: 0xffc0cb });
    const facePanel = new Mesh(facePanelGeometry, facePanelMaterial);

    facePanel.position.set(2, 0, 2.75);

    this.cabinet.add(facePanel);
  }

  createTray(x: number, y: number, z: number) {
    const trayGeometry = new BoxGeometry(4, 2, 0.125);
    const trayMaterial = new MeshBasicMaterial({ color: 0x000000 });
    const tray = new Mesh(trayGeometry, trayMaterial);

    tray.position.set(x, y, z);
    tray.rotation.x = Math.PI / 2;

    this.cabinet.add(tray);
  }

  createWindow() {
    new RGBELoader().load("/textures/hdr/placeholder_hdr.hdr", (texture) => {
      texture.mapping = EquirectangularReflectionMapping;

      this.scene.environment = texture;

      const windowGeometry = new BoxGeometry(4, 5.25, 0.1);
      const windowMaterial = new MeshPhysicalMaterial({
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
      const window = new Mesh(windowGeometry, windowMaterial);

      window.position.set(-0.5, 1, 2.75);

      this.cabinet.add(window);
    });
  }
}
