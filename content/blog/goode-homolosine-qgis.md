
+++
title = "Goode Homolosine projection in QGIS"
slug = "goode-homolosine-qgis"
date = "2023-08-15T14:10:29Z"
draft = false
type = "blog"
author = "osgav"
images = ["images/posts/goode-homolosine-qgis/goode-homolosine-osgav.png"]
tags = ["QGIS", "map projections", "Goode Homolosine"]
+++

![Goode Homolosine projection with Sudan and Mozambique missing](/images/posts/goode-homolosine-qgis/goode-homolosine-osgav.png)
<!--more-->

**Step 1:** download the following files from [zenodo.org](https://zenodo.org/record/1841337):[^1] 

- `CounterDomain.geojson`
- `Homolosine.crs`

[^1]: zenodo.org link via https://gis.stackexchange.com/questions/17263/is-it-possible-to-use-the-goode-homolosine-projection-in-qgis/309395#309395 and [Luís de Sousa](https://gis.stackexchange.com/users/21532/lu%c3%ads-de-sousa) who created it

**Step 2:** create a new [custom projection](https://docs.qgis.org/3.28/en/docs/user_manual/working_with_projections/working_with_projections.html#custom-coordinate-reference-system) with the proj string in `Homolosine.crs`

**Step 3:** create a new project and add `CounterDomain.geojson` as a layer

**Step 4:** change the project CRS to your new custom projection (it will have an "Authority ID" that looks something like USER:100003)

*The CounterDomain polygon will disappear from the canvas...*

**Step 5:** right-click the CounterDomain layer in the layers panel > Layer CRS > Set to USER:100003

*The CounterDomain polygon will reappear on the canvas!*

**Step 6:** save your project

**Step 7:** add whatever layer you want to try and portray with the Goode Homolosine projection, for example Natural Earth's `ne_110m_admin_0_countries` [^2]

[^2]: which can be downloaded from here: https://www.naturalearthdata.com/downloads/110m-cultural-vectors/

It will appear on the canvas, with Antarctica and Greenland stretched across the interruptions...

**Step 8:** reproject `ne_110m_admin_0_countries` to the custom Homolosine projection

- right-click the layer in the layers panel > Export > Save Features As...
- select your desired format, and remember to actually reproject it...
- ...by changing the "CRS" field to the following: `Project CRS: USER:100003 - custom_Homolosine` (or whatever name you gave it)
- keep `Add saved file to map` checked, and once you click OK you'll see that...

*...Antarctica and Greenland are still stretched across the interruptions?* 

This is fine. You haven't intersected things yet.

**Step 9:** right-click the new layer > Layer CRS > Set to USER:100003

**Step 10:** now open the Intersection tool from Processing Toolbox > Vector overlay

- the new countries layer should be the Input Layer
- the CounterDomain layer should be the Overlay layer
- click Run

You'll get an error with 2 of the features in the `ne_110m_admin_0_countries` layer:

```
Feature (15) from “homolosine_ne_110m_admin_0_countries” has invalid geometry and has been skipped. Please fix the geometry or change the Processing setting to the “Ignore invalid input features” option.
Feature (73) from “homolosine_ne_110m_admin_0_countries” has invalid geometry and has been skipped. Please fix the geometry or change the Processing setting to the “Ignore invalid input features” option.
```

You can overcome this by setting the Input layer settings for "Invalid feature filtering" to "Skip (Ignore) Features with Invalid Geometries" and then it'll finish running.

But you'll notice 2 missing countries in Africa: Sudan and Mozambique

Shrug. I don't know why these 2 features have an issue, but you can extract them into their own layer, then merge that layer with your intersection and tada!

[It does say](https://gitlab.com/ldesousa/homolosine-vectors/-/blob/master/CounterDomain.jl?ref_type=heads#L4) that "this polygon can be used to portray oceans" after all. 

If you try all this with a Natural Earth ocean polygon then it will indeed complete without errors. It also works well with Natural Earth graticules. 

[![Goode Homolosine projection with Sudan and Mozambique missing](/images/posts/goode-homolosine-qgis/goode-homolosine-osgav.png)](/images/posts/goode-homolosine-qgis/goode-homolosine-osgav.png)
