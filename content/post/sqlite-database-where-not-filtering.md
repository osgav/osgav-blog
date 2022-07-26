
+++
author = "osgav"
date = "2022-07-26T14:55:32Z"
draft = false
image = "images/headers/myrfa-3126475-files-pixabay.jpg"
share = true
slug = "sqlite-database-where-not-filtering"
tags = ["SQLite", "SQL", "database design"]
title = "SQLite database WHERE clause condition not filtering rows"
[menu.main]
parent = "blog"
+++

It is possible to create a table in an SQLite database where the columns have no *type.*
<br><br>
For example, the columns in this `STATS` table have no type specified:
<br><br>
```sql
sqlite> PRAGMA TABLE_INFO('STATS');
cid  name       type  notnull  dflt_value  pk
---  ---------  ----  -------  ----------  --
0    PLAYER_ID        0                    0 
1    YEAR             0                    0 
2    TEAM             0                    0 
3    AB               0                    0 
4    HITS             0                    0 
5    HR               0                    0 
6    RBI              0                    0 
```
<br><br>
This doesn't seem to make much of a difference if you are storing strings / text data, and writing queries to retrieve things based on those strings.
<br><br>
However, if you are storing numbers, then you'll notice a problem if you try queries like this:

<!--more-->

```sql
sqlite> SELECT * FROM STATS
   ...> WHERE YEAR > 1999
   ...> LIMIT 7;
PLAYER_ID  YEAR  TEAM  AB   HITS  HR  RBI
---------  ----  ----  ---  ----  --  ---
1          1986  PIT   413  92    16  48 
1          1987  PIT   551  144   25  59 
1          1988  PIT   538  152   24  58 
1          1989  PIT   580  144   19  58 
1          1990  PIT   519  156   33  114
1          1991  PIT   510  149   25  116
1          1992  PIT   473  147   34  103
```

or like this:

```sql
sqlite> SELECT * FROM STATS
   ...> WHERE YEAR = 2002
   ...> LIMIT 7;
sqlite> 
```

The first query returned records where `YEAR` was less than `1999` which it shouldn't have. The second query returned no records at all, yet it should have returned several.

Strangely, if you wrap your numbers with quotes, as if they were strings, then things seem to "work" as expected:

```sql
sqlite> SELECT * FROM STATS
   ...> WHERE YEAR > "1999"
   ...> LIMIT 7
   ...> ;
PLAYER_ID  YEAR  TEAM  AB   HITS  HR  RBI
---------  ----  ----  ---  ----  --  ---
1          2000  SFG   480  147   49  106
1          2001  SFG   476  156   73  137
1          2002  SFG   403  149   46  110
1          2003  SFG   390  133   45  90 
1          2004  SFG   373  135   45  101
1          2005  SFG   42   12    5   10 
1          2006  SFG   367  99    26  77 
```

```sql
sqlite> SELECT * FROM STATS
   ...> WHERE YEAR = "2002"
   ...> LIMIT 7
   ...> ;
PLAYER_ID  YEAR  TEAM  AB   HITS  HR  RBI
---------  ----  ----  ---  ----  --  ---
1          2002  SFG   403  149   46  110
5          2002  CHC   556  160   49  108
6          2002  CIN   197  52    8   23 
10         2002  TEX   546  149   43  105
12         2002  CLE   480  146   52  118

```

It doesn't seem *too* odd that the equals `=` condition works... if it's treating everything as strings then it's doing a string comparison where both strings happen to be the same 4 numbers. But for some reason other conditions also still work once you put quotes around the numbers...

*Well, almost...*

```sql
sqlite> SELECT * FROM STATS
   ...> WHERE AB BETWEEN "525" AND "535"
   ...> ORDER BY AB ASC
   ...> LIMIT 7
   ...> ;
PLAYER_ID  YEAR  TEAM  AB   HITS  HR  RBI
---------  ----  ----  ---  ----  --  ---
12         2001  CLE   526  153   49  124
9          1970  MIN   527  143   41  113
6          2007  CIN   528  146   30  93 
3          1924  NYY   529  200   46  121
8          1986  OAK   53   10    3   9  
1          1997  SFG   532  155   40  101
5          1990  CHW   532  124   15  70
```

Anyway. The sensible way to deal with this is to give the columns types, so that numbers can be handled properly as numbers.

Unfortunately in the instance of SQLite databases, the `ALTER TABLE` --> `MODIFY COLUMN` command is not supported. One way of dealing with this is to dump the database, modify the `CREATE TABLE` commands, then create a new database. 

This is what I did to address the problem with the database I [mentioned previously](/post/weeknotes-2022-29.html).

First, dump the database:

```bash
echo '.dump' | sqlite3 baseball_stats.sqlite > baseball.dump
```

Second, modify the `CREATE TABLE` statements in `baseball.dump`:

before:
```sql
CREATE TABLE `PLAYERS` (`PLAYER_ID`, `FIRST_NAME`, `LAST_NAME`);
CREATE TABLE `STATS` (`PLAYER_ID`, `YEAR`, `TEAM`, `AB`, `HITS`, `HR`, `RBI`);
CREATE TABLE `TEAMS` (`ABBREV`, `CITY`, `NICKNAME`, `LEAGUE`);

```

after:
```sql
CREATE TABLE `PLAYERS` (
    `PLAYER_ID` INTEGER, 
    `FIRST_NAME` TEXT, 
    `LAST_NAME` TEXT);
	
CREATE TABLE `STATS` (
    `PLAYER_ID` INTEGER, 
    `YEAR` INTEGER, 
    `TEAM` TEXT, 
    `AB` INTEGER, 
    `HITS` INTEGER, 
    `HR` INTEGER, 
    `RBI` INTEGER);

CREATE TABLE `TEAMS` (
    `ABBREV` TEXT, 
    `CITY` TEXT, 
    `NICKNAME` TEXT, 
    `LEAGUE` TEXT);

```

Lastly, create a new database:

```bash
cat baseball.dump | sqlite3 new-baseball_stats.sqlite
```

Tadaaa! Now `WHERE` conditions will work as expected:

```sql
sqlite> PRAGMA TABLE_INFO('STATS');
cid  name       type     notnull  dflt_value  pk
---  ---------  -------  -------  ----------  --
0    PLAYER_ID  INTEGER  0                    0 
1    YEAR       INTEGER  0                    0 
2    TEAM       TEXT     0                    0 
3    AB         INTEGER  0                    0 
4    HITS       INTEGER  0                    0 
5    HR         INTEGER  0                    0 
6    RBI        INTEGER  0                    0 
```

```sql
sqlite> SELECT * FROM STATS
   ...> WHERE YEAR > 1999
   ...> LIMIT 7
   ...> ;
PLAYER_ID  YEAR  TEAM  AB   HITS  HR  RBI
---------  ----  ----  ---  ----  --  ---
1          2000  SFG   480  147   49  106
1          2001  SFG   476  156   73  137
1          2002  SFG   403  149   46  110
1          2003  SFG   390  133   45  90 
1          2004  SFG   373  135   45  101
1          2005  SFG   42   12    5   10 
1          2006  SFG   367  99    26  77 
```

```sql
sqlite> SELECT * FROM STATS
   ...> WHERE YEAR = 2002
   ...> LIMIT 7
   ...> ;
PLAYER_ID  YEAR  TEAM  AB   HITS  HR  RBI
---------  ----  ----  ---  ----  --  ---
1          2002  SFG   403  149   46  110
5          2002  CHC   556  160   49  108
6          2002  CIN   197  52    8   23 
10         2002  TEX   546  149   43  105
12         2002  CLE   480  146   52  118
```

