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
-- Table structure for table `tbl_project_milestone_masters`
--

CREATE TABLE `tbl_project_milestone_masters` (
  `id` int NOT NULL,
  `title` varchar(55) NOT NULL,
  `description` text,
  `line_order` int NOT NULL DEFAULT '0',
  `image` text,
  `created_by` int NOT NULL,
  `created_by_username` varchar(155) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_project_milestone_masters`
--

INSERT INTO `tbl_project_milestone_masters` (`id`, `title`, `description`, `line_order`, `image`, `created_by`, `created_by_username`, `createdAt`, `updatedAt`) VALUES
(1, 'Site Clearing', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 1, 'assets/milstone-image/Ghreka-milstone-image-site-clearing.webp', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(2, 'Centeral Line Marking', NULL, 2, 'assets/milstone-image/Ghreka-milstone-image-site-Marking-for-Construction.jpg', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(3, 'Excavation', NULL, 3, 'assets/milstone-image/Ghreka-milstone-image-Con-02.jpeg', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(4, 'Anti Termite Treatment Phase 1', NULL, 4, 'assets/milstone-image/Ghreka-milstone-image-site-Marking-for-Construction.jpeg', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(5, 'Foundation', NULL, 5, 'assets/milstone-image/Ghreka-milstone-image-Con-02.jpeg', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(6, 'Plinth', NULL, 6, 'assets/milstone-image/Ghreka-milstone-image-Tie-Beam-Reinforcements-e1583227823627-1024x576.webp', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(7, 'Damp Proof Course', NULL, 7, 'assets/milstone-image/Ghreka-milstone-image-30-scaled.jpg', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(8, 'Plinth Filling', NULL, 8, 'assets/milstone-image/Ghreka-milstone-image-Tie-Beam-Reinforcements-e1583227823627-1024x576.webp', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(9, 'Anti Termite Treatment Phase 2', NULL, 9, 'assets/milstone-image/Ghreka-milstone-image-Chemical-Treatment-629x420.webp', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(10, 'Floor PCC', NULL, 10, 'assets/milstone-image/Ghreka-milstone-image-download.jpeg', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(11, 'Super Structure (Ground Floor)', NULL, 11, 'assets/milstone-image/Ghreka-milstone-image-Ground_Floor_Patient_Lobby_Area.jpeg', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(12, 'Slab Work', NULL, 12, 'assets/milstone-image/Ghreka-milstone-image-communications_292419-2238.jpg', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(13, 'Super Structure (1st Floor)', NULL, 13, 'assets/milstone-image/Ghreka-milstone-image-maxresdefault.jpg', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(14, 'Slab Work ( 1st Floor )', NULL, 14, 'assets/milstone-image/Ghreka-milstone-image-fresh-concrete-slab.jpg', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(15, 'Masonry Work', NULL, 15, 'assets/milstone-image/Ghreka-milstone-image-masonary-work-500x500.jpg', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(16, 'Waterproffing', NULL, 16, 'assets/milstone-image/Ghreka-milstone-image-37920-Atul-polymer.jpg', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(17, 'Tile / Granite / Marble Work', NULL, 17, 'assets/milstone-image/Ghreka-milstone-image-The-Marble-Tile-Installation-Case.jpg', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(18, 'Railings / MS Grill work', NULL, 18, 'assets/milstone-image/Ghreka-milstone-image-ms-grill-and-railing-500x500.jpg', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(19, 'Doors & Windows', NULL, 19, 'assets/milstone-image/Ghreka-milstone-image-Utah-window-installer.jpg', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(20, 'Electrical Works', NULL, 20, 'assets/milstone-image/Ghreka-milstone-image-electric-4198293__340.jpg', 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(21, 'Plumbing', NULL, 21, NULL, 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(22, 'Paint Work', NULL, 22, NULL, 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00'),
(23, 'Additional', NULL, 23, NULL, 1, 'Shubham Raj', '2022-05-19 00:00:00', '2022-05-19 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_project_milestone_masters`
--
ALTER TABLE `tbl_project_milestone_masters`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_project_milestone_masters`
--
ALTER TABLE `tbl_project_milestone_masters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
