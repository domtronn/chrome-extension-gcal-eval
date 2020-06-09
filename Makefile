clean:
	rm -rf chrome firefox

build:
	./node_modules/.bin/webpack

firefox:
	@ cp -rf dist firefox
	@ ./node_modules/.bin/web-ext build -s firefox -a firefox

chrome:
	@ cp -rf dist chrome
	@ cat dist/manifest.json | jq 'with_entries(select(.key!="applications"))' > chrome/manifest.json
	@ ./node_modules/.bin/web-ext build -s chrome -a chrome
