class n {
  worker;
  /**
   * Language worker wrapper
  **/
  constructor(r) {
    this.worker = new Promise((o, t) => {
      let e = null;
      if (r === "python" ? e = new Worker(new URL(
        /* @vite-ignore */
        "/assets/python-worker-_K4DXiwG.js",
        import.meta.url
      ), {
        type: "module"
      }) : e = new Worker(new URL(
        /* @vite-ignore */
        "/assets/ruby-worker-CqUQM0CJ.js",
        import.meta.url
      ), {
        type: "module"
      }), !e)
        throw new Error(`Unable to create worker for ${r}`);
      e.onmessage = (s) => {
        s.data === "initialized" ? o(e) : (console.error("Failed to initialize worker"), t(null));
      };
    });
  }
  async runCode(r) {
    const o = await this.worker;
    return o.postMessage(r), new Promise((t, e) => {
      o.onmessage = (s) => {
        s.data && t(s.data), e(null);
      };
    });
  }
}
export {
  n as LangWorker
};
