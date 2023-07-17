export class ServiceConfig  {
  id?: string = '';
  cluster_id?: string = '';
  /** name of this app*/
  name: string = 'sub-app';
  /** description of this app*/
  desc: string = '';
  /** which net-port will this app use*/
  port?: number = 0;
  start: {
    /** the directory where to execute the script*/
    path: string;
    /** executable command or script path, shouldn't `with > file`*/
    script: string;
  };
  log?: string = "log.txt"

  constructor() {
    this.start = {
      path: "", script: ""
    };
  }

  buildfromApp(app: ServiceConfig){
    this.id = app.id;
    this.name = app.name;
    this.desc = app.desc;
    this.port = app.port;
    this.start = app.start;
    this.log = app.log;
    return this;
  }

  static newfromApp(app: ServiceConfig){
    let s = new ServiceConfig();
    s.buildfromApp(app);
    return s;
  }
}

export class PkgConfig {
  id?: string;
  name: string = "";
  desc: string = "";
  apps: ServiceConfig[] = []

  buildfromPkg(pkg: PkgConfig){
    this.id = pkg.id;
    this.name = pkg.name;
    this.desc = pkg.desc;
    this.apps = JSON.parse(JSON.stringify(pkg.apps));
    return this;
  }

  static newfromPkg(pkg: PkgConfig){
    let p = new PkgConfig();
    p.id = pkg.id;
    p.name = pkg.name;
    p.desc = pkg.desc;
    p.apps = JSON.parse(JSON.stringify(pkg.apps));
    return p;
  }
}