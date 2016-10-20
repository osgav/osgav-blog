+++
author = "osgav"
comments = true
date = "2016-10-20T19:47:42Z"
draft = false
image = "images/rundeck-logo2.png"
share = true
slug = "rundeck-on-aws-part-ii"
tags = ["rundeck", "AWS", "ansible"]
title = "Rundeck on AWS Part II: Ansible"

+++

Following on from [Part I](/post/rundeck-on-aws-part-i.html), I've now starting writing an Ansible playbook for creating a Rundeck server in AWS - which can currently provision and terminate a Rundeck server . No more CloudFormation to deploy a new instance woohoo!

[Ansible](http://docs.ansible.com/) playbooks are a lot more readable and easier to interpret and write. As I'd come to understand Ansible is very flexible and writing my first playbook really brought that home. There are various ways actions and data can be divided up amongst playbooks and additional files, which lead to different sets of ansible commands to achieve your objectives. Anything you'd like to do with Ansible, well there is probably an Ansible module for doing it. The [module index](http://docs.ansible.com/ansible/modules_by_category.html) is extensive!

So after a few more hours of research and reading docs I've written a playbook for a Rundeck server in AWS. It's a little rough at the moment as I've had to add additional VPC-related directives because I wanted to deploy into us-east-1 and because I wanted to use Certificate Manager (only available in that region) and it happens that due to the time at which I created my AWS account, and the fact I used us-east-1 at that time, before all AWS account were switched to always-use-VPC-by-default, _us-east-1 is "EC2-Classic" in my account rather than "EC2-VPC"_. Argh. So I will pretend that problem no longer exists now that a new us-east-2 (Ohio) region has opened which is both "EC2-VPC" and has Certificate Manager available in my account. Wahey!

The playbook with extra VPC bits is [in my github](https://github.com/osgav/rundeck/blob/master/rundeck_control.yml) just now - but I will be updating it and creating a project page with some more details for it. Also I'm working on a generic `ec2_control.yml` playbook for provisioning/stopping/starting/terminating blank EC2 instances, handy for getting started with anything else. 

Basically at the moment my workflow boils down to:

```
$ ansible-playbook -i hosts/coreinfx rundeck_control.yml -t "provision" -e "type=rundecck-test"
$ ansible-playbook -i hosts/coreinfx rundeck_control.yml -t "configure" -e "type=rundeck-test"
$ ansible-playbook -i hosts/coreinfx rundeck_control.yml -t "terminate" -e "type=rundeck-test"
```

Where `hosts/coreinfx` refers to an ansible inventory file with a group `rundeck` in it (and `localhost` for aws/boto interactions)

And `type=rundeck-test` refers to a vars file that describes the EC2 instance / Security Group to be created.

Example [vars file](https://github.com/osgav/rundeck/blob/master/rundeck-test.yml) is here - as mentioned I'll write a project page with more details soon.


So far this covers using Ansible to create a Rundeck server, but it does not yet configure Ansible on the Rundeck server as well. I've only done that manually on the cloudformed Rundeck instance - so the next steps are tracing those footprints and converting them into playbook instructions... (which will feature in `rundeck_control.yml` but not `ec2_control.yml`)

Look out for Part III...
