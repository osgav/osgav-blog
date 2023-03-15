
+++
title = "QGIS Plugin: MapSwipe Tool"
slug = "qgis-plugin-mapswipe-tool"
date = "2023-03-15T15:30:38Z"
draft = false
type = "blog"
author = "osgav"
images = ["images/posts/qgis-plugin-mapswipe-tool/maps-nls-uk_scotland_l.jpg"]
tags = ["QGIS", "ArcGIS", "swipe tool", "python", "PyQGIS", "linux"]
+++

I've been using ArcGIS for the first time in the [last couple of weeks](/blog/weeknotes-2023-09.html) and I've come across the **Swipe** tool. My immediate thought was *"oh that's awesome"* which was swiftly followed by *"I wonder if QGIS has this as well?"*

<!--more-->

The answer is yes! 

Courtesy of the MapSwipe Tool plugin:

- https://gis.stackexchange.com/questions/172339/swipe-tool-in-qgis
- https://plugins.qgis.org/plugins/mapswipetool_plugin/
- https://github.com/lmotta/mapswipetool_plugin

I encountered a couple of hiccups while trying it out that I thought were worth noting. 

## QLine python error

The first one is that the plugin won't work / will produce a lot of errors that force you to kill QGIS. This will happen if you are using a more up-to-date version of QGIS where the python version behind it is 3.10 or greater. The stacktrace for the errors will look something like this:

```
WARNING    Traceback (most recent call last):  
              File "/home/username/.local/share/QGIS/QGIS3/profiles/default/python/plugins/mapswipetool_plugin/swipemap.py", line 70, in paint  
              line = QLine( 0,h-1,w-1,h-1 )  
             TypeError: arguments did not match any overloaded call:  
              QLine(): too many arguments  
              QLine(QPoint, QPoint): argument 1 has unexpected type 'int'  
              QLine(int, int, int, int): argument 2 has unexpected type 'float'  
              QLine(QLine): argument 1 has unexpected type 'int'
```

These can be addressed by applying the fix described here:

- https://github.com/lmotta/mapswipetool_plugin/pull/17/files

In short, you need to wrap a couple of calculations with an `int()` call. 

With an older version of QGIS, that is backed by python 3.9, this does not happen. If you happen to look at the log messages console however, you'll notice a warning that explains why:

```
DeprecationWarning: an integer is required (got type float). Implicit conversion to integers using __int__ is deprecated, and may be removed in a future version of Python.
```

Python was automagically making things work by not caring that a `float` was provided when an `int` was required.

## the Active Layer is the wrong size and in the wrong place

The next hiccup I encountered was that the MapSwipe Tool *Active Layer* (whichever layer you have selected when you enable the tool) wasn't scaled properly. The problem looks exactly like these reports:

- https://gis.stackexchange.com/questions/324519/using-qgis-map-swipe-tool
- https://github.com/lmotta/mapswipetool_plugin/issues/11

Unfortunately I don't have a fix for this one, and so far have only been able to confirm that it appears to relate to OS-level resolution scaling (at least for me, on Fedora / Wayland). When I set my display scale to 100% instead of 200% the MapSwipe Tool worked perfectly (as it does on my Windows desktop, just like the first report linked above). 


## swiping maps on the web

On the topic of swiping maps, I have a couple of links to share.

If ever I feel the desire to include a swipey map in a blog post, I'll probably try and do that with this:

- https://github.com/aminejafur/before-effect-slider.js

And if you want to swipe some maps right now, I recommend visiting this link:

- https://maps.nls.uk/geo/explore/side-by-side/swipe/


[![example of map swipe tool output from National Library of Scotland website](/images/posts/qgis-plugin-mapswipe-tool/maps-nls-uk_scotland_s.jpg)](/images/posts/qgis-plugin-mapswipe-tool/maps-nls-uk_scotland_l.jpg)

On the left: **Scotland** series, **OS Quarter Inch, Civil Air, 1929-1930.**

On the right: **Great Britain** series, **OS One Inch 7th series, 1955-61.**
