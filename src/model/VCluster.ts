export class ServiceConfig {
  id?: string = "";
  cluster_id?: string = "";
  /** name of this app*/
  name: string = "";
  /** description of this app*/
  desc: string = "";
  /** which net-port will this app use*/
  port?: number = 0;
  start: {
    /** the directory where to execute the script*/
    path: string;
    /** executable command or script path, shouldn't `with > file`*/
    script: string;
  };
  useScript?: number = 1;

  log?: string = "log.txt";
  useLog?: number = 1;

  api = {
    alive: {
      url: "",
      method: "GET" as VCluster.ApiMethod,
    },
    start: {
      url: "",
      method: "GET" as VCluster.ApiMethod,
    },
    restart: {
      url: "",
      method: "GET" as VCluster.ApiMethod,
    },
    stop: {
      url: "",
      method: "GET" as VCluster.ApiMethod,
    },
  };
  useApi?: number = 0;

  constructor() {
    this.start = {
      path: "",
      script: "",
    };
  }

  buildfromApp(app: Partial<ServiceConfig>) {
    this.id = app.id;
    this.cluster_id = app.cluster_id;
    this.name = app.name || "";
    this.desc = app.desc || "";
    this.port = app.port;
    this.start = app.start || {
      path: "",
      script: "",
    };
    this.log = app.log;
    return this;
  }

  static newfromApp(app: Partial<ServiceConfig>) {
    let s = new ServiceConfig();
    s.buildfromApp(app);
    return s;
  }
}

export class PkgConfig {
  id?: string;
  name: string = "";
  desc: string = "";
  apps: ServiceConfig[] = [];

  buildfromPkg(pkg: PkgConfig) {
    this.id = pkg.id;
    this.name = pkg.name;
    this.desc = pkg.desc;
    this.apps = JSONX.reparse(pkg.apps);
    return this;
  }

  static newfromPkg(pkg: PkgConfig) {
    let p = new PkgConfig();
    p.id = pkg.id;
    p.name = pkg.name;
    p.desc = pkg.desc;
    p.apps = JSONX.reparse(pkg.apps);
    return p;
  }
}
