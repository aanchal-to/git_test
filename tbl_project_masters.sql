-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: project-service-db
-- Generation Time: Jun 21, 2022 at 07:18 AM
-- Server version: 8.0.29
-- PHP Version: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_masters`
--

CREATE TABLE `tbl_project_masters` (
  `id` int NOT NULL,
  `project_ref_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `customer_id` int NOT NULL,
  `customer_name` varchar(155) DEFAULT NULL,
  `customer_email` varchar(200) DEFAULT NULL,
  `customer_mobile` varchar(11) DEFAULT NULL,
  `client_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` varchar(255) DEFAULT NULL COMMENT 'Title of Project',
  `project_image` text,
  `start_date` datetime NOT NULL,
  `expected_end_date` datetime DEFAULT NULL,
  `short_description` varchar(255) DEFAULT NULL,
  `pin_code` int NOT NULL,
  `state_id` int DEFAULT NULL,
  `state_name` varchar(150) DEFAULT NULL,
  `district_id` int DEFAULT NULL,
  `district_name` varchar(150) DEFAULT NULL,
  `completion_status` int DEFAULT NULL COMMENT 'Project Completion status',
  `plan_id` int DEFAULT NULL,
  `lat` varchar(255) DEFAULT NULL,
  `long` varchar(255) DEFAULT NULL,
  `project_value` varchar(255) DEFAULT NULL,
  `created_by` int NOT NULL,
  `created_by_username` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_project_masters`
--

INSERT INTO `tbl_project_masters` (`id`, `project_ref_no`, `customer_id`, `customer_name`, `customer_email`, `customer_mobile`, `client_id`, `title`, `project_image`, `start_date`, `expected_end_date`, `short_description`, `pin_code`, `state_id`, `state_name`, `district_id`, `district_name`, `completion_status`, `plan_id`, `lat`, `long`, `project_value`, `created_by`, `created_by_username`, `createdAt`, `updatedAt`) VALUES
(1, 'PROJ5', 1, NULL, NULL, NULL, 'SSIL20229674508488/4', 'PROJECT 5', NULL, '2022-05-28 05:30:00', '2023-07-29 14:55:22', NULL, 0, 2, 'WB', 212, 'HOWRAH', 0, 2, NULL, NULL, NULL, 3, 'Shubham Raj', '2022-05-27 18:41:41', '2022-05-27 18:41:41'),
(2, 'GH2022/2', 4, NULL, NULL, NULL, 'SSIL20229110181521/4', 'PROJECT 7', 'assets/project-image/1653731325509_pexels-photo-439416.jpeg', '2022-06-28 05:30:00', '2024-06-15 14:55:14', NULL, 0, 2, 'WB', 224, 'HOOGLY', 0, 2, '22.57399977475996', '88.4313079396842', NULL, 3, 'Shubham Raj', '2022-05-28 15:18:45', '2022-05-28 15:18:45'),
(3, 'GH2022/3', 7, NULL, NULL, NULL, 'SSIL20229674508421/4', 'Project - 6', NULL, '2022-06-16 05:30:00', '2022-06-30 05:30:00', 'Checking', 0, 2, 'WB', 224, 'HOOGLY', 0, 5, NULL, NULL, NULL, 3, 'Super Admin', '2022-06-16 16:57:36', '2022-06-16 16:57:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_project_masters`
--
ALTER TABLE `tbl_project_masters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plan_id` (`plan_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_project_masters`
--
ALTER TABLE `tbl_project_masters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_project_masters`
--
ALTER TABLE `tbl_project_masters`
  ADD CONSTRAINT `tbl_project_masters_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `tbl_project_budget_plans_masters` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
