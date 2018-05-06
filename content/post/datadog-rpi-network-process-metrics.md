+++
author = "osgav"
date = "2018-05-06T16:10:01Z"
draft = false
image = "images/posts/datadog-rpi-network-process-metrics/dd-rpi.png"
share = true
slug = "datadog-rpi-network-process-metrics"
tags = ["Datadog", "monitoring", "network", "process", "metrics", "raspberry_pi", "Raspbian", "linux"]
title = "Datadog on Raspberry Pi: Enabling Network and Process Metrics"
[menu.main]
parent = "blog"

+++

Empty graphs in Datadog after installing the agent on a Raspberry Pi?

I experienced this and fixed it by installing a couple of things...

<!--more-->

### Datadog on a Raspberry Pi?

A little while ago I installed a Datadog monitoring agent on my Raspberry Pi - partly because I discovered this was possible, but mostly because I wanted to be able to know if my always-on pi was indeed still on. Opting for an advanced monitoring agent like this for a relatively basic task may seem like overkill but as I rather enjoy playing with graphs it was an obvious choice for me. Plus, I'd seen a little of Datadog's capabilities at work and was aware of the possibilities - also the inspiring Pokemon Go status dashboard had recently come into existence (which was a lot more extensive than it is now!). 

As the title hints, I needed to do something extra to "fix some broken metrics" - not everything was automagically instrumented as is generally described by these software vendors. If you find that nearly everything is working out-of-the-box after installing the agent but the Network traffic (bytes per sec) and Process memory usage graphs are empty in the Datadog console, then maybe the scenario below will apply to you...

Note: this was for Raspbian GNU/Linux 8 (jessie)

### The Network Metrics

The install log file has error(s) containing "No module named psutil"

Install missing module
	sudo apt-get install python-psutil
Reinstall agent

Your Network traffic graph is now working!
-or-
Your Network traffic graph is... still empty.

If you have already installed header files during a previous endeavour your problem might be solved by installing only python-psutil - if not, you can probably find this next error...


The install log file now has error(s) containing "Python.h: no such file or directory"

Install missing header files
	sudo apt-get install python-dev \
	libpython-dev \
	libpython2.7-dev \
	python2.7-dev
Reinstall agent

Your Network traffic graph is now working!


### Still got an empty Network graph?

According to my slighly sparse notes I had also ran pip install datadog by the time I had fixed the Network traffic graph (and before I'd fixed the Process graph) - though I'm unsure that this helped. If your graphs are still not populating, then maybe pip install datadog did help me...


### The Process Metrics

The /var/log/syslog file has error(s) containing "ohai file not found"

Install a go environment
	wget https://storage.googleapis.com/golang/go1.7.4.linux-armv6l.tar.gz
	sudo tar -C /usr/local -xzvf go1.7.4.linux-armv6l.tar.gz
Ensure go environment is in the $PATH for account running agent
	mkdir ~/go
	vi ~/.profile
			<<<
			export PATH=$PATH:/usr/local/go/bin
			export GOPATH=$HOME/go
			export PATH=$PATH:$GOPATH/bin
			>>>
	Ah ha I also had to export $PATH in /etc/rc.local (not just root's ~/.profile ...)
Install gohai
	go get github.com/DataDog/gohai
Restarted rpi, as I was ensuring the agent started correctly at boot time

Your Process memory graph is now working!


### Disclaimer

This was my experience after installing the datadog agent available at the time on to recently installed Raspbian operating system. Things may differ on other or newer versions of the agent / Raspbian / go ...



### Links

Datadog https://www.datadoghq.com/ 
this was possible https://kvaes.wordpress.com/2015/12/29/datadog-on-raspberry-pi/ 

	lol this blog is now (2 years later) on datadog website:
https://help.datadoghq.com/hc/en-us/articles/208163513-Deploying-the-Agent-on-RaspberryPI
https://docs.datadoghq.com/developers/faq/deploying-the-agent-on-raspberrypi/ 


Pokemon Go https://www.datadoghq.com/blog/monitoring-pokemon-go-service-status-datadog/  
status dashboard http://ispokemongodownornot.com/ 

This is nice dashboard
https://medium.com/@aubronw/the-perfect-dashboard-tv-resin-io-datadog-rpi-chromecast-d52f110bea8

Install go environment
https://dave.cheney.net/2012/09/25/installing-go-on-the-raspberry-pi
https://dave.cheney.net/unofficial-arm-tarballs 
