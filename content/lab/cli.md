+++
author = "osgav"
date = "2019-01-04T12:10:08Z"
draft = false
image = ""
share = false
slug = "cli"
title = "Command Line Interface"
tags = ["bash", "which", "compgen"]
[menu.main]
parent = "lab"

+++

**`created: 04/01/2019`**<br />
**`updated: 04/01/2019`**

---

when `which` doesn't find a command... remember `compgen`

https://michael-kehoe.io/post/command-of-the-day-1-compgen/

```
compgen

    -a: List of user aliases
    -b: List of built-in shell commands
    -c: List of all commands you can run
    -e: List of shell variables
    -k: List of built-in shell keywords
    -A function: List of available bash functions

```    


- `tree -J` : output the directory tree as JSON formatted array
- `tree -J | jq -c .` : make nice green and blue art in your terminal

- [Convert curl syntax to Python, Node.js, R, PHP, Go](https://curl.trillworks.com/)