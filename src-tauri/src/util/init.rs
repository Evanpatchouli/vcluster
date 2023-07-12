// use crate::RB;

// pub async fn main() {
//     let rb = RB.clone();
//     let sql = "/*
//     Navicat Premium Data Transfer
   
//     Source Server         : localhost_3306
//     Source Server Type    : MySQL
//     Source Server Version : 50739
//     Source Host           : localhost:3306
//     Source Schema         : mall-order-e
   
//     Target Server Type    : MySQL
//     Target Server Version : 50739
//     File Encoding         : 65001
   
//     Date: 26/06/2023 10:46:40
//    */
   
//    SET NAMES utf8mb4;
//    SET FOREIGN_KEY_CHECKS = 0;
   
//    -- ----------------------------
//    -- Table structure for goodimg
//    -- ----------------------------
//    DROP TABLE IF EXISTS `goodimg`;
//    CREATE TABLE `goodimg`  (
//      `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '冗余在订单服务的图片ID',
//      `gid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '所属商品ID',
//      `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '图片地址',
//      PRIMARY KEY (`id`) USING BTREE,
//      INDEX `gid`(`gid`) USING BTREE,
//      CONSTRAINT `gid` FOREIGN KEY (`gid`) REFERENCES `orderitem` (`gid`) ON DELETE RESTRICT ON UPDATE RESTRICT
//    ) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;
   
//    -- ----------------------------
//    -- Table structure for order
//    -- ----------------------------
//    DROP TABLE IF EXISTS `order`;
//    CREATE TABLE `order`  (
//      `oid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '主键订单雪花ID',
//      `bname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '客户名称',
//      `bphone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '客户电话',
//      `province` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '省名',
//      `city` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '市名',
//      `county` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '县名',
//      `baddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '客户地址',
//      `money` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '总金额',
//      `ostate` int(2) NOT NULL DEFAULT 0 COMMENT '订单状态',
//      `otype` int(1) NOT NULL DEFAULT 0 COMMENT '订单类型',
//      `uid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商户UID',
//      `stime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '开始时间',
//      `etime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '结束时间',
//      `cid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '客户UID',
//      PRIMARY KEY (`oid`) USING BTREE
//    ) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;
   
//    -- ----------------------------
//    -- Table structure for orderitem
//    -- ----------------------------
//    DROP TABLE IF EXISTS `orderitem`;
//    CREATE TABLE `orderitem`  (
//      `id` int(11) NOT NULL AUTO_INCREMENT,
//      `oid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '所属订单ID',
//      `uid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '所属商户UID',
//      `gid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商品ID',
//      `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商品名',
//      `num` int(11) NOT NULL COMMENT '购买数量',
//      PRIMARY KEY (`id`) USING BTREE,
//      INDEX `oid`(`oid`) USING BTREE,
//      INDEX `gid`(`gid`) USING BTREE
//    ) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;
   
//    SET FOREIGN_KEY_CHECKS = 1;   
//    ";
//     rb.exec(sql, vec![]).await.unwrap();
// }