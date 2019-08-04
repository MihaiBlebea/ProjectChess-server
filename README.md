# Project Chess

# Env keys

- [x] MYSQL_HOST
- [x] MYSQL_USERNAME
- [x] MYSQL_DATABASE
- [x] MYSQL_PASSWORD
- [x] MYSQL_PORT

# Mysql Create tables commands

### Create **games** table

```
CREATE TABLE `games` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `round` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
```

### Create **pieces** table

```
CREATE TABLE `pieces` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `game_id` int(11) NOT NULL,
  `player` varchar(250) NOT NULL DEFAULT '',
  `type` varchar(250) DEFAULT NULL,
  `position_row` int(11) DEFAULT NULL,
  `position_column` int(11) DEFAULT NULL,
  `updated` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=latin1;
```