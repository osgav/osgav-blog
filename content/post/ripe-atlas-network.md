+++
author = "osgav"
comments = true
date = "2016-10-30T19:26:48Z"
draft = false
image = "images/posts/ripe-atlas-network/atlas.png"
share = true
slug = "ripe-atlas-network"
tags = ["ripe_atlas", "raspberry_pi", "networking", "synthetic_testing"]
title = "RIPE Atlas Network"
[menu.main]
parent = "blog"

+++

> RIPE Atlas Network<br />
> Atlas Probe<br />
> RIPE NCC Access Account<br />
> What next?<br />


#### RIPE Atlas Network

Probes connected to RIPE Atlas: **9364**<br />
Measurements currently running: **11719**<br />
Results collected per second: **4082**<br />
<br />
A couple of months ago I stumbled across an interesting [blog](https://blog.webernetz.net/2016/06/02/ripe-atlas-measurements/) [post](https://blog.webernetz.net/2016/06/07/ripe-atlas-probe-stats/) about the [RIPE](https://atlas.ripe.net/) [Atlas](https://atlas.ripe.net/about/) [Network](https://atlas.ripe.net/campaigns/8a5cceb1-bf51-49b6-a72b-a005a05dcafe/) - ***a global network of probes that measure Internet connectivity and reachability*** - and was very intrigued to discover this was something I could join, both physically and virtually by obtaining an Atlas probe and completing a typical account registration...

<!--more-->

Why did I want to join? By hosting a probe you become part of the global measurement network. Your probe will be used in tests configured by RIPE NCC and the users of the RIPE Atlas Network to perform connectivity and reachability tests - pings, traceroutes, DNS lookups, etc - and in doing so it earns you credits which allow you to run your own tests on the global network. Nice! A global synthetic testing network I can use for my own research and debugging purposes, while contributing to other peoples experimenting. And yet another electronic device to fiddle around with.




#### Atlas Probe

So I signed up and requested an Atlas probe from the RIPE website and shortly afterwards a small electronic device arrived in the mail...

When requesting the probe you are required to enter the ASN of the network you will be connecting the probe to - [mylg](https://github.com/mehrdadrad/mylg) is a handy tool that can tell you that quickly. 

My probe lives near my router (you get a ~1ft flat utp network cable with it) and is powered by a Raspberry Pi. For power it just has a USB cable so you can alternatively use your router directly (if it has USB ports) to power it or even use an adapter to plug it into a wall socket. I prefer to increase the number of devices again and use a Raspberry Pi... just so I can tangent off into playing with [Datadog...](https://kvaes.wordpress.com/2015/12/29/datadog-on-raspberry-pi/) more on that another time.


#### RIPE NCC Access Account

What magic have I unlocked in signing up for all this then? Once you've registered your probe you appear to be gifted with **500,000** credits for use on the network and your probe starts earning credits pretty shortly after. My probe is earning about 1037 credits/hour at the moment :] I'm yet to get to grips with how many credits different measurements require so I'll find out how much that really amounts to (one of the blogs linked at the end elaborates on this area).

As mentioned earlier there a few types of measurements available, they are:

- Ping
- Traceroute
- DNS
- SSL/TLS
- NTP
- HTTP

Atlas probes also perform *built-in measurements*. These are controlled by RIPE NCC and include ping, traceroute, DNS, SSL/TLS and HTTP. They make various Internet maps, tools and data visualizations from the data collected by these measurements - some are available publicly via blog posts and some require you to login with your RIPE account. There are a lot of interesting blog posts on the RIPE website, I've listed some at the end of the post.

*User-defined measurements* are those run by probe hosts, anchor hosts, sponsors or RIPE NCC members using credits. These custom measurements include ping traceroute, DNS, SSL/TLS and NTP and let users collect data for their own personal use.

You can run both "instant tests" and set up recurring scheduled tests and also view public test history - so perhaps you can save yourself some credits if somebody has already run a test that is useful to you. Instant tests are as they sound - run *this* test from *these* nodes *now* and provide results as soon as possible. Scheduled tests can be configured to run the same test at set intervals and provide you with a feed of data (which can be consumed [via an API](https://labs.ripe.net/Members/kistel/ripe-atlas-api-changes) if desired).

The ability to run network diagnostic tools from a network with such a large number of vantage points enables very interesting research opportunities, as can be found in the RIPE labs blogs - see links below for more.

> ***A quick look at the attack on Dyn***<br />
> - https://labs.ripe.net/Members/massimo_candela/a-quick-look-at-the-attack-on-dyn<br />
> ***Using Atlas to monitor online gaming...***<br />
> - https://labs.ripe.net/Members/annika_wickert/using-ripe-atlas-to-monitor-game-service-connectivity<br />
> ***What can you do with 1,000,000 credits...***<br />
> - https://labs.ripe.net/Members/becha/what-can-you-do-with-one-million-ripe-atlas-credits<br />
> ***Observing DNS censorship with Atlas...***<br />
> - https://labs.ripe.net/Members/stephane_bortzmeyer/dns-censorship-dns-lies-seen-by-atlas-probes<br />
> ***Mapping Serbia's internet infrastructure...***<br />
> - https://labs.ripe.net/Members/andrej_petrovski/mapping-the-internet-infrastructure-in-serbia<br />
> ***Even***<br />
> - https://labs.ripe.net/atlas/user-experiences/<br />
> ***more***<br />
> - https://labs.ripe.net/atlas/user-experiences/user-views-and-use-cases<br />
> ***blogs***<br />
> - https://labs.ripe.net/atlas/user-experiences/ripe-ncc-analyses<br />

#### What next?

What will my probe be doing next? Well, the same thing it has been doing for the last couple of weeks or so - running lots of tests. What will I be doing next? Getting familiar with the RIPE portal and using some credits. And also playing around with the [#raspberry_pi](/tags/raspberry_pi.html) providing the probe's power...
