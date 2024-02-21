#!/bin/bash
#
# osgav.run blog post-build steps
#

# remove unwanted page/post index pages
#
rm -rf public/page/ # paginated homepage recent feed

rm public/portfolio/index.xml
rm -rf public/portfolio/page/

rm public/lab.html
rm -rf public/lab/page/

rm public/whois.html
rm public/whois/index.xml
rm -rf public/whois/page/

rm public/now/index.xml
rm -rf public/now/page/

rm public/tags/index.xml

rm public/categories.html
rm -rf public/categories/

# remove git-submodule-related files
#
rm public/files/gis/*/.git*
rm public/files/gis/.git*

