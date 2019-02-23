+++
author = "osgav"
date = "2019-01-04T11:20:08Z"
draft = false
image = ""
share = false
slug = "cli-git"
title = "CLI git"
tags = ["git", "GitHub", "version_control"]
[menu.main]
parent = "lab"

+++

**`created: 04/01/2019`**<br />
**`updated: 04/01/2019`**

##### git

---


***history***

```
compact:
git log --oneline       just commit messages

increasing verbosity:
git log                 can also see author/date
git log --nameonly      can also see filenames
git log --stat          can also see insertions/deletions

more details:
git whatchanged         'git log' +  file permissions changes
git log -p              'git log' + diffs

graphs:
git log --graph --oneline --decorate --date=relative --all
git log --graph --pretty=format:'\''%C(auto) %h | %s | %an | %ar%d'\'''
```

# inspiration

***twitter thread with lots of `git log` commands***

{{< tweet 1033852879529017346 >}}
<!-- https://twitter.com/copyconstruct/status/1033852879529017346?s=19 -->

***reverting***

- https://stackoverflow.com/questions/927358/how-to-undo-the-most-recent-commits-in-git

***other cheatsheets***

- https://gist.github.com/hofmannsven/6814451

***jessfraz dotfiles***

- https://github.com/jessfraz/dotfiles/blob/master/.gitconfig