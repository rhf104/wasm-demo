SOURCES=test.c
JS=library.js
OUT=test.wasm

all: $(OUT)

$(OUT): $(SOURCES)
	emcc -Os \
	 -s SIDE_MODULE=1 \
	 -s "EXPORTED_FUNCTIONS=['_hello']" \
	 -o $@ $<
#	emcc -Os --js-library $(JS) -o $@ $<

clean:
	rm $(OUT)

