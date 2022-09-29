
+++
title = "OneNote vs Joplin"
slug = "onenote-vs-joplin"
date = "2020-08-19T21:06:18Z"
draft = false
type = "blog"
author = "osgav"
image = "images/posts/para-zettelkasten-experiment/header_01.jpg"
tags = ["notetaking", "OneNote", "Joplin", "PARA", "BASB"]
+++

As explained in my [previous blog post](/blog/para-zettelkasten-experiment.html), I have started an experiment on my notetaking methods. 
<br><br>
Before I had the idea for that experiment I dived into using [Microsoft OneNote](https://www.onenote.com/), because I was so excited to try out [P.A.R.A.](https://fortelabs.co/blog/para/) 
<br><br>
I did that because I've used OneNote in the past, so it was familiar. But, within a couple of days of falling further down the P.A.R.A. and Zettelkasten rabbit-hole, I changed my mind.
<br><br>
I found [Joplin](https://joplinapp.org/). 

<!--more-->

On my way from OneNote to Joplin I started forming opinions of what I would like from a notetaking app.

At first my only criteria was the existence of a mobile app. To allow me to take notes in one place, from both my phone and laptop. As I read more, played around with OneNote and thought about how I had been using Slack and `.txt` files, I eventually wrote a list. 

Here are the headings from my list:

- Mobile App
- Note Format
- API / Automation Friendly
- Nestability
- Tagging
- Highlighting
- Image Pasting
- Wiki-style Linking

My notes for each were a bit of a jumble. But with a bit of editing I have translated them into something that someone else might find useful.

For each item listed above, I will cover why it made my list and compare it between the two apps from my perspective.




### Mobile App 

As touched on before, this was my initial catalyst. Reduce the blackhole effect of Slack by taking notes in the same place on my phone and laptop. 

Both the mobile apps of OneNote and Joplin suit my purposes - not a high bar to reach though. 

The main function I want my phone to perform is creating new notes. I want to create all new notes in the same place - let's say, an "Inbox" - without having to think about it.

This is so I can *easily* find it later on my laptop. No searching in Slack wondering which vaguely defined channel I put it in. Or if it just went in the catch-all channel. *Or maybe I left the tab open in my browser and didn't save the link at all...*

OneNote made this convenient. It allowed me to create a shortcut for opening a specific section within a notebook. Then tap the icon on my phone's homescreen and I was looking at the Inbox section. One more tap and I was ready to type a new note. 

Joplin makes this convenient. It always opens in the last notebook I was in, which for me (so far) is always my Inbox notebook. From there its two taps to start typing a new note. Or from the homescreen tap-and-hold Joplin's icon and tap the *New note* shortcut. (The tap-and-hold shortcut for OneNote always seemed to use a different "Quick Notes" section separate to my notebook unfortunately...) 

As both apps were suitably quick to conjure up a new note for capturing something, I wasn't convinced to drop OneNote based on the app alone.




### Note Format 

This became the top priority, alongside Mobile App, after I read what can only be described as a horror story. I didn't manage to dig it out of my browsing history, but to summarize it: 

- a very unfortunate person lost 5 years worth of notes in their OneNote notebooks...
- ...because one day their Microsoft account decided they no longer had permissions to access their notebooks.
- all their efforts to restore access were unsuccessful.

I cannot fathom how soul shattering that must have been. 

Indeed, there is a lesson about maintaining backups here. But frustratingly you can't save a OneNote notebook locally with the macOS version. That hinders some users in keeping the simplest form of backup...

This story along with more reading about Zettelkasten made me think about the *longevity* of the notes I take. I then realised I had thought about this before. In fact, at the top of [my website's lab](/lab/root.html), I have a quote that contains the answer already! 

> If it’s worth writing, it’s worth keeping. The only safe bet at this stage is **markdown** and git.

OneNote keeps things in a `.onenote` [file format](https://docs.microsoft.com/en-us/openspecs/office_file_formats/ms-one/73d22548-a613-4350-8c23-07d15576be50), explained in [this 100+ page document](https://interoperability.blob.core.windows.net/files/MS-ONE/%5bMS-ONE%5d.pdf). 

Joplin keeps things in [markdown](https://joplinapp.org/markdown/) files. (Mostly.)

You write notes in markdown. Joplin then stores them in an SQLite database locally, but uses markdown `.md` files in your "sync target" (for example Dropbox or Nextcloud) to get them from one device to another. Also you can export them to markdown. 

If OneNote ceased to exist, I'd have a non-trivial task of getting the raw notes out of `.onenote` files.

If Joplin ceased to exist, I'd have a much less painful time extracting raw notes from markdown files.

This weighed heavily in my decision to move away from OneNote.

Before I move on, the topic of **Storage** was closely related: 

- OneNote files are stored only in OneDrive *(OneNote on macOS literally doesn't let you save a notebook locally)*
- Joplin files can be stored locally, or in OneDrive, or Dropbox, or a hosted Nextcloud, or your own personal Nextcloud, or another WebDAV server 
- Joplin also has a CLI which could be used to automate local exports




### API / Automation Friendly

I added this to my list after the realms of Evernote inspired me:

[RandomNote for Evernote](https://fortelabs.co/blog/p-a-r-a-iii-building-an-idea-generator/)

I had a vague desire to be able to waste time programmatically. Create tag clouds or fool around with Python NLTK perhaps. But once I stumbled across RandomNote I decided I *must* try that out.

A brief version of events for this comparison:

- I looked into creating *RandomNote for OneNote*.
- I concluded it was a dead end.
- I looked into creating *RandomNote for Joplin*.
- Within 20 minutes I had made a basic RandomNote function.

This also weighed heavily in Joplin's favour.

*(If that sparked your interest then stay tuned, I will come back to this in [my next blog post](/blog/randomnote-for-joplin.html) and share my script.)*




### Nestability

I was set on trying P.A.R.A. so I needed to be able to create that basic top-level structure and some levels below it too.

Having read about [The Magical Number 4](https://fortelabs.co/blog/para/) from Tiago Forte I was in agreement that 4 seems like a good number to not exceed when it comes to nesting. 

A straightforward criteria it seems.

With OneNote there are some options for where your top-level P.A.R.A. categories can go. Once OneNote is open and you are logged in, you can switch between all Notebooks under your account. So, at the top is Notebooks. Then you have Section Groups and Sections, then Pages. You can also have Subpages and Subsubpages.

When I dived into OneNote, I found myself pondering which level to start at. There were a few choices, given 6 total hierarchy levels and my desire to keep the option to go 4 deep available. After some deliberation I settled on Section Groups for the P.A.R.A. categories. This meant individual Projects and Areas could be a Section. That left an ability to nest 3 more levels if I desired. I suspect it was because I was starting out, but I couldn't shake the feeling that I would inevitably want to change that later. I'll never know now though! 

Once Joplin is open you are looking at everything in your single local SQLite database. There are then Notebooks, Subnotebooks and Notes. It allows for infinite Subnotebooks by my testing, so you can stick to The Magic Number 4 or greatly exceed it if you wish. 

This was refreshingly simple in comparison. I later found you can have more than one local database, but that seemed fiddley enough to rule it out as an option. So it remained refreshingly simple in comparison. 

P.A.R.A categories as Notebooks and then use Subnotebooks to nest to my heart's content.




### Tagging

Tagging seems like a useful concept. I hadn't thought about it particularly deeply when I added it to my list. 

I played around with tags a bit and soon realised that OneNote on macOS is handicapped. It is less capable than its Windows and online Office365 counterparts. You aren't able to create a new tag, only use 5 built-in ones. Once I realised this, I felt like I was going to be missing out on tagging. I should have the option to add tags to notes. Tags that I've named. 

That's the real reason it made my list. Slight outrage at OneNote on macOS. 

This felt a bit silly, so I also justified it to myself with the reasoning I mentioned earlier. *"Maybe I could create an interesting tag cloud some day if I have tags..."*.

Joplin lets you create new tags. As many as you want. It doesn't have advanced capabilities like you would find in OneNote or Evernote (such as filtering within a specific notebook by one or more tags), but it let me create new tags so I was happy.




### Highlighting

I always enjoyed using a real highlighter on my physical notes and textbooks back in college. When I was exploring OneNote I noticed the highlight button and thought *"sure, I might use that."*

Then I read more words from Tiago Forte, this time about [Progressive Summarization](https://fortelabs.co/blog/progressive-summarization-a-practical-technique-for-designing-discoverable-notes/). Another item made my list.

OneNote lets you highlight using different colours, it also has fancy drawing-style highlighting. Both of these felt a bit over the top for me.

Joplin supports inline HTML so you can highlight text by wrapping it inside `<mark>tags</mark>`. In fact, there is a Joplin plugin that enables `==mark==` syntax which is much less painful to use!

Also, if I was determined to use several highlight colours, inline HTML (and CSS) can assist:

```
<style>
.purple {
	background-color:#DD55DD;
}
</style>

highlight with a different colour: <span class="purple">**tada**</span>
```

I was fairly set on switching to Joplin by this point.




### Image Pasting

This came from thinking about how I use Slack. Or rather the fact that you can paste images into Slack with <kbd>Cmd</kbd> + <kbd>V</kbd> and *tada* its there. I didn't do this at all with my personal Slack that I collected links in, but I knew of it from using Slack at work. 

I was also aware from my past use of OneNote that this was a feature available to me now. 

Eventually during my Joplin testing I found this same feature.

There was no looking back now.




### Wiki-style Linking

Once I started reading into the world of Zettelkasten I became very keen on the idea of being able to link notes. In the past I had often enough written a note where I made a vague reference to another note I knew I had written. When trying to follow one of those vague references I would be flipping between plain text files and Slack looking for it. To use an clickable link to a note instead makes perfect sense! *Such a familiar concept I can't think where I've seen it before...*

Both OneNote and Joplin allow you to create a link to another note. They both require you to locate that other note first, then right-click it and choose the *copy-a-link-to-this-note* option. Then you can paste in your new note and a clickable link appears. 

It's not the smoothest way to add a link, but it works. When you dig into the linking notes aspect of the (digital) Zettelkasten world there are apps with significantly nicer methods. For example using `[[double brackets]]` around words will link to a note with that title, if one exists. If it doesn't exist some apps will make that a "stub" link - clicking it will take you to a new blank note with that title. 

Related to linking, is the concept of *backlinking.* A list of *backlinks* at the end of a note - links to the notes that have a link to the note you are viewing. Again this is a feature in more Zettelkasten-focused apps. 

Neither OneNote nor Joplin have `[[double bracket]]` linking, stub links or backlinks. OneNote *tries* to do `[[double bracket]]` links. I found that it would create a new note even when I typed the name of an existing note. So I guess OneNote *almost* has `[[double bracket]]` links *and* stub links, but currently neither. (For the macOS version, at least.)

You *are* at least able to create clickable links to other notes with both apps, so they meet this foundational element of Zettelkasten.

If backlinking is particularly interesting to you, then you might like [Obsidian](https://obsidian.md/) or [Roam Research](https://roamresearch.com/).

I wasn't swayed enough by these offerings to try them out, but they do look very powerful. Maybe someday, but not today.




### And that's it! 

That was a summary of the 8 criteria I wrote down while validating my switch from OneNote to Joplin. If you read this far I hope you found something interesting. Or even helpful if you're looking for a new notetaking app yourself!

If you have any questions about how I'm using Joplin ask me on [Twitter](https://twitter.com/ZER0D0TS).
