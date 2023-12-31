declare namespace VCluster {
  type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";
  interface ServiceConfig {
    id?: string;
    cluster_id?: string;
    /** name of this app*/
    name: string;
    /** description of this app*/
    desc: string;
    /** which net-port will this app use*/
    port?: number;

    start: {
      /** the directory where to execute the script*/
      path: string;
      /** executable command or script path, shouldn't `with > file`*/
      script: string;
    };
    useScript?: number;

    log?: string;
    useLog?: number;

    api?: {
      alive?: {
        url?: string;
        method?: ApiMethod;
      };
      start?: {
        url?: string;
        method?: ApiMethod;
      };
      restart?: {
        url?: string;
        method?: ApiMethod;
      };
      stop?: {
        url?: string;
        method?: ApiMethod;
      };
    };
    useApi?: number;

    buildfromApp(app: Partial<ServiceConfig>): ServiceConfig;

    static newfromApp(app: Partial<ServiceConfig>): ServiceConfig;
  }
  class PkgConfig {
    id?: string;
    cluster_id?: string;
    name: string = "";
    desc: string = "";
    apps: ServiceConfig[] = [];

    buildfromPkg(pkg: PkgConfig): PkgConfig;

    static newfromPkg(pkg: PkgConfig): PkgConfig;
  }

  type Resp<T> = {
    ok: boolean;
    code: number;
    type: number | null;
    msg: string;
    data: T | null;
  };

  type PkgMenu = {
    idx: number;
    id: string;
    show: boolean;
    anchor: {
      top: number;
      left: number;
    };
    delModal: boolean;
  };

  type AppMenu = {
    idx: number;
    cluster_id: string;
    id: string;
    show: boolean;
    anchor: {
      top: number;
      left: number;
    };
  };

  type ZodErrorMessage = {
    code: string;
    minimum: number;
    type: string;
    inclusive: boolean;
    message: string;
    path: string[];
  };

  type ClusterManagerDelModalMeta = {
    confirmLoading: boolean;
    type: "cluster" | "app";
    name?: string;
  };

  type Hint<T = any> = T | (string & {});

  type Promisify<T = any> = { [key: keyof T]: Promise<T> };

  type Cluster = {
    id: string;
    name: string;
    desc: "" | (string & {});
    file: string | null;
  };

  interface TauriStoreProxy {
    saveOnChange: boolean;
    save(): Promise<void>;
    values(): Promise<TautiStoreState>;
    set(
      key: VCluster.Hint<keyof TautiStoreState>,
      value: TautiStoreState[keyof TautiStoreState]
    ): Promise<void>;
    get(
      key: VCluster.Hint<keyof TautiStoreState>
    ): Promise<TautiStoreState[keyof TautiStoreState]>;
    del(key: VCluster.Hint<keyof TautiStoreState>): Promise<void>;
    clear(): Promise<void>;
    get updatedAt(): Promise<string>;
    set updatedAt(value: number): Promise<void>;
    get theme(): Promise<"system" | "dark" | "light">;
    set theme(value: "system" | "dark" | "light"): Promise<void>;
    get lang(): Promise<"en" | "cn">;
    set lang(value: "en" | "cn"): Promise<void>;
    get permission(): Promise<VCluster.Hint<VCluster.Permission>[]>;
    set permission(value: VCluster.Hint<VCluster.Permission>[]): Promise<void>;
    get settings(): Promise<VCluster.Settings>;
    set settings(value: VCluster.Settings): Promise<void>;
  }

  type Settings = {
    notification: boolean;
  };
}
