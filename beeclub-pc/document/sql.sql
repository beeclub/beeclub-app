CREATE TABLE `t_course_direction` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `code` varchar(16) NOT NULL COMMENT '码值',
  `name` varchar(64) NOT NULL,
  `status` tinyint(3) NOT NULL DEFAULT '1' COMMENT '状态1有效 0无效',
  PRIMARY KEY (`id`),
  UNIQUE KEY uk_code (`code`),
  UNIQUE KEY uk_name (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='课程方向表';


create table t_course_category(
id int UNSIGNED auto_increment PRIMARY key COMMENT "id",
`code` varchar(32) not null,
`name` varchar(64) not null,
direction_code varchar(64) not null,
`pcode` VARCHAR(16) default null COMMENT "备用",
`status` TINYINT(3) not null default 1 COMMENT "状态1有效0无效",
UNIQUE uk_code(`code`),
UNIQUE uk_name(`name`)
) COMMENT "课程表类别";

create table t_course_main(
id int UNSIGNED auto_increment PRIMARY key COMMENT "主键",
`code` VARCHAR(32) not null COMMENT "课程代码",
title varchar(64) not null COMMENT "课程标题",
subhead varchar(128) not null COMMENT "课程副标题",
direction_code VARCHAR(16) not null COMMENT "课程方向",
category_code varchar(32) not null COMMENT "课程类别",
lecturer_code varchar(32) not null comment "讲师",
origin_price decimal(8,2) not null default 0 COMMENT "原始价格",
disacount_price decimal(8,2) default null COMMENT "原始价格",
free TINYINT(3) DEFAULT 1 COMMENT "1免费 2收费 ",
type TINYINT(3) DEFAULT 1 COMMENT "类型1 专项课程 2系列课程 ",
duration DECIMAL(8,2) not null default 1 COMMENT "时长",
study_count int default 0 not null COMMENT "学习人数",
online_time datetime not null COMMENT "上线时间",
favorable_rate DECIMAL(8,2) not null default 100 COMMENT "好评率",
difficulty_level TINYINT(3) not null DEFAULT 1 COMMENT "难度等级1,2,3,4,5 入门 初级 中级 高级",
`status` TINYINT(3) not null default 1 COMMENT "状态1有效0无效",
create_time datetime not null default CURRENT_TIMESTAMP COMMENT "插入时间",
modified_time datetime not null default CURRENT_TIMESTAMP COMMENT "插入时间",
UNIQUE uk_code(`code`),
INDEX idx_code(`code`),
INDEX idx_lecturer_code(`lecturer_code`)
) COMMENT "课程主表";