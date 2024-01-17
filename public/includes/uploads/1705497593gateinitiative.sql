-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2024 at 11:40 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gateinitiative`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `first_name` varchar(225) NOT NULL,
  `last_name` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `pwd` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `first_name`, `last_name`, `email`, `pwd`) VALUES
(1, 'Abdulazeez', 'Salami', 'abdulazeezsalami19@gmail.com', '$2y$12$EAYERXDaMaXk5w48K8e7wut2709/RljkRadvTrLSjjcTRb10Emxjq');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(11) NOT NULL,
  `title` varchar(225) NOT NULL,
  `body` text NOT NULL,
  `author` varchar(225) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT curtime()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `body`, `author`, `created_at`) VALUES
(4, 'GATE INITIATIVE', 'All human transactions be it intellectual or practical take place within the matrix of a society. At GATE initiative, we are pioneer\'s and creators. Our Dream at GATE is to create :\r\n1. A society where no child or individual will feel a sense of hopelessness or identity crisis.\r\n2. A society where every individual will be able to discover, develop and exhibit their potentials.\r\n3. A society where gifts, abilities and talents will be celebrated honoured and appreciated.\r\n4. A society were youths will be involved and engaged with their talents and skills.\r\n5. A society where poverty will be at a low level.\r\n6. A society where every individual talents will turn into a profitable and marketable skill.\r\n7. A society where education will be available and enjoyable to everybody.\r\n8. A society where potentials will be utilized to create sustainable development.\r\n9. A society where leadership skills and entrepreneurship abilities from young ones will be encouraged.\r\n10. A society where every man on earth will be able to say \"I AM GREAT because of my GATE\".', 'Adebayo George', '2023-11-29 15:00:12'),
(5, 'Milestones', '1. GATE Initiative ambassadors have been able to make huge transformative impact on children,teenegers and young people.\r\n2. GATE initiative won the best youth organisation award in kwara state,Nigeria 2017.\r\n3. GATE has inspired and encouraged thousands of teenagers in Nigeria, especially in some nigeria state like Lagos, kwara, ibadan, and Niger state.\r\n4. Prominent Personalities has giving endorsement to GATE initiative some are\r\n- Commissioner for youth and sport ,kwara state  - Hon Femi Adebayo(Nollywood actor)\r\n- MR A.A Isiah(first hip hop lecturer in Africa).  - Director International Centre for leadership development etc.\r\n5. GATE initiative has empowered youths in entrepreneur activities some are MaryMo liquid soap, V.Ps world, Lincoln graphics, GELA bags,Samlofty graphics etc.\r\n6. GATE initiative has made some children smile again by providing writing materials to some public primary schools.\r\n7. GATE initiative is currently successful in mentoring and coaching young once in the sphere of Purpose discovering,Leadership development, Entrepreneurship and Talents development.\r\n 8. GATE initiative events have being sponsored by some Private organisation like Indomie,lacasera,Item7 ,MTN and some great philatrophist.', 'Admin', '2023-11-29 15:11:22'),
(6, 'Arrows and Battles', 'Skulls, spoils and blood; Was the story of all the battles. Kings: they laid bare their defences. Truism is it? Lust at its peak: Said the sensible intellectuals, Wars do not need arrows to birth themselves. The scars, the casualties – infanticide; When the pardigm shifts to skirts to fight the battle, They feel pain and torture, the throes of yesterday scars. Is it the death row on the dog-nose mornings, Or the heart torn out of its place with forceful piercings. We are victorious; let\'s call in the wine, bread and berries; It was an empire we have to conquer, They were rich and we were sad, At the end, our victory was temporary. Our sister empires came all dress in armour, Why dress this way to a battle with a friend? They came unclad! We won again! The bastards came in droves, They hackneyed us to death, why? We have forgotten our unborn children, We killed their mothers. In soul and tales, their future we took. We are victorious! Now the time has come to face our battles, But now our arrow has weaned us, We pine over our victory, We should have known; The battles and the cries of our arrows were illusions and charades.', 'ODUNEWU ABDULHAKEEM', '2023-11-29 15:13:37');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `img` varchar(225) NOT NULL,
  `title` varchar(225) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT curtime()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `img`, `title`, `description`, `created_at`) VALUES
(23, '6565d6399f1cb1.79854988.jpg', 'TEENS OUTREACH', 'Teenagers face various issues related to physical, emotional, social, and mental well-being. Some of the most common issues teenagers face today include:Negative body image, Difficulty prioritizing and managing time,\r\nPressure from peers, parents, and society to conform to conflicting expectations, Mental and physical health issues\r\nLack of good mentors, role models, Academic pressure, Social anxiety, Self-discovery Bullying etc.\r\n\r\nGATE INITIATIVE reach out to them by organizing workshops and outreaches that will encourage and empower in personal development, help to identify and achieve career goals, Increase confidence levels and guide them from Avoiding of bad decisions .', '2023-11-28 12:59:53'),
(24, '6565d67ad7a971.42955474.jpg', 'A LIFE WITH PURPOSE', 'This is an annual event that helps young people to understand how to develop a purpose in life and also provide guidance for cultivating a positive purpose.\r\nKnowing your purpose in life can have a positive impact on your physical and mental health, as well as your overall happiness. Equipping them to Have a sense of purpose can also promote healthy habits and contribute to a sense of identity and improved mental health. \r\n\r\nAt the end of the events, they are filled with insights on how having a purpose in life can provide a sense of direction and meaning, which can lead to a more fulfilling life.', '2023-11-28 13:00:58'),
(25, '6565d6a63891b6.13009751.jpg', 'TALENTS HUNTS', 'Research has shown that children involved in talents competition are less likely to have signs of anxiety, depression, withdrawal. Team players may have had less difficulty socially because they had practiced cognitive empathy: understanding how others think. GATE INITIATIVE TALENTS competitions are organized to promote a growth mindset and resilience. It\'s an excellent way to help children develop their skills, build confidence, and learn how to collaborate with others. They also provide a platform for them to demonstrate their talent and gain exposure to real-world issues.', '2023-11-28 13:01:42'),
(26, '6565d6d3dfdcc2.85841706.jpg', 'SKILLS ACQUISITION', 'The phrase “an idle hand is the devil’s workshop” is a well-known adage that cautions against the trouble that can result from being lazy or non-productive. Skill acquisition is an important project of ours that leads to personal and professional development for young people. This has been helping both the individual and society in the areas of Self-employment/Employment generation, engaging them effectively, Reduction of criminal activities, reduction in unwanted pregnancy ,Positioning them for Better Financial Management, Improving their Strategic Planning etc.', '2023-11-28 13:02:27'),
(27, '6565d70ce365b7.72520122.jpg', 'SCHOOL STORM', 'GATE INITIATIVE has visited over 40 schools with the total of 1000 students, The aim of this project is to break down the message of discovering, developing and exhibiting their talents at the school level. Some children never know how important their talent and abilities are and how it can connect them in life, make them relevant and also successful.', '2023-11-28 13:03:24'),
(28, '6565d74a6b7064.55146098.jpg', 'EDUCATIONAL PROJECTS', 'Quizzes and debates are both important tools that can help improve one’s general knowledge. They enable students to think from different angles or simply ‘to think out of the box’. They offer students the opportunity to engage in critical thinking, develop their academic research skills, improve their communication abilities, solve problems in a creative way, and increase their self-confidence. This platform empowers students to express their views effectively and respond to arguments cogently with which they do not agree. We give out Prizes in our quiz and debate competitions to motivate participants and recognize their efforts,', '2023-11-28 13:04:26');

-- --------------------------------------------------------

--
-- Table structure for table `gallary`
--

CREATE TABLE `gallary` (
  `id` int(11) NOT NULL,
  `img` varchar(225) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT curtime()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallary`
--

INSERT INTO `gallary` (`id`, `img`, `created_at`) VALUES
(9, '655f48a3e6d2b0.76964729.jpg', '2023-11-23 13:42:11'),
(10, '655f48a8dded51.81745910.jpg', '2023-11-23 13:42:16'),
(11, '655f48aea35c61.43537725.jpg', '2023-11-23 13:42:22'),
(12, '655f48b4e41372.04013294.jpg', '2023-11-23 13:42:28'),
(13, '655f48bd0353a3.66623854.jpg', '2023-11-23 13:42:37'),
(14, '655f48c58dea18.81705018.jpg', '2023-11-23 13:42:45'),
(15, '655f48cbdec834.20073334.jpg', '2023-11-23 13:42:51'),
(16, '655f48d7f38606.34373368.jpg', '2023-11-23 13:43:03'),
(17, '655f48de12a979.12590159.jpg', '2023-11-23 13:43:10'),
(18, '655f48e3b83b21.74141259.jpg', '2023-11-23 13:43:15'),
(19, '655f48f2dfe880.72658573.jpg', '2023-11-23 13:43:30'),
(20, '655f48fad6a573.79404731.jpg', '2023-11-23 13:43:38'),
(21, '655f49085af358.95499712.jpg', '2023-11-23 13:43:52'),
(22, '655f49102f1b58.70361114.jpg', '2023-11-23 13:44:00'),
(23, '655f4919052a40.38415104.jpg', '2023-11-23 13:44:09'),
(24, '655f492700aef8.09906053.jpg', '2023-11-23 13:44:23'),
(25, '655f49312b5a81.93061193.jpg', '2023-11-23 13:44:33'),
(26, '655f49396a5638.76034980.jpg', '2023-11-23 13:44:41'),
(28, '655f49573faf98.14259064.jpg', '2023-11-23 13:45:11'),
(29, '655f49611e91e1.91941076.jpg', '2023-11-23 13:45:21'),
(30, '655f496abf6771.32930163.jpg', '2023-11-23 13:45:30'),
(31, '655f4975c73765.83287779.jpg', '2023-11-23 13:45:41'),
(32, '655f49911e24c7.17181855.jpg', '2023-11-23 13:46:09'),
(33, '655f49a2b6f3c1.52251538.jpg', '2023-11-23 13:46:26'),
(34, '655f49b0b8ef90.16311701.jpg', '2023-11-23 13:46:40'),
(35, '655f49b9c824f6.52690804.jpg', '2023-11-23 13:46:49'),
(36, '655f49c4a1bc86.69302787.jpg', '2023-11-23 13:47:00'),
(37, '655f49cc8ffc32.94942355.jpg', '2023-11-23 13:47:08'),
(38, '655f49d88d3e59.90588183.jpg', '2023-11-23 13:47:20'),
(39, '655f49f9008b16.97885889.jpg', '2023-11-23 13:47:53'),
(40, '655f4a0146e400.37424770.jpg', '2023-11-23 13:48:01'),
(41, '655f4a0bd85b28.99890309.jpg', '2023-11-23 13:48:11'),
(42, '655f4a1a46cb62.06743750.jpg', '2023-11-23 13:48:26'),
(43, '655f4a93cac189.68186561.jpg', '2023-11-23 13:50:27'),
(44, '655f4a9c0217a4.28042028.jpg', '2023-11-23 13:50:36'),
(45, '655f4aa603a7c6.09058510.jpg', '2023-11-23 13:50:46'),
(46, '655f4aac75ee82.45765920.jpg', '2023-11-23 13:50:52'),
(47, '655f4ab40b0ac4.44449932.jpg', '2023-11-23 13:51:00'),
(48, '655f4ab9949c74.39795759.jpg', '2023-11-23 13:51:05'),
(49, '655f4ac10c57e3.62821515.jpg', '2023-11-23 13:51:13'),
(50, '655f4ac9737f44.63404907.jpg', '2023-11-23 13:51:21'),
(51, '655f4acfea70b7.03412061.jpg', '2023-11-23 13:51:27'),
(52, '655f4ad534bc42.50261207.jpg', '2023-11-23 13:51:33'),
(53, '655f628b1c1911.72543341.jpg', '2023-11-23 15:32:43');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `id` int(11) NOT NULL,
  `title` varchar(225) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT curtime()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `title`, `created_at`) VALUES
(2, 'Public and Media', '2023-12-03 14:26:22'),
(3, 'Information and Communication', '2023-12-03 14:26:38'),
(4, 'Finance and Accounts', '2023-12-03 14:26:50'),
(5, 'Welfare and Hospitality', '2023-12-03 14:27:00'),
(6, 'Project and Planning', '2023-12-03 14:27:10'),
(7, 'Editorial and Content', '2023-12-03 14:27:19');

-- --------------------------------------------------------

--
-- Table structure for table `testimonies`
--

CREATE TABLE `testimonies` (
  `id` int(11) NOT NULL,
  `testimony` text NOT NULL,
  `author` varchar(225) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT curtime()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `testimonies`
--

INSERT INTO `testimonies` (`id`, `testimony`, `author`, `created_at`) VALUES
(4, 'My testimony about GATE is plenty but I’ll summarise. GATE INITIATIVE came to me when I was planning to look for an NGO to join in school ( Unilorin) as part of contributing my quota of humanitarian service back in my second year in school. Though it just started and was just founded by a friend who happens to be the founder himself. He explained to me the vision and mission of the NGO. I was glad to be part of the very few persons to have begun as members then in 2016. It was slow and steady then due the fact that it started over the school holiday and online for that matter. So far GATE INITIATIVE has broaden my knowledge through the various meetings we’ve had, courtesy visits we’ve paid and outings we attended , help build my courage so much through roles and responsibility assigned to me, help discover and improve my relational skill, brought me to the lim lights of procedures, requirements, of an organization. Gate has really impacted my teamwork ability, my thinking, my picture that the future goals, ambition is attainable. GATE taught me that anything is attainable if you set your mind and energy to it this I learnt from the challenges the organization faced coming up the disappointments, the mistakes made, the absence of funds at some points for programs and some denials. Gate has influenced and instigate my business ability and structure. Getting a Brand name,publicizing, marketing and redefined model for my bag making business. GATE has come in through for me in some many ways that will forever change my life. There’s more that Gate has done for me personally. But. Words cannot carry it all, they have bless me in every way. God bless GATE INITIATIVE. Long live GATE INITIATIVE!!!!!!!\r\n                    ', 'Olakunlehin Yemisi Gladys', '2023-11-29 17:14:06'),
(5, 'GATE Initiative Should initiate more of this awesome ideas to improve self acquisition skill for youth and any interested individual Keep the good work going! Thank you GATE INITIATIVE.', 'HALIMAH YUSUF MOPELOLA', '2023-11-29 17:14:46'),
(6, 'GATE INITIATIVE, should improve in making such entrepreneurship skills accessible to youths. Thanks for the great opportunity…I really appreciate every bit of it. God bless.', 'Yusuf Dupelola A', '2023-11-29 17:15:30'),
(7, 'Keep on the good work', 'Yewande George', '2023-11-29 17:15:55'),
(8, 'Continue to impact peoples and touch lives. I am saying thank you', 'Olaoye Ajibola Sarah', '2023-11-29 17:16:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `talent` varchar(225) NOT NULL,
  `first_name` varchar(225) NOT NULL,
  `last_name` varchar(225) NOT NULL,
  `gender` varchar(225) NOT NULL,
  `dob` date NOT NULL,
  `address` varchar(225) NOT NULL,
  `city` varchar(225) NOT NULL,
  `state` varchar(225) NOT NULL,
  `country` varchar(225) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(225) NOT NULL,
  `education_status` varchar(225) NOT NULL,
  `institution` varchar(225) NOT NULL,
  `occupation` varchar(225) NOT NULL,
  `desired_team` varchar(225) NOT NULL,
  `photo` varchar(225) NOT NULL,
  `social` varchar(225) NOT NULL,
  `interest` varchar(225) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT curtime()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `talent`, `first_name`, `last_name`, `gender`, `dob`, `address`, `city`, `state`, `country`, `phone`, `email`, `education_status`, `institution`, `occupation`, `desired_team`, `photo`, `social`, `interest`, `created_at`) VALUES
(2, 'Smile', 'Abdulazeez', 'Salami', 'male', '2023-10-19', 'Bosso', 'Minna', 'Niger', 'Nigeria', '08106925925', 'abdulazeezsalami19@gmail.com', 'graduate', 'FUT Minna', 'IT intern', 'Informations and Communication', '656c791848bbc2.75998286.png', '', 'Sport, Outdoors, Music', '2023-12-03 14:38:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallary`
--
ALTER TABLE `gallary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonies`
--
ALTER TABLE `testimonies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `gallary`
--
ALTER TABLE `gallary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `testimonies`
--
ALTER TABLE `testimonies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
