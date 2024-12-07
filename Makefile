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
	wasm-pack build --release --target=nodejs --features=cjk

publish:
	wasm-pack publish --access=public --target=nodejs

serve:
	python3 -m http.server

tag:
	git tag v$(VERSION)
	git push origin v$(VERSION)
