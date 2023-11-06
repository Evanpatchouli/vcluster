import TautiStoreProxy from "./proxy";

declare global {
  interface Window {
    TauriStore: TautiStoreProxy;
  }
}

const __tauriStoreProxy = new TautiStoreProxy();

declare global {
  const TauriStore: TautiStoreProxy;
}

window.TauriStore = __tauriStoreProxy;
