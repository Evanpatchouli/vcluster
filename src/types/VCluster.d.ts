declare namespace VCluster {
  type ServiceConfig = {
    /** name of this app*/
    name: string;
    /** description of this app*/
    desc: string;
    /** which net-port will this app use*/
    port: number;
    start: {
      /** the directory where to execute the script*/
      path: string;
      /** executable command or script path, shouldn't `with > file`*/
      script: string;
    }
  }
  type PkgConfig = {
    name: string;
    desc: string;
    apps: ServiceConfig[]
  }
}