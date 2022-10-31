import { PerspectiveCamera } from "three";

export class Camera extends PerspectiveCamera {
  static instance: Camera;

  constructor() {
    super(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  }

  static getInstance() {
    if (!Camera.instance) Camera.instance = new Camera();

    return Camera.instance;
  }
}
