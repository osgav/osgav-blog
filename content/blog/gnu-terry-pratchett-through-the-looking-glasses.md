+++
author = "osgav"
date = "2020-10-30T14:14:18Z"
draft = false
image = "images/posts/gnu-terry-pratchett-through-the-looking-glasses/pratchett_graffiti_1.jpg"
share = true
slug = "gnu-terry-pratchett-through-the-looking-glasses"
tags = ["looking glass", "python", "BeautifulSoup", "SQLite", "web crawler", "X-Clacks-Overhead", "Terry Pratchett"]
title = "GNU Terry Pratchett through the Looking Glasses"
[menu.main]
parent = "blog"
+++



> *"A man is not dead while his name is still spoken."*

One day I discovered the existence of Looking Glasses. It was so long ago now that I don't remember exactly what led to it, but I know I found `http://www.bgplookingglass.com` and became quite intrigued by it. 
<br><br>
A Looking Glass is a system that network operators might use to find out Internet routing and BGP-related information. They provide insight into how a particular router connects the Autonomous Systems that make up the internet. 
<br><br>
But this post isn't about Looking Glasses, it's about something else I found. So back to my story...

<!--more-->

I decided that finding this website was a good excuse to dabble with SQLite databases using Python. 

So I did just that. I started dabbling. I scraped the content from the web page with some BeautifulSoup and stuck it in a little database file. Database created, check. 

Updating my database with something was the obvious next step. With what though? I thought it might be fun to write a web crawler that records the "status" of each Looking Glass. It could read the Looking Glass URL from a record, load that URL, then store the HTTP status code from the response in a new field in that record. 

So I did just that. I wrote and ran a web crawler which updated every record in my database with a status for each Looking Glass. A `200` status suggested the Looking Glass was "up". A `404` suggested the Looking Glass no longer existed and `500` suggested the Looking Glass was "down". Database updated, check. 

I rather enjoyed the exercise and began to ponder what else I could add to my database. It took a little while for my crawler to run through all ~1000 records so I thought I should make the most of the next run. I pondered what other HTTP headers might be interesting to collect. Then it occurred to me: I should save all the headers from each Looking Glass response to a log file. That way I could sift through them afterwards for inspiration. 

Once again, I did just that. I updated my crawler and ran it again - this time logging all the headers from each response to a file. I also saved another detail straight to my database: the number of headers in the response. That turned out to be pretty useful for honing in on "interesting" responses. Database updated again, check. *Infinite inspiration for further database updates acquired, check.*

While perusing my new logs I found a rare, wonderful and uplifting HTTP header. A strange description for a HTTP header, I'm sure you agree. 

In fact, I had read about this header before, but I never imagined I would stumble across it in the wild. In hindsight, that was very narrow-minded. I just hadn't spent any time looking at quantities of "wild" HTTP headers - only those from internal systems at work. Nevertheless I was excited to have found:

> `X-Clacks-Overhead: GNU Terry Pratchett`

The HTTP header was uplifting because it is a tribute to the late Sir Terry Pratchett, a well known and beloved name to my family. 

And the reasons it is wonderful are best described by these websites: 

1. https://xclacksoverhead.org/home/about  
2. https://xclacksoverhead.org/home/in-memoriam
3. https://xclacksoverhead.org/listing/the-signal
4. http://www.gnuterrypratchett.com

The first link above includes a selection of interesting references if you'd like to read further. The second and third links show a very touching dedication to one of the many marvelous things bestowed upon the world by Sir Terry Pratchett. The fourth link provides a bunch of hints if you want to join in. 

As for my story of Looking Glasses and the little database? Well, like Alice falling down the rabbit hole, it veers off on a tangent like many side projects do. Perhaps I'll write a little bit about that too, someday.

Lastly, for now, I invite you to read this excerpt from the first link above:

### About the Signal 

X-Clacks-Overhead is a non-standardised HTTP header based upon the fictional work of the late, great, Sir Terry Pratchett.

In Terry Pratchett's science-fantasy Discworld series, "The Clacks" is a network infrastructure of Semaphore Towers, that operate in a similar fashion to telegraph - named "Clacks" because of the clicking sound the system makes as signals send.

In Sir Terry's novel "Going Postal", the story explains that the inventor of the Clacks - a man named Robert Dearheart, lost his only son in a suspicious workplace accident, and in order to keep the memory of his son alive, he transmitted his son's name as a special operational signal through the Clacks to forever preserve his memory:

**GNU John Dearheart**

**G:** Send the message onto the next Clacks Tower.

**N:** Do not log the message.

**U:** At the end of the line, return the message.

The nature of the 'GNU' code would keep the name of his son forever transmitting through The Clacks network so long as the network still existed.

> *"A man is not dead while his name is still spoken."*


<br><br><br>

*Header image [from branestawm on flickr](https://www.flickr.com/photos/branestawm/16810237844/)*


