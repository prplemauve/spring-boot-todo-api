/*
SQLyog Community v13.1.9 (64 bit)
MySQL - 8.0.36 : Database - todolist
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`todolist` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `todolist`;

/*Table structure for table `todo_items` */

DROP TABLE IF EXISTS `todo_items`;

CREATE TABLE `todo_items` (
  `id` bigint NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_complete` bit(1) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `todo_items` */

insert  into `todo_items`(`id`,`created_at`,`description`,`is_complete`,`updated_at`) values 
(1,'2024-07-16 10:00:00.000000','Buy groceries','\0','2024-07-17 08:55:17.174921'),
(2,'2024-07-16 11:00:00.000000','Clean the house','','2024-07-16 11:00:00.000000'),
(3,'2024-07-16 12:00:00.000000','Finish project report','\0','2024-07-16 12:00:00.000000'),
(4,'2024-07-16 13:00:00.000000','Call the bank','','2024-07-17 08:07:10.361667'),
(7,'2024-07-16 16:00:00.000000','Attend team meeting','','2024-07-16 14:56:42.853723'),
(104,'2024-07-17 08:14:35.824926','test','','2024-07-17 09:20:59.876643');

/*Table structure for table `todo_items_seq` */

DROP TABLE IF EXISTS `todo_items_seq`;

CREATE TABLE `todo_items_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `todo_items_seq` */

insert  into `todo_items_seq`(`next_val`) values 
(201),
(11);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
