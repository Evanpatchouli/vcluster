import { invoke } from "@tauri-apps/api/tauri";

export const createCluster = async (pkg: VCluster.PkgConfig) => {
  return await invoke<VCluster.Resp<null>>("create_cluster", { pkg });
}

export const getall_cluster = async () => {
  return await invoke<VCluster.Resp<VCluster.PkgConfig[]>>("getall_cluster", {});
}

export const del_cluster_by_pk = async (pk: String) => {
  return await invoke<VCluster.Resp<null>>("del_cluster_by_pk", { pk });
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
  createCluster,
  getall_cluster,
  del_cluster_by_pk,
  MyState
}

export default Api;