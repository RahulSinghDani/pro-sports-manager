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
INSERT INTO `academy` VALUES ('aca001','ProSports Academy Delhi','123 Sports Street, Nainital, Uttarakhand','Rahul','1234567890','contact@prosports.com','http://www.prosportsacademy.com','./Images/footballimg.jpg','images/logo.jpg','https://youtube.com/prosports','https://instagram.com/prosports','https://facebook.com/prosports',1,29.381800,79.446900),('aca002','Sports Academy','88 Sports Street, Nainital, Uttarakhand','Karan','1234567822','contacts@prosports.com','http://www.prosportsacademy.com','images/sports_academy.jpg','images/logo.jpg','https://youtube.com/prosports','https://instagram.com/prosports','https://facebook.com/prosports',NULL,29.512300,79.543200),('aca003','BSSV School','123 Academy Street, Nainital','Pratab Bhaiya','+91-9876543210','info@bssvacademy.com','http://www.bssvacademy.com','/path/to/image1.jpg','/path/to/logo.jpg','https://www.youtube.com/channel/UC123456789','https://www.instagram.com/bssvacademy','https://www.facebook.com/bssvacademy',NULL,29.218300,79.513000),('aca004','Elite Sports Academy','456 Elm Street, Dehradun','Rohit Sharma','+91-9988776655','contact@elitesports.com','http://www.elitesports.com','/path/to/image2.jpg','/path/to/logo2.jpg','https://www.youtube.com/channel/UC567890123','https://www.instagram.com/elitesportsacademy','https://www.facebook.com/elitesportsacademy',NULL,29.451000,79.345600),('aca005','Mountain View Academy','789 Pine Avenue, Shimla','Vikram Kapoor','+91-9123456789','info@mountainviewacademy.com','http://www.mountainviewacademy.com','/path/to/image3.jpg','/path/to/logo3.jpg','https://www.youtube.com/channel/UC098765432','https://www.instagram.com/mountainviewacademy','https://www.facebook.com/mountainviewacademy',NULL,29.675400,79.675800),('aca006','Habibi School','Dubai','Habibi Shekh','1234567890','habibi@gmail.com','habibischool.com','jds.jpg','jd.jpg','yt.com','insta.com','fb.com',NULL,29.521000,79.562300),('aca007','Manovar Academy','Manali','Mukesh','9876543210','manovar@gmail.com','manovaracademy.com','ja.jpg','hh.png','manovaryt.com','manovar.insta.com','manovar.fb.com',22,29.589100,79.459700),('aca008','Cota Academy','haldwani academy road ','Suresh','+91 3233333333','cota@gmail.com','cota.com','jds.jpg','logo.jpg','www.youtube.com','www.instagram.com','www.facebook.com',NULL,29.854500,34.454500),('aca009','strella sports','noida','rakesh jhunjhunvala','+91-9876543210','rakesh@email.com','strella.com','','','','','',NULL,29.854500,34.454500),('aca010','jd','sj','sj','3434342342','c@gmail.com','SEJ','N/A','N/A','N/A','N/A','N/A',53,0.000000,0.000000),('aca011','aedwwjhgj','jhjjhgjhgjhg','jhgjhgjhg','8786876876','hj@gmail.com','hjvhv.com','N/A','N/A','N/A','N/A','N/A',NULL,0.000000,0.000000),('aca012','aca013 academy','nanana','hahaa','9876534101','abc@gmail.com','abc.com','N/A','N/A','N/A','N/A','N/A',59,0.000000,0.000000),('aca013','abc','aa','aa','07455905065','a@gmail.com','av.com','N/A','N/A','N/A','N/A','N/A',60,0.000000,0.000000),('aca014','Rahul Dani','Nainital High Court Road, Mallital, Nainital, Uttarakhand, India','Habibi Shekh','08954784712','rahuldani00@gmail.com','','1738147959010-golapar stadium.jpg','','','','',NULL,29.854500,34.454500);
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
  `assetType` varchar(250) DEFAULT NULL,
  `image_url` varchar(250) DEFAULT NULL,
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
INSERT INTO `assets` VALUES ('aca002','ass001','Football',30,500.00,'Football Kit',NULL),('aca002','ass002','Basketball',20,700.00,'Basketball Kit',NULL),('aca002','ass003','Ball',15,300.00,'Cricket Kit',NULL),('aca002','ass004','Bat',10,500.00,'Cricket Kit',NULL),('aca001','ass005','Bat',10,400.00,'Cricket Kit',NULL),('aca001','ass006','Ball throwing machine',2,10000.00,'Ball Throwing Machine',NULL),('aca001','ass007','Tennis Rackets',10,500.00,'Badminton Kit',NULL),('aca003','ass008','Shuttlecock Machine',1,2000.00,'Shuttlecock Machine','https://s.alicdn.com/@sc04/kf/H858f4d70ce7e4b1c9102f3972374c0dfm.jpg?avif=close'),('aca003','ass009','Footballs',15,100.00,'Football Kit',NULL),('aca004','ass010','Gym Equipment Set',5,2000.00,'Gym Equipment',NULL),('aca004','ass011','Cricket Bowling Machine',2,3000.00,'Ball Throwing Machine',NULL),('aca005','ass012','Swimming Pool Gear',20,800.00,'Swimming Pool Gear','https://img.freepik.com/free-vector/realistic-set-diving-equipment-snorkeling-mask-flippers-swim-glasses-aqualung_1441-2551.jpg?t=st=1735112958~exp=1735116558~hmac=3f28387518e3773655386415ffa50a54264c21d000567612e9a1b1cf1eb78d23&w=826'),('aca005','ass013','Skating Boards',12,300.00,'Skating Gear','https://img.freepik.com/free-photo/close-up-young-boy-skateboard_23-2148624913.jpg?t=st=1735113239~exp=1735116839~hmac=d66229cd77a0524af1041b8e9ce179d4e17471b1082ab7c38163c8a01ad0b4b6&w=1060'),('aca001','ass014','Rowing Machine',2,500.00,'Rowing Machine','https://cdn.mos.cms.futurecdn.net/9EahYj7iz9SQXiSoxHBpnn-1200-80.jpg');
/*!40000 ALTER TABLE `assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `academy_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `item_type` enum('Ground','Kit') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `item_id` int NOT NULL,
  `booking_date` date NOT NULL,
  `start_time` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `end_time` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `booked_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `contact_number` bigint DEFAULT NULL,
  `status` enum('Confirmed','Cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Confirmed',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`booking_id`),
  KEY `academy_id` (`academy_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`academy_id`) REFERENCES `academy` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,'aca002','Ground',7,'2024-12-31','09:00 AM','11:00 PM','Rahul',9876543210,'Confirmed','2025-01-01 06:20:35','2025-01-01 06:20:35'),(2,'aca002','Ground',8,'2025-01-01','08:00 AM','12:00 PM','Rahul',9876543210,'Confirmed','2025-01-01 06:27:11','2025-01-01 06:27:11'),(3,'aca002','Ground',8,'2025-01-02','08:00 AM','12:00 PM','Rahul',9876543210,'Confirmed','2025-01-01 06:28:18','2025-01-01 06:28:18'),(4,'aca001','Ground',3,'2025-01-02','09:00 AM','05:00 PM','Rohit',3445453434,'Confirmed','2025-01-01 19:07:51','2025-01-01 19:07:51'),(6,'aca001','Ground',3,'2025-01-03','12:00 AM','12:00 AM','rohit',5444544545,'Confirmed','2025-01-01 19:23:59','2025-01-01 19:23:59'),(7,'aca001','Ground',3,'2025-01-20','06:00 AM','08:00 AM','rahul',1823737222,'Confirmed','2025-01-19 17:42:41','2025-01-19 17:42:41');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
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
  `half_yearly` decimal(10,2) DEFAULT NULL,
  `yearly` decimal(10,2) DEFAULT NULL,
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
INSERT INTO `courses` VALUES ('aca001','cr001','Cricket Training','7am to 12pm',6000.00,NULL,NULL),('aca001','cr003','Cricket Training','2PM to 6PM',5000.00,NULL,NULL),('aca002','cr005','Football Training','7am to 12pm',1500.00,NULL,NULL),('aca002','cr006','Basketball Training','5pm to 8pm',1200.00,NULL,NULL),('aca002','cr007','Hockey','6 Am to 9 AM',1200.00,NULL,NULL),('aca002','cr008','table tennis','6AM to 10PM',3000.00,NULL,NULL),('aca002','cr010','Table Tennis Training','4am to 6am',3000.00,NULL,NULL),('aca012','cr011','Cricket Training','8 AM to 12 PM',3000.00,15000.00,20000.00),('aca012','cr012','Cricket Training','12 PM to 3 PM',30000.00,40000.00,60000.00),('aca012','cr013','Cricket Training','3 PM to 6 PM',6000.00,8000.00,13000.00),('aca001','cr014','training','3 PM to 9 PM',3000.00,8000.00,13000.00),('aca001','cr015','hp','5 PM to 8 PM',60000.00,70000.00,90000.00),('aca001','cr016','Spinner Training','9 AM to 11 AM',3200.00,6000.00,10000.00);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cricket_data`
--

DROP TABLE IF EXISTS `cricket_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cricket_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `player_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `matches_played` int DEFAULT '0',
  `runs` int DEFAULT '0',
  `wickets` int DEFAULT '0',
  `name` varchar(200) DEFAULT NULL,
  `academy_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_player_id` (`player_id`),
  CONSTRAINT `cricket_data_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cricket_data`
--

LOCK TABLES `cricket_data` WRITE;
/*!40000 ALTER TABLE `cricket_data` DISABLE KEYS */;
INSERT INTO `cricket_data` VALUES (1,'ply004',12,421,19,'John Doe','aca001'),(3,'ply001',10,320,5,'Sam Parker','aca002'),(4,'ply002',12,450,8,'Sophia Green','aca002'),(6,'ply005',18,680,20,'Rahul Singh Dani','aca003'),(7,'ply006',14,520,15,'Khilendra','aca003'),(8,'ply007',11,430,9,'Sarkar Sindhe','aca002'),(9,'ply008',9,280,4,'Rohan','aca001'),(10,'ply010',5,150,2,'aa','aca002'),(11,'ply011',7,210,6,'Navin','aca002'),(12,'ply012',13,490,10,'Mukesh','aca002'),(13,'ply013',16,540,14,'Suhani Pant','aca001'),(14,'ply014',8,310,7,'karan','aca012'),(15,'ply015',6,190,3,'aa','aca001'),(16,'ply016',4,130,1,'acaa','aca001');
/*!40000 ALTER TABLE `cricket_data` ENABLE KEYS */;
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
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
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
INSERT INTO `employee` VALUES ('aca002','Coach001','John Smith','Coach','456 Coach Lane, Nainital','5 years','9876543210','john.smith@prosports.com',25000.00,'monthly','files/resume_coach1.pdf','weekend (7am to 12pm)',23,'active'),('aca002','Coach002','Jane Doe','Manager','789 Manager Street, Nainital','3 years','9876543211','jane.doe@prosports.com',20000.00,'monthly','files/resume_manager.pdf','weekend (7am to 12pm)',NULL,'active'),('aca003','coach003','John Doe','Software Engineer','1234 Elm St, Some City','5','123-456-7890','john.doe@example.com',50000.00,'Monthly','resume1.pdf','weekend(5am to 8am)',NULL,'active'),('aca002','coach004','mukesh','Coach','dwarka','4 years','3423423432','a@gmail.com',30000.00,'monthly',NULL,'Weekend (4am to 6am)',NULL,'active'),('aca002','coach005','sindhe','Coach','dwarka','4 years','324234234','a@gmail.com',34000.00,'monthly',NULL,'Weekend (4am to 6am), Weekend (1pm to 3pm)',NULL,'active'),('aca002','coach006','Dhiru','Coach','dwarka','2 years','122323232','a@gmail.com',23000.00,'monthly',NULL,'Weekend (4am to 6am)',NULL,'active'),('aca004','coach008','SukhVindar','Coach','Mumbai','fresher','233232323','a@gmail.com',12000.00,'monthly',NULL,'Weekend (4am to 6am)',NULL,'active'),('aca001','coach009','Mukesh Joshi','Coach','Haldwani','4 years','232423432','a@gmail.com',20000.00,'monthly',NULL,'Weekend (4am to 6am)',NULL,'active'),('aca001','coach010','Rahul','Coach','Dwarka','3 years','08954784712','rahuldani00@gmail.com',30000.00,'monthly',NULL,'Monthly (4am to 6am)',NULL,'inactive'),('aca001','coach011','Shridhar','Coach','Bangalore','2 years','3773737333','shridhar@gmail.com',33000.00,'weekly',NULL,'Weekend (4am to 6am)',NULL,'active'),('aca001','coach012','Suresh Rena','Coach','Gurgaon','4 years','3983383833','suresh@gmail.com',33000.00,'monthly',NULL,'Monthly (5am to 8am)',NULL,'inactive'),('aca012','coach013','Mukesh','Coach','abc','Cricket training','9876543210','abc@gmail.com',23000.00,'monthly',NULL,'Weekend (8 am to 12 pm)',NULL,'active'),('aca001','coach014','sss','Coach','acsa','2 years','07455905065','s@gmail.com',23000.00,'monthly',NULL,'Weekend (3 PM to 9 PM), Weekend (7am to 12pm)',NULL,'active'),('aca001','coach015','abc','Coach','abc','1 year','07455905065','rahuldani00@gmail.com',30000.00,'monthly',NULL,'Weekend (7am to 12pm), Weekend (3 PM to 9 PM)',NULL,'active');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grounds`
--

DROP TABLE IF EXISTS `grounds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grounds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_of_booking` date NOT NULL,
  `time` text,
  `amount` decimal(10,2) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `contact` varchar(15) NOT NULL,
  `status` enum('confirmed','pending') NOT NULL,
  `remarks` text,
  `academy_id` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `about` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grounds`
--

LOCK TABLES `grounds` WRITE;
/*!40000 ALTER TABLE `grounds` DISABLE KEYS */;
INSERT INTO `grounds` VALUES (3,'Football Ground B','2024-12-15','06:00 AM - 06:00 PM',400.00,'Ravi Sharma','9876543222','confirmed','Confirmed for team event','aca002','DSA nainital Uttarakhand','https://img.freepik.com/free-vector/gradient-football-field-background_52683-65681.jpg?t=st=1734629597~exp=1734633197~hmac=df5d3bab40b5033a319d76cdd364792c07513f2bcd9828cf74b844d848492182&w=900','Football Ground:  \n- Proper sports shoes or cleats are mandatory for playing on the field. Players are requested to change into footwear after entering the premises.  \n- Participants must bring their own football and equipment, as rentals are not provided by the venue.  \n- Playing barefoot or in inappropriate footwear such as sandals is strictly prohibited.  \n- Each booking allows up to 10 players on the ground. Additional participants will incur a charge of ?150 per person.  \n- Please ensure timely arrival for your slot, as delays may affect the next booking.'),(4,'Tennis Court A','2024-12-20','08:00 AM - 07:00 PM',300.00,'Nisha Reddy','9876543233','pending','Waiting for payment','aca002','https://maps.app.goo.gl/cqzJWjTCTocL5QZY6','https://img.freepik.com/premium-photo/ground-tennis-court_875825-50452.jpg?w=900','About Venue\nTennis Court:\n- Non-marking tennis shoes are mandatory for all players. Please wear them only after entering the premises.\n- Players must bring their own tennis equipment; rental services are not available at this venue.\n- Food and beverages (except water) are not permitted inside the court area.\n- Barefoot play is strictly prohibited for safety reasons.\n- A maximum of 4 players per booking per court is allowed. Additional players will be charged ?150 per head.'),(7,'Golf Ground','2024-12-01','08:00 AM - 07:00 PM',250.00,'Rahul','2344545543','confirmed','Golf Ground A','aca001','https://maps.app.goo.gl/cqzJWjTCTocL5QZY6','https://img.freepik.com/premium-photo/golf-ground_1039849-86.jpg?w=1060','About Venue\nGolf Ground:\n- Proper golf attire, including collared shirts and golf shoes, is mandatory for all players.\n- Players must bring their own golf equipment; rental services are not available at this venue.\n- Smoking and alcohol consumption are strictly prohibited on the premises.\n- A maximum of 4 players per group is allowed. Additional players will be charged ?200 per head.\n- Respect the course by repairing divots, ball marks, and raking bunkers after use.'),(8,'Cricket Ground B','2024-12-01','08:00 AM - 06:00 PM',400.00,'Rohan Upadhyay','8383737333','confirmed','Cricket Ground For students','aca001','https://maps.app.goo.gl/cqzJWjTCTocL5QZY6','https://img.freepik.com/premium-photo/cricket-stadium_1258715-1512.jpg?w=740','About Venue\nCricket Ground:\n- Appropriate sportswear and cricket shoes with rubber spikes are mandatory.\n- Players are requested to bring their own equipment, as rental gear is not provided.\n- Food and beverages are not allowed on the field.\n- Only a maximum of 22 players are allowed on the ground at any time. Additional players will incur a charge of ?500 per head.\n- The field must be left clean and undamaged after use.'),(9,'Snooker Hall ','2024-11-11','09:00 AM - 06:00 PM',500.00,'Suresh Upreti','+91 9087654321','confirmed','Bookable','aca001','https://maps.app.goo.gl/haV7CiZfget444bR7','https://img.freepik.com/free-photo/young-woman-playing-billiard_329181-2814.jpg?t=st=1734684776~exp=1734688376~hmac=d417c9e8022834615e0bb7282035f637cfa3bdf3c0a706859afb9a05b7fd4dfd&w=900','About Venue\nSnooker Hall:\n- Formal shoes are required; sports or casual footwear is not permitted.\n- Players must bring their own snooker cue sticks; the venue does not provide equipment.\n- No food or beverages are allowed near the tables.\n- A maximum of 4 players per table is permitted. Additional players will be charged ?150 per head.\n- Players are requested to maintain decorum and respect the facility at all times.'),(12,'Gym','2024-12-10','04:00 - 20:00',2000.00,'Suresh Upreti','+91 9087654321','confirmed','Bookable','aca001','Nainital uttarakhand','1735484950279-fitnessimg.jpg','About Venue\nGym:\n- Proper gym attire, including non-marking sports shoes, is mandatory for all members.\n- Members must bring their own towels and water bottles; sharing is discouraged.\n- Wipe down equipment after use with the provided disinfectant wipes.\n- A maximum workout session of 90 minutes is allowed during peak hours.\n- Loud music or disruptive behavior is strictly prohibited in the gym premises.'),(14,'Cricket Ground D','2025-01-27','12:00 - 12:00',500.00,'Suresh Upreti','+91 9087654321','confirmed','golapar stadium haldwani','aca001','golapar stadium haldwani','1738132491822-golapar stadium.jpg','### **Golapar Stadium Ground - Rules & Regulations for Players**    1. **Entry & Timing** – Players must enter the ground only during designated hours and follow the schedule strictly.   2. **Proper Attire** – Players must wear appropriate sports gear, including jerseys, shoes, and safety equipment.   3. **No Unauthorized Activities** – Only registered players are allowed; unauthorized matches or training sessions are prohibited.   4. **Respect the Facility** – Keep the ground clean, dispose of waste properly, and avoid damaging the field or equipment.   5. **Fair Play & Discipline** – Maintain sportsmanship, avoid foul language, and follow the referee\'s or coach’s instructions.   6. **Injury & First Aid** – Report any injuries immediately; the management is not responsible for injuries due to negligence.   7. **Use of Equipment** – Stadium equipment must be used responsibly and returned to designated storage areas after use.   8. **No Smoking or Alcohol** – Consumption of tobacco, alcohol, or drugs is strictly prohibited on the premises.   9. **Parking & Entry Rules** – Vehicles should be parked in designated areas; unauthorized vehicles inside the ground are not allowed.   10. **Management\'s Authority** – The stadium authorities have the right to deny entry or take action against players violating rules.');
/*!40000 ALTER TABLE `grounds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `academy_id` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `academy_id` (`academy_id`),
  CONSTRAINT `news_ibfk_1` FOREIGN KEY (`academy_id`) REFERENCES `academy` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'aca001','New Football Training Camp Announced','1735627703672-cricketImage.jpg','2025-01-30 14:28:17'),(2,'aca002','Basketball Tournament Scheduled for Next Month','1735627703672-cricketImage.jpg','2025-01-30 14:28:17'),(3,'aca003','Cricket Coaching Sessions Start Next Week','1735627703672-cricketImage.jpg','2025-01-30 14:28:17'),(4,'aca001','Summer Sports Camp Registration Open','1735627703672-cricketImage.jpg','2025-01-30 14:28:17'),(5,'aca002','New Gymnastics Equipment Installed','1735627703672-cricketImage.jpg','2025-01-30 14:28:17'),(9,'aca001','bbbbbbbbbbbbbbbbbbbb','1738256942553-golapar stadium.jpg','2025-01-30 17:09:02'),(10,'aca001','sagun singh ',NULL,'2025-01-31 04:20:53'),(11,'aca001','fitness training ',NULL,'2025-02-03 06:13:34'),(12,'aca001','abc',NULL,'2025-02-03 06:13:53'),(13,'aca001','happy','1738567685725-WhatsApp Image 2025-01-31 at 7.40.07 PM.jpeg','2025-02-03 07:28:05'),(14,'aca002','abc',NULL,'2025-02-03 07:32:17'),(15,'aca003','abca ','1738569786703-blob','2025-02-03 08:03:06'),(16,'aca004','Cricket Training starts from 23/02/2025 in the morning 6 AM to 8 AM','1738571111194-blob','2025-02-03 08:25:11'),(17,'aca004','ABC',NULL,'2025-02-03 08:27:03');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
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
  `fee_type` varchar(40) DEFAULT NULL,
  `fee` int DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
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
INSERT INTO `player` VALUES ('aca002','ply001','Sam Parker','2025-01-08','Male','ABC School','Left Hand Baller','123 Player Lane, Nainital','Old Academy','David Parker','Emily Parker','9876543212','7am to 12pm','images/player1.jpg',NULL,NULL,NULL,'active'),('aca002','ply002','Sophia Green','2011-02-08','Female','XYZ School','All Rounder','456 Athlete Road, Nainital','Old Academy','John Green','Sarah Green','9876543213','5pm to 8pm','images/player2.jpg',NULL,NULL,NULL,'active'),('aca001','ply004','John Doe','2005-07-12','Male','Greenwood High','Left Batesman','123 Street Name, City, State','Blue Academy','Michael Doe','Sarah Doe','9876543210','7am to 12pm','/images/profile/john_doe.jpg',NULL,'Quarterly',6000,'inactive'),('aca003','ply005','Rahul Singh Dani','2000-11-02','Male','bssv','football','Nainital','aca001','abc','abc','08954784712','weekend(5am to 8am)','Null',5,NULL,NULL,'active'),('aca003','ply006','Khilendra','2007-12-31','Male','Sanwal','Cricket','ntl','aca004','abca','abca','4893734873','weekend(5am to 8am)',NULL,4,NULL,NULL,'active'),('aca002','ply007','Sarkar Sindhe','2006-01-27','Male','Soul Academy','Batesman','Delhi Metro Station 52','aca004','aca','aca','+91 3433434344','6 Am to 9 AM',NULL,3,NULL,NULL,'active'),('aca001','ply008','Rohan','2000-05-15','Male','jarvis academy','Right Hand Fast Baller','kolkata','na','acb','acb','7543225807','2PM to 6PM',NULL,NULL,'Yearly',30000,'active'),('aca002','ply010','aa','2009-04-08','Male','aca002','Right Hand Fast Baller','ASS','AS','sa','sas','87687685','6 Am to 9 AM',NULL,16,NULL,NULL,'active'),('aca002','ply011','Navin','2005-03-22','Male','abc','Right Hand Spinner','asdd','sdf','ad','as','3434343433','7am to 12pm',NULL,NULL,NULL,NULL,'active'),('aca002','ply012','Mukesh','2008-06-09','Male','avc','Right hand batesman','aca','na','ac','ac','234234234','7am to 12pm',NULL,NULL,NULL,NULL,'active'),('aca001','ply013','Suhani Pant','2001-02-04','Female','asd','Spinner','sd','asd','as','as','334343433','7am to 12pm',NULL,NULL,'Quarterly',6000,'active'),('aca012','ply014','karan','2006-11-01','Male','abc','right hand batesman','ava','NA','abc','abc','9876543210','8 am to 12 pm',NULL,NULL,'Quarterly',3000,'active'),('aca001','ply015','aa','2007-12-31','Male','anc','spinner','abc','NA','abc','abc','08954784712','5 PM to 8 PM','uploads\\1737307678309-logo.png',NULL,'Yearly',360000,'inactive'),('aca001','ply016','acaa','2011-11-30','Male','ava','spinner','ava','NA','aca','adca','8954784712','9 AM to 11 AM',NULL,NULL,'Yearly',10000,'active');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playerfinancial`
--

DROP TABLE IF EXISTS `playerfinancial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playerfinancial` (
  `id` int NOT NULL AUTO_INCREMENT,
  `player_id` varchar(20) NOT NULL,
  `player_name` varchar(100) NOT NULL,
  `total_fee` int NOT NULL,
  `paid_amount` int NOT NULL,
  `due_amount` int NOT NULL,
  `due_date` date DEFAULT NULL,
  `status` enum('paid','not paid','pending') NOT NULL,
  `remarks` text,
  `academy_id` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playerfinancial`
--

LOCK TABLES `playerfinancial` WRITE;
/*!40000 ALTER TABLE `playerfinancial` DISABLE KEYS */;
INSERT INTO `playerfinancial` VALUES (1,'ply001','Sam Parker',10000,10000,0,'2025-01-10','pending','paid all amount ','aca002','2025-01-06 12:57:19'),(2,'ply002','Sophia Green',9000,9000,0,'2025-01-10','pending','all done','aca002','2025-01-06 12:57:19'),(3,'ply007','Sarkar Sindhe',7000,6000,1000,'2025-01-10','pending','pending','aca002','2025-01-06 12:57:19'),(4,'ply010','aa',12000,10000,2000,'2025-01-10','pending','pending payment','aca002','2025-01-06 12:57:19'),(6,'ply011','Navin',4000,4000,0,'2025-01-10','paid','paid full payment','aca002','2025-01-06 12:57:19'),(7,'ply004','John Doe',6000,6000,0,'2025-01-10','paid','paid ','aca001','2025-01-06 12:57:19'),(8,'ply008','Rohan',10000,10000,0,'2025-01-10','paid','paid full payment','aca001','2025-01-06 12:57:19'),(9,'ply009','Rakesh Sinha',10000,10000,0,'2025-01-13','paid','Fully paid','aca001','2025-01-06 12:57:19'),(10,'ply014','karan',3000,3000,0,'2025-01-31','paid','Fully paid','aca012','2025-01-16 23:57:13'),(11,'ply015','aa',360000,350000,10000,'2025-03-19','pending','Pending payment','aca001','2025-01-19 22:59:21'),(12,'ply008','Rohan',30000,10000,20000,'2025-01-31','pending','Pending payment','aca001','2025-01-24 18:17:27');
/*!40000 ALTER TABLE `playerfinancial` ENABLE KEYS */;
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
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `username_2` (`username`),
  UNIQUE KEY `username_3` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdata`
--

LOCK TABLES `userdata` WRITE;
/*!40000 ALTER TABLE `userdata` DISABLE KEYS */;
INSERT INTO `userdata` VALUES (1,'academy','academy123','A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=','2024-12-07 08:08:16','2024-12-28 09:51:53'),(2,'admin','rahul','A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=','2024-12-07 08:09:26','2024-12-28 09:52:32'),(3,'player','sarkarsindhe@gmail.com','A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=','2024-12-07 08:15:41','2024-12-28 09:52:32'),(4,'player','khilendra@gmail.com','A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=','2024-12-07 16:39:11','2024-12-28 09:52:32'),(5,'player','rahuldani@gmail.com','A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=','2024-12-07 16:43:26','2024-12-28 09:52:32'),(16,'player','harry','harry','2024-12-11 02:57:53','2024-12-11 02:57:53'),(22,'academy','aca11','A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=','2024-12-11 14:34:46','2024-12-28 09:53:29'),(23,'coach','coach1','A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=','2024-12-14 06:23:04','2024-12-28 09:53:29'),(51,'academy','aca005','a1HUMd9dfxQcvs7M957fPdhhw7QGnwsRZho+76y7qRg=','2024-12-28 15:10:01','2024-12-28 15:10:01'),(52,'academy','aca006','A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=','2024-12-29 03:56:38','2024-12-29 03:56:38'),(53,'academy','aca007','A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=','2024-12-29 04:25:53','2024-12-29 04:25:53'),(54,'academy','aca008','A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=','2024-12-29 04:48:41','2024-12-29 04:48:41'),(55,'academy','aca010','A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=','2025-01-16 08:31:26','2025-01-16 08:31:26'),(57,'academy','aca011','A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=','2025-01-16 09:33:21','2025-01-16 09:33:21'),(58,'academy','aca012','A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=','2025-01-16 18:13:58','2025-01-16 18:13:58'),(59,'academy','aca013','A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=','2025-01-16 18:23:56','2025-01-16 18:23:56'),(60,'academy','rah','A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=','2025-01-19 16:26:52','2025-01-19 16:26:52'),(61,'academy','abce','A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ=','2025-01-30 12:04:26','2025-01-30 12:04:26');
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

-- Dump completed on 2025-02-04 10:18:07
