run:
	./exec/hugo server --buildDrafts

css:
	tailwindcss -c themes/congo/tailwind.config.js -i themes/congo/assets/css/main.css -o assets/css/compiled/main.css --jit
	# as per https://jpanther.github.io/congo/docs/advanced-customisation/#run-the-tailwind-compiler

ci:
	circleci config validate


