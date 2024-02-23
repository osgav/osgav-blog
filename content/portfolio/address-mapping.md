
+++
title = "Address Mapping"
slug = "address-mapping"
date = "2024-02-23T15:07:24Z"
draft = false
type = "portfolio"
author = "osgav"
showDate = false
showReadingTime = false
images = ["images/portfolio/address-mapping-01.jpg"]
cover = "images/portfolio/address-mapping-01.jpg"
keywords = ["address mapping", "web map", "Leaflet"]
+++

**view interactive map:** [Networks of New York (Building Map)](/files/gis/new-york-buildings/map.html)

**view source:** https://github.com/osgav/new-york-buildings

**steps taken to create the map:**

1. download building polygons from OpenStreetMap in QGIS using QuickOSM plugin
2. manually extract buildings of interest to their own layer
3. export layer to GeoJSON, selecting subset of fields
4. configure Leaflet map to display building polygons
5. parse address-related fields with javascript to construct and display an address

![map of lower Manhattan with a handful of highlighted buildings](/images/portfolio/address-mapping-01.jpg)
