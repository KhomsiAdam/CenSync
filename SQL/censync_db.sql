-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 29, 2021 at 12:55 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `censync_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `note`
--

CREATE TABLE `note` (
  `note_id` varchar(16) NOT NULL,
  `user_id` varchar(16) NOT NULL,
  `ticket_id` varchar(16) NOT NULL,
  `content` text NOT NULL,
  `note_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `note_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `ticket_id` varchar(16) NOT NULL,
  `user_id` varchar(16) NOT NULL,
  `category` varchar(16) NOT NULL,
  `priority` varchar(16) NOT NULL,
  `title` varchar(32) NOT NULL,
  `content` text NOT NULL,
  `status` varchar(16) NOT NULL,
  `reported_by` varchar(32) NOT NULL,
  `assigned_by` varchar(32) NOT NULL,
  `assigned_to` varchar(32) NOT NULL,
  `ticket_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `ticket_assigned_at` datetime NOT NULL,
  `ticket_resolved_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`ticket_id`, `user_id`, `category`, `priority`, `title`, `content`, `status`, `reported_by`, `assigned_by`, `assigned_to`, `ticket_created_at`, `ticket_assigned_at`, `ticket_resolved_at`) VALUES
('TKT2bde76d', 'EMPf66b52b155f88', 'Service', 'Low', 'Basketball court.', 'Can we have a basketball club ?', 'Resolved', 'Abdussabour Bourras', 'Adam Khomsi', 'Ayoub Mabrouk', '2021-07-21 22:50:36', '2021-07-22 16:48:14', '2021-07-22 16:48:29'),
('TKT72a9176', 'EMP9033063ad6c35', 'Hardware', 'Medium', 'Mouse problem', 'Othmane always steals my mouse when I\'m not around.', 'Open', 'Mahdi Elboustani', 'Adam Khomsi', 'Ayoub Mabrouk', '2021-07-21 22:45:10', '2021-07-22 16:47:58', '0000-00-00 00:00:00'),
('TKT7313f35', 'EMP423dbe4a7f54e', 'Software', 'High', 'Issue with backend framework', 'PHP, Composer, Laravel, Symphony, Blade', 'Pending', 'Yassine Ghouaj', '', '', '2021-07-21 22:48:16', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(16) NOT NULL,
  `role` varchar(16) NOT NULL,
  `firstname` varchar(16) NOT NULL,
  `lastname` varchar(16) NOT NULL,
  `email` varchar(32) NOT NULL,
  `password` varchar(128) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `department` varchar(32) DEFAULT NULL,
  `jobtitle` varchar(32) DEFAULT NULL,
  `phone` varchar(16) DEFAULT NULL,
  `country` varchar(16) DEFAULT NULL,
  `city` varchar(16) DEFAULT NULL,
  `gender` varchar(8) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `status` varchar(8) DEFAULT NULL,
  `profile_img` varchar(32) DEFAULT NULL,
  `user_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `role`, `firstname`, `lastname`, `email`, `password`, `birthdate`, `department`, `jobtitle`, `phone`, `country`, `city`, `gender`, `bio`, `status`, `profile_img`, `user_created_at`, `user_updated_at`) VALUES
('ADMe769fbadacc23', 'Admin', 'Adam', 'Khomsi', 'adam.khomsi@censync.com', '$2y$10$VZzA0wc7SijjSdwr8cSP/uYDSqWr0t30iYebGS4QncUx9yITJPIh6', '1993-12-03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'active', '', '2021-07-04 21:28:14', '2021-07-04 21:28:14'),
('DEV6ce9d0c9afde5', 'Developer', 'Hamza', 'Bouchikhi', 'hamza.bouchikhi@censync.com', '$2y$10$vlOvm0DB4kixg0yYMl75XOK/0m0vG2NK1rJ2nY5Jkg5Nww2UXAN66', NULL, 'Frontend', 'Web Designer', NULL, NULL, NULL, NULL, NULL, 'active', '', '2021-07-21 22:37:42', '2021-07-21 22:42:55'),
('DEV76d004394b1ca', 'Developer', 'Othmane', 'Kahtal', 'othmane.kahtal@censync.com', '$2y$10$mEIratDkU4abcO3Z5MlpCu07x2m09ag9BSp1/5P9BTdXvQ2IE6SbC', NULL, 'CSS', 'Flexbox', NULL, NULL, NULL, NULL, NULL, 'active', '', '2021-07-21 22:45:58', '2021-07-21 22:46:21'),
('DEV7f4ec66a2d01b', 'Developer', 'Walid', 'Moultamis', 'walid.moultamis@censync.com', '$2y$10$TRQ1nDTiBP4E6a2qtb.7ROm4BGCU9ir864ebSQBLl79EP8D7kJgme', NULL, 'Atlas Trip', 'CEO', NULL, NULL, NULL, NULL, NULL, 'active', '', '2021-07-18 19:33:15', '2021-07-18 19:34:03'),
('DEV91c0c5fc2ad4c', 'Developer', 'Youssef', 'Hajjari', 'youssef.hajjari@censync.com', '$2y$10$dDAhf2.6LwzWcGkp8WHcYuI.agYWyJmFGFrp99l.M1FAhNgGYfdi6', NULL, 'Javascript', '7achwa', NULL, NULL, NULL, NULL, NULL, 'active', '', '2021-07-19 17:06:34', '2021-07-19 17:07:26'),
('EMP423dbe4a7f54e', 'Employee', 'Yassine', 'Ghouaj', 'yassine.ghouaj@censync.com', '$2y$10$KgWZxwSHheM9OW1S9yv.W.Tt0voRxNeF6nN4/v7OZKwZ1hA7hUDrC', NULL, 'Backend', 'Python Developer', NULL, NULL, NULL, NULL, NULL, 'active', '', '2021-07-21 22:42:25', '2021-07-21 22:43:15'),
('EMP9033063ad6c35', 'Employee', 'Mahdi', 'Elboustani', 'mahdi.elboustani@censync.com', '$2y$10$z3tRYUYlJuVdO5UN2irhfOImoNeHj2we2d04rAklmHRVOFUbX3z3m', NULL, 'LGBT', 'spolaya', NULL, NULL, NULL, NULL, NULL, 'active', '', '2021-07-18 22:46:21', '2021-07-18 22:46:37'),
('EMPe42bcc0e82c3f', 'Employee', 'John', 'Doe', 'john.doe@censync.com', '$2y$10$AjCP6O31XnTIjNT7gfyOmO.vUe6kaha40J66dXX0VWZJoT9WI9BUK', NULL, 'Finances', 'Analyst', NULL, NULL, NULL, NULL, NULL, 'active', '', '2021-07-23 20:44:28', '2021-07-23 20:44:45'),
('EMPf66b52b155f88', 'Employee', 'Abdussabour', 'Bourras', 'abdussabour.bourras@censync.com', '$2y$10$9I.Zue2trIe2gQ2hQ/aeb.SaTxbvkMQ/MIvaVN1SMX/SESul.WVn2', NULL, 'NBA', '2K', NULL, NULL, NULL, NULL, NULL, 'active', '', '2021-07-21 22:37:19', '2021-07-21 22:43:53'),
('TCH0e14a91fb5a7c', 'Technician', 'Karim', 'Baggari', 'karim.baggari@censync.com', '$2y$10$Gyf6A7hWNWEQbLC87PY.weIBbNsKSz7jx3DnmOK8sKWt9exjhgygG', NULL, 'Cyber Security', 'Hacker', NULL, NULL, NULL, NULL, NULL, 'active', '', '2021-07-21 22:38:18', '2021-07-21 22:44:10'),
('TCH29bb3caf40b1a', 'Technician', 'Elmahdi', 'Rammach', 'elmahdi.rammach@censync.com', '$2y$10$c7xWUESFO.ZkjIV5hIQ3R.jGKWQtfCL0tCOCzKqU5j7FWm4jlSnBq', NULL, 'Finances', 'Nessab', NULL, NULL, NULL, NULL, NULL, 'active', '', '2021-07-21 22:41:07', '2021-07-21 22:44:26'),
('TCH4c49d86b7a1a4', 'Technician', 'Youness', 'Hassoune', 'youness.hassoune@censync.com', '$2y$10$MLKTGdfEjwNjUUZkw7cqN.8mvEHYDXSVPPbuaT5bb3/qhaODfV7Vi', NULL, 'La balena', 'Sigena', NULL, NULL, NULL, NULL, NULL, 'active', '', '2021-07-19 17:06:59', '2021-07-19 17:07:46'),
('TCH7b15ae3b7739f', 'Technician', 'Ayoub', 'Mabrouk', 'ayoub.mabrouk@censync.com', '$2y$10$Sny78FD0E7s8mfkQaT1jbOdImPzDlGZP6YuteiZKLvVrWe.RNIzAe', NULL, 'Best Practice', 'PDO', NULL, NULL, NULL, NULL, NULL, 'active', '', '2021-07-18 18:13:44', '2021-07-18 18:18:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`note_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `ticket_id` (`ticket_id`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`ticket_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `note_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `note_ibfk_2` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id`) ON DELETE CASCADE;

--
-- Constraints for table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
