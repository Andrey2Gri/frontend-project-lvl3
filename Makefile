develop:
	npx webpack serve --mode development --liveReload --open

install:
	npm ci

build:
	rm -rf dist
	NODE_ENV=production npx webpack

lint:
	npx eslint .

.PHONY: test
