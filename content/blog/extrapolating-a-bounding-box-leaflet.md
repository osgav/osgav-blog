
+++
title = "extrapolating the edges of a bounding box (Leaflet)"
slug = "extrapolating-a-bounding-box-leaflet"
date = "2024-02-23T16:34:05Z"
draft = false
type = "blog"
author = "osgav"
images = ["images/posts/extrapolating-a-bounding-box/03.png"]
collections = ["blog"]
tags = ["Leaflet"]
+++

Following on from [extrapolating the edges of a bounding box](/blog/extrapolating-a-bounding-box.html) I created a [Leaflet](https://leafletjs.com/) version of the map so I could enjoy the concept in an interactive manner. Now that I've finally [integrated Leaflet](/lab/hugo-leaflet-integration.html) into my site I can slap a Leaflet map into a blog post if I so desire, like this:

<!--more-->

{{< style src="css/leaflet-1.9.3/leaflet.css" >}}

{{< script src="js/leaflet-1.9.3/leaflet.js" >}}

{{< style src="maps/extrapolating-a-bounding-box-leaflet.css" >}}

{{< mapdiv id="map" height="900px" >}}

{{< script src="data/ne_10m_admin_1_Scotland.js" >}}

{{< script src="maps/extrapolating-a-bounding-box-leaflet.js" >}}

Fun fun fun. 

*(It's not a particularly small screen / mobile-friendly map for the record. It is best enjoyed on a large screen with the ability to swoosh your cursor around the map.)*

I also created a new `/maps/*` [section](/maps.html) on my site where I will experiment with embedding other mappy things and the like. For example, a new page in that section automatically embeds the Leaflet CSS and JS so I only need to include 4 shortcodes in a post to embed a map, rather than the 6 shortcodes I've used in this post. 

i.e. 

1. `style` for map-specific CSS
2. `mapdiv` for the map
3. `script` for the data
4. `script` for the map code

vs

1. `style` for Leaflet CSS
2. `script` for Leaflet JS
3. `style` for map-specific CSS
4. `mapdiv` for the map
5. `script` for the data
6. `script` for the map code

I guess I could make a single shortcode to include Leaflet CSS and JS but meh, I'm going with the more generic `style` and `script` shortcodes. 

I've noted more details on the integration [over here](/lab/hugo-leaflet-integration.html).
