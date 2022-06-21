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
-- Table structure for table `tbl_project_milestone_tasks_masters`
--

CREATE TABLE `tbl_project_milestone_tasks_masters` (
  `id` int NOT NULL,
  `milestone_id` int NOT NULL,
  `task_name` varchar(255) NOT NULL,
  `created_by` int NOT NULL,
  `created_by_username` text NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_project_milestone_tasks_masters`
--

INSERT INTO `tbl_project_milestone_tasks_masters` (`id`, `milestone_id`, `task_name`, `created_by`, `created_by_username`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'PCC Bed', 1, 'Shubham Raj', '2022-05-19 16:32:56', '2022-05-19 11:02:56'),
(2, 1, 'Foot plate reinforcement', 1, 'Shubham Raj', '2022-05-19 16:33:45', '2022-05-19 11:03:45'),
(3, 1, 'Pedestal Column reinforcement', 1, 'Shubham Raj', '2022-05-19 16:33:54', '2022-05-19 11:03:54'),
(4, 1, 'RCC Taper', 1, 'Shubham Raj', '2022-05-19 16:34:03', '2022-05-19 11:04:03'),
(5, 1, 'Column Starter from footing', 1, 'Shubham Raj', '2022-05-19 16:34:12', '2022-05-19 11:04:12'),
(6, 1, 'Column shutter', 1, 'Shubham Raj', '2022-05-19 16:34:20', '2022-05-19 11:04:20'),
(7, 1, 'Soil fill', 1, 'Shubham Raj', '2022-05-19 16:34:32', '2022-05-19 11:04:32'),
(8, 2, 'PCC bed for plinth', 1, 'Shubham Raj', '2022-05-19 16:35:08', '2022-05-19 11:05:08'),
(9, 2, 'Plinth Beam reinforcement', 1, 'Shubham Raj', '2022-05-19 16:35:17', '2022-05-19 11:05:17'),
(10, 2, 'Plinth shuttering', 1, 'Shubham Raj', '2022-05-19 16:35:26', '2022-05-19 11:05:26'),
(11, 2, 'Plinth casting', 1, 'Shubham Raj', '2022-05-19 16:35:33', '2022-05-19 11:05:33'),
(12, 3, 'Plinth Beam', 1, 'Shubham Raj', '2022-05-19 16:37:30', '2022-05-19 11:07:30'),
(13, 4, 'Plinth Filling', 1, 'Shubham Raj', '2022-05-19 16:37:48', '2022-05-19 11:07:48'),
(14, 5, 'Anti Termite Treatment Phase 2', 1, 'Shubham Raj', '2022-05-19 16:38:01', '2022-05-19 11:08:01'),
(15, 6, 'Floor PCC', 1, 'Shubham Raj', '2022-05-19 16:38:13', '2022-05-19 11:08:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_project_milestone_tasks_masters`
--
ALTER TABLE `tbl_project_milestone_tasks_masters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `milestone_id` (`milestone_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_project_milestone_tasks_masters`
--
ALTER TABLE `tbl_project_milestone_tasks_masters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_project_milestone_tasks_masters`
--
ALTER TABLE `tbl_project_milestone_tasks_masters`
  ADD CONSTRAINT `tbl_project_milestone_tasks_masters_ibfk_1` FOREIGN KEY (`milestone_id`) REFERENCES `tbl_project_milestone_masters` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
