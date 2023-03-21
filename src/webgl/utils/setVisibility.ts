import { Group, Material, Mesh } from "three";

export const setVisibility = (
  object: Group | Mesh,
  show: boolean,
  castShadow?: boolean
) => {
  object.traverse((node) => {
    const object = node as Mesh;

    if (object.isMesh) {
      const material = object.material as Material;

      material.transparent = true;
      material.opacity = show ? 1 : 0;
      node.castShadow = castShadow ? true : false;
    }
  });
};
