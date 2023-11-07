import tauriStore from "./store";
import { TautiStoreState } from "./type";

export default class TautiStoreProxy {
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
  /**
   * @param value `{number}`
   */
  // @ts-ignore
  set updatedAt(value: any): Promise<void> {
    // @ts-ignore
    this._store.set("updatedAt", new Date(value).toLocaleString());
  }

  get theme(): Promise<"system" | "dark" | "light"> {
    // @ts-ignore
    return this._store.get("theme");
  }
  /**
   * @param value `"system" | "dark" | "light"`
   */
  // @ts-ignore
  set theme(value: any): Promise<void> {
    this.updatedAt = Date.now();
    // @ts-ignore
    this._store.set("theme", value);
  }

  get lang(): Promise<"en" | "cn"> {
    // @ts-ignore
    return this._store.get("lang");
  }
  /**
   * @param value `"en" | "cn"`
   */
  // @ts-ignore
  set lang(value: any): Promise<void> {
    this.updatedAt = Date.now();
    // @ts-ignore
    this._store.set("lang", value);
  }

  get permission(): Promise<TautiStoreState["permission"]> {
    // @ts-ignore
    return this._store.get("permission");
  }
  /**
   * @param value `TautiStoreState["permission"]`
   */
  // @ts-ignore
  set permission(value: any): Promise<void> {
    this.updatedAt = Date.now();
    // @ts-ignore
    this._store.set("permission", value);
  }
}
