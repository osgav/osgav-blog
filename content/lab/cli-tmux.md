
+++
author = "osgav"
date = "2019-02-17T15:56:48Z"
draft = false
image = ""
share = false
slug = "cli-tmux"
title = "CLI tmux"
tags = ["tmux"]
[menu.main]
parent = "lab"

+++

**`created: 17/02/2019`**<br />
**`updated: 17/02/2019`**

##### tmux and friends

---


- [cheatsheet](http://hyperpolyglot.org/multiplexers) - `tmux` vs `screen` 
- https://gist.github.com/simme/1297707
- https://gist.github.com/henrik/1967800
- https://gist.github.com/MohamedAlaa/2961058

**teamocil**

- http://www.teamocil.com/

```
Ctrl-b c        create new window
Ctrl-b w        list windows
Ctrl-b s        list sessions

Ctrl-b z        maximize/restore panel
Ctrl-b %        split panel vertically
Ctrl-b "        split panel horizontally

```

https://sanctum.geek.nz/arabesque/watching-with-tmux/








```
$ brew install tmux
$ gem install teamocil
$ echo "alias to='teamocil'" >> ~/.bashrc
$ mkdir ~/.teamocil
$ touch ~/.teamocil/lab.yml
```

**lab.yml**

```
name: osgav
windows:
  - name: lab
    root: ~/lab
    layout: main-vertical
    panes:
      - cat .lab_welcome; lst
      - pyenv
      - cd workbench; ls -l --time-style=long-iso --group-directories-first
```

**other tmux / teamocil config**

```
tmux: set -g mouse on
```

**usage**

```
tmux
to --list
to lab
```