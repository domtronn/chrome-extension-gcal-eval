clean:
	rm -rf chrome firefox

build:
	./node_modules/.bin/webpack

.PHONY: firefox chrome

firefox:
	@ cp -rf dist firefox
	@ ./node_modules/.bin/web-ext build -s firefox -a firefox --overwrite-dest
	@ ./node_modules/.bin/web-ext sign -s firefox --api-key ${API_KEY} --api-secret ${API_SECRET}

chrome:
	@ cp -rf dist chrome
	@ cat dist/manifest.json | jq 'with_entries(select(.key!="applications"))' > chrome/manifest.json
	@ ./node_modules/.bin/web-ext build -s chrome -a chrome --overwrite-dest
