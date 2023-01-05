import {
  Group,
  BoxGeometry,
  Mesh,
  MeshPhysicalMaterial,
  EquirectangularReflectionMapping,
  MeshMatcapMaterial,
  PlaneGeometry,
  MeshBasicMaterial,
  CanvasTexture,
} from "three";

import { Scene } from "@/webgl/globals/Scene";
import { Flap } from "@/webgl/entities/Flap";

import { AssetController } from "@/webgl/controllers/AssetController";
import { ScreenController } from "@/webgl/controllers/ScreenController";

import { CABINET_MESHES, CABINET_TRAYS } from "@/webgl/config/cabinet";
import { Vec3 } from "@/webgl/config/types";

export class Cabinet {
  assetController = AssetController.getInstance();

  scene: Scene;
  matcapMain?: MeshMatcapMaterial;
  matcapSub?: MeshMatcapMaterial;
  cabinet: Group;
  screenController: ScreenController;

  constructor(scene: Scene) {
    this.scene = scene;
    this.cabinet = new Group();
    this.screenController = new ScreenController(this.scene);

    this.init();
  }

  init() {
    this.screenController.init();

    if (this.assetController.matcaps) {
      this.assetController.matcaps.forEach((item) => {
        if (item.name === "matcap_cosmic_latte") this.matcapMain = item.matcap;
        if (item.name === "matcap_cosmic_americano")
          this.matcapSub = item.matcap;
      });
    }

    CABINET_MESHES.forEach((component) => {
      this.createMesh(
        component.id,
        component.size,
        component.position,
        component.rotation,
        component.castShadow,
        component.mainMatcap
      );
    });

    CABINET_TRAYS.forEach((tray: Vec3, index) => {
      this.createTray(tray.x, tray.y, tray.z, index);
    });

    this.createWindow();

    new Flap(this.scene);

    this.cabinet.castShadow = true;

    this.scene.add(this.cabinet);
  }

  createMesh(
    id: string,
    size: Vec3,
    position: Vec3,
    rotation: Vec3,
    castShadow: boolean,
    mainMatcap: boolean
  ) {
    const geometry = new BoxGeometry(size.x, size.y, size.z);
    const material = mainMatcap ? this.matcapMain : this.matcapSub;
    const mesh = new Mesh(geometry, material);

    mesh.position.set(position.x, position.y, position.z);
    mesh.rotation.set(rotation.x, rotation.y, rotation.z);

    mesh.name = id;
    if (castShadow) mesh.castShadow = true;

    this.cabinet.add(mesh);
  }

  createTray(x: number, y: number, z: number, i: number) {
    if (!this.assetController.matcaps) return;

    const geometry = new BoxGeometry(3.5, 2, 0.1);
    const material = this.matcapSub;
    const mesh = new Mesh(geometry, material);

    mesh.position.set(x, y, z);
    mesh.rotation.x = Math.PI / 2;

    this.cabinet.add(mesh);

    const labels = [-1.6, -0.6, 0.4];
    labels.forEach((x, j) => {
      this.createTrayLabel(x, y, 2.01, `${i}${j + 1}`);
    });
  }

  createTrayLabel(x: number, y: number, z: number, label: string) {
    if (!this.assetController.matcaps) return;

    const geometry = new PlaneGeometry(0.2, 0.1, 1);

    const ctx = document
      .createElement("canvas")
      .getContext("2d") as CanvasRenderingContext2D;
    ctx.canvas.width = 256;
    ctx.canvas.height = 128;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = `bold 75px IBM Plex Mono`;
    ctx.fillText(label, 75, 85);

    const texture = new CanvasTexture(ctx.canvas);
    const material = new MeshBasicMaterial({
      map: texture,
    });

    const mesh = new Mesh(geometry, material);

    mesh.position.set(x, y, z);

    this.cabinet.add(mesh);
  }

  createWindow() {
    if (!this.assetController.hdrs) return;

    const hdr = this.assetController.hdrs[0];
    hdr.mapping = EquirectangularReflectionMapping;

    const geometry = new BoxGeometry(3.5, 5.25, 0.1);
    const material = new MeshPhysicalMaterial({
      color: 0x666d70,
      emissive: 0x000000,
      transparent: true,
      opacity: 0.1,
      roughness: 0.3,
      metalness: 0,
      transmission: 0,
      reflectivity: 1,
      clearcoat: 1,
      envMap: hdr,
      ior: 1.5,
    });
    const mesh = new Mesh(geometry, material);

    mesh.position.set(-0.5, 1, 2.75);
    mesh.name = "glass";

    this.cabinet.add(mesh);
  }
}
