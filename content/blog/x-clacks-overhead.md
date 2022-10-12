
+++
title = "X-Clacks-Overhead: GNU Terry Prachett"
slug = "x-clacks-overhead"
date = "2022-10-12T09:32:05Z"
draft = false
type = "blog"
author = "osgav"
image = "images/posts/gnu-terry-pratchett-through-the-looking-glasses/pratchett_graffiti_1.jpg"
tags = ["X-Clacks-Overhead", "AWS", "S3", "CloudFront"]
+++

I finally added an `X-Clacks-Overhead` header to my site, woohoo!
<br><br>
What is that, and why *finally?*

<!--more-->

For the what: see [this blog post](/blog/gnu-terry-pratchett-through-the-looking-glasses.html) about when I discovered it.

For the "finally" part: my site is hosted on AWS S3, with AWS CloudFront in front of it. This has been the case since 2016. Only in 2021 did AWS [make it easy](https://aws.amazon.com/blogs/networking-and-content-delivery/amazon-cloudfront-introduces-response-headers-policies/) to add a simple static HTTP header to responses leaving their CDN. Indeed, it was possible to use Lambda@Edge or CloudFront Functions to achieve this before Response Header Policies came along, but damn did they seem like a very over-engineered solution to adding a static header. So I never did. But *finally* the most basic seeming functionality was added to their CDN, and a year later I remembered to get around to using it to add this header :) 

