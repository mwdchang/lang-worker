class n {
  worker;
  /**
   * Language worker wrapper
  **/
  constructor(r) {
    this.worker = new Promise((o, s) => {
      let e = null;
      if (r === "python" ? e = new Worker(new URL(
        /* @vite-ignore */
        "" + new URL("assets/python-worker-_K4DXiwG.js", import.meta.url).href,
        import.meta.url
      ), {
        type: "module"
      }) : e = new Worker(new URL(
        /* @vite-ignore */
        "" + new URL("assets/ruby-worker-CqUQM0CJ.js", import.meta.url).href,
        import.meta.url
      ), {
        type: "module"
      }), !e)
        throw new Error(`Unable to create worker for ${r}`);
      e.onmessage = (t) => {
        t.data === "initialized" ? o(e) : (console.error("Failed to initialize worker"), s(null));
      };
    });
  }
  async runCode(r) {
    const o = await this.worker;
    return o.postMessage(r), new Promise((s, e) => {
      o.onmessage = (t) => {
        t.data && s(t.data), e(null);
      };
    });
  }
}
export {
  n as LangWorker
};
