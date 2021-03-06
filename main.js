const memory = new WebAssembly.Memory({initial: 1});
window.onload = async function() {
  const mem = new Uint8Array(memory.buffer);
  const {module, instance} = await WebAssembly.instantiateStreaming(
      fetch('test.wasm'),
      {
        env: {
          __memory_base: 0,
          __table_base: 0,
          memory: memory,
          table: new WebAssembly.Table({initial: 0, element: 'anyfunc'}),
          _alert: function(str) {
            alert(fromCStr(str));
          },
          _debugger: function() {
            debugger;
          }
        },
      },
  );

  const strcpy = function(dst, src) {
    for (let i = 0; i < src.length; i++) {
      mem[dst + i] = src[i].charCodeAt(0);
    }
    mem[dst + src.length] = 0;
  };

  const fromCStr = function(src) {
    const ret = [];
    for (let i = 0; mem[src + i] !== 0; i++) {
      ret.push(String.fromCharCode(mem[src + i]));
    }
    return ret.join('');
  };

  const {
    __post_instantiate,
    _argsByVal,
    _fib,
    __malloc,
    _editStr,
    _alertTest,
    _staticCount,
    _stackAdd
  } = instance.exports;
  __post_instantiate();

  // stack tests
  const val = _argsByVal(1, 2);
  console.log(val);

  console.log(_fib(7));

  // heap test
  const msg = 'hello, world';
  const msgP = __malloc(msg.length + 1);
  strcpy(msgP, msg);
  const retP = _editStr(msgP);
  const ret = fromCStr(retP);
  console.log(ret);

  // static test
  _staticCount();

  // stack test
  const sAdd = _stackAdd();
  console.log(sAdd);

  // js function call
  _alertTest(msgP);
};
