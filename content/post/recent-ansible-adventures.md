+++
author = "osgav"
date = "2017-05-30T12:51:59Z"
draft = false
image = "images/ansible_logo-tile.png"
share = true
slug = "recent-ansible-adventures"
tags = ["ansible", "rundeck", "AWS", "ELB", "ACM", "config_mgmt"]
title = "Recent Ansible Adventures"
[menu.main]
parent = "blog"

+++

#### Oops

So I recently picked up my Rundeck project again. My “production” instance has been running *mostly\** A-OK for many months now - except for 1 blip, it has got off easy. I’ve been using it as an unusual home for my own “documentation” of sorts. My plan for a third Rundeck blog post has been on the back-burner for a while, now beneath a virtual pile of other drafts. Now seemed good a time as any to resume my blog plans, starting where I left off!
<br /><br />
My original plan was adding to the playbook so it configured the [Rundeck Ansible Plugin](https://github.com/Batix/rundeck-ansible-plugin) as well. Ansible configuring Ansible. Instead of diving into the original plan I thought I'd re-familiarize myself with *one layer* of Ansible first.
<br /><br />
*As it happened, I had the inspiration I needed to start working on a* ***money-saving*** *playbook...*

<!--more-->

#### $$$

My monthly AWS invoice. Specifically the proportion of it accounted for by my single ELB.

It might be nice and easy to hook up my domain to my Rundeck server with SSL on there via an [ELB](https://aws.amazon.com/elasticloadbalancing/) and [ACM](https://aws.amazon.com/certificate-manager/) but it seems to amount to nearly ***$200/year!*** I [briefly](/post/hugo-to-aws-to-https.html) had my blog's SSL implemented via [Let's Encrypt](https://letsencrypt.org/) a while ago and more recently heard about [certbot](https://certbot.eff.org/) so thought I will look into this to replace ACM. I couldn't decide what to replace the ELB with, between HAProxy and NGINX, so have ended up experimenting with both! More on that later.

#### Is this Rundeck on AWS Part III?

The full tale will be - I'm still working on the certbot bit - when it is completed I'm going to focus the *Part III* blog post on moving away from ELB/ACM. *Ansible and Rundeck+Ansible (probably Part IV now!)* will happen eventually... :) this is just a little precursor... 

#### Breaking up rundeck_control.yml

The first thing to learn more about was **roles**. As the [Ansible](https://docs.ansible.com/ansible/playbooks_intro.html) [documentation](https://docs.ansible.com/ansible/playbooks_roles.html) [hints](https://docs.ansible.com/ansible/playbooks_best_practices.html), you might find yourself writing long all-encompassing playbooks initially but you will soon want to break these up and link them together in an appropriate, maintainable and reusable way. I did indeed find this to be true.

[My first Rundeck playbook](https://github.com/osgav/rundeck/blob/master/rundeck_control.yml) covers a lot of different things:

- AWS Security Group creation and configuration
- AWS EC2 resource provisioning, tagging and updating inventory
- Rundeck installation and configuration
- AWS EC2 resource termination (via security groups...)

Certainly enough going on to be broken down. After some reading of documentation and many random blog posts I arrived at a conclusion. I will maintain an *aws.yml* playbook to perform the 3 AWS functions mentioned above and alongside that a *rundeck.yml* playbook which configures Rundeck via all the different roles it should now have (rundeck, haproxy or nginx, certbot). 

I didn't write the "project page" I intended to for *rundeck_control.yml* - you can basically get the story from its inline comments anyway - so I'm going to instead write about my second iteration as it's a little more interesting! I will post the project page along with the *Rundeck on AWS Part III* blog post. As I mentioned this isn't the full tale... so that is all on the new playbooks for now.

#### Configuring my "Ansible Workstation"

As I remarked in *Rundeck on AWS Part II* there really is a lot of variety in how you can configure your Ansible environment. Other interesting areas that enable this are the [ansible.cfg](https://docs.ansible.com/ansible/intro_configuration.html) file and [inventory](https://docs.ansible.com/ansible/intro_inventory.html) files. You can maintain multiple inventory files, with the same or differing groups in each, and use a mixture of static *and* dynamic inventories if you like. In the config file you can specify a default inventory (amongst many other things). The "shape" of your `ansible` / `ansible-playbook` commands will depend on how you configure these.

Configuring Ansible to maintain a [dynamic inventory based on AWS](https://docs.ansible.com/ansible/intro_dynamic_inventory.html#example-aws-ec2-external-inventory-script) is very straightforward. Grab these [2](https://raw.githubusercontent.com/ansible/ansible/devel/contrib/inventory/ec2.py) [files](https://raw.githubusercontent.com/ansible/ansible/devel/contrib/inventory/ec2.ini), ensure their permissions are correct and reference the `ec2.py` script from either your `ansible` / `ansible-playbook` commands (`-i` for inventory) or ansible.cfg (specify as default inventory) - the fun part is then figuring out what patterns you want to use when addressing your servers! Make use of default inventory groups for referring to an entire AWS region? Apply tags to AWS resources and use automatically generated tag-based inventory groups? Both handy.

I've spent some time reorganising how I structure all my ansible-related work on my laptop based on my recent learnings - I will share the details on this in my next post and hopefully it will be useful to newcomers for providing another insight into configuration potential.

#### Lessons / Takeaways / Nota Bene

A few short notes to wrap up:

- roles are great use roles
- `playbook.yml` expects `roles/` directory at same level in tree
- included files (vars or tasks or plays) can be anywhere in the tree
- you can maintain both static and dynamic inventories
- you probably shouldn't ever keep `test` and `production` in the same inventory (see below)

*\*so... mostly A-OK. I learnt a valuable lesson about inventories some time in March. I knocked Rundeck out for nearly an hour, with an accidental upgrade to a version it was missing dependencies for. You probably shouldn't ever keep "test" and "production" in the same inventory because that just makes it easier for production to get mistakenly included in something intended for testing :)*













