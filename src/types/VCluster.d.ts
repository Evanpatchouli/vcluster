declare namespace VCluster {
  type ServiceConfig = {
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
  }
  type PkgConfig = {
    id?: string;
    name: string;
    desc: string;
    apps: ServiceConfig[]
  }

  type Resp<T> = {
    ok: boolean;
    code: number;
    type: number|null;
    msg: string;
    data: T|null;
  }

  type PkgMenu = { 
    idx: number;
    id: String;
    show: boolean;
    anchor: {
      top: number;
      left: number;
    }
  }
}

