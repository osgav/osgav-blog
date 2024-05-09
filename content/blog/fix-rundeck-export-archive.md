
+++
title = "Fix Rundeck Export Archive"
slug = "fix-rundeck-export-archive"
date = "2018-09-09T20:20:01Z"
draft = false
type = "blog"
author = "osgav"
image = "images/posts/fix-rundeck-export-archive/rundeck-header.png"
collections = ["blog"]
tags = ["Rundeck", "bash"]
+++

Seeing an error when trying to Export Archive for one of your Rundeck projects?

`Project export request failed: Could not create temp file for archive: No such file or directory`

You might be missing your Rundeck "temp directory" which has a straightforward fix...

<!--more-->

The fix? Create it!

- check `/etc/rundeck/profile` to see what your temp directory is set to:

``` bash
$ grep TEMPDIR= /etc/rundeck/profile
RUNDECK_TEMPDIR="${RUNDECK_TEMPDIR:-/tmp/rundeck}"
$ echo $RUNDECK_TEMPDIR

$
```

- check if temp directory exists, create it if not:

``` bash
$ dir=/tmp/rundeck
$ if [ -d $dir ]; then echo "already exists"; else mkdir $dir; fi
$ if [ -d $dir ]; then echo "already exists"; else mkdir $dir; fi
already exists
```

- try exporting a project again and it should now work &nbsp;&nbsp;:tada:


> Discovered via `rundeck-discuss`
> 
> https://groups.google.com/forum/#!topic/rundeck-discuss/Mw8D8kvTkzA
>
> See also: Rundeck docs
> 
> https://github.com/rundeck/rundeck/wiki/Faq#how-do-i-specify-a-new-temp-directory-for-rundeck
