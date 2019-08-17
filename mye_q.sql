/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.5.36 : Database - mye_q
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`mye_q` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `mye_q`;

/*Table structure for table `address` */

DROP TABLE IF EXISTS `address`;

CREATE TABLE `address` (
  `d_id` int(11) NOT NULL AUTO_INCREMENT,
  `addinfo` varchar(100) DEFAULT NULL,
  `ui_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`d_id`),
  KEY `FK_address` (`ui_id`),
  CONSTRAINT `FK_address` FOREIGN KEY (`ui_id`) REFERENCES `userinfo` (`ui_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `address` */

/*Table structure for table `classify` */

DROP TABLE IF EXISTS `classify`;

CREATE TABLE `classify` (
  `s_id` int(11) NOT NULL AUTO_INCREMENT,
  `s_name` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `classify` */

insert  into `classify`(`s_id`,`s_name`) values (1,'枝数'),(2,'对象');

/*Table structure for table `clothing` */

DROP TABLE IF EXISTS `clothing`;

CREATE TABLE `clothing` (
  `cl_id` int(11) NOT NULL AUTO_INCREMENT,
  `cl_name` varchar(20) DEFAULT NULL,
  `s_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`cl_id`),
  KEY `FK_women_clothing` (`s_id`),
  CONSTRAINT `FK_clothing` FOREIGN KEY (`s_id`) REFERENCES `classify` (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `clothing` */

insert  into `clothing`(`cl_id`,`cl_name`,`s_id`) values (1,'恋人',2),(2,'朋友',2),(3,'父母',2),(4,'老师',2),(5,'病人',2),(6,'领导',2);

/*Table structure for table `contact` */

DROP TABLE IF EXISTS `contact`;

CREATE TABLE `contact` (
  `c_id` int(10) NOT NULL AUTO_INCREMENT,
  `c_name` varchar(50) DEFAULT NULL,
  `c_tel` varchar(20) DEFAULT NULL,
  `c_message` varchar(280) DEFAULT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

/*Data for the table `contact` */

insert  into `contact`(`c_id`,`c_name`,`c_tel`,`c_message`) values (2,'蒋宇杰','10081008123','谁把我二狗子拐卖了'),(3,'张翰文','10089645785','刨冰走一起去吃刨冰 我请客'),(4,'胡丹','78945612313','嘿嘿'),(5,'吴虹','17808235689','您好，请问有什么可以为您服务'),(10,'肖媚','1234','456789又收藏一件'),(12,'肖媚','123456','张翰文，安排你做的做好了嘛'),(13,'asd','45678912323','sb'),(15,'小红','13245667454','体重55kg'),(16,'小蒋','15282502852','不要男装'),(17,'富人病','15552789123','狗带'),(21,'爱宝马','0874-00123','大box亲自送货'),(24,'夫人病','1314159','我一辈子注定没夫人不要女装'),(25,'皮皮虾我们走','18975641343','想去黄土高原拍一套田园的，可不可以提供全程拍摄'),(26,'biubiu','15678987654','你们的页面好美呀，开发员都很漂亮吧'),(27,'弧光灯鱼','23435435443','美丽动人'),(28,'陆地上的鱼','12325566443','活波可爱'),(29,'皮你和我皮','13456545452','要最帅的  合适的'),(30,'傻傻的总是很萌','13456789876','不要抢我们家生意，小心把你们降维'),(31,'不能离开','12323433573','沙发'),(33,'hongye','15520261295','2017-10-30 我要预约'),(34,'徐丹','123456891512',NULL),(36,'肖媚','12345678978',NULL),(37,'肖媚','17808323471',NULL),(38,'xiaomei','17808323471',NULL);

/*Table structure for table `customization` */

DROP TABLE IF EXISTS `customization`;

CREATE TABLE `customization` (
  `c_id` int(50) NOT NULL AUTO_INCREMENT,
  `c_name` varchar(20) NOT NULL,
  `c_tel` varchar(11) NOT NULL,
  `c_kind` varchar(20) DEFAULT NULL,
  `c_time` varchar(10) NOT NULL,
  `c_remark` varchar(140) DEFAULT NULL,
  UNIQUE KEY `c_id` (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

/*Data for the table `customization` */

insert  into `customization`(`c_id`,`c_name`,`c_tel`,`c_kind`,`c_time`,`c_remark`) values (10,'肖媚','11111','','',''),(12,'345','17808323471','花式','2013.2.13','000'),(14,'肖媚','17808323471','拥抱','2018/04/18','0000000'),(15,'xiaomei','17808323471','aaaa','2018-04-15','20202020');

/*Table structure for table `goods_info` */

DROP TABLE IF EXISTS `goods_info`;

CREATE TABLE `goods_info` (
  `ci_id` int(11) NOT NULL AUTO_INCREMENT,
  `ci_name` varchar(20) DEFAULT NULL,
  `ci_price` double DEFAULT NULL,
  `old_price` varchar(10) DEFAULT NULL,
  `cl_id` int(11) DEFAULT NULL,
  `details` varchar(200) DEFAULT NULL,
  `img_src1` varchar(100) DEFAULT NULL,
  `img_src2` varchar(100) DEFAULT NULL,
  `st_number` int(10) DEFAULT NULL,
  `number` int(10) DEFAULT NULL,
  `int_time` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ci_id`),
  KEY `FK_goods_info` (`cl_id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;

/*Data for the table `goods_info` */

insert  into `goods_info`(`ci_id`,`ci_name`,`ci_price`,`old_price`,`cl_id`,`details`,`img_src1`,`img_src2`,`st_number`,`number`,`int_time`) values (1,'你是我的璀璨星光',299,'白色',1,'33枝顶级红玫瑰，搭配黄莺、石竹梅（或相思梅）','images/myE&QImg/33rose1.jpg','images/myE&QImg/33rose1-1.jpg',25,33,'2017-10-23'),(2,'我的宠妃',300,'绿色',1,'33朵红玫瑰，外围满天星丰满围边，黄莺间插，2只可爱熊','images/myE&QImg/33rose2.jpg','images/myE&QImg/33rose2-1.jpg',36,33,'2017-10-23'),(3,'爱如氧气',520,'白色',1,'精心挑选33枝顶级蓝色妖姬，黄莺，满天星外围点缀','images/myE&QImg/33rose3.jpg','images/myE&QImg/33rose3-1.jpg',18,33,'2017-10-23'),(4,'恋恋勿忘',289,'黑色',1,'精选33朵红玫瑰，搭配黄莺，满天星。','images/myE&QImg/33rose4.jpg','images/myE&QImg/33rose4-1.jpg',200,33,'2017-10-23'),(5,'因为是你',293,'灰色',1,'33朵香槟玫瑰，搭配相思梅','images/myE&QImg/33rose5.jpg','images/myE&QImg/33rose5-1.jpg',198,33,'2017-10-23'),(6,'遇见你',308,'黑色',1,'33朵戴安娜玫瑰，绿叶间中丰满点缀。','images/myE&QImg/33rose6.jpg','images/myE&QImg/33rose6-1.png',197,33,'2017-10-23'),(7,'木棉情',237,'红色',5,'19朵色香水百合（白色+粉色），勿忘我黄莺间插','images/productList/illpeople1.jpg','images/productList/illpeople1.jpg',156,19,'2017-10-23'),(8,'绵绵情谊',219,'黑色',5,'精选8朵红玫瑰，6朵香槟玫瑰，5朵安娜粉玫瑰，叶上黄金（或栀子叶）点缀。','images/productList/illpeople2-1.jpg','images/productList/illpeople2-2.jpg',35,19,'2017-10-23'),(9,'祝你吉祥',259,'蓝色',5,'19支红色康乃馨+2支粉色多头百合，搭配黄莺、石竹梅、满天星、栀子叶','images/productList/illpeople3.jpg','images/productList/illpeople3.jpg',42,19,'2017-10-23'),(10,'深深的祝福',229,'黄色',5,'5枝白色多头百合，搭配满天星、黄莺、外围勿忘我点缀。','images/productList/illpeople4-1.jpg','images/productList/illpeople4-2.jpg',56,9,'2017-10-23'),(11,'美好生活',219,'米色',5,'19朵红玫瑰，黄莺加满天星搭配。','images/productList/illpeople5-1.jpg','images/productList/illpeople5-1.jpg',86,19,'2017-10-23'),(12,'清水茉莉',189,'黑色',2,'11枝戴安娜玫瑰，搭配桔梗，黄莺，丝带草','images/productList/friend1.jpg','images/productList/friend1-2.jpg',55,11,'2017-10-23'),(13,'美丽心情',220,'米色',2,'白色多头香水百合，黄莺绿叶间插点缀。','images/productList/friend2-1.jpg','images/productList/friend2-2.jpg',24,9,'2017-10-23'),(14,'芳华闪耀',293,'蓝色',2,'33朵戴安娜玫瑰，相思梅丰满围边，高山积雪（或绿叶）外层点缀','images/productList/friend3-1.jpg','images/productList/friend3-2.jpg',66,33,'2017-10-23'),(15,'只如初见你',179,'米色',2,'精选11支红玫瑰，满天星，绿叶搭配，一对小熊。','images/productList/friend4-1.jpg','images/productList/friend4-1.jpg',24,11,'2017-10-23'),(16,'和煦微风',269,'红色',2,'19朵香槟玫瑰，2枝多头白百合，栀子叶间插','images/productList/friend5-1.jpg','images/productList/friend5-2.jpg',56,21,'2017-10-23'),(17,'幸福之花',179,'白色',2,'9朵香槟玫瑰+4枝百合搭配，勿忘我、栀子叶、黄莺点缀','images/productList/friend6-1.jpg','images/productList/friend6-2.jpg',23,13,'2017-10-23'),(18,'春暖花开',349,'红色',4,'9朵戴安娜玫瑰，桔梗，康乃馨，黄杨叶。','images/productList/teacher1-1.jpg','images/productList/teacher1-1.jpg',54,9,'2017-10-23'),(19,'天使爱恋',308,'白色',4,'9枝顶级香水白百合 黄莺 绿叶','images/productList/teacher2.jpg','images/productList/teacher2.jpg',58,9,'2017-10-23'),(20,'难忘的恩情',208,'红色',4,'13朵粉色康乃馨，3朵白百合，搭配勿忘我、绿叶点缀。','images/productList/teacher3.png','images/productList/teacher3.png',41,13,'2017-10-23'),(21,'只愿 ',249,'红色',4,'11枝极品红玫瑰，2枝多头粉百合，剑叶、绿叶间插搭配。','images/productList/teacher4-1.jpg','images/productList/teacher4-2.jpg',56,13,'2017-10-23'),(22,'忧思浓浓 ',249,'红色',4,'精心挑选11朵极品康乃馨，2枝多头百合，搭配情人草点缀。','images/productList/teacher5-1.jpg','images/productList/teacher5-2.jpg',25,13,'2017-10-23'),(23,'爱笑的眼睛',289,'白色',4,'19朵戴安娜粉玫瑰，一朵粉绣球，2枝白桔梗，绿菊搭配','images/productList/teacher6.jpg','images/productList/teacher6.jpg',85,19,'2017-10-23'),(24,'愿你健康平安',270,'白色',3,'精选19朵康乃馨，2枝香水百合，搭配黄莺、绿叶点缀','images/productList/parent6.jpg','images/productList/parent6.jpg',21,21,'2017-10-23'),(25,'思念您 ',329,'白色',3,'精选14朵粉康5朵红康，2枝多头百合，搭配黄莺，橘子叶。','images/productList/parent5.jpg','images/productList/parent5.jpg',45,21,'2017-10-23'),(26,'爱在身边',329,'白色',3,'33朵精品红玫瑰，2枝粉色多头百合，黄莺搭配','images/productList/parent4.png','images/productList/parent4-2.jpg',56,33,'2017-10-23'),(27,'感谢你的爱',270,'白色',3,'9枝粉百合，黄英丰满','images/productList/parent1.jpg','images/productList/parent1.jpg',32,9,'2017-10-23'),(28,'母爱永恒',270,'白色',3,'9支白百合，勿忘我 绿叶搭配','images/productList/parent2.jpg','images/productList/parent2.jpg',26,9,'2017-10-23'),(29,'淡淡清香',289,'白色',3,'9枝多头香水白百合，搭配黄莺、满天星、勿忘我、绿叶点缀','images/productList/parent3.jpg','images/productList/parent3.jpg',59,9,'2017-10-23'),(30,'蓝色的梦 ',319,'粉色',5,'11枝精品香水百合，黄莺间插丰满。','images/productList/illpeople6-1.jpg','images/productList/illpeople6-2.jpg',54,11,'2017-10-23'),(31,'幸福之花',279,'黑色',6,'9朵香槟玫瑰+4枝百合搭配，勿忘我、栀子叶、黄莺点缀','images/productList/leader1-1.jpg','images/productList/leader1-2.jpg',52,13,'2017-10-23'),(32,'简单快乐',306,'红色',6,'33朵香槟玫瑰，叶上黄金（或黄莺）搭配。','images/productList/leader2-1.jpg','images/productList/leader2-21.jpg',32,33,'2017-10-23'),(38,'一份思恋 ',270,'黑色',6,'21朵极品香槟玫瑰，雏菊、绿叶等搭配。','images/productList/leader3-1.jpg','images/productList/leader3-2.jpg',56,21,'2017-10-23'),(39,'温暖关切',198,'黑色',6,'11朵顶级白玫瑰，搭配适量桔梗和绿叶点缀','images/productList/leader4-1.jpg','images/productList/leader4-1.jpg',59,11,'2017-10-23'),(40,'岁月静好',279,'蓝色',6,'19枝香槟玫瑰，2支多头百合，黄莺间插点缀。','images/productList/leader5-1.jpg','images/productList/leader5-2.jpg',57,21,'2017-10-23'),(74,'香草美人',99,'169',11,'11枝戴安娜玫瑰搭配黄莺，随机赠送一直小熊。','images\\specialFlower\\specialOffier1.jpg','images\\specialFlower\\specialOffier1-1.jpeg',52,NULL,'2017-10-23'),(75,'青青子衿',128,'199',11,'19朵香槟玫瑰，加拿大黄莺间插','images\\specialFlower\\specialOffier2.jpg','images\\specialFlower\\specialOffier2-1.jpg',21,NULL,'2017-10-23'),(76,'亲爱的公主',99,'156',11,'11枝极品红玫瑰，黄莺间插丰满。','images/specialFlower/specialOffier3.jpg','images/specialFlower/specialOffier3-1.jpg',20,NULL,'2017-10-23'),(77,'浪漫邂逅',199,'289',11,'33枝顶级红玫瑰搭配黄莺','images/specialFlower/specialOffier4.jpg','images/specialFlower/specialOffier4-1.jpg',56,NULL,'2017-10-23');

/*Table structure for table `orderinfo` */

DROP TABLE IF EXISTS `orderinfo`;

CREATE TABLE `orderinfo` (
  `oi_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_name` varchar(20) DEFAULT NULL,
  `g_name` varchar(50) DEFAULT NULL,
  `oi_price` double DEFAULT NULL,
  `ci_id` int(10) DEFAULT NULL,
  `oi_number` int(15) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `oi_phone` varchar(20) DEFAULT NULL,
  `oi_state` int(20) DEFAULT NULL,
  `oi_remark` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`oi_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;

/*Data for the table `orderinfo` */

insert  into `orderinfo`(`oi_id`,`u_name`,`g_name`,`oi_price`,`ci_id`,`oi_number`,`address`,`oi_phone`,`oi_state`,`oi_remark`) values (37,'15328020132','绣花蕾丝渐变羽毛流苏长裙',NULL,2,NULL,'地址','2147483647',1,'备注'),(38,'15328020132','绣花蕾丝渐变羽毛流苏长裙',NULL,1,NULL,'发送','255565',1,'2'),(39,'15328020132','撒大大',NULL,2,NULL,'大大','566556',1,'2'),(40,'15328020132','报喜鸟男士秋冬季休闲西服',3250,42,4,'和GV价格','15328020132',1,NULL),(41,'15328020132','报喜鸟男士秋冬季休闲西服',3250,42,4,'和GV价格','15328020132',1,NULL),(42,'15328020132','钉珠绣花蕾丝羽毛流苏长裙',11929,1,4,'和GV价格','15328020132',1,NULL),(43,'15328020132','绣花蕾丝拖地深V长裙',6540,13,4,'奥术大师大','15328020132',1,NULL),(44,'15328020132','绣花蕾丝拖地深V长裙',6540,13,4,'奥术大师大','15328020132',2,NULL),(45,'15328020132','白色蕾丝绣花流苏复古婚礼服',12000,19,4,'奥术大师大','15328020132',2,NULL),(46,'15328020132','V领蕾丝拼接连衣裙',3429,3,1,'奥术大师大','15328020132',1,NULL),(47,'15328020132','绣花蕾丝渐变羽毛流苏长裙',9309,2,1,'奥术大师大','15328020132',2,NULL),(48,'15502812367','珠片蕾丝抹胸修身长裙',4269,27,3,'打撒多撒','15502812367',2,NULL),(49,'15502812367','珠片蕾丝抹胸修身长裙',4269,27,3,'打撒多撒','15502812367',2,NULL),(50,'15182629314','春夏新款 丝质 女士 连衣裙',8851,7,4,NULL,'15182629314',2,NULL),(51,'17808323471','爱在身边',329,26,3,'ewqeq','17808323471',2,NULL),(52,'17808323471','爱在身边',329,26,3,'ewqeq','17808323471',2,NULL),(53,'17808323471','爱在身边',329,26,3,'ewqeq','17808323471',2,NULL),(54,'17808323471','我的宠妃',300,2,1,'ewqeq','17808323471',2,NULL),(55,'17808323471','你是我的璀璨星光',299,1,3,'','17808323471',1,NULL),(56,'17808323471','木棉情',237,7,0,NULL,'17808323471',2,NULL);

/*Table structure for table `personal_center` */

DROP TABLE IF EXISTS `personal_center`;

CREATE TABLE `personal_center` (
  `p_id` int(11) DEFAULT NULL,
  `p_img` varchar(100) DEFAULT NULL,
  `p_consignee` varchar(8) DEFAULT NULL,
  `p_cellPhone` int(11) DEFAULT NULL,
  `p_province` varchar(16) DEFAULT NULL,
  `p_city` varchar(6) DEFAULT NULL,
  `p_district` varchar(6) DEFAULT NULL,
  `p_detAdd` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `personal_center` */

insert  into `personal_center`(`p_id`,`p_img`,`p_consignee`,`p_cellPhone`,`p_province`,`p_city`,`p_district`,`p_detAdd`) values (1,'images/personal/1.jpg','胡仁彬',2147483647,'四川省','成都市','高新区','天府软件园');

/*Table structure for table `shoppingcart` */

DROP TABLE IF EXISTS `shoppingcart`;

CREATE TABLE `shoppingcart` (
  `sc_id` int(11) NOT NULL AUTO_INCREMENT,
  `p_id` int(11) DEFAULT NULL,
  `sc_quantity` int(11) DEFAULT NULL,
  `u_name` varchar(11) DEFAULT NULL,
  `sc_size` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`sc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;

/*Data for the table `shoppingcart` */

insert  into `shoppingcart`(`sc_id`,`p_id`,`sc_quantity`,`u_name`,`sc_size`) values (1,1,2,'15520261295','00'),(2,4,3,'15520261295','00'),(4,19,2,'15520261295','4'),(22,13,4,'15328020132','6'),(23,11,2,'15520261295','00'),(28,7,1,'15328020132','00'),(32,5,3,'15182629314','2'),(33,2,1,'15502812367','00'),(37,74,1,'15502812367',NULL),(48,1,1,'17808323471',NULL),(49,74,1,'17808323471',NULL);

/*Table structure for table `stock` */

DROP TABLE IF EXISTS `stock`;

CREATE TABLE `stock` (
  `st_id` int(20) NOT NULL AUTO_INCREMENT,
  `pro_id` varchar(50) DEFAULT NULL,
  `pro_name` varchar(50) DEFAULT NULL,
  `in_time` varchar(20) DEFAULT NULL,
  `st_number` int(20) DEFAULT NULL,
  `pro_price` varchar(20) DEFAULT NULL,
  UNIQUE KEY `st_id` (`st_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;

/*Data for the table `stock` */

insert  into `stock`(`st_id`,`pro_id`,`pro_name`,`in_time`,`st_number`,`pro_price`) values (2,'2','绣花蕾丝渐变羽毛流苏长裙','2017-10-23',10,'9309'),(3,'3','V领蕾丝拼接连衣裙','2017-9-27',15,'3429'),(4,'4','蕾丝拼接流苏装饰连衣裙','2017-8-23',23,'2929'),(5,'5','金属绣花蕾丝深V性感长裙','2017-7-21',10,'4609'),(6,'6','丝绒镶条斗篷','2017-8-30',25,'4589'),(7,'7','春夏新款 丝质 女士 连衣裙','2017-9-26',20,'8851'),(8,'8','粘胶混纺 女士 连衣裙','2017-10-20',30,'7224'),(9,'9','粘胶纤维混纺 女士 连衣裙','2017-10-26',20,'10580'),(10,'10','Celine 赛琳 女士 连衣裙','2017-6-30',10,'7224'),(11,'11','SELF PORTRAIT 女士 连衣裙','2017-9-20',8,'2082'),(13,'13','绣花蕾丝拖地深V长裙','2017-10-20',12,'6540'),(16,'16','红色抹胸长裙','2017-10-23',11,'3456'),(17,'17','深V白色长裙','2017-10-24',10,'3290'),(18,'28','蕾丝绣花红色长裙','2017-10-25',20,'2555'),(19,'19','白色蕾丝绣花流苏复古婚礼服','2017-10-24',23,'12000'),(20,'20','红色鱼尾抹胸长裙','2017-10-25',12,'3888'),(21,'21','红色绣花金典复古婚礼服','2017-10-26',6,'6999'),(23,'23','白色蕾丝镂空鱼尾长裙','2017-10-23',20,'6999'),(24,'24','金丝露肩长裙','2017-10-12',12,'3400'),(25,'25','抹胸束腰长裙','2017-10-13',10,'6788'),(26,'26','收腰大摆蕾丝连衣裙','2017-10-15',19,'8888'),(27,'27','珠片蕾丝抹胸修身长裙','2017-10-25',45,'4269'),(28,'28','深V白色长裙','2017-10-15',23,'7028'),(29,'29','白色蕾丝拼接长袖连衣裙','2017-10-23',16,'3259'),(30,'30','SHIATZY CHEN 夏姿·陈 桑蚕','2017-10-24',27,'8700'),(31,'31','【eDressit衣爵士特】','2017-10-23',20,'6500'),(32,'32','休闲西服','2017-10-25',41,'4500'),(33,'38','圣玛露西服','2017-10-23',23,'8888'),(34,'39','JDV男装','2017-10-25',16,'4800'),(35,'40','ZIOZIA','2017-10-23',23,'2500'),(36,'41','英伦休闲小西装','2017-10-24',16,'1400'),(37,'42','报喜鸟男士秋冬季休闲西服','2017-10-13',8,'3250'),(38,'43','罗德梅科','2017-10-23',19,'5566'),(39,'44','潮流青少年外套工服','2017-10-21',15,'888'),(40,'45','青年潮流上衣','2017-10-21',25,'888'),(41,'46','男士红色西服','2017-10-26',34,'1250'),(42,'47','秋冬款男士韩版休闲修身金丝绒西服','2017-10-23',23,'1500'),(43,'48','圣玛露细条纹西服','2017-10-23',21,'2200'),(44,'49','新款修身男士单外套西服','2017-10-25',22,'2300'),(45,'2','玫瑰','2018/3/10',2,'50'),(47,'52','七匹狼男装','2017-10-25',15,'6500');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `u_id` int(20) NOT NULL AUTO_INCREMENT,
  `u_name` varchar(20) DEFAULT NULL,
  `u_pwd` varchar(20) DEFAULT NULL,
  `u_nickName` varchar(50) DEFAULT NULL,
  `u_sex` varchar(10) DEFAULT NULL,
  `u_phone` varchar(20) DEFAULT NULL,
  `u_email` varchar(20) DEFAULT NULL,
  `u_site` varchar(50) DEFAULT NULL,
  `u_img` varchar(50) DEFAULT NULL,
  `u_consignee` varchar(50) DEFAULT NULL,
  `u_cellPhone` varchar(50) DEFAULT NULL,
  `u_province` varchar(50) DEFAULT NULL,
  `u_city` varchar(50) DEFAULT NULL,
  `u_detAdd` varchar(100) DEFAULT NULL,
  `u_imgTwo` varchar(100) DEFAULT NULL,
  `u_goodsName` varchar(50) DEFAULT NULL,
  `u_count` varchar(100) DEFAULT NULL,
  `u_price` varchar(100) DEFAULT NULL,
  `u_state` varchar(10) DEFAULT NULL,
  UNIQUE KEY `u_id` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`u_id`,`u_name`,`u_pwd`,`u_nickName`,`u_sex`,`u_phone`,`u_email`,`u_site`,`u_img`,`u_consignee`,`u_cellPhone`,`u_province`,`u_city`,`u_detAdd`,`u_imgTwo`,`u_goodsName`,`u_count`,`u_price`,`u_state`) values (1,'admin','admin','超级管理员','中性',NULL,NULL,NULL,'../images/personal/1.jpg',NULL,NULL,NULL,NULL,NULL,'../images/myE&QImg/33rose4.jpg','恋恋勿忘','1','289','已关闭'),(6,'15182629314','747019','胡恶人','男','121212','121212',NULL,NULL,'胡仁彬','15502812367','四川省','南充','惹我吴仁宝',NULL,NULL,NULL,NULL,NULL),(7,'15325272722','1111111',NULL,NULL,NULL,'1297484517@qq.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'15328020132','1111111',NULL,NULL,NULL,'1297484517@qq.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'17808323471','111111',NULL,NULL,NULL,'1376296854@qq.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

/*Table structure for table `userinfo` */

DROP TABLE IF EXISTS `userinfo`;

CREATE TABLE `userinfo` (
  `ui_id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(30) DEFAULT NULL,
  `nickName` varchar(30) DEFAULT NULL,
  `sex` char(2) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `mailbox` varchar(100) DEFAULT NULL,
  `signature` varchar(50) DEFAULT NULL,
  `defaultAddress` varchar(50) DEFAULT NULL,
  `joinDate` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`ui_id`),
  KEY `FK_userinfo` (`defaultAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `userinfo` */

insert  into `userinfo`(`ui_id`,`userName`,`nickName`,`sex`,`phone`,`mailbox`,`signature`,`defaultAddress`,`joinDate`) values (1,'17808323471','肖女士','女','17808323471','1314159@qq.com','俺10个打肥朋一个','广东省潮州市潮安区南京路','2017.10.25'),(2,'15328020132','小草莓','男','15328020132','1314158@qq.com','俺一辈子注定没夫人','广东省潮州市潮安区南京路','2017.10.22');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
