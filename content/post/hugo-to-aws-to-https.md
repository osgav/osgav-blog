+++
author = "osgav"
comments = true
date = "2016-09-25T17:44:41Z"
draft = true
image = "images/aws.jpg"
share = true
slug = "hugo-to-aws-to-https"
tags = ["hugo", "AWS"]
title = "hugo --> AWS --> https://osgav.run"

+++

As well as [catching up](/post/rundeck-on-aws-part-i.html) on drafted blog posts this weekend, I migrated this blog from Github Pages, KloudSec & Let's Encrypt to AWS S3, CloudFront, Route53 & Cerficate Manager. This was in light of one of my apprehensions about KloudSec unfortunately materializing - it was a fairly small and new company and has recently ceased to exist. As such my Let's Encrypt certificate had expired and was no longer auto-renewed by KloudSec so my blog was showing a HTTPS error when you visited it - boo. Time to pay for a risky design choice...

Here goes ***how I set up this blog*** take II:

I immediately decided AWS is where I shall move to, but what is the best way to go about it? Initially I was thinking about EC2 & NGINX and perhaps having Rundeck involved in the build process but realised I have a much simpler option - no EC2 nodes, put the files in S3 and switch on the website hosting feature, fix up CloudFront & Route53 so the osgav.run domain serves my S3 bucket globally from CloudFront Edge Network - easy peasy wahey.

So the next part was researching the simplest way to build my hugo site after an update and have the "public" directory sync'd into S3. I found various interesting articles about different ways to do this - some of the stuff I read is listed at the end.

After plenty surfing I decided to go with TravisCI - so I started aiming for a pipeline like:

```
Github --> TravisCI --> S3 --> CloudFront
```

----------------------

**Github:** repo containing the "source" of hugo site (not including "public")
also contains .travis.yml file

**TravisCI:** on push events to master TravisCI reads .travis.yml build file
installs a go environment
installs hugo (go binary) 
runs hugo build command
copies contents out output directory ("public") to S3
(contains AWS credentials also)

**S3:** files are overwritten on every build
acl in .travis.yml sets permissions to public_read (or else you'll get HTTP 403)

**CloudFront:** 

----------------------

While smoothing the operation of TravisCI I noticed a problem with trying to visit any page beyond the main index - posts and pages would try to load with a URL like `/post/rundeck-in-aws-part-i/` and it would return a HTTP 403 error - what's going on there? 

Hugo relies on a slightly more "standard behaviour" of URLs for subdirectories by expecting a default `index.html` file to be present in that subdirectory to be served when the "subdirectory URL" is accessed (e.g. `/post/rundeck-in-aws-part-i/` vs `/post/rundeck-in-aws-part-i/index.html`). While there is no problem serving a hugo website (with this default behaviour) straight out of an S3 bucket website, when you introduce CloudFront there is a problem. Due to CloudFront's handling of "[default root objects](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DefaultRootObject.html)" the normal way hugo builds URLs in it's sites is not compatible.

To fix this I needed to make an edit to my hugo site `config.toml` file to include `uglyurls = true` - this means URLs are now like `/post/rundeck-on-aws-part-i.html`. Essentially instead of replacing the `/` with `/index.html` it has been replaced with simply `.html` - which means the page structure now matches the source markdown file structure, just switching `.md` for `.html`.



****tree outputs? do some local builds to do `tree public` and get new uglyurl format**



> CloudFront configuration hints
> 
> - https://nparry.com/2015/11/14/letsencrypt-cloudfront-s3.html<br />


> cool Lambda idea
> 
> - http://bezdelev.com/post/hugo-aws-lambda-static-website/<br />


> AWS CLI
> 
> - https://lustforge.com/2016/02/27/hosting-hugo-on-aws/<br />
> - https://lustforge.com/2016/02/28/deploy-hugo-files-to-s3/<br />

> Wercker
>
> - http://atchai.com/blog/the-cms-is-dead-long-live-hugo-wercker-proseio-and-cloudfront<br />
> - https://gohugo.io/tutorials/automated-deployments<br />

> TravisCI
> 
> - http://www.gregreda.com/2015/03/26/static-site-deployments<br />
> - http://evanbrown.io/post/hugo-on-the-go/<br />
> - https://docs.travis-ci.com/user/deployment/s3<br />

> Route53
> 
> - http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/MigratingDNS.html<br />

> CloudFront hints re: subdir default index.html problems
>
> - http://blog.aws.andyfase.com/s3-backend-static-blog/index.html<br />
> - http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DefaultRootObject.html<br />
> - https://gohugo.io/extras/urls/<br />

