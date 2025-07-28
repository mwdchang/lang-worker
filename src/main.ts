export class LangWorker {
  worker: Promise<Worker>;

  constructor(type: string) {
    this.worker = new Promise((resolve, reject) => {

      let w = null;
      if (type === 'python') {
        w = new Worker(new URL('./python-worker.ts', import.meta.url), {
          type: 'module'
        })
      } else {
        w = new Worker(new URL('./ruby-worker.ts', import.meta.url), {
          type: 'module'
        })
      }

      if (!w) {
        throw new Error(`Unable to create worker for ${type}`);
      }

      w.onmessage = (event: MessageEvent) => {
        if (event.data === 'initialized') {
          resolve(w);
        } else {
          console.error('Failed to initialize worker');
          reject(null);
        }
      }
    });
  }

  async runCode(code: string) {
    const w = await this.worker;
    w.postMessage(code);

    return new Promise<string>((resolve, reject) => {
      w.onmessage = (event: MessageEvent) => {
        if (event.data) {
          resolve(event.data);
        }
        reject(null);
      };
    });
  }

}
