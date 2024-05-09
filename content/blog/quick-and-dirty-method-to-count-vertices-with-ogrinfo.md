
+++
title = "quick and dirty method to count vertices with ogrinfo"
slug = "count-vertices-ogrinfo"
date = "2023-05-04T20:21:33Z"
draft = false
type = "blog"
author = "osgav"
images = ["images/headers/geoprocessing.png"]
collections = ["blog"]
tags = ["QGIS", "geoprocessing", "CLI", "ogrinfo", "bash"]
+++

I was experimenting with *Simplify* in QGIS the other day and I wanted to get an idea of how many vertices were being removed from my geometries when I adjusted the Simplify settings. 

<!--more-->

I couldn't find a quick way to see the total number of vertices for all features in a layer (I thought a number like that might be on the Information tab of layer properties, but alas, not the case) but I did figure out something that was good enough for my purposes: `ogrinfo` + `grep` + `sed` + `wc` 

In this example I have a `railways.gpkg` GeoPackage with a `railways` line layer in it:

```
$ ogrinfo -al railways.gpkg railways | grep MULTILINESTRING | sed 's/,/\n/g' | wc -l

947
```

Across all of the separate line features in that layer, there are 947 vertices in total. 

In my workflow I was then running Simplify, exporting that layer, and then seeing how many vertices I had afterwards:

```
$ ogrinfo -al simplify-testing.gpkg railways-01 | grep MULTILINESTRING | sed 's/,/\n/g' | wc -l

733
```

Then some different Simplify settings:

```
$ ogrinfo -al simplify-testing.gpkg railways-02 | grep MULTILINESTRING | sed 's/,/\n/g' | wc -l

473
```

How does it work? 

- `ogrinfo -al` – will show some summary information followed by all the features in the layer you specify (if you don't specify a layer name, it will show info for all layers in the GeoPackage)
- the features are described in Well-known text (WKT) format, so it's plain text which can be processed fairly easily by...
- `grep` – this part looks for lines containing the keyword, `MULTILINESTRING` in my example (with different data you might want `MULTIPOLYGON`) and prints only those lines
- conveniently the entire WKT representation is a single line, so `grep` successfully returns everything required from the `ogrinfo` output needed to count all the vertices, i.e. all the coordinate pairs
- `sed 's/,/\n/g'` – this part takes the output from `grep` and replaces any occurrences of commas `,` with a newline `\n`  (I'm using GNU `sed` on Linux, I think BSD sed on `macOS` should be the same but I haven't tested it)
- this produces something like what you can see below... one coordinate pair per line...
- `wc -l` – this counts all the lines in the output, aka all the vertices!


```
$ ogrinfo -al railways.gpkg railways | grep MULTILINESTRING | sed 's/,/\n/g'

  MULTILINESTRING ((326343.067914476 699952.081255119
326326.294311321 699945.679406577
326279.537614386 699929.040120446
326272.308185448 699925.635671824
326269.864460866 699923.974497699
326264.825931878 699917.292699352
326260.249880988 699913.308166329
326256.81289869 699911.65298891
326252.411784718 699910.971843371
326191.436753691 699903.306639874
326152.162691257 699897.950574015
326104.287456025 699891.741498902
326100.665299435 699890.512683497
326098.475138823 699889.158937651
326097.145730218 699886.5991274
326096.98673549 699882.070881193
326088.73999974 699881.244820814))
  MULTILINESTRING ((326088.576104651 699889.719608428
326048.426874557 699891.5713071
326010.867455132 699892.755158391
325966.641678623 699894.744934465
325912.685024184 699901.980194745
325845.325438812 699916.072416438
325803.626955977 699926.659048399
325765.153390555 699939.895373231
325728.441800731 699951.977057214

<snip>
```

I did [find](https://gis.stackexchange.com/questions/32445/counting-number-of-vertices-of-polygons-and-lines-in-qgis) the existence of the `num_points($geometry)` function before doing this, but deemed that to have too many steps for my liking. Undoubtedly using that function would be more suitable in other circumstances.
