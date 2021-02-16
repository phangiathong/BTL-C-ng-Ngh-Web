-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 28, 2021 at 04:10 AM
-- Server version: 8.0.21
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `datasothich`
--

-- --------------------------------------------------------

--
-- Table structure for table `hocvan`
--

DROP TABLE IF EXISTS `hocvan`;
CREATE TABLE IF NOT EXISTS `hocvan` (
  `mahv` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tenhv` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`mahv`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hocvan`
--

INSERT INTO `hocvan` (`mahv`, `tenhv`) VALUES
('TH', 'THPT'),
('TC', 'Trung cấp'),
('CD', 'Cao đẳng'),
('ĐH', 'Đại học'),
('TS', 'Thạc sỹ'),
('SS', 'Tiến sỹ'),
('CS', 'THCS');

-- --------------------------------------------------------

--
-- Table structure for table `nghenghiep`
--

DROP TABLE IF EXISTS `nghenghiep`;
CREATE TABLE IF NOT EXISTS `nghenghiep` (
  `mann` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tennn` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`mann`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `nghenghiep`
--

INSERT INTO `nghenghiep` (`mann`, `tennn`) VALUES
('LTV', 'Lập trình viên'),
('sca', 'Bác Sỹ'),
('bbb', 'Thợ điện'),
('ttt', 'Nông dân'),
('rrr', 'Giáo viên'),
('ktt', 'Kế toán'),
('qtt', 'Quản trị kinh doanh'),
('kdd', 'Kinh doanh'),
('dll', 'Du lịch'),
('kkk', 'Khác');

-- --------------------------------------------------------

--
-- Table structure for table `sothich`
--

DROP TABLE IF EXISTS `sothich`;
CREATE TABLE IF NOT EXISTS `sothich` (
  `mast` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tensothich` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `theloaist` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `thoigianbdst` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lydost` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tansuatst` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `motast` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tinhcachst` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`mast`),
  KEY `theloaist` (`theloaist`),
  KEY `tinhcachst` (`tinhcachst`),
  KEY `username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sothich`
--

INSERT INTO `sothich` (`mast`, `tensothich`, `theloaist`, `thoigianbdst`, `lydost`, `tansuatst`, `motast`, `tinhcachst`, `username`) VALUES
('001', 'Đá bóng', 'NN', 'Lúc cấp 2', 'Tốt cho sức khỏe', '1 lần trong tuần', 'Đá bóng cùng bạn bè trong lớp', 'MM', 'anhbay'),
('007', 'Đá bóng', 'DD', 'Lúc cấp 2', 'Sở thích', '1 lần 1 tuần', 'Đá bóng cùng bạn bè', 'MM', 'b'),
('009', 'Ăn nhậu', 'GT', 'Lúc thời cấp 3', 'Giao lưu', '1 tuần 1 lần', 'Đi nhậu với bạn bè', 'MM', 'nha'),
('005', 'Mua sắm', 'GT', 'Lúc bé', 'Thích', '1 lần trong tuần', 'Mua săm với bạn bè', 'LT', 'anhhai');

-- --------------------------------------------------------

--
-- Table structure for table `theloai`
--

DROP TABLE IF EXISTS `theloai`;
CREATE TABLE IF NOT EXISTS `theloai` (
  `matl` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tentl` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`matl`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `theloai`
--

INSERT INTO `theloai` (`matl`, `tentl`) VALUES
('TN', 'Trò chơi trong nhà'),
('GT', 'Giải trí'),
('NM', 'Nhảy múa'),
('HD', 'Hoạt động'),
('TT', 'Thể thao cá nhân'),
('DD', 'Thể thao đồng đội'),
('NT', 'Hoạt động ngoài trời'),
('AM', 'Âm nhạc'),
('NN', 'Nghệ thuật'),
('SK', 'Sức khỏe'),
('KK', 'Khác');

-- --------------------------------------------------------

--
-- Table structure for table `tinhcach`
--

DROP TABLE IF EXISTS `tinhcach`;
CREATE TABLE IF NOT EXISTS `tinhcach` (
  `matinhcach` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tentinhcach` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`matinhcach`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tinhcach`
--

INSERT INTO `tinhcach` (`matinhcach`, `tentinhcach`) VALUES
('CC', 'Cá tính'),
('TC', 'Tình cảm'),
('CT', 'Cầu toàn'),
('LT', 'Lý trí'),
('NT', 'Nhiệt tình'),
('MM', 'Mạnh mẽ'),
('YD', 'Yếu đuối'),
('ON', 'Ôn hòa'),
('kk', 'Khác');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `tenuser` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `namsinhuser` date NOT NULL,
  `sdtuser` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `diachiuser` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gioitinhuser` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hocvan` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nghenghiep` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passworduser` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`username`),
  KEY `nghenghiep` (`nghenghiep`),
  KEY `hocvan` (`hocvan`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`tenuser`, `namsinhuser`, `sdtuser`, `diachiuser`, `gioitinhuser`, `hocvan`, `nghenghiep`, `username`, `passworduser`) VALUES
('chin', '2000-01-05', '0123654789', 'Cà Mau', 'Nam', 'ĐH', 'ttt', 'anhchin', '777'),
('Nguyễn Văn A', '1997-03-06', '0147963258', 'Cà Mau', 'Nữ', 'CD', 'LTV', 'sau', '6'),
('anh bay', '1997-05-06', '0258963147', 'Bà Rịa - Vũng Tàu', 'Nam', 'TH', 'LTV', 'anhbay', '777'),
('mot', '1997-05-06', '0258963147', 'Đà Nẵng', 'Nữ', 'TC', 'LTV', 'anhnhat', '1'),
('phanthong', '0000-00-00', '', '', '', '', 'LTV', 'admin', '123'),
('muoi', '2000-06-07', '7891234560', 'Bình Dương', 'Nam', 'CD', 'rrr', 'anhmuoi', '10'),
('Phan Gia Thống', '1998-02-12', '0147852369', 'Điện Biên', 'Nam', 'CD', 'bbb', 'pht', '123'),
('Nguyễn Văn A', '1996-05-03', '7896541230', 'Đắk Nông', 'Nam', 'SS', 'bbb', 'anhhai', '2'),
('Nguyễn Văn B', '1996-03-04', '0147852369', 'Bắc Giang', 'Nam', 'TC', 'ttt', 'b', 'b'),
('Phan Gia', '2004-12-03', '7896541230', 'Đắk Nông', 'Nam', 'CD', 'rrr', 'phan', '123'),
('Viên Thanh Nhã', '1995-03-01', '0123456789', 'Bến Tre', 'Giới tính', 'SS', 'rrr', 'nha', '123');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
