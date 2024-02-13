
+++
title = "Leaflet maps on Hugo"
slug = "hugo-leaflet-integration"
date = "2024-02-13T15:11:33Z"
draft = false
type = "lab"
author = "osgav"
tags = ["Hugo", "Leaflet"]
+++

**`created: 13/02/2024`**<br />
**`updated: 13/02/2024`**

*how do you get Leaflet maps on a Hugo blog*

---

### **integrating Leaflet**

here's one way to go about integrating [Leaflet](https://leafletjs.com/) maps into a [Hugo](https://gohugo.io/) site:

1. add Leaflet's CSS and Javascript files to assets

create `assets/css/leaflet/` and copy Leaflet CSS here<br />
create `assets/js/leaflet/` and copy Leaflet JS here

2. create a new section to publish maps under (optional)

create `layouts/maps/list.html` for new map index structure<br />
create `layouts/maps/single.html` for new map post structure<br />
create `content/maps/_index.md` for new map index content

3. create shortcodes for adding a Leaflet map to a post

create `layouts/shortcodes/mapdiv.html` for adding map div to map post<br />
create `layouts/shortcodes/style.html` for adding map-specific CSS to map post<br />
create `layouts/shortcodes/script.html` for adding map-specific JS to map post

creating a new section is optional. you could instead create a fourth shortcode to include the Leaflet CSS and JS (which would look like the last two shortcodes above combined) and then use that in a post in any existing section of your site.

that lays the groundwork to be able to create a post containing a Leaflet map, which can be done by:

4. add map-specific Javascript, CSS, and data to assets

create `assets/maps/blah.js` for map-specific JS<br />
create `assets/maps/blah.css` for map-specific CSS<br />
create `assets/data/data.js` for map-specific data files

5. create new post and use the shortcodes to refer to map-specific data

created `content/maps/blah.md` for new map post page content


### **other notes**

my site currently uses Tailwind CSS along with the Typography plugin. initially my Leaflet map links (e.g. the attribution link in the bottom right) were being styled by the CSS from the Tailwind / Typography `prose` class. i stopped this by adding `class="not-prose"` to my map div in the `mapdiv.html` shortcode.


### **commits**

- [the initial commit where i added Leaflet](https://github.com/osgav/osgav-blog/commit/d1dbaea44dd3a7c8a44028169a466fa3dfad0e1c)

