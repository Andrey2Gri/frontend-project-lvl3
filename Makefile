develop:
	npx webpack serve

install:
	npm ci

build:
	rm -rf dist
	NODE_ENV=production npx webpack --watch

test:
	npm test

lint:
	npx eslint .

.PHONY: test
