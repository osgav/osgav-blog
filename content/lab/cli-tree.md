+++
author = "osgav"
date = "2019-01-04T12:10:08Z"
draft = false
image = ""
share = false
slug = "cli-tree"
title = "CLI tree"
tags = ["bash"]
[menu.main]
parent = "lab"

+++

**`created: 04/01/2019`**<br />
**`updated: 04/01/2019`**

##### tree, jq

---

- `tree -J` : output the directory tree as JSON formatted array
- `tree -J | jq -c .` : make nice green and blue art in your terminal
