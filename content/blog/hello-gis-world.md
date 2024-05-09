
+++
title = "Hello (GIS) World!"
slug = "hello-gis-world"
date = "2022-03-16T11:04:07Z"
draft = false
type = "blog"
author = "osgav"
image = "images/headers/topographic-green.jpg"
collections = ["blog"]
tags = ["GIS", "QGIS", "PyQGIS", "python", "CmdModule", "CLI"]
+++

I am exploring the world of **Geographic Information Systems** (GIS).
<br><br>
I have been reading the [Gentle Introduction to GIS](https://docs.qgis.org/3.16/en/docs/gentle_gis_introduction/index.html) from the [QGIS](https://www.qgis.org/) documentation and also working through the [QGIS Training Manual](https://docs.qgis.org/3.16/en/docs/training_manual/index.html). In the last couple of weeks I completed the first assignment.

<!--more-->

The initial lessons have you working on a map of [Swellendam](https://en.wikipedia.org/wiki/Swellendam) – the third oldest town in Western Cape, South Africa – and show you how to get started with fundamental *GIS stuff* like configuring symbology and labels. The [assignment](https://docs.qgis.org/3.16/en/docs/training_manual/map_composer/day_1_assignment.html) asks you to spruce up the map you've been working on so far, keeping an eye on a key element of GIS: ease of use. You should produce a map that looks nice and is easy to understand.

The assignment explicitly states: *"If you see something you’d like to do in your map, why not try to implement it?"* I took this as an opportunity to dabble in the python element of QGIS. Sure, I was stretching what that statement suggests a bit, but I couldn't resist the urge much longer.

I had already been wondering how things would be done with python while I worked through the lessons. Things like "how do you change styles with python?" – because then I imagine you could do things like change the styles of multiple layers all at once... define a whole *map style* and have some python for instantly applying it to any map you view in QGIS. That sounds handy.

The last lesson before the assignment really caught my attention: Creating Print Layouts. It was a lot work creating the [Dynamic Print Layout](https://docs.qgis.org/3.16/en/docs/training_manual/map_composer/dynamic_layout.html) and the end result struck me as a very useful artifact. Since that lesson was fresh in my mind when I started planning what I'd do for the assignment, I decided "create a Layout using python" sounded like a good objective.

To get going with python in QGIS I figured a good place to start was the [PyQGIS Developer Cookbook](https://docs.qgis.org/3.16/en/docs/pyqgis_developer_cookbook/index.html). I had seen this link on the left of the QGIS Training Manual and had resisted diving in until now. As I read through the introduction I started preparing [VS Code](https://vscode.github.com/) (my preferred IDE) for writing PyQGIS python stuff. While I worked through that and got the example *standalone* script working, I realised "huh, this really is *standalone*" as in "it does not control the project currently opened in QGIS" ... 

I started realising my idea of what it might look like to "write python that does GIS stuff" was wrong. VS Code on one side of my screen, QGIS on the other side. Writing and running python scripts in VS Code and then seeing things happen in QGIS. This is not how it works. 

Although to be honest, I'm still not sure if I'm right or wrong about that. As you'll see from what I tried later, I was determined to try and *make it so.* 

From the PyQGIS Developer Cookbook introduction I also meandered off to look at the chapter about [Developing Python Plugins](https://docs.qgis.org/3.16/en/docs/pyqgis_developer_cookbook/plugins/index.html), where I was encouraged to check if there are existing plugins that already do what I want. A useful tip for a couple of reasons:

- if you *do* find a plugin that does what you want, you can use it and save yourself the effort of creating your own plugin
- if you *don't* find a plugin that does what you want, you can review the source code of similar plugins (or any plugin for that matter) to learn from them and borrow stuff

I looked up [plugins tagged with "layout"](https://plugins.qgis.org/plugins/tags/layout/) and found [AutoLayoutTool](https://plugins.qgis.org/plugins/AutoLayoutTool/). It looked like it did the sort of thing I was thinking about. I installed it and tested it and *yup* – it did the sort of thing I'd like to make. Except I was imagining running a script from VS Code, not a QGIS plugin. As I looked at AutoLayoutTool's [source code](https://github.com/sylsta/AutoLayoutTool/blob/main/AutoLayoutTool.py) I realised this was a bit beyond what I was imagining for my initial foray into the python side of QGIS. In fact, it would make way more sense to figure out how to modify this plugin so it creates a slightly different Layout for me automatically, than to try and write my own similar code from scratch. 

So, as far as my QGIS Training Manual assignment was concerned, I decided to pivot from my idea of "create a Layout using python" to... *nowhere in particular.* 

By this point I had: 

- setup VS Code successfully and got the example standalone script working
- learned of the built-in python console and editor inside QGIS 
- looked into plugins a little bit

That was enough for now, I thought.

Except it wasn't. 

I kept thinking that there must be a way to `write python in VS Code` and then `see things happens in QGIS` – basically my desire to write python in VS Code rather than the built-in console and editor continued to niggle away at me. *"How can I combine a standalone script and the capabilities of a plugin?"* I wondered.

Then I had an idea. 

Well, I remembered an idea I noted a couple of weeks earlier. My note said: 

> revisit [python CmdModule](https://docs.python.org/3/library/cmd.html) when you look into QGIS python and see if it could be useful.

As I pondered that it quickly morphed into: 

***Try and serve a python CmdModule from a QGIS plugin!***

The idea enchanted me, and well... a few evenings later, I had a QGIS plugin that served a python CmdModule! 

I glued together a [skeleton QGIS plugin](https://github.com/wonder-sk/qgis-minimal-plugin) and python CmdModule, using a [paramiko-based SSH server](https://github.com/ramonmeza/PythonSSHServerTutorial) for the glue. 

In QGIS I now have a button that starts an SSH server. Then in my terminal I can SSH *into the QGIS plugin* which drops me at the console of my custom CmdModule. I am able to access the almighty `iface` object from a python environment outside of QGIS...

I really don't know if it will actually be useful at all... *a CLI-operated QGIS plugin...?* I certainly look forward to finding out!
