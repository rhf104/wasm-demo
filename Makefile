SOURCES=test.c
OUT=test.wasm

all: $(OUT)

# Side module with s-level optimization helps
# remove unnecessary code
# memory options cause end of stack to bleed into heap,
# but I'm not using that space anyways and need to do my own
# bounds checking
$(OUT): $(SOURCES)
	emcc -Os \
	 -s SIDE_MODULE=1 \
	 -s TOTAL_STACK=64KB \
	 -s TOTAL_MEMORY=64KB \
	 -s "EXPORTED_FUNCTIONS=['_argsByVal', '_editStr', '__malloc', \
	 '_fib', '_alertTest', '_staticCount', '_stackAdd']" \
	 -o $@ $<

clean:
	rm $(OUT)

