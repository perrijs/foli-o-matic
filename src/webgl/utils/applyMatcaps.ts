import { Mesh, MeshMatcapMaterial } from "three";

import { Matcap } from "@/webgl/config/types";

export const applyMatcaps = (matcaps: Matcap[], mesh: Mesh) => {
  let material = mesh.material as MeshMatcapMaterial;

  matcaps.forEach((matcap) => {
    if (mesh.material) {
      if (material.name.includes(matcap.name)) mesh.material = matcap.matcap;
    }
  });
};
