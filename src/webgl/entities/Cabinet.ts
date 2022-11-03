import {
  TextureLoader,
  Texture,
  Group,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  EquirectangularReflectionMapping,
  MeshMatcapMaterial,
} from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import { Scene } from "@/webgl/globals/Scene";
import { Screen } from "@/webgl/entities/Screen";
import { Flap } from "@/webgl/entities/Flap";

export class Cabinet {
  scene = Scene.getInstance();

  matcap?: Texture;
  cabinet: Group;

  constructor() {
    this.cabinet = new Group();

    this.load();
    this.init();
  }

  load() {
    const loader = new TextureLoader();

    loader.load("textures/matcaps/matcap_red.png", (texture) => {
      this.matcap = texture;

      this.init();
    });
  }

  init() {
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

    new Screen();
    new Flap();

    this.scene.add(this.cabinet);
  }

  createBackPanel() {
    const backPanelGeometry = new BoxGeometry(5, 7.5, 0.5);
    const backPanelMaterial = new MeshMatcapMaterial({ matcap: this.matcap });
    const backPanel = new Mesh(backPanelGeometry, backPanelMaterial);

    this.cabinet.add(backPanel);
  }

  createSidePanel(x: number, y: number, z: number) {
    const sidePanelGeometry = new BoxGeometry(3, 7.5, 0.5);
    const sidePanelMaterial = new MeshMatcapMaterial({ matcap: this.matcap });
    const sidePanel = new Mesh(sidePanelGeometry, sidePanelMaterial);

    sidePanel.position.set(x, y, z);
    sidePanel.rotation.y = Math.PI / 2;

    this.cabinet.add(sidePanel);
  }

  createTopPanel() {
    const topPanelGeometry = new BoxGeometry(5, 3, 0.5);
    const topPanelMaterial = new MeshMatcapMaterial({ matcap: this.matcap });
    const topPanel = new Mesh(topPanelGeometry, topPanelMaterial);

    topPanel.position.set(0, 3.5, 1.5);
    topPanel.rotation.x = Math.PI / 2;

    this.cabinet.add(topPanel);
  }

  createBottomPanel() {
    const bottomPanelGeometry = new BoxGeometry(5, 3, 0.5);
    const bottomPanelMaterial = new MeshMatcapMaterial({ matcap: this.matcap });
    const bottomPanel = new Mesh(bottomPanelGeometry, bottomPanelMaterial);

    bottomPanel.position.set(0, -3.5, 1.5);
    bottomPanel.rotation.x = Math.PI / 2;

    this.cabinet.add(bottomPanel);
  }

  createBottomFiller() {
    const bottomPanelGeometry = new BoxGeometry(3, 1, 3);
    const bottomPanelMaterial = new MeshMatcapMaterial({ matcap: this.matcap });
    const bottomPanel = new Mesh(bottomPanelGeometry, bottomPanelMaterial);

    bottomPanel.position.set(-0.75, -2.8, 1.5);

    this.cabinet.add(bottomPanel);
  }

  createInsidePanel() {
    const insidePanelGeometry = new BoxGeometry(3, 7.5, 0.5);
    const insidePanelMaterial = new MeshMatcapMaterial({ matcap: this.matcap });
    const insidePanel = new Mesh(insidePanelGeometry, insidePanelMaterial);

    insidePanel.position.set(1, 0, 1.5);
    insidePanel.rotation.y = Math.PI / 2;

    this.cabinet.add(insidePanel);
  }

  createFacePanel() {
    const facePanelGeometry = new BoxGeometry(1.5, 7.5, 0.5);
    const facePanelMaterial = new MeshMatcapMaterial({ matcap: this.matcap });
    const facePanel = new Mesh(facePanelGeometry, facePanelMaterial);

    facePanel.position.set(1.5, 0, 2.75);

    this.cabinet.add(facePanel);
  }

  createTray(x: number, y: number, z: number) {
    const trayGeometry = new BoxGeometry(3.5, 2, 0.1);
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

      const windowGeometry = new BoxGeometry(3.5, 5.25, 0.1);
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
