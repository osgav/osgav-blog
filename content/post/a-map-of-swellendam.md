
+++
author = "osgav"
date = "2022-04-08T15:57:04Z"
draft = false
image = "images/headers/stamen-newcastle-toner-background-green.png"
share = true
slug = "a-map-of-swellendam"
tags = ["GIS", "QGIS", "maps", "map design"]
title = "A map of Swellendam"
[menu.main]
parent = "blog"
+++


As noted in [Hello (GIS) World](/post/hello-gis-world.html) I was recently working on the first assignment in the [QGIS Training Manual](https://docs.qgis.org/3.16/en/docs/training_manual/index.html). I planned to do 3 things for the assignment:

<!--more-->

1. fix the datasources I broke when I moved an earlier project file
2. create a Layout using python
3. make a map with a purpose

Fixing the datasources I broke after I moved my first project file didn't take long. I learned datasources can have relative or absolute paths, that a "fixed datasource" wasn't always actually fixed, and that "Auto Find" seems to *learn* as times goes on... Perhaps I'll return to this topic at a later date and elaborate more, but for now I won't.

I started off by getting quite engrossed in exploring the PyQGIS world. When I eventually reversed out of that rabbit hole I turned my attention to the last chunk of my assignment: make a map of Swellendam that serves a purpose.

During the lessons I had looked at the attributes table of the buildings layer a few times and noticed it had lots of information in it. I thought it was an interesting layer visually too – lots of little polygons I could do something with. I felt inclined to do something that involved highlighting different buildings, perhaps a "local amenities map" or something? Then I thought I could make a *tourist map* since, well, locals just know where things are don't they, but tourists don't, they need maps. So I decided "tourist map" would be the purpose.

I spent a bunch of time sifting through the building layer's attributes table and playing around with identifying and highlighting different polygons. I had all sorts of ideas the deeper I dug. At one point I was practically imagining I would create an entire pamphlet using a Layout with multiple pages and multiple maps. Once I reined in those grand plans to something more manageable, I settled on making 2 maps. The first a zoomed-out view looking at all of Swellendam, the second a zoomed-in view looking at a chunk of the main street. And I would only highlight buildings on the zoomed-in view.

After some more playing around with highlighting buildings and trying things with labels I learned, *well hey, it's not as easy as it looks to make a nice looking map!* Not that I thought it would be easy. It was more that I didn't know how easy it is to make maps that look terrible. 

Anyway, here are my maps:

[![swellendam01](/images/posts/a-map-of-swellendam/swellendam-01-web.png)](/images/posts/a-map-of-swellendam/swellendam-01-full.png)

[![swellendam01](/images/posts/a-map-of-swellendam/swellendam-02-web.png)](/images/posts/a-map-of-swellendam/swellendam-02-full.png)

