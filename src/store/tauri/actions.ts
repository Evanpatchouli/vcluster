import tauriStore from "./store";

const init = () => {
  tauriStore.set("updatedAt", Date.now());
};
