import { loadPyodide } from 'pyodide';

// See https://github.com/pyodide/pyodide/releases
const pyodide = await loadPyodide({
  indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.28.0/full'
});
await pyodide.loadPackage(['sympy', 'numpy', 'pandas']);
self.postMessage('initialized');

self.onmessage = async (event: any) => {
  const result = pyodide.runPython(event.data);
  if (result != null) {
    self.postMessage(result.toString());
  } else {
    self.postMessage(null);
  }
}
export { }

// Pyodide is now ready to use...
// console.log(pyodide.runPython(`
//   import sys
//   sys.version
// `));

