/*
 Navicat Premium Data Transfer

 Source Server         : JelenaEposlovanje
 Source Server Type    : MySQL
 Source Server Version : 100131
 Source Host           : localhost:3306
 Source Schema         : osiguravajuca_kuca

 Target Server Type    : MySQL
 Target Server Version : 100131
 File Encoding         : 65001

 Date: 15/05/2020 12:48:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for accident_policy
-- ----------------------------
DROP TABLE IF EXISTS `accident_policy`;
CREATE TABLE `accident_policy`  (
  `accident_policy_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` int(10) UNSIGNED NOT NULL,
  `starts_at` date NOT NULL,
  `expires_at` date NOT NULL,
  `price` double NOT NULL,
  `condition` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`accident_policy_id`) USING BTREE,
  INDEX `fk_accidend_policy_client_id`(`client_id`) USING BTREE,
  CONSTRAINT `fk_accidend_policy_client_id` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of accident_policy
-- ----------------------------
INSERT INTO `accident_policy` VALUES (1, 1, '2020-05-20', '2020-12-27', 1580, 'Specijalan popust od 50% ukoliko ne bude dodatnih steta');
INSERT INTO `accident_policy` VALUES (2, 2, '2020-05-28', '2021-02-21', 22850, 'Ukoliko klijent isplati celokupan iznos u kesu dobija popust od 20%');
INSERT INTO `accident_policy` VALUES (3, 2, '2020-05-25', '2024-05-18', 125899, 'Ukoliko klijent isplati celokupan iznos u kesu dobija popust od 10%');
INSERT INTO `accident_policy` VALUES (4, 2, '2020-05-15', '2021-05-19', 25000, 'U slucaju prirodne nepogode polisa vazi samo za evropske zemlje ');
INSERT INTO `accident_policy` VALUES (5, 2, '2020-05-15', '2021-05-19', 25000, 'U slucaju prirodne nepogode polisa vazi samo za evropske zemlje ');
INSERT INTO `accident_policy` VALUES (6, 1, '2020-05-15', '2021-05-15', 1269, 'Ble bsdhaskljfa');

-- ----------------------------
-- Table structure for car_insurance_policy
-- ----------------------------
DROP TABLE IF EXISTS `car_insurance_policy`;
CREATE TABLE `car_insurance_policy`  (
  `car_insurance_policy_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` int(10) UNSIGNED NOT NULL,
  `manufacturer` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `model` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `year_of_production` int(4) NOT NULL,
  `vin` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `milage` int(20) NOT NULL,
  `registration_number` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `starts_at` date NOT NULL,
  `expires_at` date NOT NULL,
  `price` double NOT NULL,
  `condition` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`car_insurance_policy_id`) USING BTREE,
  UNIQUE INDEX `uq_car_insurance_policy_vin_registration_number`(`vin`, `registration_number`) USING BTREE,
  INDEX `fk_car_insurance_policy_client_id`(`client_id`) USING BTREE,
  CONSTRAINT `fk_car_insurance_policy_client_id` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of car_insurance_policy
-- ----------------------------
INSERT INTO `car_insurance_policy` VALUES (1, 2, 'Audi', 'A4', 2012, 'JM1NB3538TO153757', 150600, 'BG-1188-KK', '2020-05-21', '2020-11-15', 15000, 'Osiguranje vazi samo u uslovima totalne stete');
INSERT INTO `car_insurance_policy` VALUES (2, 1, 'Seat', 'Ibiza', 2017, 'JM1NB3538TO153999', 16900, 'BG-1186-HJ', '2020-05-12', '2021-03-18', 42000, 'Osiguranje obuhvata kradju, ostecenja izazvana prirodnim nepogodama i saobracajnim nezgodama');
INSERT INTO `car_insurance_policy` VALUES (3, 2, 'BMW', 'M2', 2019, 'WSSZZZ1659HHJJ123', 150000, 'BG-1199-HK', '2020-05-15', '2021-05-19', 25000, 'Polisa pokriva i troskove slep sluzbe ');
INSERT INTO `car_insurance_policy` VALUES (4, 2, 'BMW', '320d', 2015, 'SDKASJLGF46515361SDN', 156999, 'RU-065-CC', '2020-05-15', '2020-11-05', 1369, 'Polisa vazi na teritroiji Evropske Unije');

-- ----------------------------
-- Table structure for client
-- ----------------------------
DROP TABLE IF EXISTS `client`;
CREATE TABLE `client`  (
  `client_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `umcn` varchar(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `forename` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `surname` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`client_id`) USING BTREE,
  UNIQUE INDEX `uq_insured_umcn`(`umcn`) USING BTREE,
  UNIQUE INDEX `uq_insured_email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of client
-- ----------------------------
INSERT INTO `client` VALUES (1, '1509997787978', 'Jelena', 'Krstovic', '06388997744', 'kjelena@gmail.com', 'Neznanog junka 15 Beograd');
INSERT INTO `client` VALUES (2, '2609997789976', 'Nemanja', 'Milutinovic', '06399776655', 'mnemanja@gmail.com', 'Nemanjina 45 Obrenovac');
INSERT INTO `client` VALUES (3, '2210015124578', 'Feli', 'Felic', '065997788', 'feli@gmail.com', 'Nemanjina 70 Obrenovac');

-- ----------------------------
-- Table structure for condition
-- ----------------------------
DROP TABLE IF EXISTS `condition`;
CREATE TABLE `condition`  (
  `condition_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `policy_tipe` enum('accident','fire','car','crop','travel') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `text` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`condition_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of condition
-- ----------------------------
INSERT INTO `condition` VALUES (1, 'accident', 'Uslovi za polisu posledica nesrecnog slucaja', '2020-05-13 15:50:07');
INSERT INTO `condition` VALUES (2, 'accident', 'Uslovi za polisu posledica nesrecnog slucaja', '2020-05-13 15:51:55');
INSERT INTO `condition` VALUES (3, '', 'Uslovi za polisu posledica nesrecnog slucaja', '2020-05-13 15:51:55');

-- ----------------------------
-- Table structure for country
-- ----------------------------
DROP TABLE IF EXISTS `country`;
CREATE TABLE `country`  (
  `country_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`country_id`) USING BTREE,
  UNIQUE INDEX `uq_country_name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of country
-- ----------------------------
INSERT INTO `country` VALUES (2, 'Bosna i Hercegovina');
INSERT INTO `country` VALUES (8, 'Bugarska');
INSERT INTO `country` VALUES (7, 'Grcka');
INSERT INTO `country` VALUES (9, 'Hrvatska');
INSERT INTO `country` VALUES (3, 'Italija');
INSERT INTO `country` VALUES (6, 'Makedonija');
INSERT INTO `country` VALUES (10, 'Republika Austija');
INSERT INTO `country` VALUES (5, 'Slovenija');
INSERT INTO `country` VALUES (4, 'Spanija');
INSERT INTO `country` VALUES (1, 'Srbija');

-- ----------------------------
-- Table structure for crop_insurance_policy
-- ----------------------------
DROP TABLE IF EXISTS `crop_insurance_policy`;
CREATE TABLE `crop_insurance_policy`  (
  `crop_insurance_policy_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` int(10) UNSIGNED NOT NULL,
  `starts_at` date NOT NULL,
  `expires_at` date NOT NULL,
  `price` double NOT NULL,
  `condition` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`crop_insurance_policy_id`) USING BTREE,
  INDEX `fk_crop_insurance_policy_client_id`(`client_id`) USING BTREE,
  CONSTRAINT `fk_crop_insurance_policy_client_id` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of crop_insurance_policy
-- ----------------------------
INSERT INTO `crop_insurance_policy` VALUES (1, 2, '2020-05-16', '2021-05-16', 15896, 'Neki uslov');
INSERT INTO `crop_insurance_policy` VALUES (2, 2, '2020-05-16', '2021-05-16', 15896, 'Neki uslov');
INSERT INTO `crop_insurance_policy` VALUES (3, 2, '2020-05-16', '2021-05-16', 15896, 'Neki uslov');

-- ----------------------------
-- Table structure for crop_insurance_policy_type_of_crop
-- ----------------------------
DROP TABLE IF EXISTS `crop_insurance_policy_type_of_crop`;
CREATE TABLE `crop_insurance_policy_type_of_crop`  (
  `crop_insurance_policy_type_of_crop_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `crop_insurance_policy_id` int(10) UNSIGNED NOT NULL,
  `type_of_crop_id` int(10) UNSIGNED NOT NULL,
  `area_under_culture` double NOT NULL,
  PRIMARY KEY (`crop_insurance_policy_type_of_crop_id`) USING BTREE,
  INDEX `fk_crop_insurance_policy_type_of_crop_crop_insurance_policy_id`(`crop_insurance_policy_id`) USING BTREE,
  INDEX `fk_crop_insurance_policy_type_of_crop_type_of_crop_id`(`type_of_crop_id`) USING BTREE,
  CONSTRAINT `fk_crop_insurance_policy_type_of_crop_crop_insurance_policy_id` FOREIGN KEY (`crop_insurance_policy_id`) REFERENCES `crop_insurance_policy` (`crop_insurance_policy_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_crop_insurance_policy_type_of_crop_type_of_crop_id` FOREIGN KEY (`type_of_crop_id`) REFERENCES `type_of_crop` (`type_of_crop_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of crop_insurance_policy_type_of_crop
-- ----------------------------
INSERT INTO `crop_insurance_policy_type_of_crop` VALUES (1, 1, 1, 150);
INSERT INTO `crop_insurance_policy_type_of_crop` VALUES (2, 3, 1, 150);
INSERT INTO `crop_insurance_policy_type_of_crop` VALUES (3, 3, 2, 150);

-- ----------------------------
-- Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee`  (
  `employee_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`employee_id`) USING BTREE,
  UNIQUE INDEX `uq_employee_username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of employee
-- ----------------------------
INSERT INTO `employee` VALUES (1, 'jelena', '4FEB75CC3114D98D990D3074DBC11E81C36FE02E1269AFB3B36ABCB2BC6EBC50B3DC0569569C16D838FF3D02E4F886A636D49A15C1E9FCA35660FFC2046B05D6');
INSERT INTO `employee` VALUES (2, 'nemanja', '9a6d124632754e72cef231195d8f4b049743df4e150d884af6aa7cfe3ae424e0e7816c8426fdca36b5ec383a6d8ac7c2659896eb42e9ea7c501edae8e7245e42\r\n');
INSERT INTO `employee` VALUES (3, 'akrstovic', '9D1B1DB471F692E6736119A0AF99BF5E20D4DB137E75A6665DDDABE58DBACB2A35A2B5A726D4D66C15F3B17B72193EB79C513CCFD377F47164C261837EC0AF87');
INSERT INTO `employee` VALUES (5, 'mmilic', '2873B9E1758A7AB8AA699E759EE527C0B5D67BC2EC2EFCECD4ED1571F553FE3B4A2AD9660E04B09737F2B30E233F52F50238D02D7488C529F794CEE74D4D8343');
INSERT INTO `employee` VALUES (7, 'vkrstovic', 'A82F487B203A97EB2D2B0B7477D08939AFC8F7D1705DDFACCC1DC73A35AC1E4CEE858F1F1448A9BA2D209BEBD702BA63B8D0BBD3D125A9C5A02BA0AF5D72235A');
INSERT INTO `employee` VALUES (8, 'admin', 'C7AD44CBAD762A5DA0A452F9E854FDC1E0E7A52A38015F23F3EAB1D80B931DD472634DFAC71CD34EBC35D16AB7FB8A90C81F975113D6C7538DC69DD8DE9077EC');

-- ----------------------------
-- Table structure for fire_insurance_policy
-- ----------------------------
DROP TABLE IF EXISTS `fire_insurance_policy`;
CREATE TABLE `fire_insurance_policy`  (
  `fire_insurance_policy_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` int(10) UNSIGNED NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `area` double NOT NULL,
  `year_of_construction` int(4) NOT NULL,
  `risk_assesment` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `starts_at` date NOT NULL,
  `expires_at` date NOT NULL,
  `condition` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`fire_insurance_policy_id`) USING BTREE,
  INDEX `fk_fire_insurance_policy_client_id`(`client_id`) USING BTREE,
  CONSTRAINT `fk_fire_insurance_policy_client_id` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of fire_insurance_policy
-- ----------------------------
INSERT INTO `fire_insurance_policy` VALUES (1, 1, 'Nemanjina 31 ', 150, 2008, '80%', '2020-05-27', '2024-01-11', 'Osiguranje ne pokriva stetu izazvanu namerno ', 15000);
INSERT INTO `fire_insurance_policy` VALUES (2, 2, 'Dudovi 145', 250, 2010, '40%', '2020-05-31', '2020-10-31', 'Osiguranje se odnosi na pozare izazvane strunim instalacijama', 1300);
INSERT INTO `fire_insurance_policy` VALUES (3, 1, 'Dragoslava Srejovica 25 Beograd', 150, 2005, 'Visoki rizik od pozara - potkrovlje', '2020-05-15', '2021-05-19', 'Polisa pokriva troskove krovne strukture', 12000);
INSERT INTO `fire_insurance_policy` VALUES (4, 1, '8. marta 11 Simanovci', 150, 2015, 'Srednji rizik od pozara', '2020-05-16', '2021-05-16', 'Pozar izazavan eksplozijom plinske boce nece biti osiguran.', 12000);

-- ----------------------------
-- Table structure for travel_insurance_policy
-- ----------------------------
DROP TABLE IF EXISTS `travel_insurance_policy`;
CREATE TABLE `travel_insurance_policy`  (
  `travel_insurance_policy_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `client_id` int(10) UNSIGNED NOT NULL,
  `starts_at` date NOT NULL,
  `expires_at` date NOT NULL,
  `condition` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`travel_insurance_policy_id`) USING BTREE,
  INDEX `fk_travel_insurance_policy_client_id`(`client_id`) USING BTREE,
  CONSTRAINT `fk_travel_insurance_policy_client_id` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of travel_insurance_policy
-- ----------------------------
INSERT INTO `travel_insurance_policy` VALUES (1, 1, '2020-05-16', '2021-05-16', 'Neki uslov', 15896);
INSERT INTO `travel_insurance_policy` VALUES (2, 1, '2020-05-16', '2021-05-16', 'Neki uslov', 15896);
INSERT INTO `travel_insurance_policy` VALUES (3, 1, '2020-05-16', '2021-05-16', 'Neki uslov', 15896);
INSERT INTO `travel_insurance_policy` VALUES (4, 1, '2020-05-16', '2021-05-16', 'Neki uslov', 15896);
INSERT INTO `travel_insurance_policy` VALUES (5, 1, '2020-05-16', '2021-05-16', 'Neki uslov', 15896);
INSERT INTO `travel_insurance_policy` VALUES (6, 1, '2020-05-16', '2021-05-16', 'Neki uslov', 15896);
INSERT INTO `travel_insurance_policy` VALUES (7, 1, '2020-05-16', '2021-05-16', 'Neki uslov', 15896);
INSERT INTO `travel_insurance_policy` VALUES (8, 1, '2020-05-16', '2021-05-16', 'Neki uslov', 15896);

-- ----------------------------
-- Table structure for travel_insurance_policy_country
-- ----------------------------
DROP TABLE IF EXISTS `travel_insurance_policy_country`;
CREATE TABLE `travel_insurance_policy_country`  (
  `travel_insurance_policy_country_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `travel_insurance_policy_id` int(10) UNSIGNED NOT NULL,
  `country_id` int(11) UNSIGNED NOT NULL,
  `type` enum('starting_point','destination','transit') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'starting_point',
  PRIMARY KEY (`travel_insurance_policy_country_id`) USING BTREE,
  INDEX `fk_travel_insurance_policy_country_travel_insurance_policy_id`(`travel_insurance_policy_id`) USING BTREE,
  INDEX `fk_travel_insurance_policy_country_country_id`(`country_id`) USING BTREE,
  CONSTRAINT `fk_travel_insurance_policy_country_country_id` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_travel_insurance_policy_country_travel_insurance_policy_id` FOREIGN KEY (`travel_insurance_policy_id`) REFERENCES `travel_insurance_policy` (`travel_insurance_policy_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of travel_insurance_policy_country
-- ----------------------------
INSERT INTO `travel_insurance_policy_country` VALUES (1, 1, 2, 'transit');
INSERT INTO `travel_insurance_policy_country` VALUES (2, 1, 1, 'starting_point');
INSERT INTO `travel_insurance_policy_country` VALUES (3, 2, 2, 'transit');
INSERT INTO `travel_insurance_policy_country` VALUES (4, 2, 1, 'starting_point');
INSERT INTO `travel_insurance_policy_country` VALUES (5, 3, 2, 'transit');
INSERT INTO `travel_insurance_policy_country` VALUES (6, 3, 1, 'starting_point');
INSERT INTO `travel_insurance_policy_country` VALUES (7, 4, 2, 'transit');
INSERT INTO `travel_insurance_policy_country` VALUES (8, 4, 1, 'starting_point');
INSERT INTO `travel_insurance_policy_country` VALUES (9, 5, 2, 'transit');
INSERT INTO `travel_insurance_policy_country` VALUES (10, 5, 1, 'starting_point');
INSERT INTO `travel_insurance_policy_country` VALUES (11, 6, 2, 'transit');
INSERT INTO `travel_insurance_policy_country` VALUES (12, 6, 1, 'starting_point');
INSERT INTO `travel_insurance_policy_country` VALUES (13, 7, 2, 'transit');
INSERT INTO `travel_insurance_policy_country` VALUES (14, 7, 1, 'starting_point');
INSERT INTO `travel_insurance_policy_country` VALUES (15, 8, 2, 'transit');
INSERT INTO `travel_insurance_policy_country` VALUES (16, 8, 1, 'starting_point');

-- ----------------------------
-- Table structure for type_of_crop
-- ----------------------------
DROP TABLE IF EXISTS `type_of_crop`;
CREATE TABLE `type_of_crop`  (
  `type_of_crop_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_subsidized` tinyint(1) UNSIGNED NOT NULL,
  `subsidy_program` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `source_of_finance` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `price_per_month_per_acre` double NOT NULL,
  PRIMARY KEY (`type_of_crop_id`) USING BTREE,
  UNIQUE INDEX `uq_type_of_crop_name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of type_of_crop
-- ----------------------------
INSERT INTO `type_of_crop` VALUES (1, 'psenica', 1, 'Zitarice 2019/2020', 'Budzet Republike Srbije', 20000);
INSERT INTO `type_of_crop` VALUES (2, 'grozdje', 0, NULL, NULL, 6000);
INSERT INTO `type_of_crop` VALUES (3, 'jecam', 0, NULL, NULL, 2000);

SET FOREIGN_KEY_CHECKS = 1;
