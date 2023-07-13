import { invoke } from "@tauri-apps/api/tauri";

export const createCluster = async (pkg: VCluster.PkgConfig) => {
  return await invoke("create_cluster", { pkg });
}