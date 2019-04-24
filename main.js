window.onload = async function() {
  const {instance} = await WebAssembly.instantiateStreaming(fetch('test.wasm'),
      {
        env: {
          __memory_base: 0,
          __table_base: 0,
          memory: new WebAssembly.Memory({initial: 256}),
          table: new WebAssembly.Table({initial: 0, element: 'anyfunc'}),
          _alert: function(msg) {
            alert(msg);
          },
        },
      },
  );
  let result = instance.exports._hello();
  console.log(result);
};
