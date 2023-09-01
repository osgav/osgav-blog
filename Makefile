run:
	./exec/hugo server --buildDrafts

css:
	tailwindcss -c tailwind.config.js -i themes/congo/assets/css/main.css -o assets/css/compiled/main.css --jit
	# as per https://jpanther.github.io/congo/docs/advanced-customisation/#run-the-tailwind-compiler

themecss:
	tailwindcss -c themes/congo/tailwind.config.js -i themes/congo/assets/css/main.css -o assets/css/compiled/main.css --jit

ci:
	circleci config validate


