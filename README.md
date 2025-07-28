## Lang-Worker
Simple experiment/scaffolding for running other programming languages (python, ruby) directly in the web browser in webworker threads.

```js
const pythonWorker = new LangWorker('python');
const pythonCode = `
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

fib(10)
`;
const pythonRes = await pythonWorker.runCode(pythonCode);
console.log('result is ', pythonRes);
```


### Building
```
npm run build
```


### Run example
Available on `http://localhost:5173`
```
npm run develop
```
