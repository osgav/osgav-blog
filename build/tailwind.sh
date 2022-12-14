#!/bin/bash
#
# 14 Dec 2022
# 
# Tailwind CSS compiler command 
# as per https://jpanther.github.io/congo/docs/advanced-customisation/#run-the-tailwind-compiler
#

tailwindcss -c themes/congo/tailwind.config.js -i themes/congo/assets/css/main.css -o assets/css/compiled/main.css --jit

