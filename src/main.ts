import PythonWorker from './python-worker?worker&inline';
import RubyWorker from './ruby-worker?worker&inline';

type LANGUAGE = 'python' | 'ruby';

export class LangWorker {
  worker: Promise<Worker>;

  /**
   * Language worker wrapper
  **/
  constructor(type: LANGUAGE) {
    this.worker = new Promise((resolve, reject) => {

      let w: Worker | null = null;
      if (type === 'python') {
        w = new PythonWorker();
      } else {
        w = new RubyWorker();
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
