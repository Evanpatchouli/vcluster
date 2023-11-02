declare namespace VCluster {
  class ServiceConfig {
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
    log?: string;

    buildfromApp(app: ServiceConfig): ServiceConfig;

    static newfromApp(app: ServiceConfig): ServiceConfig;
  }
  class PkgConfig {
    id?: string;
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
    id: String;
    show: boolean;
    anchor: {
      top: number;
      left: number;
    };
    delModal: boolean;
  };

  type AppMenu = {
    idx: number;
    cluster_id: String;
    id: String;
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
}
