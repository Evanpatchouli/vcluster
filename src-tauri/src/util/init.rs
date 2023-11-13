use crate::RB;

pub async fn main() {
  db_init().await;
}

async fn db_init() {
  let rb = RB.clone();
  let sql = 
r#"
PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for cluster
-- ----------------------------
CREATE TABLE IF NOT EXISTS "cluster" (
  "id" text NOT NULL,
  "name" text,
  "desc" text,
  "file" text,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Table structure for subapp
-- ----------------------------
CREATE TABLE IF NOT EXISTS "subapp" (
  "id" text NOT NULL,
  "cluster_id" text,
  "name" text,
  "desc" text,
  "port" integer,
  "path" text,
  "start_script" text,
  "use_script" integer,
  "log" text,
  "use_log" integer,
  "api_alive" text,
  "api_start" text,
  "api_stop" text,
  "api_restart" text,
  "use_api" integer,
  PRIMARY KEY ("id")
);

PRAGMA foreign_keys = true;
"#;
  rb.exec(sql, vec![]).await.unwrap();
}