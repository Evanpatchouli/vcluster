/*
 Navicat Premium Data Transfer

 Source Server         : vcluster
 Source Server Type    : SQLite
 Source Server Version : 3035005
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3035005
 File Encoding         : 65001

 Date: 14/07/2023 09:30:36
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for cluster
-- ----------------------------
DROP TABLE IF EXISTS "cluster";
CREATE TABLE "cluster" (
  "id" text NOT NULL,
  "name" text,
  "desc" text,
  "file" text,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Table structure for subapp
-- ----------------------------
DROP TABLE IF EXISTS "subapp";
CREATE TABLE "subapp" (
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
