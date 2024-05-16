
+++
title = "weeknotes 97: what weeknotes is it?"
slug = "weeknotes-97"
date = "2024-05-16T15:04:50Z"
draft = false
type = "weeknotes"
author = "osgav"
images = ["images/headers/marianne-bos-unsplash.jpg"]
collections = ["blog", "weeknotes"]
tags = ["QGIS", "Hugo"]
+++

- i haven't wrote a weeknotes post for months, so i wrote the script i knew i'd inevitably write to tell me what week number i should use, as per my new naming convention described in [weeknotes 60](/blog/weeknotes-60.html)
- i've started following along with [30DaysOfQGIS](https://spatialthoughts.com/2024/05/13/30daysofqgis/) from Spatial Thoughts as lately i don't feel like i've spent enough time doing stuff in QGIS, so this should tend to that
- implemented "collections" logic on osgav.run – now the "blog" vs "weeknotes" split on my homepage is [powered by](https://github.com/osgav/osgav-blog/commit/7df91284d712f39ff3a9fe97801cab9d339b2271#diff-e53129596960b22ad2f7bbbbc031f50f0036a323b58fc8ba27c2fb687561514f) a `collections` frontmatter key rather than the `type` one. the theory behind doing this is i can link sets of posts together and call them a collection or series (or just call them categories, the classic accompaniment to tags) and then have links to *"other posts in this collection"* at the side of a blog post. adds a form of discoverability to things without me having to explicitly link to related posts. not implemented that bit yet though. coming soon™

```
$ python build/what-weeknotes-is-it.py

use weeknotes-97 for Wednesday 15 May 2024      [1 days ago]

today is Thursday 16 May 2024

use weeknotes-98 for Wednesday 22 May 2024      [6 days away]
```

![jumanji what year is it](/images/misc/jumanji_what_year_is_it.jpg)

<!--more-->
