
+++
title = "weeknotes: SQL, basemaps, and old atlases"
slug = "weeknotes-2022-29"
date = "2022-07-20T11:42:18Z"
draft = false
type = "weeknotes"
author = "osgav"
image = "images/headers/marianne-bos-unsplash.jpg"
collections = ["blog", "weeknotes"]
tags = ["GIS", "SQL", "basemap", "cartography", "atlas"]
+++

In the last week I got stuck into GEOG 868 (the Pennsylvania State University [Spatial Database Management course](https://roam.libraries.psu.edu/node/1357) I mentioned [last week](/blog/weeknotes-2022-28.html)). I started off with a bit of an SQL refresher via [SQLBolt](https://sqlbolt.com) and some [SQLZOO](https://sqlzoo.net/wiki/SQL_Tutorial), then cracked on with GEOG 868 Lesson 1. 

<!--more-->

I had a little hurdle to overcome in that the first lesson uses a Microsoft Access `.accdb` database, but I don't have Microsoft Access. Not to worry I thought, I assumed there would be a website out there that could convert it to SQLite, and I was right: [RebaseData](https://www.rebasedata.com)

But then shortly into the lesson, I found my first WHERE clause was not correctly filtering the records. Turns out columns in tables in an SQLite database don't have to have a type. I'll leave the rest of the details for my currently half-written blog post on sorting that out.

I also started something of a cartography project too. Inspired by [this map](https://mastodon.social/@underdarkGIS/108630517888320533) from Anita Graser (underdarkGIS on [mastodon](https://mastodon.social/@underdarkGIS/) and [twitter](https://twitter.com/underdarkGIS)) I decided to do my best to replicate it. I had fun trying to recreate the country border line style – seems pretty close, I'm sure I could get it with some more fiddling:

![underdarkGIS borders](/images/posts/weeknotes-2022-29/underdarkGIS-borders.png)
**snippet of Anita's map**

![osgav borders](/images/posts/weeknotes-2022-29/osgav-borders.png)
**snippet of my map**

Anita has been continuing to work on this map and since I first saw it those borders have changed, oh well. I still like them so they're staying in my basemap project for now.

Lastly for this weeknote, something I'm very excited about. 

I won a few old atlases at an auction recently and they finally arrived :D

They were published in 1961, 1954, 1935 and 1917. The 1961 one needs some research, it could be a different year. Anyway, I'll post more about these soon.

They are very cool.
