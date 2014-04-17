build: components
	component build --dev

test: build
	mocha-phantomjs test/index.html

components: component.json
	component install --dev

.PHONY: test