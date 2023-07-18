import { invoke } from "@tauri-apps/api/tauri";

export const launch_pkg_by_id = async (id: String) => {
  return await invoke<VCluster.Resp<null>>("launch_pkg_by_id", { pkgId: id});
}

export const launch_app_by_id = async (id: String) => {
  return await invoke<VCluster.Resp<null>>("launch_app_by_id", { appId: id});
}

export const createCluster = async (pkg: VCluster.PkgConfig) => {
  return await invoke<VCluster.Resp<null>>("create_cluster", { pkg });
}

export const getall_cluster = async () => {
  return await invoke<VCluster.Resp<VCluster.PkgConfig[]>>("getall_cluster", {});
}

export const del_cluster_by_pk = async (pk: String) => {
  return await invoke<VCluster.Resp<null>>("del_cluster_by_pk", { pk });
}

export const del_app_by_pk = async (pk: String) => {
  return await invoke<VCluster.Resp<null>>("del_app_by_pk", { pk });
}

export const kill_port = async (port: number) => {
  return await invoke("kill", { port });
}

export const MyState = {
  get: async ()=> {
    return await invoke<{}>("get", { });
  },

  change: async (state: {user:String})=> {
    return await invoke<{}>("change", { state });
  }
}

const Api = {
  launch_pkg_by_id,
  createCluster,
  getall_cluster,
  del_cluster_by_pk,
  del_app_by_pk,
  launch_app_by_id,
  kill_port,
  MyState
}

export default Api;