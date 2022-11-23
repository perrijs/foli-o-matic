import {
  Raycaster,
  Vector2,
  Object3D,
  Intersection,
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { Renderer } from "./globals/Renderer";
import { Scene } from "./globals/Scene";
import { Camera } from "./globals/Camera";
import { AmbientLight } from "./globals/AmbientLight";
import { DirectionalLight } from "./globals/DirectionalLight";

import { AssetController } from "./controllers/AssetController";
import { ItemController } from "./controllers/ItemController";

export class WorldAlt {
  renderer: Renderer;
  scene = Scene.getInstance();
  camera = Camera.getInstance();
  ambientLight = AmbientLight.getInstance();
  directionalLight = DirectionalLight.getInstance();

  assetController = AssetController.getInstance();
  itemController = ItemController.getInstance();

  controls?: OrbitControls;
  raycaster?: Raycaster;
  pointer?: Vector2;
  intersections?: Intersection<Object3D<Event>>[];

  isMain?: boolean;
  isZoomed?: boolean;
  canSelect?: boolean;
  canvasParent: HTMLDivElement;

  constructor(canvasParent: HTMLDivElement) {
    this.renderer = new Renderer(canvasParent);

    this.canvasParent = canvasParent;

    this.init();
  }

  async init() {
    document.body.style.height = "100vh";

    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.update();
    this.camera.position.set(0, 0, 5);
    this.camera.lookAt(0, 0, 0);

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);
    this.scene.add(cube);

    this.renderer.setAnimationLoop(() => this.render());
    this.canvasParent.appendChild(this.renderer.domElement);
  }

  render() {
    // if (this.controls) this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }
}
