import { LangWorker } from "./main"

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
console.log('python result is ', pythonRes);

const rubyWorker = new LangWorker('ruby');
const rubyCode = `
def fib(n)
  a, b = 0, 1
  n.times { a, b = b, a + b }
  a
end

fib(10)
`
const rubyRes = await rubyWorker.runCode(rubyCode);
console.log('ruby result is ', rubyRes);
