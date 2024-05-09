
+++
title = "RandomNote for Joplin"
slug = "randomnote-for-joplin"
date = "2020-09-30T21:13:01Z"
draft = false
type = "blog"
author = "osgav"
image = "images/posts/para-zettelkasten-experiment/header_01.jpg"
collections = ["blog"]
tags = ["notetaking", "RandomNote", "Joplin", "OneNote", "PARA", "Tiago Forte", "bash", "python", "AppleScript"]
+++

### TL;DR 

I made a *RandomNote for Joplin* button for macOS. You can find the bash, python and AppleScript concoction [here](https://github.com/osgav/randomnote-for-joplin).
<br><br>
Apologies to non-macOS Joplin users, I have not made any other verions of this.
<br><br>
But if you like sticking things together, the bash and python elements could be of use to you... 
<br><br>

### What's RandomNote? 

I discovered the concept of "RandomNote" via Tiago Forte's [PARA series](https://fortelabs.co/blog/p-a-r-a-iii-building-an-idea-generator/). To describe it at surface level: he created a button that opens a random note from his Evernote notes.
<br><br>
The purpose of such a button is to aid in serendipitous rediscovery of your old notes. That's not going much deeper, to be honest. To see what inspired me into action I encourage you to [read Tiago's post](https://fortelabs.co/blog/p-a-r-a-iii-building-an-idea-generator/) about it. He has a way with words which I do not. 
<br><br>
The rest of this post is an extension of the "API / Automation Friendly" criteria from my [OneNote vs Joplin](/blog/onenote-vs-joplin.html) blog post. 

<!--more-->


### RandomNote for OneNote 

As you will have gathered in the TL;DR above, I am using macOS. 

Tiago's RandomNote for Evernote was written for macOS [^1]. Since Evernote is a mature notetaking app, they have taken the time to add native AppleScript support. Thus, RandomNote for Evernote takes advantage of that and uses AppleScript. Unfortunately, my plan for imitating that went downhill fast. OneNote does not have native AppleScript support. Damn.

[^1]: there is a [web-based version](https://fortelabs.co/blog/randomnote-web/) of RandomNote for Evernote now too.

My next thought was *"I could parse the `.onenote` file itself with some python"*. But that led to two more unfortunate discoveries. They were the final nails in the coffin for this idea. 

1 - OneNote for macOS does not let you save a notebook locally. You have to log into OneNote when you open it so that it can load the notebooks saved in the (OneDrive) cloud. Because that's the only option. There is literally no option for saving a notebook locally.

And even if I could save a notebook locally... 

2 - The OneNote file format is *not simple*, to say the least. If you'd like to have a look at the 100+ page spec describing it, you can [find it here](https://docs.microsoft.com/en-us/openspecs/office_file_formats/ms-one/73d22548-a613-4350-8c23-07d15576be50). If that number alone didn't put you off, then you might like to know the first section is **Structures**. This section starts with **Fundamental Concepts**. The first two concepts covered are **Conflict Object** and **Conflict Page**. This elicited a nervous laugh from me and I didn't look much further. I mean, should conflicts be a concept you learn about before a page? Anyway, enough reading into the ordering in that document.

Even with the coffin nailed shut, somehow I convinced myself to ponder the possibility a little longer... 

Lastly I considered the fact the Microsoft Graph API exists. It *would* be possible to create a RandomNote for OneNote button by using this API. However, I decided to not go down this path as I didn't like the idea of requiring an internet connection. (Plus, this API is completely separate to the OneNote application running on my laptop. How do I make OneNote open the note chosen from some script that queried an API on the internet? AppleScript perhaps? Hmmm...)

There are ways to overcome the internet connection requirement. But I didn't like the ideas I came up with. They involved writing (and maintaining) more code than I'd like to. Unless I was using Windows, where you *can* save a notebook to a local file, the RandomNote function couldn't exist completely offline. It would need an internet connection sooner or later to get an updated list of all my notes. 

One more nail for good measure it turned out.

### RandomNote for Joplin 

Once I had concluded OneNote was not going to be my notetaking app of choice (see [my last blog post](/blog/onenote-vs-joplin.html) for the other reasons) I searched for another. 

On my travels, I spotted a notetaking app that had a mobile app, desktop app and [**CLI app**](https://joplinapp.org/terminal/). That jumped out at me and said *"hmmm RandomNote?"* Upon closer inspection I found that Joplin had a [local API](https://joplinapp.org/api/) - even better!

After frantically downloading and installing Joplin I started crafting a bash oneliner. Soon I had the basic *RandomNote for Joplin* ability before my eyes:

```
curl -s http://localhost:41184/notes?token=lalala | \
jq -r '.[] | .title' | \
shuf - | head -1
```

That was enough for me to conclude that the "API / Automation Friendly" criteria had been met - with flying colours. If I could whip up a basic RandomNote with a bash oneliner, then I felt it was likely the API would serve me well when it came to other automation ideas. 

It wasn't long until I settled on sticking with Joplin, since it met the other criteria on my list too. Soon after I returned to the RandomNote idea and took it from a bash oneliner to a button on my dock, just like Tiago's version. 

### RandomNote for Joplin for macOS

A bash oneliner isn't specific to macOS of course. The bits I added on next are though. That's not to say there aren't equivalents for Linux or Windows - but I use macOS so that's what I built for. 

Since Joplin doesn't behave exactly like Evernote with regards to viewing notes - you can only have one Joplin window open, viewing one note at a time - I couldn't imitate RandomNote for Evernote entirely.

I decided that having a system notification appear after clicking the button would be a good start. The notification can display the title of a note, and then I can manually navigate to that note in Joplin if it captures my attention. Or I can click the button again to get another notification with another note title, if the previous one didn't inspire me to open that note. And repeat, until I've had enough.

With a bit of searching I found `osascript`. It made light work of sending a system notification from a bash script *(sort of)*. Perfect! So I combined my script with the steps required to make a macOS "application" out of a script and *tada*! Now I had a button on my dock that conjured the title of a random Joplin note.

**`randomnote.sh`**

```
#!/bin/bash

token=lalala

note=$(curl -s http://localhost:41184/notes?token=$token | \
jq -r '.[] | .title' | \
shuf - | head -1)

python notify.py "${note}"
```

*(I fiddled around with quote marks but kept getting them wrong, so I split off the `osascript` invocation to a python script...)*

**`notify.py`**

```
#!/usr/bin/env python

import os
import sys

def notify(title, text):
    os.system("""
              osascript -e 'display notification "{}" with title "{}"'
              """.format(text, title))

notify("RandomNote for Joplin", sys.argv[1])
```

*(Placing `randomnote.sh` in `/Applications/RandomNoteJoplin.app/Contents/MacOS` and naming it `RandomNoteJoplin` is the gist of creating the "application" part)*

This felt a bit unfinished though. I've seen system notifications with buttons on them, I thought. I could add a button and when I click it, somehow that note opens in Joplin... Oh yeah! I started thinking about this before with OneNote... I need something to connect my script to the notetaking app itself. AppleScript can probably help, right? 

Yes, it can. While neither OneNote nor Joplin have native AppleScript support, you can still control them naively via AppleScript. This is made easier in Joplin by the abundance of keyboard shortcuts. 

So I looked for a way to make system notifications with buttons, and how to automate key presses.

What I found was a [tool called `alerter`](https://github.com/vjeantet/alerter) for making clever system notifications. Entertainingly it was made by the same person that created the Hugo theme my blog uses! Small world ha! If you're a macOS user and like automating things I highly recommend you check out `alerter`.

Unsurprisingly I found someone asking the very question I was, regarding [AppleScript and key presses](https://apple.stackexchange.com/questions/36943/how-do-i-automate-a-key-press-in-applescript). Conveniently it had an answer mentioning *key codes* as well as keystrokes. Convenient because it seems my script only worked when using key codes. i.e. only writing `key code 9` worked, rather than `keystroke "v"`.

Altogether, this resulted in my first proper *RandomNote for Joplin* button. 

Using it goes a little something like:

- click the RandomNote button and a system notification displays the title of a note
- there is a "Dismiss" button on the notification to make it disappear and there is a "Joplin" button
- clicking the "Joplin" button brings the Joplin application into focus
- then Joplin's *Goto Anything* dialog appears
- then the title of the random note appears in the search box
- then the *Goto Anything* search results appear, with the random note at the top

The last bit of automation I *could* have added was `press Enter` to open that note. I didn't do that because I was happy seeing the other *Goto Anything* results before opening the RandomNote-selected random note. 

Finally, it didn't take me long to realise something Tiago did. The number of hits for notes from my Archives of PARA gets a little frustrating as they are less relevant. So I changed the original bash oneliner in my script to a python script. That script allows me to exclude certain top-level notebooks, in my case my Archives notebook (and all its subnotebooks) and my Inbox notebook.

You can find my script [here](https://github.com/osgav/randomnote-for-joplin) if you'd like to explore the end result.

If you have any questions about my RandomNote adventures you can ask me on [Twitter!](https://twitter.com/ZER0D0TS)
