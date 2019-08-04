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

# How to run the project locally?

- [x] Clone this repo
- [ ] Navigate to the root folder & run ```npm run install```
- [ ] Run ```npm run watch```
- [ ] Create a mysql instance and copy paste the commands above to create the tables: **games** & **pieces**
- [ ] Crate an **.env** file in the root folder and add the keys from above
- [ ] Add the configs to connect to the mysql database in the **.env** filde
- [ ] Go to the command tool and run:

1. Create new game: ``` curl localhost:3000/game/new --request POST | json_pp```
2. Get a list of all games created: ``` curl localhost:3000/games --request GET | json_pp ```
3. Load a game: ``` curl localhost:3000/game/load/:id --request GET | json_pp ```, where :id is the id of the game to select
4. Move a piece: ``` curl localhost:3000/game/:id/move?from=A-2&to=A-4 --request GET | json_pp ```