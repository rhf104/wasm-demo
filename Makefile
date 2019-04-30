SOURCES=test.c
OUT=test.wasm

all: $(OUT)

$(OUT): $(SOURCES)
	emcc -Os \
	 -s SIDE_MODULE=1 \
	 -s TOTAL_STACK=64KB \
	 -s TOTAL_MEMORY=128KB \
	 -s "EXPORTED_FUNCTIONS=['_argsByVal', '_editStr', '__malloc', \
	 '_fib', '_alertTest']" \
	 -o $@ $<

clean:
	rm $(OUT)

