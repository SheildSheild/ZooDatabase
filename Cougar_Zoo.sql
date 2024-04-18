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
-- Table structure for table `ALERTS`
--

DROP TABLE IF EXISTS `ALERTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ALERTS` (
  `Alert_ID` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(255) NOT NULL,
  `Date_Created` datetime NOT NULL,
  PRIMARY KEY (`Alert_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ALERTS`
--

LOCK TABLES `ALERTS` WRITE;
/*!40000 ALTER TABLE `ALERTS` DISABLE KEYS */;
INSERT INTO `ALERTS` VALUES (1,'Error: Working hours for Employee 2 this week exceed 40.','2024-03-23 20:23:42'),(2,'Animal with ID 0 has been added to a habitat at full capacity.','2024-03-23 20:38:28'),(3,'Animal with ID 0 has been added to a habitat at full capacity.','2024-04-10 14:30:26'),(4,'Animal with ID 0 has been added to a habitat at full capacity.','2024-04-10 14:34:22'),(5,'Animal with ID 0 has been added to a habitat at full capacity.','2024-04-16 21:34:40'),(6,'Animal with ID 0 has been added to a habitat at full capacity.','2024-04-16 21:35:40'),(7,'Animal with ID 0 has been added to a habitat at full capacity.','2024-04-17 20:19:53');
/*!40000 ALTER TABLE `ALERTS` ENABLE KEYS */;
UNLOCK TABLES;

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
  `Mother_ID` int DEFAULT NULL,
  `Father_ID` int DEFAULT NULL,
  PRIMARY KEY (`Animal_ID`),
  KEY `fk_ANIMALS_HABITATS1_idx` (`Habitat_ID`),
  KEY `fk_ANIMALS_MOTHER_ANIMALS1` (`Mother_ID`),
  KEY `fk_ANIMALS_FATHER_ANIMALS1` (`Father_ID`),
  CONSTRAINT `fk_ANIMALS_FATHER_ANIMALS1` FOREIGN KEY (`Father_ID`) REFERENCES `ANIMALS` (`Animal_ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_ANIMALS_HABITATS1` FOREIGN KEY (`Habitat_ID`) REFERENCES `HABITATS` (`Habitat_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_ANIMALS_MOTHER_ANIMALS1` FOREIGN KEY (`Mother_ID`) REFERENCES `ANIMALS` (`Animal_ID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=344 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ANIMALS`
--

LOCK TABLES `ANIMALS` WRITE;
/*!40000 ALTER TABLE `ANIMALS` DISABLE KEYS */;
INSERT INTO `ANIMALS` VALUES (83,5,'Max',290.97,3.43,'2024-03-12','Penguin',325,323),(90,5,'Seb',163.52,1.12,'2010-05-19','Tiger',NULL,NULL),(92,5,'Ella',198.21,1.82,'2018-08-23','Penguin',NULL,NULL),(95,5,'Bella',89.36,2.43,'2021-03-17','Giraffe',NULL,NULL),(96,5,'Ella',182.59,2.09,'2014-04-20','Zebra',NULL,NULL),(98,5,'Zara',270.14,2.35,'2018-05-28','Elephant',NULL,NULL),(99,5,'Max',175.47,3.08,'2013-04-10','Bear',NULL,NULL),(100,5,'Oreo',164.44,3.12,'2018-09-02','Tiger',NULL,NULL),(107,5,'Ella',94.64,4.90,'2016-09-16','Bear',NULL,NULL),(117,5,'Daisy',241.75,1.33,'2015-04-24','Bear',NULL,NULL),(124,5,'Bella',227.35,4.84,'2017-09-09','Penguin',NULL,NULL),(126,5,'Ella',131.78,1.67,'2015-05-04','Rhino',NULL,NULL),(130,5,'Juno',96.22,3.20,'2010-10-31','Lion',NULL,NULL),(137,5,'Oreo',207.80,2.34,'2020-03-21','Rhino',NULL,NULL),(141,5,'Charlie',120.92,3.81,'2010-10-07','Bear',NULL,NULL),(142,5,'Milo',100.91,2.83,'2012-08-20','Lion',NULL,NULL),(144,5,'Luna',238.09,3.90,'2011-08-28','Hippo',NULL,NULL),(147,5,'Kiki',116.35,4.44,'2012-01-28','Tiger',NULL,NULL),(149,5,'Juno',170.96,4.22,'2011-11-03','Giraffe',NULL,NULL),(157,5,'Oreo',179.45,3.76,'2019-04-08','Giraffe',NULL,NULL),(158,5,'Seb',168.58,3.64,'2019-04-27','Giraffe',NULL,NULL),(159,5,'Bella',245.73,2.02,'2017-01-27','Flamingo',NULL,NULL),(161,11,'Daisy',77.35,1.62,'2018-01-11','Penguin',NULL,NULL),(165,10,'Talha',89.18,4.41,'2010-01-14','Elephant',NULL,NULL),(166,11,'Charlie',252.10,3.06,'2012-02-25','Bear',NULL,NULL),(170,10,'Leo',189.58,3.99,'2012-05-02','Lion',NULL,NULL),(171,11,'Seb',154.40,4.91,'2013-01-14','Elephant',NULL,NULL),(172,11,'Leo',66.14,3.72,'2011-08-10','Rhino',NULL,NULL),(177,11,'Kiki',137.93,2.96,'2011-11-10','Bear',NULL,NULL),(181,11,'Luna',145.22,3.86,'2011-04-28','Flamingo',NULL,NULL),(182,10,'Bella',80.02,3.11,'2013-09-19','Giraffe',NULL,NULL),(183,10,'Juno',137.49,3.46,'2015-04-03','Zebra',NULL,NULL),(184,10,'Luna',141.08,3.99,'2010-12-15','Tiger',NULL,NULL),(188,11,'Leo',214.64,2.80,'2018-03-01','Flamingo',NULL,NULL),(201,10,'Oreo',201.00,2.50,'2015-01-15','Elephant',NULL,NULL),(202,11,'Luna',128.43,2.17,'2017-02-27','Rhino',NULL,NULL),(203,10,'Kiki',200.08,3.13,'2015-11-03','Flamingo',NULL,NULL),(211,11,'Bella',56.61,2.08,'2021-04-09','Penguin',NULL,NULL),(212,11,'Seb',290.77,4.42,'2015-07-16','Hippo',NULL,NULL),(216,10,'Angy',110.49,1.61,'2016-02-07','Zebra',NULL,NULL),(219,10,'Ella',126.17,1.92,'2020-07-16','Tiger',NULL,NULL),(220,11,'Charlie',253.95,2.50,'2022-05-19','Rhino',NULL,NULL),(222,10,'Milo',105.56,3.30,'2015-09-24','Lion',NULL,NULL),(226,10,'Talha',120.99,4.79,'2017-03-29','Hippo',NULL,NULL),(227,11,'Oreo',106.47,3.01,'2011-07-11','Tiger',NULL,NULL),(231,10,'Milo',239.94,2.20,'2012-03-25','Hippo',NULL,NULL),(232,11,'Charlie',203.75,1.22,'2013-01-06','Elephant',NULL,NULL),(233,10,'Luna',213.87,4.99,'2014-03-04','Lion',NULL,NULL),(235,10,'Ella',294.85,3.16,'2013-07-11','Lion',NULL,NULL),(236,11,'Oreo',146.35,2.96,'2016-09-05','Giraffe',NULL,NULL),(237,10,'Seb',294.80,2.94,'2019-07-20','Bear',NULL,NULL),(238,10,'Bella',275.51,4.27,'2013-11-05','Lion',NULL,NULL),(239,10,'Luna',211.44,2.71,'2011-05-31','Hippo',NULL,NULL),(243,10,'Zara',284.51,1.68,'2020-05-04','Elephant',NULL,NULL),(247,10,'Talha',273.82,1.60,'2019-03-27','Bear',NULL,NULL),(248,10,'Angy',139.17,3.97,'2012-03-08','Rhino',NULL,NULL),(249,7,'Max',242.97,2.65,'2021-02-19','Giraffe',NULL,NULL),(250,11,'Ella',117.54,2.87,'2017-03-22','Zebra',NULL,NULL),(251,7,'Zara',228.07,4.29,'2022-04-29','Penguin',NULL,NULL),(252,11,'Ella',105.31,4.37,'2011-08-21','Zebra',NULL,NULL),(253,6,'Talha',80.28,2.42,'2016-12-05','Hippo',NULL,NULL),(254,9,'Luna',64.46,2.25,'2018-01-19','Flamingo',NULL,NULL),(255,9,'Ella',264.05,4.05,'2016-06-02','Elephant',NULL,NULL),(256,8,'Milo',161.34,4.41,'2017-08-26','Rhino',NULL,NULL),(257,5,'Angy',172.37,1.45,'2015-02-27','Giraffe',NULL,NULL),(258,8,'Daisy',169.67,1.86,'2020-10-23','Zebra',NULL,NULL),(259,10,'Leo',213.02,4.28,'2017-05-04','Rhino',NULL,NULL),(260,9,'Luna',114.80,1.27,'2016-06-03','Rhino',NULL,NULL),(261,6,'Ella',168.51,2.94,'2016-09-29','Zebra',NULL,NULL),(262,10,'Bella',100.30,3.31,'2016-08-10','Zebra',NULL,NULL),(263,5,'Juno',244.59,3.43,'2024-03-13','Flamingo',NULL,NULL),(264,9,'Luna',51.29,2.87,'2012-07-28','Flamingo',NULL,NULL),(265,10,'Milo',204.42,2.47,'2021-10-19','Bear',NULL,NULL),(266,7,'Charlie',163.05,1.72,'2013-01-26','Elephant',NULL,NULL),(267,9,'Bella',143.66,1.16,'2022-06-30','Zebra',NULL,NULL),(268,5,'Zara',218.40,1.79,'2010-06-05','Elephant',NULL,NULL),(269,10,'Leo',193.64,4.05,'2014-02-08','Flamingo',NULL,NULL),(270,7,'Charlie',95.40,4.04,'2020-06-02','Rhino',NULL,NULL),(271,6,'Angy',147.21,4.92,'2020-03-11','Flamingo',NULL,NULL),(272,7,'Max',225.35,1.04,'2011-04-19','Giraffe',NULL,NULL),(273,8,'Leo',134.49,3.39,'2013-04-18','Elephant',NULL,NULL),(274,10,'Milo',280.48,3.30,'2013-07-12','Hippo',NULL,NULL),(275,5,'Leo',82.06,2.58,'2010-02-05','Tiger',NULL,NULL),(276,6,'Bella',73.63,2.07,'2021-07-18','Elephant',NULL,NULL),(277,11,'Kiki',256.64,1.83,'2012-10-11','Hippo',NULL,NULL),(278,5,'Oreo',208.30,4.62,'2016-01-07','Giraffe',NULL,NULL),(279,5,'Talha',116.82,1.48,'2021-08-20','Giraffe',NULL,NULL),(280,5,'Juno',201.09,1.54,'2012-03-29','Flamingo',NULL,NULL),(281,6,'Kiki',112.02,4.16,'2013-12-07','Zebra',NULL,NULL),(282,5,'Daisy',184.29,3.53,'2018-05-24','Penguin',NULL,NULL),(283,11,'Oreo',299.12,4.42,'2018-02-13','Giraffe',NULL,NULL),(284,8,'Daisy',186.43,4.20,'2012-05-28','Bear',NULL,NULL),(285,6,'Leo',120.95,3.78,'2010-08-17','Penguin',NULL,NULL),(286,11,'Oreo',145.92,4.10,'2013-03-14','Rhino',NULL,NULL),(287,10,'Daisy',226.97,1.44,'2012-02-02','Hippo',NULL,NULL),(288,9,'Leo',282.48,4.44,'2021-05-31','Tiger',NULL,NULL),(289,10,'Talha',155.79,2.74,'2010-12-01','Penguin',NULL,NULL),(290,8,'Charlie',186.82,3.74,'2011-11-23','Flamingo',NULL,NULL),(291,10,'Kiki',254.16,1.55,'2018-11-27','Tiger',NULL,NULL),(292,10,'Daisy',121.44,3.11,'2013-11-29','Lion',NULL,NULL),(293,10,'Angy',251.29,3.90,'2021-07-01','Rhino',NULL,NULL),(294,10,'Seb',178.87,2.99,'2018-12-28','Giraffe',NULL,NULL),(295,10,'Angy',129.59,2.10,'2019-02-14','Penguin',NULL,NULL),(296,8,'Luna',152.92,1.36,'2022-10-06','Giraffe',NULL,NULL),(297,5,'Max',278.97,3.11,'2022-01-31','Lion',NULL,NULL),(298,9,'Daisy',103.58,1.41,'2014-12-20','Hippo',NULL,NULL),(299,6,'Max',276.83,3.67,'2012-08-14','Penguin',NULL,NULL),(300,5,'Luna',118.60,4.97,'2012-04-15','Flamingo',NULL,NULL),(301,5,'Juno',239.56,1.41,'2013-01-30','Penguin',NULL,NULL),(302,6,'Oreo',265.03,2.16,'2012-05-14','Giraffe',NULL,NULL),(303,9,'Oreo',206.18,3.78,'2019-04-14','Elephant',NULL,NULL),(304,7,'Zara',50.52,2.49,'2020-04-19','Lion',NULL,NULL),(305,7,'Leo',77.15,2.60,'2019-08-17','Penguin',NULL,NULL),(306,10,'Angy',152.33,2.98,'2010-08-31','Flamingo',NULL,NULL),(307,9,'Seb',174.42,3.96,'2020-07-14','Zebra',NULL,NULL),(308,5,'Leo',90.26,1.87,'2020-09-24','Zebra',NULL,NULL),(309,8,'Luna',178.17,4.61,'2016-08-03','Hippo',NULL,NULL),(310,6,'Charlie',131.74,2.05,'2021-04-04','Giraffe',NULL,NULL),(311,9,'Juno',108.88,4.32,'2010-07-15','Rhino',NULL,NULL),(312,11,'Seb',280.31,1.56,'2018-11-08','Flamingo',NULL,NULL),(313,10,'Max',219.38,4.41,'2013-09-04','Elephant',NULL,NULL),(314,10,'Leo',165.29,4.61,'2010-01-13','Hippo',NULL,NULL),(315,8,'Talha',52.92,4.36,'2019-09-11','Flamingo',NULL,NULL),(316,8,'Kiki',90.52,1.96,'2018-10-25','Elephant',NULL,NULL),(317,7,'Ella',89.68,1.84,'2016-06-27','Elephant',NULL,NULL),(318,8,'Zara',291.43,1.73,'2015-10-10','Hippo',NULL,NULL),(319,9,'Angy',286.51,2.63,'2022-07-01','Rhino',NULL,NULL),(320,9,'Charlie',260.76,2.94,'2015-10-03','Rhino',NULL,NULL),(321,6,'Bella',213.07,3.71,'2012-04-24','Tiger',NULL,NULL),(322,9,'Luna',119.40,4.01,'2010-09-19','Zebra',NULL,NULL),(323,9,'Kiki',126.27,4.05,'2022-10-07','Penguin',NULL,NULL),(324,9,'Oreo',252.79,1.72,'2018-03-07','Penguin',NULL,NULL),(325,7,'Daisy',259.07,4.89,'2019-06-15','Tiger',NULL,NULL),(326,6,'Daisy',126.08,3.01,'2020-06-13','Rhino',NULL,NULL),(327,7,'Max',157.56,4.02,'2010-05-11','Hippo',NULL,NULL),(328,6,'Angy',52.84,1.12,'2019-01-07','Hippo',NULL,NULL),(329,8,'Talha',232.12,4.32,'2022-12-19','Bear',NULL,NULL),(330,10,'Oreo',117.83,4.31,'2013-11-17','Flamingo',NULL,NULL),(331,9,'Charlie',285.64,4.71,'2010-03-20','Flamingo',NULL,NULL),(332,10,'Ella',229.76,4.25,'2019-06-08','Lion',NULL,NULL),(333,7,'Zara',298.70,3.59,'2017-11-05','Rhino',NULL,NULL),(334,10,'Daisy',213.30,3.39,'2013-01-05','Giraffe',NULL,NULL),(335,7,'Charlie',198.25,4.76,'2012-05-12','Tiger',NULL,NULL),(337,4,'LeoTen',123.00,123.00,'2023-01-01','Lion',334,332),(338,5,'Leo One',123.00,222.00,'2024-05-01','Strong',331,332),(339,4,'LeoNew',222.00,10.00,'2024-04-30','Strong',332,335),(340,4,'kyle',124.00,111.00,'2024-04-18','Penguin',338,331),(341,4,'Talha',623.00,122.00,'2024-04-09','Lion',285,334),(342,8,'Laura',300.00,6.00,'2023-03-15','Lion',331,124);
/*!40000 ALTER TABLE `ANIMALS` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `check_habitat_capacity` BEFORE INSERT ON `ANIMALS` FOR EACH ROW BEGIN
    DECLARE current_capacity INT;
    DECLARE max_capacity INT;
    
    
    SELECT COUNT(*) INTO current_capacity
    FROM ANIMALS
    WHERE Habitat_ID = NEW.Habitat_id;
    
    
    SELECT Capacity INTO max_capacity
    FROM HABITATS
    WHERE Habitat_ID = NEW.Habitat_ID;
    
    
    IF current_capacity >= max_capacity THEN
        
        INSERT INTO ALERTS (Description, Date_Created)
        VALUES (CONCAT('Animal with ID ', NEW.animal_id, ' has been added to a habitat at full capacity.'), NOW());
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `ANIMAL_HEALTH`
--

DROP TABLE IF EXISTS `ANIMAL_HEALTH`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ANIMAL_HEALTH` (
  `Animal_Health_ID` int NOT NULL AUTO_INCREMENT,
  `Animal_ID` int NOT NULL,
  `Primary_Doctor_ID` int DEFAULT NULL,
  `Description` varchar(45) NOT NULL,
  `Date_Of_Examination` date NOT NULL,
  PRIMARY KEY (`Animal_Health_ID`),
  KEY `fk_ANIMAL_HEALTH_ANIMALS_idx` (`Animal_ID`),
  KEY `fk_ANIMAL_HEALTH_EMPLOYEES1_idx` (`Primary_Doctor_ID`),
  CONSTRAINT `fk_ANIMAL_HEALTH_ANIMALS` FOREIGN KEY (`Animal_ID`) REFERENCES `ANIMALS` (`Animal_ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_ANIMAL_HEALTH_EMPLOYEES1` FOREIGN KEY (`Primary_Doctor_ID`) REFERENCES `EMPLOYEES` (`Employee_ID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ANIMAL_HEALTH`
--

LOCK TABLES `ANIMAL_HEALTH` WRITE;
/*!40000 ALTER TABLE `ANIMAL_HEALTH` DISABLE KEYS */;
INSERT INTO `ANIMAL_HEALTH` VALUES (5,235,11,'Annual comprehensive health evaluation!','2023-05-21'),(6,237,3,'Nutritional assessment and diet plan update.','2023-06-01'),(7,286,13,'Underwent surgery for a broken limb.','2023-07-29'),(8,283,3,'Treated for a skin infection.','2023-11-04'),(9,171,5,'Rehabilitation from a previous injury.','2023-09-01'),(10,272,10,'Check-up for pregnancy or breeding purposes.','2023-07-08'),(11,235,11,'Treated for a skin infection.','2024-01-09'),(12,233,10,'Treated for a skin infection.','2024-01-15'),(13,124,10,'Behavioral therapy for stress management.','2023-07-28'),(14,313,10,'Rehabilitation from a previous injury.','2023-09-16'),(15,251,10,'Routine check-up completed with no issues.','2024-01-17'),(16,253,3,'Annual comprehensive health evaluation.','2023-04-19'),(17,283,13,'Behavioral therapy for stress management.','2023-07-01'),(18,314,10,'Nutritional assessment and diet plan update.','2023-05-24'),(19,235,10,'Behavioral therapy for stress management.','2023-07-27'),(20,157,3,'Check-up for pregnancy or breeding purposes.','2023-10-19'),(21,275,10,'Dental cleaning and check-up.','2023-05-12'),(22,332,5,'Behavioral therapy for stress management.','2023-09-23'),(23,220,5,'Dental cleaning and check-up.','2023-10-01'),(24,130,11,'Routine check-up completed with no issues.','2023-12-19'),(25,297,10,'Rehabilitation from a previous injury.','2024-03-15'),(26,334,3,'Routine check-up completed with no issues.','2023-08-06'),(27,247,10,'Treated for a skin infection.','2023-07-15'),(28,250,11,'Minor injury treated from habitat mishap.','2023-04-25'),(29,183,13,'Vaccination against common diseases.','2024-01-09'),(30,254,13,'Minor injury treated from habitat mishap.','2023-05-24'),(31,299,5,'Treated for allergies.','2023-11-01'),(32,332,13,'Routine check-up completed with no issues.','2023-05-08'),(33,166,5,'Behavioral therapy for stress management.','2023-09-05'),(34,212,10,'Annual comprehensive health evaluation.','2023-07-15'),(35,247,13,'Treated for a common cold.','2023-06-14'),(36,184,10,'Treated for a common cold.','2023-11-13'),(37,266,10,'Underwent surgery for a broken limb.','2023-04-14'),(38,99,11,'Rehabilitation from a previous injury.','2023-04-29'),(39,266,5,'Annual comprehensive health evaluation.','2024-02-16'),(40,158,10,'Nutritional assessment and diet plan update.','2023-10-07'),(41,117,5,'Treated for allergies.','2023-05-08'),(42,335,5,'Rehabilitation from a previous injury.','2023-10-13'),(43,144,5,'Vaccination against common diseases.','2023-10-11'),(44,83,10,'Routine check-up completed with no issues.','2023-10-30'),(45,247,5,'Underwent surgery for a broken limb.','2023-12-25'),(46,321,5,'Dental cleaning and check-up.','2023-12-22'),(47,335,13,'Rehabilitation from a previous injury.','2023-09-30');
/*!40000 ALTER TABLE `ANIMAL_HEALTH` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ANIMAL_SCHEDULES`
--

DROP TABLE IF EXISTS `ANIMAL_SCHEDULES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ANIMAL_SCHEDULES` (
  `Animal_Schedule_ID` int NOT NULL AUTO_INCREMENT,
  `Animal_ID` int NOT NULL,
  `Start_Time` datetime NOT NULL,
  `End_Time` datetime NOT NULL,
  `Description` varchar(63) NOT NULL DEFAULT '',
  PRIMARY KEY (`Animal_Schedule_ID`),
  KEY `fk_ANIMAL_SCHEDULES_ANIMALS_idx` (`Animal_ID`),
  CONSTRAINT `fk_ANIMAL_SCHEDULES_ANIMALS` FOREIGN KEY (`Animal_ID`) REFERENCES `ANIMALS` (`Animal_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ANIMAL_SCHEDULES`
--

LOCK TABLES `ANIMAL_SCHEDULES` WRITE;
/*!40000 ALTER TABLE `ANIMAL_SCHEDULES` DISABLE KEYS */;
INSERT INTO `ANIMAL_SCHEDULES` VALUES (5,329,'2024-04-16 20:46:00','2024-04-17 20:46:00','dancing around!');
/*!40000 ALTER TABLE `ANIMAL_SCHEDULES` ENABLE KEYS */;
UNLOCK TABLES;

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
  `Attends_To_ID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Attends_To_ID`),
  KEY `fk_EMPLOYEES_has_ANIMALS_ANIMALS1_idx` (`Animal_ID`),
  KEY `fk_EMPLOYEES_has_ANIMALS_EMPLOYEES1_idx` (`Employee_ID`),
  CONSTRAINT `fk_EMPLOYEES_has_ANIMALS_ANIMALS1` FOREIGN KEY (`Animal_ID`) REFERENCES `ANIMALS` (`Animal_ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_EMPLOYEES_has_ANIMALS_EMPLOYEES1` FOREIGN KEY (`Employee_ID`) REFERENCES `EMPLOYEES` (`Employee_ID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ATTENDS_TO`
--

LOCK TABLES `ATTENDS_TO` WRITE;
/*!40000 ALTER TABLE `ATTENDS_TO` DISABLE KEYS */;
INSERT INTO `ATTENDS_TO` VALUES (15,83,'manage',1),(15,90,'manage too',2);
/*!40000 ALTER TABLE `ATTENDS_TO` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMPLAINTS`
--

LOCK TABLES `COMPLAINTS` WRITE;
/*!40000 ALTER TABLE `COMPLAINTS` DISABLE KEYS */;
INSERT INTO `COMPLAINTS` VALUES (1,NULL,'Website doesnt work','2024-04-16'),(2,NULL,'Doesnt let me have apostropes.','2024-04-16'),(3,NULL,'Pictures are same for some animals','2024-04-16'),(4,NULL,'website is bad','2024-04-16'),(5,NULL,'Website doesnt work','2024-04-16'),(6,NULL,'The website is not fully functional','2024-04-17'),(7,NULL,'','2024-04-17'),(8,NULL,'Website doesnt work','2024-04-17'),(9,NULL,'Website doesnt work','2024-04-17'),(10,NULL,'Website doesnt work','2024-04-17');
/*!40000 ALTER TABLE `COMPLAINTS` ENABLE KEYS */;
UNLOCK TABLES;

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
  `Email` varchar(61) NOT NULL,
  `Password` varchar(63) DEFAULT NULL,
  PRIMARY KEY (`Customer_ID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CUSTOMERS`
--

LOCK TABLES `CUSTOMERS` WRITE;
/*!40000 ALTER TABLE `CUSTOMERS` DISABLE KEYS */;
INSERT INTO `CUSTOMERS` VALUES (2,'John Doe','123 Example St','555-5555','john.doe@example.com',NULL),(3,'Sebastian De La Espriella','3207 canyon links dr','7138155588','lseabasol@gmail.com','$2b$10$1AcgnC9Psrpk8u3FnSfpNuLde.7siyyLLyU.OQ28RuNbmo43NSr76'),(4,'Sebastian De La Espriella','3207 canyon links dr','7138155588','lseabaso@gmail.com','$2b$10$moSg94AZJLC3.OpNae.raO/TfJQf6GpThLJcGHtOoEjIv8rsZ/cGC'),(5,'Sebastian De La Espriella','3207 canyon links dr','7138155588','lseabas@gmail.com','$2b$10$PmzrJQnE0Bu5LSlnCpu1b.ZjttKhN1yvOw7.OajIiWAOXxxMOGKY6'),(6,'Sebastian De La Espriella','3207 canyon links dr','7138155588','lseaba@gmail.com','$2b$10$LrCWpx/TE19CXRPYN72Br.X.KL85xqJ5d43IiL55OBNYZeVYseEIC'),(7,'Sebastian De La Espriella','3207 canyon links dr','7138155588','lseabasol1@gmail.com','$2b$10$utYkzkfr8gCGnoiZDPI1f.fQ2pEoncHhgUdh4a9lWZgMdaG.dRhZy'),(8,'Sebastian De La Espriella','3207 canyon links dr','7138155588','lseabasol2@gmail.com','$2b$10$9rTUZUUNWhFfHpIrGZqA2eZOc3A8RxWn3lnARBmPa86ElqcaGz2hC'),(9,'Talha Mohammed','1923 Kelliwood Trails Dr.','2819053751','mohammedtalha290@gmail.com','$2b$10$vEjWvIqIqbfpUCKGhYbpO.F1at1Xi5bUk2mb/.LJK5XwLdXh337V.'),(12,'Sebastian De La Espriella','3207 canyon links dr','7138155588','lseabasol@gmail.com2','$2b$10$xu2SXH2K7RkzET831B8L2.lxoh8BL/kStPzntGKNFrclyPXVKwUFC'),(13,'Test Customer','test customers home','8327908392','testcustomer@gmail.com','$2b$10$JjM5Rbhh9mVoLt2eiwdd1u6ZIz4mPtJSai3rzQCoE9uaIMuWtlYwu'),(14,'<script>alert(\"Hi\");</script>','<script>alert(\"Hi\");</script>','1234567890','hi@hi.hi','$2b$10$w7feWzleKlgO4ujUJ17jEOXPkrv/Ys8VHpWBkHDSCg7S0M18Yr30i'),(15,'keekee','1289 jkaja lane','1234567890','kee@gmail.com','$2b$10$8MMGu0lTPw3/o.bysnjWxe7h6yHMa6oEYIXcY/jWMA4GuAg2bPU4W'),(16,'keekee1','1289 niofsnio ioo','1234567890','kee1@gmail.com','$2b$10$.goYBo5j3fz6w9mm1811cOJN7yzQlykNiUfP2IjM1Vb6Um7FKqdaK'),(19,'kiin','2534rudrud','1234567891','qwertyui@asxdf.com','$2b$10$JOTDQoq3D6RBu/J5PSAx7uu9rvj9jOhHQ8F25dWDa83L0yiZl7iaK'),(20,'keekee3','123 stnioewif','1234567891','kee3@gmail.com',NULL),(21,'lmaotest','12386audhfhefiow','1234567891','lmaotest@gmail.com','$2b$10$45uj4cEZGiVwB9TgCqdum.zZXfOoQFcsqYVAze2p1N7BdmIrSeHq2'),(22,'donesh','132 donesh','1234567891','donesh@donesh.com','$2b$10$4IhabtVCiRPT.0GUPEHNUerAityT3DG8S6Dd0e7dN.4aEF1ukHho2');
/*!40000 ALTER TABLE `CUSTOMERS` ENABLE KEYS */;
UNLOCK TABLES;

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
  `Name` varchar(45) NOT NULL,
  `SSN` char(11) DEFAULT NULL,
  `Gender` enum('Male','Female','Other') DEFAULT NULL,
  `Email` varchar(45) NOT NULL,
  `Address` varchar(45) NOT NULL,
  `Birth_Date` date NOT NULL,
  `Start_Date` date NOT NULL,
  `Hour_Rate` float(5,2) DEFAULT NULL,
  `Password` varchar(63) DEFAULT NULL,
  `Role` enum('Employee','Manager','Medic') DEFAULT NULL,
  PRIMARY KEY (`Employee_ID`),
  UNIQUE KEY `SSN_UNIQUE` (`SSN`),
  KEY `fk_EMPLOYEES_EMPLOYEES1_idx` (`Supervisor_ID`),
  KEY `fk_EMPLOYEES_SHOPS1_idx` (`Shop_ID`),
  KEY `fk_EMPLOYEES_HABITATS1_idx` (`Habitat_ID`),
  KEY `fk_EMPLOYEES_RESTAURANTS1_idx` (`Restaurant_ID`),
  CONSTRAINT `fk_EMPLOYEES_EMPLOYEES1` FOREIGN KEY (`Supervisor_ID`) REFERENCES `EMPLOYEES` (`Employee_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_EMPLOYEES_HABITATS1` FOREIGN KEY (`Habitat_ID`) REFERENCES `HABITATS` (`Habitat_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_EMPLOYEES_RESTAURANTS1` FOREIGN KEY (`Restaurant_ID`) REFERENCES `RESTAURANTS` (`Restaurant_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_EMPLOYEES_SHOPS1` FOREIGN KEY (`Shop_ID`) REFERENCES `SHOPS` (`Shop_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EMPLOYEES`
--

LOCK TABLES `EMPLOYEES` WRITE;
/*!40000 ALTER TABLE `EMPLOYEES` DISABLE KEYS */;
INSERT INTO `EMPLOYEES` VALUES (2,NULL,NULL,NULL,NULL,'Andrew','394-20-1030','Male','andrewalmasi@gmail.com','12615 Bethany Bay Dr','2003-05-15','2024-03-18',20.00,NULL,NULL),(3,NULL,NULL,NULL,NULL,'medicJaneDoe','987-65-4321','Female','medicJaneDoe@example.com','456 Healing Lane','1988-12-22','2024-02-01',25.00,NULL,NULL),(4,NULL,NULL,NULL,NULL,'Keean','576-49-3005','Male','keeansmith@gmail.com','4138 Tahoe Valley Lane','1999-12-21','2024-02-06',18.00,NULL,NULL),(5,NULL,NULL,NULL,NULL,'Noah','350-62-0924','Female','noah.smith@example.com','123 Main St','1975-03-15','2024-03-20',20.00,NULL,NULL),(8,NULL,NULL,NULL,NULL,'Sarah','354-07-3258','Male','sarah.smith@test.org','984 Evandale Ln','1990-02-02','2024-01-10',20.00,NULL,NULL),(9,NULL,NULL,NULL,NULL,'Donesh','720-47-1452','Female','donesh.doe@mail.com','486 Sheppard Dr','1985-07-07','2023-06-15',20.00,NULL,NULL),(10,NULL,NULL,NULL,NULL,'Jane','755-04-6551','Female','jane.davis@mail.com','3321 Briar Forest Dr','2002-11-09','2024-01-10',20.00,NULL,NULL),(11,NULL,NULL,NULL,NULL,'Laura','769-13-5744','Female','laura.smith@example.com','3321 Briar Forest Dr','1985-07-07','2024-03-20',20.00,NULL,NULL),(12,NULL,NULL,NULL,NULL,'Rosemary','413-63-1005','Female','rosemary.jones@mail.com','486 Sheppard Dr','1985-07-07','2024-01-10',20.00,NULL,NULL),(13,NULL,NULL,NULL,NULL,'Jane','733-69-9554','Male','jane.richter@mail.com','789 Pine Rd','1990-02-02','2023-01-01',20.00,NULL,NULL),(15,NULL,NULL,NULL,NULL,'Manager','123-45-6739','Male','TestManager@Example.com','121 Manager Road','1980-01-01','2024-01-01',20.00,'$2b$10$9A/dUOUGEk43gBCf7GgrVeWROoP8ZWgeMr7VQ7TTLJqiPUkajW9ma','Manager'),(16,NULL,NULL,NULL,NULL,'Alex','123-45-6789','Male','alex.johnson@example.com','456 Manager Ave','1985-01-15','2024-04-06',30.00,'password_here','Manager'),(18,NULL,NULL,NULL,NULL,'talh','1237477474','Male','talha@gmail.com','talhas house 123','2024-03-30','2024-04-13',NULL,'$2b$10$gG0179mU529pRPx2c8LLCesQaP833xQRfUC.TLKA8oYqMaEXjCpzm','Medic');
/*!40000 ALTER TABLE `EMPLOYEES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EMPLOYEE_SCHEDULES`
--

DROP TABLE IF EXISTS `EMPLOYEE_SCHEDULES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EMPLOYEE_SCHEDULES` (
  `Employee_Schedule_ID` int NOT NULL AUTO_INCREMENT,
  `Employee_ID` int NOT NULL,
  `Start_Time` datetime NOT NULL,
  `End_Time` datetime NOT NULL,
  `Description` varchar(63) NOT NULL DEFAULT '',
  PRIMARY KEY (`Employee_Schedule_ID`),
  KEY `fk_EMPLOYEE_SCHEDULES_EMPLOYEES_idx` (`Employee_ID`),
  CONSTRAINT `fk_EMPLOYEE_SCHEDULES_EMPLOYEES` FOREIGN KEY (`Employee_ID`) REFERENCES `EMPLOYEES` (`Employee_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EMPLOYEE_SCHEDULES`
--

LOCK TABLES `EMPLOYEE_SCHEDULES` WRITE;
/*!40000 ALTER TABLE `EMPLOYEE_SCHEDULES` DISABLE KEYS */;
INSERT INTO `EMPLOYEE_SCHEDULES` VALUES (1,15,'2024-04-24 22:36:00','2024-04-04 04:36:00','first shift'),(6,15,'2024-04-10 08:04:00','2024-04-10 20:04:00','Test'),(7,15,'2024-04-11 08:11:00','2024-04-10 15:11:00','Test2'),(10,12,'2024-04-17 20:13:00','2024-04-01 23:13:00','hj'),(12,4,'2024-03-31 20:22:00','2024-04-02 20:22:00','hellpppp'),(15,4,'2024-04-12 20:28:00','2024-04-13 20:28:00','pookie'),(16,8,'2024-04-09 20:30:00','2024-04-10 20:31:00','dvdf'),(18,10,'2024-04-11 20:36:00','2024-04-13 20:36:00','23 restrooms to clean'),(19,9,'2024-04-15 08:00:00','2024-04-18 08:00:00','feeding penguins'),(20,18,'2024-04-17 17:10:00','2024-04-24 17:10:00','work boy');
/*!40000 ALTER TABLE `EMPLOYEE_SCHEDULES` ENABLE KEYS */;
UNLOCK TABLES;

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
  `Capacity` int NOT NULL,
  `Name` varchar(80) NOT NULL,
  PRIMARY KEY (`Habitat_ID`),
  KEY `fk_HABITATS_ZONES1_idx` (`Zone_ID`),
  CONSTRAINT `fk_HABITATS_ZONES1` FOREIGN KEY (`Zone_ID`) REFERENCES `ZONES` (`Zone_ID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HABITATS`
--

LOCK TABLES `HABITATS` WRITE;
/*!40000 ALTER TABLE `HABITATS` DISABLE KEYS */;
INSERT INTO `HABITATS` VALUES (4,4,'Open','2024-01-01',0,'Tundra'),(5,2,'Open','2024-01-01',100,'Desert'),(6,4,'Open','2024-02-01',100,'Mountain'),(7,10,'Open','2024-03-01',150,'Wetlands'),(8,11,'Open','2024-04-01',150,'Savannah'),(9,12,'Open','2024-05-01',200,'Jungle'),(10,13,'Open','2024-06-01',200,'Grasslands'),(11,14,'Open','2024-07-01',100,'Forest');
/*!40000 ALTER TABLE `HABITATS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HABITAT_SCHEDULES`
--

DROP TABLE IF EXISTS `HABITAT_SCHEDULES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HABITAT_SCHEDULES` (
  `Habitat_Schedule_ID` int NOT NULL AUTO_INCREMENT,
  `Habitat_ID` int NOT NULL,
  `Start_Time` datetime NOT NULL,
  `End_Time` datetime NOT NULL,
  `Description` varchar(63) NOT NULL DEFAULT '',
  PRIMARY KEY (`Habitat_Schedule_ID`),
  KEY `fk_HABITAT_SCHEDULES_HABITATS_idx` (`Habitat_ID`),
  CONSTRAINT `fk_HABITAT_SCHEDULES_HABITATS` FOREIGN KEY (`Habitat_ID`) REFERENCES `HABITATS` (`Habitat_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HABITAT_SCHEDULES`
--

LOCK TABLES `HABITAT_SCHEDULES` WRITE;
/*!40000 ALTER TABLE `HABITAT_SCHEDULES` DISABLE KEYS */;
INSERT INTO `HABITAT_SCHEDULES` VALUES (5,7,'2024-04-17 15:49:00','2024-04-19 15:49:00','Explore the wetlands!');
/*!40000 ALTER TABLE `HABITAT_SCHEDULES` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=2348 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ITEMS`
--

LOCK TABLES `ITEMS` WRITE;
/*!40000 ALTER TABLE `ITEMS` DISABLE KEYS */;
INSERT INTO `ITEMS` VALUES (2321,'Sweet Tarts',23,3.90),(2322,'Plushies',40,30.99),(2323,'Hat',10,9.99),(2324,'Jungle Jellies',47,47.48),(2325,'Safari Scarves',19,28.91),(2326,'Elephant Earmuffs',43,42.41),(2327,'Tiger Tail Keychains',1,28.10),(2328,'Rhino Resin Figures',37,14.29),(2329,'Leopard Print Mugs',40,33.72),(2330,'Zebra Stripe Socks',34,26.64),(2331,'Parrot Paradise T-shirts',10,11.31),(2332,'Giraffe Growth Charts',1,17.72),(2333,'Bear Balm Lip Care',38,16.39),(2334,'Flamingo Floaties',32,34.80),(2335,'Orangutan Ornaments',27,34.43),(2336,'Jungle Jellies',2,26.16),(2337,'Safari Scarves',42,32.89),(2338,'Elephant Earmuffs',43,20.94),(2339,'Tiger Tail Keychains',25,34.30),(2340,'Rhino Resin Figures',27,44.01),(2341,'Leopard Print Mugs',17,27.96),(2342,'Zebra Stripe Socks',7,49.02),(2343,'Parrot Paradise T-shirts',37,26.37),(2344,'Giraffe Growth Charts',29,1.29),(2345,'Bear Balm Lip Care',16,7.29),(2346,'Flamingo Floaties',35,30.34),(2347,'Orangutan Ornaments',38,33.09);
/*!40000 ALTER TABLE `ITEMS` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=394 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LOST_ITEMS`
--

LOCK TABLES `LOST_ITEMS` WRITE;
/*!40000 ALTER TABLE `LOST_ITEMS` DISABLE KEYS */;
INSERT INTO `LOST_ITEMS` VALUES (389,NULL,'A lost phone','Pending'),(390,NULL,'laptop','Pending'),(391,NULL,'Toyota keys','Pending'),(392,NULL,'Acura TLX keys','Pending'),(393,NULL,'car ','Pending');
/*!40000 ALTER TABLE `LOST_ITEMS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `PAY_STUB`
--

DROP TABLE IF EXISTS `PAY_STUB`;
/*!50001 DROP VIEW IF EXISTS `PAY_STUB`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `PAY_STUB` AS SELECT 
 1 AS `Employee ID`,
 1 AS `Name`,
 1 AS `Start Time`,
 1 AS `End Time`,
 1 AS `Hour Rate`,
 1 AS `Date`,
 1 AS `Pay`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `PURCHASES`
--

DROP TABLE IF EXISTS `PURCHASES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PURCHASES` (
  `Purchase_ID` int NOT NULL AUTO_INCREMENT,
  `Item_ID` int NOT NULL,
  `Shop_ID` int NOT NULL,
  `Customer_ID` int NOT NULL,
  `Quantity` int NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (`Purchase_ID`),
  KEY `fk_ITEMS_has_SHOPS_ITEMS1` (`Item_ID`),
  KEY `fk_ITEMS_has_SHOPS_SHOPS1` (`Shop_ID`),
  KEY `fk_ITEMS_has_SHOPS_CUSTOMERS1` (`Customer_ID`),
  CONSTRAINT `fk_ITEMS_has_SHOPS_CUSTOMERS1` FOREIGN KEY (`Customer_ID`) REFERENCES `CUSTOMERS` (`Customer_ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_ITEMS_has_SHOPS_ITEMS1` FOREIGN KEY (`Item_ID`) REFERENCES `ITEMS` (`Item_ID`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_ITEMS_has_SHOPS_SHOPS1` FOREIGN KEY (`Shop_ID`) REFERENCES `SHOPS` (`Shop_ID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=218 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PURCHASES`
--

LOCK TABLES `PURCHASES` WRITE;
/*!40000 ALTER TABLE `PURCHASES` DISABLE KEYS */;
INSERT INTO `PURCHASES` VALUES (1,2321,3,2,1,'2021-02-09'),(2,2321,3,2,2,'2024-03-29'),(4,2321,3,6,7,'2024-04-11'),(5,2321,3,3,11,'2024-04-09'),(6,2322,3,5,9,'2024-04-03'),(7,2321,3,2,2,'2024-05-01'),(9,2323,3,5,2,'2024-05-22'),(10,2321,4,6,3,'2024-04-23'),(11,2321,3,9,1,'2024-04-13'),(12,2321,4,9,2,'2024-04-13'),(13,2321,4,9,2,'2024-04-13'),(14,2321,4,9,2,'2024-04-13'),(15,2321,4,9,2,'2024-04-13'),(16,2321,4,9,2,'2024-04-13'),(112,2321,6,2,10,'2023-12-29'),(117,2333,12,3,1,'2024-04-16'),(118,2337,5,2,10,'2024-03-14'),(119,2331,3,4,4,'2024-01-05'),(120,2333,13,7,3,'2024-03-27'),(121,2325,9,4,4,'2024-02-26'),(122,2337,12,12,8,'2024-04-22'),(123,2327,9,5,5,'2024-05-27'),(124,2345,4,5,6,'2024-05-03'),(125,2330,6,7,3,'2023-12-09'),(126,2343,5,7,3,'2023-12-02'),(127,2328,13,9,9,'2024-05-23'),(128,2346,8,4,9,'2024-02-23'),(129,2329,6,8,6,'2023-12-17'),(130,2335,13,9,3,'2024-05-05'),(131,2323,14,7,5,'2023-12-31'),(132,2330,14,12,1,'2024-01-25'),(133,2330,4,3,5,'2024-01-26'),(134,2321,3,5,6,'2024-05-04'),(135,2332,10,8,3,'2024-02-21'),(136,2331,14,9,4,'2024-04-15'),(137,2345,9,8,3,'2024-05-06'),(138,2344,10,6,8,'2024-04-11'),(139,2324,15,9,9,'2023-12-19'),(140,2327,9,7,1,'2024-05-05'),(141,2334,13,5,3,'2024-05-17'),(142,2343,4,2,6,'2024-04-04'),(143,2322,3,6,7,'2023-12-04'),(144,2331,10,4,5,'2024-03-09'),(145,2334,5,7,2,'2024-04-22'),(146,2324,3,2,8,'2023-12-10'),(147,2343,9,8,2,'2024-05-24'),(148,2342,11,8,2,'2023-12-12'),(149,2340,14,5,6,'2024-04-14'),(150,2328,11,9,5,'2024-01-19'),(151,2324,12,3,6,'2024-04-03'),(152,2328,6,12,7,'2024-03-24'),(153,2332,4,4,2,'2024-04-24'),(154,2325,5,8,10,'2024-03-28'),(155,2336,10,7,5,'2024-01-26'),(156,2330,5,9,2,'2024-05-25'),(157,2328,5,8,1,'2024-02-16'),(158,2336,14,12,3,'2024-03-01'),(159,2338,11,2,4,'2023-12-16'),(160,2334,5,5,6,'2024-01-15'),(161,2326,6,9,8,'2023-12-20'),(162,2331,7,7,2,'2024-05-20'),(163,2336,6,7,8,'2024-02-01'),(164,2327,8,12,8,'2024-05-27'),(165,2327,8,8,2,'2024-04-08'),(166,2322,10,12,6,'2023-12-01'),(167,2330,3,4,3,'2024-05-18'),(168,2330,13,7,5,'2023-12-23'),(169,2327,14,2,4,'2023-12-14'),(170,2342,14,9,4,'2024-04-04'),(171,2342,3,3,9,'2023-12-09'),(172,2330,5,3,7,'2024-01-01'),(173,2321,8,6,9,'2024-05-05'),(174,2322,12,7,3,'2024-04-02'),(175,2329,5,6,1,'2024-03-02'),(176,2344,8,3,4,'2024-02-13'),(177,2339,7,12,9,'2023-12-05'),(178,2326,12,3,4,'2024-02-07'),(179,2331,12,6,2,'2023-12-22'),(180,2333,5,7,4,'2024-01-11'),(181,2331,6,6,2,'2024-01-07'),(182,2329,15,12,1,'2024-04-03'),(183,2328,11,3,8,'2024-01-23'),(184,2343,3,7,4,'2024-01-26'),(185,2334,15,3,1,'2024-01-29'),(186,2326,8,8,9,'2024-03-15'),(187,2342,9,7,6,'2024-03-11'),(188,2326,15,7,5,'2024-03-01'),(189,2344,11,6,5,'2024-01-11'),(190,2333,5,4,9,'2024-01-16'),(191,2339,5,4,5,'2024-04-27'),(192,2347,5,5,9,'2023-12-15'),(193,2337,7,12,2,'2024-05-11'),(194,2331,11,8,6,'2024-05-26'),(195,2346,7,8,9,'2024-03-11'),(196,2334,3,6,8,'2024-05-14'),(197,2340,3,7,9,'2024-03-06'),(198,2336,7,6,10,'2023-12-17'),(199,2328,4,6,1,'2024-04-18'),(200,2346,9,7,1,'2023-12-28'),(201,2344,5,5,1,'2024-04-07'),(202,2335,9,3,8,'2024-03-06'),(203,2333,14,6,4,'2023-12-22'),(204,2332,3,12,10,'2023-12-18'),(205,2324,14,9,8,'2024-01-18'),(206,2323,8,9,2,'2024-03-01'),(207,2340,8,8,1,'2024-05-07'),(208,2331,10,8,5,'2024-02-14'),(209,2321,8,9,3,'2024-01-13'),(210,2338,9,8,4,'2024-05-13'),(211,2329,14,2,8,'2024-04-11'),(212,2322,8,8,2,'2024-05-03'),(213,2345,14,9,6,'2024-02-09'),(214,2339,11,12,4,'2023-12-03'),(215,2347,12,5,1,'2023-12-19'),(216,2322,9,9,8,'2024-04-08'),(217,2336,9,12,3,'2024-04-16');
/*!40000 ALTER TABLE `PURCHASES` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RESTAURANTS`
--

LOCK TABLES `RESTAURANTS` WRITE;
/*!40000 ALTER TABLE `RESTAURANTS` DISABLE KEYS */;
INSERT INTO `RESTAURANTS` VALUES (1,2,'Super Hot','Open'),(2,10,'The Lions Kingdom','Open');
/*!40000 ALTER TABLE `RESTAURANTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SCHEDULES`
--

DROP TABLE IF EXISTS `SCHEDULES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SCHEDULES` (
  `Schedule_ID` int NOT NULL AUTO_INCREMENT,
  `Zone_ID` int DEFAULT NULL,
  `Employee_ID` int DEFAULT NULL,
  `Restaurant_ID` int DEFAULT NULL,
  `Habitat_ID` int DEFAULT NULL,
  `Shop_ID` int DEFAULT NULL,
  `Start_Time` datetime DEFAULT NULL,
  `End_Time` datetime DEFAULT NULL,
  `Type` enum('Timesheet','Work','Animal','Shop','Habitat','Maintainance') DEFAULT NULL,
  `Description` varchar(63) DEFAULT NULL,
  PRIMARY KEY (`Schedule_ID`),
  KEY `fk_SCHEDULES_ZONES1_idx` (`Zone_ID`),
  KEY `fk_SCHEDULES_EMPLOYEES1_idx` (`Employee_ID`),
  KEY `fk_SCHEDULES_RESTAURANTS1_idx` (`Restaurant_ID`),
  KEY `fk_SCHEDULES_HABITATS1_idx` (`Habitat_ID`),
  KEY `fk_SCHEDULES_SHOPS1_idx` (`Shop_ID`),
  CONSTRAINT `fk_SCHEDULES_EMPLOYEES1` FOREIGN KEY (`Employee_ID`) REFERENCES `EMPLOYEES` (`Employee_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_SCHEDULES_HABITATS1` FOREIGN KEY (`Habitat_ID`) REFERENCES `HABITATS` (`Habitat_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_SCHEDULES_RESTAURANTS1` FOREIGN KEY (`Restaurant_ID`) REFERENCES `RESTAURANTS` (`Restaurant_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_SCHEDULES_SHOPS1` FOREIGN KEY (`Shop_ID`) REFERENCES `SHOPS` (`Shop_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_SCHEDULES_ZONES1` FOREIGN KEY (`Zone_ID`) REFERENCES `ZONES` (`Zone_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SCHEDULES`
--

LOCK TABLES `SCHEDULES` WRITE;
/*!40000 ALTER TABLE `SCHEDULES` DISABLE KEYS */;
INSERT INTO `SCHEDULES` VALUES (1,NULL,2,NULL,NULL,NULL,'2024-03-30 08:00:00','2024-03-30 15:00:00','Work',NULL),(2,NULL,3,NULL,NULL,NULL,'2024-03-30 12:00:00','2024-03-30 18:00:00','Work',NULL),(3,NULL,3,NULL,NULL,NULL,'2024-03-30 12:00:00','2024-03-30 18:00:00','Work',NULL),(4,NULL,2,NULL,NULL,NULL,'2024-03-30 10:00:00','2024-04-01 12:00:00','Work',NULL);
/*!40000 ALTER TABLE `SCHEDULES` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `check_working_hours` BEFORE INSERT ON `SCHEDULES` FOR EACH ROW BEGIN
   DECLARE total_hours INT;
   DECLARE alert_message VARCHAR(255);

   SELECT SUM(TIME_TO_SEC(TIMEDIFF(End_Time, Start_Time)) / 3600) INTO total_hours 
   FROM SCHEDULES 
   WHERE Employee_ID = NEW.Employee_ID 
   AND WEEK(Date) = WEEK(CURRENT_DATE) 
   AND MONTH(Date) = MONTH(CURRENT_DATE) 
   AND YEAR(Date) = YEAR(CURRENT_DATE)
   AND NEW.Type_ID = 1;
   
   IF total_hours + (TIME_TO_SEC(TIMEDIFF(New.End_Time, New.Start_Time)) / 3600) > 40 THEN
      SET alert_message = CONCAT('Error: Working hours for Employee ', NEW.Employee_ID, ' this week exceed 40.');
      INSERT INTO ALERTS(Description, Date_Created) 
      VALUES (alert_message, NOW());
   END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SHOPS`
--

LOCK TABLES `SHOPS` WRITE;
/*!40000 ALTER TABLE `SHOPS` DISABLE KEYS */;
INSERT INTO `SHOPS` VALUES (3,'Open','Sea Themed Gift Shop'),(4,'Open','Jungle Themed Gift Shop'),(5,'Open','Tundra Treasures Gift Shop'),(6,'Open','Wetlands Wonders Shop'),(7,'Open','Prairie Pavilion Presents'),(8,'Open','Aviary Artifacts Outlet'),(9,'Open','Mountain Majesty Market'),(10,'Open','Savanna Safari Gifts'),(11,'Open','Arctic Treasures Shop'),(12,'Open','Rainforest Rarities Store'),(13,'Open','Tropical Treasures Gift Shop'),(14,'Open','Coral Reef Collection'),(15,'Open','Meadow Merchandise Mart');
/*!40000 ALTER TABLE `SHOPS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `SHOP_REVENUE`
--

DROP TABLE IF EXISTS `SHOP_REVENUE`;
/*!50001 DROP VIEW IF EXISTS `SHOP_REVENUE`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `SHOP_REVENUE` AS SELECT 
 1 AS `Date`,
 1 AS `Revenue`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `SHOP_SCHEDULES`
--

DROP TABLE IF EXISTS `SHOP_SCHEDULES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SHOP_SCHEDULES` (
  `Shop_Schedule_ID` int NOT NULL AUTO_INCREMENT,
  `Shop_ID` int NOT NULL,
  `Start_Time` datetime NOT NULL,
  `End_Time` datetime NOT NULL,
  `Description` varchar(63) NOT NULL DEFAULT '',
  PRIMARY KEY (`Shop_Schedule_ID`),
  KEY `fk_SHOP_SCHEDULES_SHOPS_idx` (`Shop_ID`),
  CONSTRAINT `fk_SHOP_SCHEDULES_SHOPS` FOREIGN KEY (`Shop_ID`) REFERENCES `SHOPS` (`Shop_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SHOP_SCHEDULES`
--

LOCK TABLES `SHOP_SCHEDULES` WRITE;
/*!40000 ALTER TABLE `SHOP_SCHEDULES` DISABLE KEYS */;
INSERT INTO `SHOP_SCHEDULES` VALUES (5,3,'2024-04-17 15:08:00','2024-04-18 15:08:00','10% off all day!!!!');
/*!40000 ALTER TABLE `SHOP_SCHEDULES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TICKETS`
--

DROP TABLE IF EXISTS `TICKETS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TICKETS` (
  `Ticket_ID` int NOT NULL AUTO_INCREMENT,
  `Date_Issued` date NOT NULL,
  `Customer_ID` int DEFAULT NULL,
  `Adult_Count` int DEFAULT '0',
  `Child_Count` int DEFAULT '0',
  `Elder_Count` int DEFAULT '0',
  'Admission_Date' date NOT NULL;
  `Price` int GENERATED ALWAYS AS ((((15 * `Adult_Count`) + (10 * `Elder_Count`)) + (5 * `Child_Count`))) STORED,
  `Admission_Date` date NOT NULL,
  PRIMARY KEY (`Ticket_ID`),
  KEY `fk_TICKETS_CUSTOMERS1_idx` (`Customer_ID`),
  CONSTRAINT `fk_TICKETS_CUSTOMERS1` FOREIGN KEY (`Customer_ID`) REFERENCES `CUSTOMERS` (`Customer_ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TICKETS`
--

LOCK TABLES `TICKETS` WRITE;
/*!40000 ALTER TABLE `TICKETS` DISABLE KEYS */;
INSERT INTO `TICKETS` (`Ticket_ID`, `Date_Issued`, `Customer_ID`, `Adult_Count`, `Child_Count`, `Elder_Count`) VALUES (1,'2024-03-23',2,0,0,0),(2,'2024-04-23',2,0,0,0),(3,'2024-04-23',2,0,0,0),(4,'2024-04-13',9,0,0,0),(5,'2024-04-13',9,0,0,0),(6,'2024-04-13',9,0,0,0),(7,'2024-04-13',9,0,0,0),(8,'2024-04-13',9,0,0,0),(9,'2024-04-13',9,0,0,0),(10,'2024-04-13',9,0,0,0),(11,'2024-04-17',9,2,3,2),(12,'2024-04-17',9,3,0,2),(13,'2024-04-17',9,3,0,2),(14,'2024-04-17',9,3,0,3),(15,'2024-04-17',9,2,2,2),(16,'2024-04-17',9,2,3,2),(17,'2024-04-17',9,2,0,2),(18,'2024-04-17',9,2,2,2);
/*!40000 ALTER TABLE `TICKETS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `TICKET_MONTHLY_REVENUE`
--

DROP TABLE IF EXISTS `TICKET_MONTHLY_REVENUE`;
/*!50001 DROP VIEW IF EXISTS `TICKET_MONTHLY_REVENUE`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `TICKET_MONTHLY_REVENUE` AS SELECT 
 1 AS `Date`,
 1 AS `Revenue`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `TIMESHEETS`
--

DROP TABLE IF EXISTS `TIMESHEETS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TIMESHEETS` (
  `Timesheet_ID` int NOT NULL AUTO_INCREMENT,
  `Employee_ID` int NOT NULL,
  `Start_Time` datetime NOT NULL,
  `End_Time` datetime NOT NULL,
  PRIMARY KEY (`Timesheet_ID`),
  KEY `fk_TIMESHEETS_EMPLOYEES_idx` (`Employee_ID`),
  CONSTRAINT `fk_TIMESHEETS_EMPLOYEES` FOREIGN KEY (`Employee_ID`) REFERENCES `EMPLOYEES` (`Employee_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TIMESHEETS`
--

LOCK TABLES `TIMESHEETS` WRITE;
/*!40000 ALTER TABLE `TIMESHEETS` DISABLE KEYS */;
INSERT INTO `TIMESHEETS` VALUES (5,15,'2024-04-10 08:30:00','2024-04-10 15:30:00'),(6,15,'2024-04-10 09:30:00','2024-04-10 14:30:00'),(7,10,'2024-04-13 07:00:00','2024-04-13 13:30:00'),(8,8,'2024-04-20 07:00:00','2024-04-20 13:30:00'),(10,4,'2024-04-10 03:00:00','2024-04-10 15:00:00');
/*!40000 ALTER TABLE `TIMESHEETS` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ZONES`
--

LOCK TABLES `ZONES` WRITE;
/*!40000 ALTER TABLE `ZONES` DISABLE KEYS */;
INSERT INTO `ZONES` VALUES (2,'Tropical','Open',1500.00),(4,'Sahara','Open',1500.00),(10,'Savannah','Open',12000.00),(11,'Grasslands','Open',11000.00),(12,'Jungle','Open',9000.00),(13,'Forest','Open',13000.00),(14,'Tundra','Open',8000.00);
/*!40000 ALTER TABLE `ZONES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `PAY_STUB`
--

/*!50001 DROP VIEW IF EXISTS `PAY_STUB`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `PAY_STUB` AS select `TIMESHEETS`.`Employee_ID` AS `Employee ID`,`EMPLOYEES`.`Name` AS `Name`,cast(`TIMESHEETS`.`Start_Time` as time) AS `Start Time`,cast(`TIMESHEETS`.`End_Time` as time) AS `End Time`,`EMPLOYEES`.`Hour_Rate` AS `Hour Rate`,date_format(`TIMESHEETS`.`Start_Time`,'%Y-%m-%d') AS `Date`,((time_to_sec((`TIMESHEETS`.`End_Time` - `TIMESHEETS`.`Start_Time`)) / 3600) * `EMPLOYEES`.`Hour_Rate`) AS `Pay` from (`TIMESHEETS` join `EMPLOYEES` on((`TIMESHEETS`.`Employee_ID` = `EMPLOYEES`.`Employee_ID`))) order by `TIMESHEETS`.`Employee_ID`,date_format(`TIMESHEETS`.`Start_Time`,'%Y-%m-%d') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `SHOP_REVENUE`
--

/*!50001 DROP VIEW IF EXISTS `SHOP_REVENUE`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `SHOP_REVENUE` AS select date_format(`PURCHASES`.`Date`,'%Y-%m-%d') AS `Date`,sum((`ITEMS`.`Price` * `PURCHASES`.`Quantity`)) AS `Revenue` from (((`PURCHASES` join `SHOPS` on((`SHOPS`.`Shop_ID` = `PURCHASES`.`Shop_ID`))) join `CUSTOMERS` on((`CUSTOMERS`.`Customer_ID` = `PURCHASES`.`Customer_ID`))) join `ITEMS` on((`ITEMS`.`Item_ID` = `PURCHASES`.`Item_ID`))) group by `PURCHASES`.`Date` order by `Date` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `TICKET_MONTHLY_REVENUE`
--

/*!50001 DROP VIEW IF EXISTS `TICKET_MONTHLY_REVENUE`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `TICKET_MONTHLY_REVENUE` AS select date_format(`TICKETS`.`Date_Issued`,'%Y-%m') AS `Date`,sum(`TICKETS`.`Price`) AS `Revenue` from `TICKETS` group by `Date` order by `Date` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-17 22:35:01
