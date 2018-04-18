+++
author = "osgav"
date = "2017-05-30T17:51:59Z"
draft = false
image = "images/posts/hugo-travis-broken/hugo-travis.png"
share = true
slug = "hugo-travis-broken"
tags = ["hugo", "TravisCI"]
title = "Hugo TravisCI Pipeline Broken?"
[menu.main]
parent = "blog"

+++

#### TL;DR

*If your `.travis.yml` install section looks like this and the build is failing to install Hugo...*

```
 install:
 - go get github.com/spf13/hugo
```

*...then try updating it to download a specific version of the `hugo` binary:*


```
install:
- export VER=0.18.1
- wget https://github.com/spf13/hugo/releases/download/v${VER}/hugo_${VER}_Linux-64bit.tar.gz
- tar xvzf hugo_${VER}_Linux-64bit.tar.gz
- mkdir -p $GOPATH/bin
- cp hugo_${VER}_linux_amd64/hugo_${VER}_linux_amd64 $GOPATH/bin/hugo
```

*Why? Read on...*

<!--more-->

#### Long time no blog

So it seems 7 months between blog posts was more than enough time for my blog deployment pipeline to break without me noticing. If you'd like to avoid a build history like this:

![build fail](/images/posts/hugo-travis-broken/buildfail.png "build fail")

... then hopefully the change mentioned above in the TL;DR will help you do that.

#### Why did it break and how did I fix it?

It broke because Hugo can no longer be installed via `go get`. As of a little while ago it seems, you now need to `govendor get github.com/spf13/hugo`

(after installing `go get github.com/kardianos/govendor` first)

This addition to the Go ecosystem allows an application to manage the versions of its dependencies - so if a project has a `vendor.json` file, you'll need to use `govendor` instead of `go` to install it. Hugo started using this at least 5 months ago judging by a [helpful blog post](https://purplepalmdash.github.io/blog/2017/01/07/hugo-and-travisci-issue/) I found!

So I fixed everything by adding `go get govendor` and using `govendor get hugo`.

But it was still broken. Boo.

It had successfully installed Hugo now, but it couldn't find the `hugo` binary for the next step. I then spent a little while trying to locate the `hugo` binary with a few more deploys, but during these (failing) deploys I found a [solution for specifying an exact version](https://discuss.gohugo.io/t/started-getting-failed-to-normalize-url-string-returning-in/5034/8) of Hugo - **wahey!** I was going to look into this next, after I had run the pipeline as-is which was *supposed to* successfully use the most recent version of Hugo. So finding this shortly after a failed pipeline was fairly handy. I made the changes, deployed again and watched the build logs...

But it was still broken. Boo.

The error message made sense this time - the last step I borrowed from the solution in the forum post was copying the `hugo` binary into a `bin` directory, but that directory didn't exist! (my `cp` command was saying `No such file or directory` for the destination) Adding one last command - `mkdir -p $GOPATH/bin` - to the install section of `.travis.yml` fixed it and now `hugo` was findable on the `$PATH`. 

Fixed! :)



