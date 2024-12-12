.DEFAULT_GOAL := build

VERSION := $(shell cargo metadata --no-deps --format-version=1 | jq -r '.packages[] | select(.name=="lindera-wasm") | .version')

clean:
	cargo clean
	rm -rf pkg

format:
	cargo fmt

lint:
	cargo clippy --features=cjk

test:
	wasm-pack test --node

build:
	wasm-pack build --release --features=cjk --target=bundler

publish:
	wasm-pack publish --access=public --target=bundler

tag_example:
	jq '.version = "$(VERSION)"' ./example/package.json > ./example/temp.json && mv ./example/temp.json ./example/package.json

build_example: tag_example
	cd example && npm install && npm run build && cp index.html dist/index.html

run_example:
	cd example && npm run start

tag:
	git tag v$(VERSION)
	git push origin v$(VERSION)
