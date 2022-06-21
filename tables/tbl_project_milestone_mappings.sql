-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: project-service-db
-- Generation Time: Jun 21, 2022 at 07:19 AM
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
-- Table structure for table `tbl_project_milestone_mappings`
--

CREATE TABLE `tbl_project_milestone_mappings` (
  `id` int NOT NULL,
  `project_id` int NOT NULL,
  `project_ref_no` varchar(255) DEFAULT NULL,
  `milestone_id` int NOT NULL,
  `status` int DEFAULT '1' COMMENT '1-Active, 0-Deactive',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_project_milestone_mappings`
--

INSERT INTO `tbl_project_milestone_mappings` (`id`, `project_id`, `project_ref_no`, `milestone_id`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'SSIL20229110181521/4', 1, 1, '2022-06-04 09:30:58', '2022-06-04 09:30:58'),
(2, 2, 'SSIL20229110181521/4', 2, 1, '2022-06-04 09:30:58', '2022-06-04 09:30:58'),
(3, 2, 'SSIL20229110181521/4', 3, 1, '2022-06-04 09:30:58', '2022-06-04 09:30:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_project_milestone_mappings`
--
ALTER TABLE `tbl_project_milestone_mappings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `milestone_id` (`milestone_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_project_milestone_mappings`
--
ALTER TABLE `tbl_project_milestone_mappings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_project_milestone_mappings`
--
ALTER TABLE `tbl_project_milestone_mappings`
  ADD CONSTRAINT `tbl_project_milestone_mappings_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `tbl_project_masters` (`id`),
  ADD CONSTRAINT `tbl_project_milestone_mappings_ibfk_2` FOREIGN KEY (`milestone_id`) REFERENCES `tbl_project_milestone_masters` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
