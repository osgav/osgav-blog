
+++
author = "osgav"
date = "2022-07-26T17:02:10Z"
draft = false
image = "images/headers/coolcatgamestudio-2668046-ufo-pixabay.jpg"
share = true
slug = "ufo-investigation-organization"
tags = ["database design", "diagrams", "UFOs"]
title = "UFO Investigation Organization"
[menu.main]
parent = "blog"
+++

In the off chance you arrived at this web page hoping to report a UFO sighting, I am afraid this website does not take UFO sighting reports.
<br><br>
...
<br><br>
I'm currently working through the [Spatial Database Management](https://roam.libraries.psu.edu/node/1357) course from Pennsylvania State University. Each lesson has a project, and for [the Lesson 2 project](https://www.e-education.psu.edu/spatialdb/l2_p10.html) you are asked to design a database for a hypothetical *UFO Investigation Organization.*

<!--more-->

As per the project brief, here is my ER diagram and short ramble.

![ER diagram ufo database](/images/posts/ufo-investigation-organization/er-diagram-ufo-database.png "ER diagram ufo database")

If you're familiar with ER diagrams, then you can probably interpret all of this by looking at the diagram alone. That is indeed the purpose of such a diagram. But for the purposes of this project I shall include a short blurb explaining my database. 

The key fields are all highlighted in blue. The key fields with bold text are primary keys, the ones with regular text are foreign keys.

Regarding relationships and cardinality:

- **1** witness can witness **many** sightings
- **1** witness can be the primary witness of **many** sightings
- **1** witness can be the source for **many** pieces of evidence
- **1** sighting can be witnessed by **many** witnesses
- **1** sighting can have **many** pieces of evidence
- **1** piece of evidence can have only **1** source

Now for something you can't determine by looking at the ER diagram: some of my thoughts on my database design.

I added a `sightings` table with a composite primary key comprised of the `witness.id` and `sighting_info.id` primary keys after thinking *"what if there was more than 1 witness of a UFO sighting"*. Instead of removing `witness_id` from the `sighting_info` table I decided to call it `primary_witness` instead, as it might be useful for the UFO Investigation Organization to have a main contact for the sighting should they wish to consult with them further after the initial report.

I added a `evidence_source` table to link up a witness to a specific piece of evidence. For example, an audio clip of an interview with a witness. Without this table, all evidence for a sighting would be indirectly associated with only the `primary_witness` in the `sighting_info` table. Maybe it was somebody else that filmed the sighting on their smartphone, and another person who took some photos. Which brings me to my next point...

The `evidence_source` table is probably a bit flawed, in that maybe a piece of evidence that gets added to the database and associated with a particular sighting didn't actually come from a named witness in the database. Maybe it is some local newspaper clipping, with no details (or minimal details) about the person that provided a photo. Then again, I guess a generic "local newspaper ABC" entry could be made in the `witness` table for such cases.

Lastly, the fields relating to the digital files: `filetype`, `filename`, `filesize`. Considering the idea here is that this database will live behind a website that serves them up, I was thinking some extra fields like `filepath` and / or `storage_location` or something would be useful, so that they can be located within something like an AWS S3 bucket. But I didn't bother revising my diagram to include any such fields as I'm not actually building a website here.
