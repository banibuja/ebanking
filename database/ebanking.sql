-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2024 at 09:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;

--
-- Database: `ebanking`
--

-- --------------------------------------------------------

--
-- Table structure for table `loginregister`
--

CREATE TABLE `loginregister` (
    `id` int(11) NOT NULL, `name` varchar(255) NOT NULL, `lastname` varchar(255) NOT NULL, `banknumber` bigint(100) NOT NULL, `account` varchar(100) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `dateb` year(4) NOT NULL, `gender` varchar(10) NOT NULL, `phonenumber` varchar(20) NOT NULL, `role` enum('user', 'staff', 'admin') NOT NULL DEFAULT 'user'
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `loginregister`
--

INSERT INTO
    `loginregister` (
        `id`, `name`, `lastname`, `banknumber`, `account`, `email`, `password`, `dateb`, `gender`, `phonenumber`, `role`
    )
VALUES (
        38, 'bbbbbbbbb', 'bbbbbbb', 22237103, '', 'bani@gmail.com', '$2b$10$UYxQ/ymxnVtq/bfUeIZOCu5HbwEZecWs54crvAvFURpgw/ryqiEWe', '2001', 'Male', '2121221', 'admin'
    ),
    (
        39, 'dada', 'dasdaad', 22235925, '', 'bannni@gmail.com', '$2b$10$ZWmym4pYmRvlGB2/AGvLnuwWYNM3XNGXlymVknrgDKE.nf.b.Yu7W', '2001', 'Male', '212121', 'staff'
    ),
    (
        41, 'bbbb', 'bbbb', 22234874, '', 'baeni@gmail.com', '$2b$10$crhQboQL/6C3ObLwEJBGgOz3K08sHkKUDc5SyLRRSjWXsjCueFUIG', '2004', 'Male', '212121', 'user'
    ),
    (
        45, 'vvvvvvvv', 'vvvv', 22237156, '', 'bbani@gmail.com', '$2b$10$DklMiHbhtEP.1ejdj0yqquoI5CFJPcp4E4GcZ08hKggh74LySrJHC', '2001', 'Male', '212112', 'staff'
    );

--
-- Indexes for dumped tables
--

--
-- Indexes for table `loginregister`
--
ALTER TABLE `loginregister`
ADD PRIMARY KEY (`id`),
ADD UNIQUE KEY `banknumber` (`banknumber`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `loginregister`
--
ALTER TABLE `loginregister`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 47;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;