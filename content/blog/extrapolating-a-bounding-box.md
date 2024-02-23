
+++
title = "extrapolating the edges of a bounding box (QGIS)"
slug = "extrapolating-a-bounding-box"
date = "2023-04-29T12:31:36Z"
draft = false
type = "blog"
author = "osgav"
images = ["images/posts/extrapolating-a-bounding-box/03.png"]
tags = ["QGIS", "geometry generator"]
+++

I woke up thinking about a fragment of a map the other day, and it occurred to me that what I was picturing could probably be made using geometry generators in QGIS. I was picturing something like this:

{{< drawing src="/images/posts/extrapolating-a-bounding-box/sketch.png" alt="sketch of my idea" >}}

So I thought I'd have a whack at making it.

<!--more-->

This was my first foray into crafting a geometry generator, inspired by some blog posts I read recently from [BOGIND](https://bogind.blogspot.com/) and [Alasdair Rae](https://www.statsmapsnpix.com/).

My approach was something like:

- browse the Geometry functions in the Expression Editor while pondering *"how might I go about doing this..."*
- arrive at the idea of doing some maths to the coordinates of the centroid to produce two points to draw one line with
- do that four times

After some fiddling around I arrived at the following geometry generator, which did the north-south extrapolation on the right edge of the bounding box:

```
# RIGHT

make_line(
  make_point(
    x($geometry) + bounds_width($geometry)/2,
    y($geometry) + bounds_height($geometry)*18
  ),
  make_point(
    x($geometry) + bounds_width($geometry)/2,
    y($geometry) + bounds_height($geometry)*18*-1
  )
)
```

[![north-south extrapolation on right edge of bbox](/images/posts/extrapolating-a-bounding-box/01.png)](/images/posts/extrapolating-a-bounding-box/01.png)

Some adjustments to plusses and minuses and negatives did the other edges:

```
# LEFT

make_line(
  make_point(
    x($geometry) - bounds_width($geometry)/2,
    y($geometry) + bounds_height($geometry)*18
  ),
  make_point(
    x($geometry) - bounds_width($geometry)/2,
    y($geometry) + bounds_height($geometry)*18*-1
  )
)
```

```
# TOP 

make_line(
  make_point(
    x($geometry) + bounds_width($geometry)*18,
    y($geometry) + bounds_height($geometry)/2
  ),
  make_point(
    x($geometry) + bounds_width($geometry)*18*-1,
    y($geometry) + bounds_height($geometry)/2
  )
)
```

```
# BOTTOM

make_line(
  make_point(
    x($geometry) + bounds_width($geometry)*18,
    y($geometry) - bounds_height($geometry)/2
  ),
  make_point(
    x($geometry) + bounds_width($geometry)*18*-1,
    y($geometry) - bounds_height($geometry)/2
  )
)
```

You may be wondering what the number `18` that repeats throughout is about. It is a multiplier that dictates how long the extrapolated lines are. I started off with a smaller number but increased it while playing around until the extrapolated lines extended out of the map area I was looking at, out of preference / what I was aiming for visually. *(It didn't occur to me there was a much simpler way of setting particular point coordinates to achieve this until I was recreating this in Leaftlet, doh! I'll cover that later in a separate post...)*

Tada! Job done:

[![wonky extrapolation](/images/posts/extrapolating-a-bounding-box/02.png)](/images/posts/extrapolating-a-bounding-box/02.png)

Hmmm. Slightly wonky. This turned out to be related to the projection – how and why I don't know, but switching from the typical local projection of EPSG:27700 (British National Grid) to EPSG:3857 (Pseudo-Mercator) made the problem vanish. Interestingly, before changing the projection, I found that increasing my multiplier to lengthen the lines would exaggerate the wonkiness and push the lines further away from where I expected them to be drawn... Something to ponder another day. 

Anyway, here is the end result!

[![a bounding box with extrapolated edges](/images/posts/extrapolating-a-bounding-box/03.png)](/images/posts/extrapolating-a-bounding-box/03.png)
