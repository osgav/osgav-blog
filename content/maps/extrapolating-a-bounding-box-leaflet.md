
+++
title = "extrapolating the edges of a bounding box with Leaflet"
slug = "extrapolating-a-bounding-box-leaflet"
date = "2024-02-07T16:17:18Z"
draft = false
type = "maps"
author = "osgav"
images = ["images/posts/extrapolating-a-bounding-box/03.png"]
tags = ["QGIS", "geometry generator", "Leaflet"]
+++

**had an idea:**

{{< drawing src="/images/posts/extrapolating-a-bounding-box/sketch.png" alt="sketch of my idea" >}}

**made it in QGIS:** *([as described here](/blog/extrapolating-a-bounding-box.html))*

[![a bounding box with extrapolated edges](/images/posts/extrapolating-a-bounding-box/03.png)](/images/posts/extrapolating-a-bounding-box/03.png)

**then made it in Leaflet:**

{{< style src="maps/extrapolating-a-bounding-box-leaflet.css" >}}

{{< mapdiv id="map" width="600px" height="900px" >}}

{{< script src="data/ne_10m_admin_1_Scotland.js" >}}

{{< script src="maps/extrapolating-a-bounding-box-leaflet.js" >}}

