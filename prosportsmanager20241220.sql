-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: prosportsmanager
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `academy`
--

DROP TABLE IF EXISTS `academy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academy` (
  `id` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `address` text,
  `owner_name` varchar(100) DEFAULT NULL,
  `phone_num` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `website` varchar(200) DEFAULT NULL,
  `images` varchar(200) DEFAULT NULL,
  `logo` varchar(200) DEFAULT NULL,
  `youtube` varchar(200) DEFAULT NULL,
  `instagram` varchar(200) DEFAULT NULL,
  `facebook` varchar(200) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_academy` (`user_id`),
  CONSTRAINT `fk_user_id_academy` FOREIGN KEY (`user_id`) REFERENCES `userdata` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academy`
--

LOCK TABLES `academy` WRITE;
/*!40000 ALTER TABLE `academy` DISABLE KEYS */;
INSERT INTO `academy` VALUES ('aca001','ProSports Academy Delhi','123 Sports Street, Nainital, Uttarakhand','Rahul','1234567890','contact@prosports.com','http://www.prosportsacademy.com','images/sports_academy.jpg','images/logo.jpg','https://youtube.com/prosports','https://instagram.com/prosports','https://facebook.com/prosports',1,29.381800,79.446900),('aca002','Sports Academy','88 Sports Street, Nainital, Uttarakhand','Karan','1234567822','contacts@prosports.com','http://www.prosportsacademy.com','images/sports_academy.jpg','images/logo.jpg','https://youtube.com/prosports','https://instagram.com/prosports','https://facebook.com/prosports',NULL,29.512300,79.543200),('aca003','BSSV School','123 Academy Street, Nainital','Pratab Bhaiya','+91-9876543210','info@bssvacademy.com','http://www.bssvacademy.com','/path/to/image1.jpg','/path/to/logo.jpg','https://www.youtube.com/channel/UC123456789','https://www.instagram.com/bssvacademy','https://www.facebook.com/bssvacademy',NULL,29.218300,79.513000),('aca004','Elite Sports Academy','456 Elm Street, Dehradun','Rohit Sharma','+91-9988776655','contact@elitesports.com','http://www.elitesports.com','/path/to/image2.jpg','/path/to/logo2.jpg','https://www.youtube.com/channel/UC567890123','https://www.instagram.com/elitesportsacademy','https://www.facebook.com/elitesportsacademy',NULL,29.451000,79.345600),('aca005','Mountain View Academy','789 Pine Avenue, Shimla','Vikram Kapoor','+91-9123456789','info@mountainviewacademy.com','http://www.mountainviewacademy.com','/path/to/image3.jpg','/path/to/logo3.jpg','https://www.youtube.com/channel/UC098765432','https://www.instagram.com/mountainviewacademy','https://www.facebook.com/mountainviewacademy',NULL,29.675400,79.675800),('aca006','Habibi School','Dubai','Habibi Shekh','1234567890','habibi@gmail.com','habibischool.com','jds.jpg','jd.jpg','yt.com','insta.com','fb.com',NULL,29.521000,79.562300),('aca007','Manovar Academy','Manali','Mukesh','9876543210','manovar@gmail.com','manovaracademy.com','ja.jpg','hh.png','manovaryt.com','manovar.insta.com','manovar.fb.com',22,29.589100,79.459700),('aca008','Cota Academy','haldwani academy road ','Suresh','+91 3233333333','cota@gmail.com','cota.com','jds.jpg','logo.jpg','www.youtube.com','www.instagram.com','www.facebook.com',NULL,29.854500,34.454500);
/*!40000 ALTER TABLE `academy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assets`
--

DROP TABLE IF EXISTS `assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assets` (
  `academy_id` varchar(20) DEFAULT NULL,
  `id` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `academy_id` (`academy_id`),
  CONSTRAINT `assets_ibfk_1` FOREIGN KEY (`academy_id`) REFERENCES `academy` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assets`
--

LOCK TABLES `assets` WRITE;
/*!40000 ALTER TABLE `assets` DISABLE KEYS */;
INSERT INTO `assets` VALUES ('aca002','ass001','Football',30,500.00),('aca002','ass002','Basketball',20,700.00),('aca002','ass003','Ball',15,1200.00),('aca002','ass004','Bat',10,2000.00),('aca001','ass005','Bat',10,1500.00),('aca001','ass006','Ball',20,2500.00);
/*!40000 ALTER TABLE `assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_of_booking` date NOT NULL,
  `time` time NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `contact` varchar(15) NOT NULL,
  `status` enum('confirmed','pending') NOT NULL,
  `remarks` text,
  `academy_id` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (3,'Football Ground B','2024-12-15','14:00:00',12000.00,'Ravi Sharma','9876543222','confirmed','Confirmed for team event','aca002','https://maps.app.goo.gl/cqzJWjTCTocL5QZY6','https://img.freepik.com/free-vector/gradient-football-field-background_52683-65681.jpg?t=st=1734629597~exp=1734633197~hmac=df5d3bab40b5033a319d76cdd364792c07513f2bcd9828cf74b844d848492182&w=900'),(4,'Tennis Court A','2024-12-20','10:00:00',8000.00,'Nisha Reddy','9876543233','pending','Waiting for payment','aca002','https://maps.app.goo.gl/cqzJWjTCTocL5QZY6','https://img.freepik.com/premium-photo/ground-tennis-court_875825-50452.jpg?w=900'),(7,'Golf Ground','2024-12-01','10:16:00',45000.00,'Rahul','2344545543','confirmed','Golf Ground A','aca001','https://maps.app.goo.gl/cqzJWjTCTocL5QZY6','https://img.freepik.com/premium-photo/golf-ground_1039849-86.jpg?w=1060'),(8,'Cricket Ground B','2024-12-01','12:57:00',30000.00,'Rohan Upadhyay','8383737333','confirmed','Cricket Ground For students','aca001','https://maps.app.goo.gl/cqzJWjTCTocL5QZY6','https://img.freepik.com/premium-photo/cricket-stadium_1258715-1512.jpg?w=740'),(9,'Snooker Hall ','2024-11-11','11:00:00',34000.00,'Suresh Upreti','+91 9087654321','confirmed','Bookable','aca001','https://maps.app.goo.gl/haV7CiZfget444bR7','https://img.freepik.com/free-photo/young-woman-playing-billiard_329181-2814.jpg?t=st=1734684776~exp=1734688376~hmac=d417c9e8022834615e0bb7282035f637cfa3bdf3c0a706859afb9a05b7fd4dfd&w=900');
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `academy_id` varchar(20) DEFAULT NULL,
  `course_id` varchar(20) NOT NULL,
  `course_name` varchar(100) DEFAULT NULL,
  `timing` varchar(50) DEFAULT NULL,
  `fee` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `academy_id` (`academy_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`academy_id`) REFERENCES `academy` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES ('aca001','cr001','Football Training','7am to 12pm',1500.00),('aca001','cr002','Basketball Training','5pm to 8pm',1200.00),('aca001','cr003','Hockey Training','2PM to 6PM',3000.00),('aca001','cr004','tennis','5am to 8am',3000.00),('aca002','cr005','Football Training','7am to 12pm',1500.00),('aca002','cr006','Basketball Training','5pm to 8pm',1200.00),('aca002','cr007','Hockey','6 Am to 9 AM',1200.00),('aca002','cr008','table tennis','6AM to 10PM',3000.00),('aca002','cr010','Table Tennis Training','4am to 6am',3000.00),('aca001','cr011','Table Tennis','4am to 6am',3500.00);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `academy_id` varchar(20) DEFAULT NULL,
  `id` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `address` text,
  `experience` varchar(50) DEFAULT NULL,
  `phone_num` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `salary_frequency` varchar(20) DEFAULT NULL,
  `resume` varchar(200) DEFAULT NULL,
  `batch_name` varchar(100) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `academy_id` (`academy_id`),
  KEY `fk_user_id_coach` (`user_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`academy_id`) REFERENCES `academy` (`id`),
  CONSTRAINT `fk_user_id_coach` FOREIGN KEY (`user_id`) REFERENCES `userdata` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('aca002','Coach001','John Smith','Coach','456 Coach Lane, Nainital','5 years','9876543210','john.smith@prosports.com',25000.00,'monthly','files/resume_coach1.pdf','weekend (7am to 12pm)',23),('aca002','Coach002','Jane Doe','Manager','789 Manager Street, Nainital','3 years','9876543211','jane.doe@prosports.com',20000.00,'monthly','files/resume_manager.pdf','weekend (7am to 12pm)',NULL),('aca003','coach003','John Doe','Software Engineer','1234 Elm St, Some City','5','123-456-7890','john.doe@example.com',50000.00,'Monthly','resume1.pdf','weekend(5am to 8am)',NULL),('aca002','coach004','mukesh','Coach','dwarka','4 years','3423423432','a@gmail.com',30000.00,'monthly',NULL,'Weekend (4am to 6am)',NULL),('aca002','coach005','sindhe','Coach','dwarka','4 years','324234234','a@gmail.com',34000.00,'monthly',NULL,'Weekend (4am to 6am), Weekend (1pm to 3pm)',NULL),('aca002','coach006','Dhiru','Coach','dwarka','2 years','122323232','a@gmail.com',23000.00,'monthly',NULL,'Weekend (4am to 6am)',NULL),('aca004','coach008','SukhVindar','Coach','Mumbai','fresher','233232323','a@gmail.com',12000.00,'monthly',NULL,'Weekend (4am to 6am)',NULL),('aca001','coach009','Mukesh Joshi','Coach','Haldwani','4 years','232423432','a@gmail.com',20000.00,'monthly',NULL,'Weekend (4am to 6am)',NULL),('aca001','coach010','Rahul','Coach','Dwarka','3 years','08954784712','rahuldani00@gmail.com',30000.00,'monthly',NULL,'Monthly (4am to 6am)',NULL),('aca001','coach011','Shridhar','Coach','Bangalore','2 years','3773737333','shridhar@gmail.com',33000.00,'weekly',NULL,'Weekend (4am to 6am)',NULL),('aca001','coach012','Suresh Rena','Coach','Gurgaon','4 years','3983383833','suresh@gmail.com',33000.00,'monthly',NULL,'Monthly (5am to 8am)',NULL);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `academy_id` varchar(20) DEFAULT NULL,
  `id` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `school_name` varchar(100) DEFAULT NULL,
  `sports_expertise` varchar(100) DEFAULT NULL,
  `address` text,
  `previous_academy` varchar(100) DEFAULT NULL,
  `father_name` varchar(100) DEFAULT NULL,
  `mother_name` varchar(100) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `batch` varchar(50) DEFAULT NULL,
  `profile_pic` varchar(200) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `academy_id` (`academy_id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `userdata` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `player_ibfk_1` FOREIGN KEY (`academy_id`) REFERENCES `academy` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES ('aca002','ply001','Sam Parker','1999-12-03','Male','ABC School','Football','123 Player Lane, Nainital','Old Academy','David Parker','Emily Parker','9876543212','weekend (7am to 12pm)','images/player1.jpg',NULL),('aca002','ply002','Sophia Green','2002-12-01','Female','XYZ School','Basketball','456 Athlete Road, Nainital','Old Academy','John Green','Sarah Green','9876543213','weekend (7am to 12pm)','images/player2.jpg',NULL),('aca001','ply004','John Doe','2005-07-15','Male','Greenwood High','Basketball','123 Street Name, City, State','Blue Academy','Michael Doe','Sarah Doe','9876543210','Morning Batch','/images/profile/john_doe.jpg',NULL),('aca003','ply005','Rahul Singh Dani','2000-11-02','Male','bssv','football','Nainital','aca001','abc','abc','08954784712','weekend(5am to 8am)','Null',5),('aca003','ply006','Khilendra','2007-12-31','Male','Sanwal','Cricket','ntl','aca004','abca','abca','4893734873','weekend(5am to 8am)',NULL,4),('aca002','ply007','Sarkar Sindhe','2010-12-02','Male','Soul Academy','Cricket','Delhi Metro Station 52','aca004','aca','aca','+91 3433434344','weekend (7am to 12pm)',NULL,3),('aca001','ply008','Rohan','1998-12-02','Male','jarvis academy','football','kolkata','na','acb','acb','7543225807','Monthly (4am to 6am)',NULL,NULL),('aca001','ply009','rokesh','2008-12-09','Male','Pro sports academy','tennis','noida','na','acacaaacca','ca','34534534534','weekend(5am to 8am)',NULL,NULL),('aca002','ply010','aa','1995-02-02','Male','aca002','AAA','ASS','AS','sa','sas','87687685','Monthly (4am to 6am)',NULL,16);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_financial`
--

DROP TABLE IF EXISTS `player_financial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player_financial` (
  `id` int NOT NULL AUTO_INCREMENT,
  `player_id` varchar(10) NOT NULL,
  `player_name` varchar(100) NOT NULL,
  `total_fee` decimal(10,2) NOT NULL,
  `paid_amount` decimal(10,2) NOT NULL,
  `due_amount` decimal(10,2) NOT NULL,
  `due_date` date DEFAULT NULL,
  `status` enum('paid','not_paid','pending') NOT NULL,
  `remarks` text,
  `academy_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `player_id` (`player_id`),
  CONSTRAINT `player_financial_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_financial`
--

LOCK TABLES `player_financial` WRITE;
/*!40000 ALTER TABLE `player_financial` DISABLE KEYS */;
INSERT INTO `player_financial` VALUES (1,'ply002','Sophia Green',8000.00,4000.00,4000.00,'2024-12-31','pending','Partial payment received.','aca002'),(7,'ply001','Sam Parker',8000.00,4000.00,4000.00,'2025-01-31','pending','Partial payment received.','aca002'),(9,'ply007','Sarkar Sindhe',9000.00,9000.00,0.00,'2024-08-31','paid','Full payment received.','aca002');
/*!40000 ALTER TABLE `player_financial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userdata`
--

DROP TABLE IF EXISTS `userdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userdata` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `role` enum('academy','player','admin','coach') NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdata`
--

LOCK TABLES `userdata` WRITE;
/*!40000 ALTER TABLE `userdata` DISABLE KEYS */;
INSERT INTO `userdata` VALUES (1,'academy','academy123','1234','2024-12-07 08:08:16','2024-12-07 08:08:16'),(2,'admin','rahul','1234','2024-12-07 08:09:26','2024-12-07 08:09:26'),(3,'player','sarkarsindhe@gmail.com','1234','2024-12-07 08:15:41','2024-12-07 16:37:15'),(4,'player','khilendra@gmail.com','1234','2024-12-07 16:39:11','2024-12-07 16:39:11'),(5,'player','rahuldani@gmail.com','1234','2024-12-07 16:43:26','2024-12-07 16:43:26'),(16,'player','harry','harry','2024-12-11 02:57:53','2024-12-11 02:57:53'),(22,'academy','aca11','1234','2024-12-11 14:34:46','2024-12-11 14:34:46'),(23,'coach','coach1','1234','2024-12-14 06:23:04','2024-12-14 06:23:04');
/*!40000 ALTER TABLE `userdata` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-20 18:24:53
