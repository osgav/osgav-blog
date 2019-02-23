+++
author = "osgav"
date = "2019-01-19T14:18:00Z"
draft = false
image = ""
share = false
slug = "hugo-date-operations"
title = "Hugo Date Operations (osgav epoch)"
tags = ["Hugo", "go"]
[menu.main]
parent = "lab"

+++

**`created: 19/01/2019`**<br />
**`updated: 19/01/2019`**

---

I wanted to make an 'osgav epoch' counter thing, and so I did, like so...

(see Blog Archive on my [tags](/tags.html) page)

```
<h6>blog archive</h6>
<br />
$pages := (where (where .Site.Pages "Type" "post") "IsPage" true) 
range first 99 $pages 
  $t := (time "2016-06-05") 
  <!-- date of osgav.run first post -->
  $delta := $t.Sub (time .Date) 
  $osgav_epoch_negative := int (div $delta.Hours 24)
  $osgav_epoch := int (sub 0 $osgav_epoch_negative)       
  <a href=" .Permalink "> .Date.Format "2006"  [ $osgav_epoch ]  .Title </a>
  <br />
{{ end }}
```

So `2016-06-05` is `date of osgav.run first post` as mentioned, but why is there a `2006` reference at the end?

There is a fun quirk in Hugo (Go) date formatting:

- https://gohugo.io/functions/format/
- https://gohugohq.com/howto/hugo-dateformat/
- https://gohugohq.com/howto/compare-date-strings-in-hugo/
- https://www.madboa.com/blog/2016/08/24/hugo-dateformat/

I shared madboa's sentiment *Wacky, eh?*






