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
  "path" text,
  "port" integer,
  "start_script" text,
  "log" text,
  PRIMARY KEY ("id")
);

PRAGMA foreign_keys = true;