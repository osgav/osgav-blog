+++
author = "osgav"
date = "2070-01-01T00:00:00Z"
draft = true
slug = "cheatsheet"
tags = ["draft"]
title = "cheatsheet" 
[menu.main]
parent = "blog"

+++

[***view raw source***](https://raw.githubusercontent.com/osgav/osgav-source/master/content/post/cheatsheet.md)
<br />

- https://sourceforge.net/p/hugo-generator/wiki/markdown_syntax/
- http://assemble.io/docs/Cheatsheet-Markdown.html


Use the following `more` html comment to manually create the "summary" block of content for the front page...

<!--more-->

---
**Headers**
----

huge header
============

smaller header
--------------



# header 1
## header 2
### header 3
#### header 4
##### header 5
###### header 6


---
**Hyperlinks**
---

https://osgav.run<br />
<https://osgav.run><br />
[text link](https://osgav.run)<br />
[text link with hover text](https://osgav.run "hoverboard")<br />

---
**Text formatting**
---

*italic*<br />
**bold**<br />
***bold italic***<br />
~~strikethrough~~<br />
<s>also strikethrough</s>


<i>italic text</i> and \*escaped asterisks\*

<b>bold text</b> and &lt;html&gt; tags

&copy; for a special entity, and `&copy;` or &amp;copy; to escape a special entity 


> these are
>
> blockquotes


> these are still part
> of the same blockquotes
, this line too
and this

...

> other text and linebreaks required to separate them<br />
> also, use `<br />` for closer linebreaks


---
**Code formatting**
---

**Standard**

This is `inline preformatted text` and...

    This is a block of
    preformatted text
    using indentation

and...

```
This is a block of
preformatted text
using backticks
```

**Highlighted**

There is also code highlighting,  `hljs` provides the following...

``` bash
$ grep -Ro -e 'registerLanguage("\w\{1,14\}"' .

./themes/casper/static/js/hljs8.4_highlight.min.js:registerLanguage("apache"
registerLanguage("bash"
registerLanguage("coffeescript"
registerLanguage("cpp"
registerLanguage("cs"
registerLanguage("css"
registerLanguage("diff"
registerLanguage("http"
registerLanguage("ini"
registerLanguage("java"
registerLanguage("javascript"
registerLanguage("json"
registerLanguage("makefile"
registerLanguage("xml"
registerLanguage("markdown"
registerLanguage("nginx"
registerLanguage("objectivec"
registerLanguage("perl"
registerLanguage("php"
registerLanguage("python"
registerLanguage("ruby"
registerLanguage("sql"
```

``` python
import os

print("hi")
with open("log.txt", "r") as log_handle:
    log_content = log_handle.read()
```

``` http
status: 200
Date: Wed, 01 Aug 2018 20:50:43 GMT
Server: Apache/2.2.3 (SLES ES platform)
Strict-Transport-Security: max-age=15768000
Connection: close
Transfer-Encoding: chunked
Content-Type: text/html; charset=UTF-8
```

``` diff
diff --git a/themes/casper/layouts/partials/tagcloud.html b/themes/casper/layouts/partials/tagcloud.html
index b9c821d..c030de7 100644
--- a/themes/casper/layouts/partials/tagcloud.html
+++ b/themes/casper/layouts/partials/tagcloud.html
@@ -18,7 +18,7 @@
     {{- $sizeStep := ( $.Scratch.Get "sizeStep" ) -}}
     {{- $size := ( add $minSize ( mul $sizeStep ( sub $count $minCount ) ) ) -}}
 
-    <span style='font-size:{{ $size }}em; font-family:monospace; text-decoration: none;'>
+    <span style='line-height:0px; vertical-align:middle; font-size:{{ $size }}em; font-family:monospace; text-decoration: none;'>
   <a class="tagcloudtag" href='{{ $.Data.Plural | relURL }}/{{ .Term | urlize }}.html'>&nbsp;{{- .Term -}}&nbsp;</a></span>  
 
   {{- end -}}
```




---
**Embedding images, tweets**
---
<br /><br />
**an image:**

![rest in peace](/images/zerodots_wordle.png "rip")

<br /><br />
**a figure:**

{{< figure src="/images/zerodots_wordle.png" title="exhibit A" >}}

<br /><br />
**a tweet:**

<!-- https://twitter.com/spf13/status/666616452582129664  -->

{{< tweet 666616452582129664 >}}



---
**Lists**
---

how about a list?

* unordered lists can use
+ 1 of 3 different symbols
- they are + * -

new list!

1. Numbered lists use numbers
+  But they don't need to continue using numbers
*  + * - or another number will do the trick
7.  while keeping the numbering correct for you...


---
**Tables**
---


Tables can be done in markdown and you can also use `HTML` tables:

First header | Second Header
------------ | -------------
Content Cell | Content Cell
Content Cell | Content Cell








