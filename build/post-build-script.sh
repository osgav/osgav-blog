#!/bin/bash
#
# osgav.run blog post-build steps
#

# version the main CSS file to avoid caching-related issues
#
hash=`md5sum public/css/screen.css | cut -f1 -d" " | cut -c-12`
versioned_css="screen-${hash}.css"
cp public/css/screen.css public/css/$versioned_css
find public -name "*.html" -exec sed -i "s/screen.css/$versioned_css/g" {} \;

# remove icon examples page
#
rm public/fonts/example.html

# remove unwanted page/post index pages
#
rm public/post.html
rm -rf public/post/page/

rm public/lab.html
rm -rf public/lab/page/

rm public/news.html
rm -rf public/news/page/

rm public/whois.html
rm -rf public/whois/page/
