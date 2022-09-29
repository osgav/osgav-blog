
+++
title = "Mermaid Diagrams on Hugo"
slug = "hugo-mermaid-diagrams"
date = "2019-01-19T12:27:08Z"
draft = false
type = "lab"
author = "osgav"
tags = ["Hugo", "mermaid", "diagrams"]
+++

**`created: 19/01/2019`**<br />
**`updated: 19/01/2019`**

##### *how do you get Mermaid diagrams on a Hugo blog*

---



##### 1

Under `themes/casper/layouts/` I created a `shortcodes` folder (I didn't have one already, you might) and added `mermaid.html`:

```
<script src="/js/mermaid_dist_8.0.0-rc.6.js"></script>
<div class="mermaid">
{{ .Inner }}
</div>
```

##### 2

Then under `themes/casper/static/js/` I added the `mermaid_dist_8.0.0-rc.6.js` file referenced in the snippet above ([Mermaid](https://mermaidjs.github.io/) JS itself came [from here](https://unpkg.com/mermaid@8.0.0-rc.6/dist/))

##### tada

I didn't figure any of this out I was inspired by [this](http://tjheeta.github.io/2016/01/31/moving-from-jekyll-to-hugo/) [excellent](http://tjheeta.github.io/2014/12/27/naive-basics-scaling-a-backend/) [person](https://github.com/tjheeta/tjheeta.github.io/blob/master/2014/12/27/naive-basics-scaling-a-backend/index.html) who had already described how they added Mermaid to their Hugo site.

Though I did have to fiddle around with a couple of aspects as I couldn't see tjheeta's source on github, only the public versions, they were:

- using `< mermaid >` rather than `% mermaid %` inside the `{{ }}` shortcode braces (`%` adds `<p>` where I didn't want any)
- adding semicolons to the ends of (certain) lines before mermaid diagram would render - this was unexpected based on my experience of not requiring semicolons when adding a Mermaid diagram in Grafana *(in fact, this relates to mermaid version, and semicolons are not required in the version on my blog)*

##### oops

Later, as I added more and more diagrams to my blog post, I eventually noticed the page was taking longer and longer to render with each new diagram. It then occurred to me with the snippet above I was inserting the script tag every time there was a diagram, causing the page to download the *(2.61MB!)* mermaid JS file multiple times.

To remedy this I split the shortcode up as follows:

##### from<br />
`themes/casper/layouts/shortcodes/mermaid.html` and<br />
`< mermaid >` for every diagram<br />

##### to<br />
`themes/casper/layouts/shortcodes/mermaid/source.html` and<br />
`< mermaid/source >` once at beginning of post<br /><br />
`themes/casper/layouts/shortcodes/mermaid/diagram.html` and<br />
`< mermaid/diagram >` for each diagram<br />


##### links

- https://gohugo.io/content-management/shortcodes
- https://gohugo.io/templates/shortcode-templates/