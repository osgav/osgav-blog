
+++
title = "EPNM: access spurs"
slug = "epnm-access-spurs"
date = "2025-03-14T16:14:46Z"
draft = false
type = "blog"
author = "osgav"
images = ["..."]
collections = ["blog", "EPNM"]
tags = ["QGIS", "Leaflet", "javascript"]
+++

I've started working on my [Edinburgh Paths Network Map](/portfolio/edinburgh-paths-network-map.html) again. The last thing I did was update the extent of the line layer that represents the paths themselves. The next thing I'm going to do is split out the *access spurs* (the little entrance / exit bits) into their own layer. 

Initially the paths line layer contained only 88 features. Then I went wild and extended it much further than I've explored in real life which came to 830 features. Then I reigned it back in a bit and currently it contains 239 features. This is a better starting point. It's the amount of path network I would show to someone visiting Edinburgh who wants to go for a nice walk somewhere. Thus I'm calling it the *primary path network.* This leaves room for expanding it later with another layer perhaps, likely called *secondary path network* or something. 

So it's back to QGIS to split my primary paths network layer into two. A bunch of zooming in and out and panning and selecting later... now I have 153 features in the primary path network and a new access spurs layer with 86 features. 

**Tip:** hold `Ctrl` while zooming in and out and QGIS will zoom in and out slower. Conveniently you can also use `Ctrl + Click` to select features, rather than using `Shift + Click`, so you don't have to hop between the two keys. 

The new access spurs layer is a bit rough. I appear to have missed a few tiny path segments here and there (usually stairs it seems). Fixing those later will be a good exercise in updating one of my line layers with fresh data extracts from QuickOSM. It'd also be useful to combine some segments together into a single feature I think. That way a specific access spur can be selected and treated as a whole. But then I'd lose the possibility of showing certain information. Like whether a chunk of stairs in the middle of an access spur has a handrail or not, for example. Hmmm. Not a decision for today though, just a thought. 

Ok next up is updating [the web map](https://github.com/osgav/edinburgh-paths-network) with the spur-less primary path network and adding the new access spurs layer. [Added the new GeoJSON files](https://github.com/osgav/edinburgh-paths-network/commit/62fd538cd3cacd3714e9bc004115a99dbe4c4ecc). That was sufficient to trim all the spurs off the current map. Now to put the spurs back on the map, but this time in their own separate layer that I can style separately. [Ok done](https://github.com/osgav/edinburgh-paths-network/commit/4df9dd5582165b60b8d144fc69eddbbd24ffff27). Now to [style them differently](https://github.com/osgav/edinburgh-paths-network/commit/8c0859a98645f20bb3551aba7d61374ab4076958) and only show them once you've [zoomed in closer](https://github.com/osgav/edinburgh-paths-network/commit/5eb70e9ec55a051507d44a3f9106617f67d9753c). Done and done.

Jolly good. I have a whole raft of ideas for things I'd like to try with this map but I'm not sure what I want to do next. I'll probably revisit the green circles currently marking "access points" first and clean them up a bit while I consider the next thing.

<!--more-->
