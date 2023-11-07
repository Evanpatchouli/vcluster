import TautiStoreProxy from "./proxy";

declare global {
  interface Window {
    TauriStore: VCluster.TauriStoreProxy;
  }
}

const __tauriStoreProxy = new TautiStoreProxy();

declare global {
  const TauriStore: VCluster.TauriStoreProxy;
}

window.TauriStore = __tauriStoreProxy;
