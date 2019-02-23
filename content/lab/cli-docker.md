
+++
author = "osgav"
date = "2019-02-01T22:47:21Z"
draft = false
image = ""
share = false
slug = "cli-docker"
title = "CLI docker"
tags = ["docker", "cheatsheet"]
[menu.main]
parent = "lab"

+++

**`created: 01/02/2019`**<br />
**`updated: 23/02/2019`**

##### containers and such...

---

- https://github.com/wsargent/docker-cheat-sheet
- https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes


**remove dangling images** 

```
$ docker rmi $(docker images -q -f dangling=true)
```

- https://docs.docker.com/engine/reference/commandline/image_prune/


