install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js

help:
	node bin/gendiff.js -h

lint:
	npx eslint .

test:
	npx jest --watch

test-coverage:
	npx jest --coverage --coverageProvider=v8