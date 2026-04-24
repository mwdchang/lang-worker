import { DefaultRubyVM } from "../node_modules/@ruby/wasm-wasi/dist/esm/browser.js";

// See https://www.npmjs.com/package/@ruby/wasm-wasi
const rubyCDN = 'https://cdn.jsdelivr.net/npm/@ruby/3.4-wasm-wasi@latest/dist/ruby.wasm'
const wasmUrl = new URL(rubyCDN, import.meta.url).href;
const resp = await fetch(wasmUrl);
const wasmBytes = await resp.arrayBuffer();
const module = await WebAssembly.compile(wasmBytes);
const { vm } = await DefaultRubyVM(module);

self.postMessage('initialized');

self.onmessage = async (event: any) => {
  const result = vm.eval(event.data);
  if (result != null) {
    self.postMessage(result.toString());
  } else {
    self.postMessage(null);
  }
}
export { }
