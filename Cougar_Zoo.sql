-- MySQL dump 10.13  Distrib 8.0.36, for Linux (aarch64)
--
-- Host: localhost    Database: Cougar_Zoo
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ANIMALS`
--

DROP TABLE IF EXISTS `ANIMALS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ANIMALS` (
  `Animal_ID` int NOT NULL AUTO_INCREMENT,
  `Habitat_ID` int DEFAULT NULL,
  `Name` varchar(45) NOT NULL,
  `Weight` float(5,2) NOT NULL,
  `Height` float(5,2) NOT NULL,
  `Birth_Date` date NOT NULL,
  `Species` varchar(45) NOT NULL,
  PRIMARY KEY (`Animal_ID`),
  KEY `fk_ANIMALS_HABITATS1_idx` (`Habitat_ID`),
  CONSTRAINT `fk_ANIMALS_HABITATS1` FOREIGN KEY (`Habitat_ID`) REFERENCES `HABITATS` (`Habitat_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ANIMAL_HEALTH`
--

DROP TABLE IF EXISTS `ANIMAL_HEALTH`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ANIMAL_HEALTH` (
  `Health_ID` int NOT NULL AUTO_INCREMENT,
  `Animal_ID` int NOT NULL,
  `Primary_Doctor` int NOT NULL,
  `Description` varchar(45) NOT NULL,
  `Date_Of_Examination` date NOT NULL,
  PRIMARY KEY (`Health_ID`),
  KEY `fk_ANIMAL_HEALTH_ANIMALS_idx` (`Animal_ID`),
  KEY `fk_ANIMAL_HEALTH_EMPLOYEES1_idx` (`Primary_Doctor`),
  CONSTRAINT `fk_ANIMAL_HEALTH_ANIMALS` FOREIGN KEY (`Animal_ID`) REFERENCES `ANIMALS` (`Animal_ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_ANIMAL_HEALTH_EMPLOYEES1` FOREIGN KEY (`Primary_Doctor`) REFERENCES `EMPLOYEES` (`Employee_ID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ATTENDS_TO`
--

DROP TABLE IF EXISTS `ATTENDS_TO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ATTENDS_TO` (
  `Employee_ID` int NOT NULL,
  `Animal_ID` int NOT NULL,
  `Responsibility` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Employee_ID`,`Animal_ID`),
  KEY `fk_EMPLOYEES_has_ANIMALS_ANIMALS1_idx` (`Animal_ID`),
  KEY `fk_EMPLOYEES_has_ANIMALS_EMPLOYEES1_idx` (`Employee_ID`),
  CONSTRAINT `fk_EMPLOYEES_has_ANIMALS_ANIMALS1` FOREIGN KEY (`Animal_ID`) REFERENCES `ANIMALS` (`Animal_ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_EMPLOYEES_has_ANIMALS_EMPLOYEES1` FOREIGN KEY (`Employee_ID`) REFERENCES `EMPLOYEES` (`Employee_ID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `COMPLAINTS`
--

DROP TABLE IF EXISTS `COMPLAINTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COMPLAINTS` (
  `Complaint_ID` int NOT NULL AUTO_INCREMENT,
  `Customer_ID` int DEFAULT NULL,
  `Description` varchar(45) NOT NULL,
  `Date_Created` date NOT NULL,
  PRIMARY KEY (`Complaint_ID`),
  KEY `fk_COMPLAINTS_CUSTOMERS1_idx` (`Customer_ID`),
  CONSTRAINT `fk_COMPLAINTS_CUSTOMERS1` FOREIGN KEY (`Customer_ID`) REFERENCES `CUSTOMERS` (`Customer_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CUSTOMERS`
--

DROP TABLE IF EXISTS `CUSTOMERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CUSTOMERS` (
  `Customer_ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Address` varchar(45) DEFAULT NULL,
  `Phone` varchar(15) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`Customer_ID`),
  KEY `fk_CUSTOMERS_users` (`user_id`),
  CONSTRAINT `fk_CUSTOMERS_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `EMPLOYEES`
--

DROP TABLE IF EXISTS `EMPLOYEES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EMPLOYEES` (
  `Employee_ID` int NOT NULL AUTO_INCREMENT,
  `Supervisor_ID` int DEFAULT NULL,
  `Shop_ID` int DEFAULT NULL,
  `Habitat_ID` int DEFAULT NULL,
  `Restaurant_ID` int DEFAULT NULL,
  `Fname` varchar(45) NOT NULL,
  `Lname` varchar(45) NOT NULL,
  `SSN` char(11) DEFAULT NULL,
  `Gender` varchar(10) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Address` varchar(45) NOT NULL,
  `Birth_Date` date NOT NULL,
  `Start_Date` date NOT NULL,
  `user_id` int NOT NULL,
  `isManager` tinyint(1) NOT NULL DEFAULT '0',
  `isMedic` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Employee_ID`),
  UNIQUE KEY `SSN_UNIQUE` (`SSN`),
  KEY `fk_EMPLOYEES_EMPLOYEES1_idx` (`Supervisor_ID`),
  KEY `fk_EMPLOYEES_SHOPS1_idx` (`Shop_ID`),
  KEY `fk_EMPLOYEES_HABITATS1_idx` (`Habitat_ID`),
  KEY `fk_EMPLOYEES_RESTAURANTS1_idx` (`Restaurant_ID`),
  KEY `fk_EMPLOYEES_users` (`user_id`),
  CONSTRAINT `fk_EMPLOYEES_EMPLOYEES1` FOREIGN KEY (`Supervisor_ID`) REFERENCES `EMPLOYEES` (`Employee_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_EMPLOYEES_HABITATS1` FOREIGN KEY (`Habitat_ID`) REFERENCES `HABITATS` (`Habitat_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_EMPLOYEES_RESTAURANTS1` FOREIGN KEY (`Restaurant_ID`) REFERENCES `RESTAURANTS` (`Restaurant_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_EMPLOYEES_SHOPS1` FOREIGN KEY (`Shop_ID`) REFERENCES `SHOPS` (`Shop_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_EMPLOYEES_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `HABITATS`
--

DROP TABLE IF EXISTS `HABITATS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HABITATS` (
  `Habitat_ID` int NOT NULL AUTO_INCREMENT,
  `Zone_ID` int NOT NULL,
  `Status` enum('Open','Close') NOT NULL,
  `Date_Opened` date DEFAULT NULL,
  PRIMARY KEY (`Habitat_ID`),
  KEY `fk_HABITATS_ZONES1_idx` (`Zone_ID`),
  CONSTRAINT `fk_HABITATS_ZONES1` FOREIGN KEY (`Zone_ID`) REFERENCES `ZONES` (`Zone_ID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `HAS_OFFSPRINGS`
--

DROP TABLE IF EXISTS `HAS_OFFSPRINGS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HAS_OFFSPRINGS` (
  `Parent_ID` int NOT NULL,
  `Child_ID` int NOT NULL,
  `Date_Created` date NOT NULL,
  PRIMARY KEY (`Parent_ID`,`Child_ID`),
  KEY `fk_ANIMALS_has_ANIMALS_ANIMALS2_idx` (`Child_ID`),
  KEY `fk_ANIMALS_has_ANIMALS_ANIMALS1_idx` (`Parent_ID`),
  CONSTRAINT `fk_ANIMALS_has_ANIMALS_ANIMALS1` FOREIGN KEY (`Parent_ID`) REFERENCES `ANIMALS` (`Animal_ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_ANIMALS_has_ANIMALS_ANIMALS2` FOREIGN KEY (`Child_ID`) REFERENCES `ANIMALS` (`Animal_ID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ITEMS`
--

DROP TABLE IF EXISTS `ITEMS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ITEMS` (
  `Item_ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Stock` int NOT NULL,
  `Price` float(5,2) NOT NULL,
  PRIMARY KEY (`Item_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2322 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `LOST_ITEMS`
--

DROP TABLE IF EXISTS `LOST_ITEMS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LOST_ITEMS` (
  `Lost_Item_ID` int NOT NULL AUTO_INCREMENT,
  `Customer_ID` int DEFAULT NULL,
  `Description` varchar(45) NOT NULL,
  `Status` enum('Pending','Found') NOT NULL,
  PRIMARY KEY (`Lost_Item_ID`),
  KEY `fk_LOST_ITEMS_CUSTOMERS1_idx` (`Customer_ID`),
  CONSTRAINT `fk_LOST_ITEMS_CUSTOMERS1` FOREIGN KEY (`Customer_ID`) REFERENCES `CUSTOMERS` (`Customer_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=390 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MENUS`
--

DROP TABLE IF EXISTS `MENUS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MENUS` (
  `Menu_ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `Price` varchar(45) NOT NULL,
  `Restaurant_ID` int DEFAULT NULL,
  PRIMARY KEY (`Menu_ID`),
  KEY `fk_Menus_RESTAURANTS1_idx` (`Restaurant_ID`),
  CONSTRAINT `fk_Menus_RESTAURANTS1` FOREIGN KEY (`Restaurant_ID`) REFERENCES `RESTAURANTS` (`Restaurant_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PURCHASES`
--

DROP TABLE IF EXISTS `PURCHASES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PURCHASES` (
  `Item_ID` int NOT NULL,
  `Shop_ID` int NOT NULL,
  `Customer_ID` int NOT NULL,
  `Quantity` int NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (`Item_ID`,`Shop_ID`,`Customer_ID`),
  KEY `fk_ITEMS_has_SHOPS_SHOPS1_idx` (`Shop_ID`),
  KEY `fk_ITEMS_has_SHOPS_CUSTOMERS1_idx` (`Customer_ID`),
  CONSTRAINT `fk_ITEMS_has_SHOPS_CUSTOMERS1` FOREIGN KEY (`Customer_ID`) REFERENCES `CUSTOMERS` (`Customer_ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_ITEMS_has_SHOPS_ITEMS1` FOREIGN KEY (`Item_ID`) REFERENCES `ITEMS` (`Item_ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_ITEMS_has_SHOPS_SHOPS1` FOREIGN KEY (`Shop_ID`) REFERENCES `SHOPS` (`Shop_ID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RESTAURANTS`
--

DROP TABLE IF EXISTS `RESTAURANTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RESTAURANTS` (
  `Restaurant_ID` int NOT NULL AUTO_INCREMENT,
  `Zone_ID` int DEFAULT NULL,
  `Name` varchar(45) NOT NULL,
  `Status` enum('Open','Close') NOT NULL,
  PRIMARY KEY (`Restaurant_ID`),
  KEY `fk_RESTAURANTS_ZONES1_idx` (`Zone_ID`),
  CONSTRAINT `fk_RESTAURANTS_ZONES1` FOREIGN KEY (`Zone_ID`) REFERENCES `ZONES` (`Zone_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RESTAURANT_ORDERS`
--

DROP TABLE IF EXISTS `RESTAURANT_ORDERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RESTAURANT_ORDERS` (
  `Customer_ID` int NOT NULL,
  `Menu_ID` int NOT NULL,
  `Quantity` int NOT NULL,
  `Order_Date` date NOT NULL,
  PRIMARY KEY (`Customer_ID`,`Menu_ID`),
  KEY `fk_CUSTOMERS_has_Menus_Menus1_idx` (`Menu_ID`),
  KEY `fk_CUSTOMERS_has_Menus_CUSTOMERS1_idx` (`Customer_ID`),
  CONSTRAINT `fk_CUSTOMERS_has_Menus_CUSTOMERS1` FOREIGN KEY (`Customer_ID`) REFERENCES `CUSTOMERS` (`Customer_ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_CUSTOMERS_has_Menus_Menus1` FOREIGN KEY (`Menu_ID`) REFERENCES `MENUS` (`Menu_ID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SCHEDULES`
--

DROP TABLE IF EXISTS `SCHEDULES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SCHEDULES` (
  `Schedule_ID` int NOT NULL AUTO_INCREMENT,
  `Type_ID` int NOT NULL,
  `Zone_ID` int DEFAULT NULL,
  `Employee_ID` int DEFAULT NULL,
  `Restaurant_ID` int DEFAULT NULL,
  `Habitat_ID` int DEFAULT NULL,
  `Shop_ID` int DEFAULT NULL,
  `Start_Time` time NOT NULL,
  `End_Time` time NOT NULL,
  `Date` date DEFAULT NULL,
  PRIMARY KEY (`Schedule_ID`),
  KEY `fk_SCHEDULES_SCHEDULE_TYPES1_idx` (`Type_ID`),
  KEY `fk_SCHEDULES_ZONES1_idx` (`Zone_ID`),
  KEY `fk_SCHEDULES_EMPLOYEES1_idx` (`Employee_ID`),
  KEY `fk_SCHEDULES_RESTAURANTS1_idx` (`Restaurant_ID`),
  KEY `fk_SCHEDULES_HABITATS1_idx` (`Habitat_ID`),
  KEY `fk_SCHEDULES_SHOPS1_idx` (`Shop_ID`),
  CONSTRAINT `fk_SCHEDULES_EMPLOYEES1` FOREIGN KEY (`Employee_ID`) REFERENCES `EMPLOYEES` (`Employee_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_SCHEDULES_HABITATS1` FOREIGN KEY (`Habitat_ID`) REFERENCES `HABITATS` (`Habitat_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_SCHEDULES_RESTAURANTS1` FOREIGN KEY (`Restaurant_ID`) REFERENCES `RESTAURANTS` (`Restaurant_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_SCHEDULES_SCHEDULE_TYPES1` FOREIGN KEY (`Type_ID`) REFERENCES `SCHEDULE_TYPES` (`Type_ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_SCHEDULES_SHOPS1` FOREIGN KEY (`Shop_ID`) REFERENCES `SHOPS` (`Shop_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_SCHEDULES_ZONES1` FOREIGN KEY (`Zone_ID`) REFERENCES `ZONES` (`Zone_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SCHEDULE_TYPES`
--

DROP TABLE IF EXISTS `SCHEDULE_TYPES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SCHEDULE_TYPES` (
  `Type_ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(15) NOT NULL,
  PRIMARY KEY (`Type_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `SHOPS`
--

DROP TABLE IF EXISTS `SHOPS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SHOPS` (
  `Shop_ID` int NOT NULL AUTO_INCREMENT,
  `Status` enum('Open','Close') NOT NULL,
  `Name` varchar(45) NOT NULL,
  PRIMARY KEY (`Shop_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TICKETS`
--

DROP TABLE IF EXISTS `TICKETS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TICKETS` (
  `Ticket_ID` int NOT NULL AUTO_INCREMENT,
  `Date_Issued` date NOT NULL,
  `Price` float(4,2) NOT NULL,
  `Customer_ID` int DEFAULT NULL,
  PRIMARY KEY (`Ticket_ID`),
  KEY `fk_TICKETS_CUSTOMERS1_idx` (`Customer_ID`),
  CONSTRAINT `fk_TICKETS_CUSTOMERS1` FOREIGN KEY (`Customer_ID`) REFERENCES `CUSTOMERS` (`Customer_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ZONES`
--

DROP TABLE IF EXISTS `ZONES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ZONES` (
  `Zone_ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Status` enum('Open','Close') NOT NULL,
  `Size` float(10,2) DEFAULT NULL,
  PRIMARY KEY (`Zone_ID`),
  UNIQUE KEY `Name_UNIQUE` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `hashed_password` char(64) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-19 21:38:06
