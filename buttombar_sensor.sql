CREATE TABLE IF NOT EXISTS `bottombar_sensor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `TypeName` varchar(200) DEFAULT NULL,
  `TypeIcon` varchar(200) DEFAULT NULL,
  `Description` varchar(200) DEFAULT NULL,
  `LastUpdateTime` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

INSERT INTO `bottombar_sensor` (`id`, `TypeName`, `TypeIcon`, `Description`, `LastUpdateTime`) VALUES
(1, 'Controller', 'ControllerIcon', '', ''),
(2, 'Co', 'CoIcon', '', '');