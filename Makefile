clean:
	rm -rf chrome firefox

build:
	./node_modules/.bin/webpack

firefox:
	@ cp -rf dist firefox

chrome:
	@ cp -rf dist chrome
	@ cat dist/manifest.json | jq 'with_entries(select(.key!="applications"))' > chrome/manifest.json
