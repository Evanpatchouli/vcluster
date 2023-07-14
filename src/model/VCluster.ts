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
  log: string = "log.txt"

  constructor() {
    this.start = {
      path: "", script: ""
    };
  }
}