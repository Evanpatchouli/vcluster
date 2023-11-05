import tauriStore from "./store";
import { TautiStoreState } from "./type";

export default class TautiStore {
  private _store = tauriStore;

  saveOnChange = false;

  save() {
    return this._store.save();
  }

  async values(): Promise<TautiStoreState> {
    // @ts-ignore
    const values = await this._store.entries();
    const obj: Partial<TautiStoreState> = {};
    for (const [key, value] of values) {
      // @ts-ignore
      obj[key] = value;
    }
    return obj as TautiStoreState;
  }

  set(
    key: VCluster.Hint<keyof TautiStoreState>,
    value: TautiStoreState[keyof TautiStoreState]
  ): Promise<void> {
    this.updatedAt = Date.now();
    // @ts-ignore
    return this._store.set(key, value);
  }

  get(
    key: VCluster.Hint<keyof TautiStoreState>
  ): Promise<TautiStoreState[keyof TautiStoreState]> {
    // @ts-ignore
    return this._store.get(key);
  }

  del(key: VCluster.Hint<keyof TautiStoreState>): Promise<void> {
    this.updatedAt = Date.now();
    // @ts-ignore
    return this._store.delete(key);
  }

  clear(): Promise<void> {
    // @ts-ignore
    return this._store.clear();
  }

  get updatedAt(): Promise<string> {
    // @ts-ignore
    return this._store.get("updatedAt");
  }
  // @ts-ignore
  set updatedAt(value: number): Promise<void> {
    // @ts-ignore
    this._store.set("updatedAt", new Date(value).toLocaleString());
  }

  get theme(): Promise<"system" | "dark" | "light"> {
    // @ts-ignore
    return this._store.get("theme");
  }
  // @ts-ignore
  set theme(value: "system" | "dark" | "light"): Promise<void> {
    this.updatedAt = Date.now();
    // @ts-ignore
    this._store.set("theme", value);
  }

  get lang(): Promise<"en" | "cn"> {
    // @ts-ignore
    return this._store.get("lang");
  }

  // @ts-ignore
  set lang(value: "en" | "cn"): Promise<void> {
    this.updatedAt = Date.now();
    // @ts-ignore
    this._store.set("lang", value);
  }
}
