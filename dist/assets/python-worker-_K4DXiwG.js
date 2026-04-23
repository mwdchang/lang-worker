var pe = Object.defineProperty, s = (e, t) => pe(e, "name", { value: t, configurable: !0 }), j = ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (t, i) => (typeof require < "u" ? require : t)[i] }) : e)(function(e) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + e + '" is not supported');
}), me = (() => {
  for (var e = new Uint8Array(128), t = 0; t < 64; t++) e[t < 26 ? t + 65 : t < 52 ? t + 71 : t < 62 ? t - 4 : t * 4 - 205] = t;
  return (i) => {
    for (var a = i.length, n = new Uint8Array((a - (i[a - 1] == "=") - (i[a - 2] == "=")) * 3 / 4 | 0), r = 0, o = 0; r < a; ) {
      var l = e[i.charCodeAt(r++)], c = e[i.charCodeAt(r++)], u = e[i.charCodeAt(r++)], d = e[i.charCodeAt(r++)];
      n[o++] = l << 2 | c >> 4, n[o++] = c << 4 | u >> 2, n[o++] = u << 6 | d;
    }
    return n;
  };
})();
function C(e) {
  return !isNaN(parseFloat(e)) && isFinite(e);
}
s(C, "_isNumber");
function g(e) {
  return e.charAt(0).toUpperCase() + e.substring(1);
}
s(g, "_capitalize");
function R(e) {
  return function() {
    return this[e];
  };
}
s(R, "_getter");
var S = ["isConstructor", "isEval", "isNative", "isToplevel"], A = ["columnNumber", "lineNumber"], F = ["fileName", "functionName", "source"], ye = ["args"], ge = ["evalOrigin"], P = S.concat(A, F, ye, ge);
function p(e) {
  if (e) for (var t = 0; t < P.length; t++) e[P[t]] !== void 0 && this["set" + g(P[t])](e[P[t]]);
}
s(p, "StackFrame");
p.prototype = { getArgs: s(function() {
  return this.args;
}, "getArgs"), setArgs: s(function(e) {
  if (Object.prototype.toString.call(e) !== "[object Array]") throw new TypeError("Args must be an Array");
  this.args = e;
}, "setArgs"), getEvalOrigin: s(function() {
  return this.evalOrigin;
}, "getEvalOrigin"), setEvalOrigin: s(function(e) {
  if (e instanceof p) this.evalOrigin = e;
  else if (e instanceof Object) this.evalOrigin = new p(e);
  else throw new TypeError("Eval Origin must be an Object or StackFrame");
}, "setEvalOrigin"), toString: s(function() {
  var e = this.getFileName() || "", t = this.getLineNumber() || "", i = this.getColumnNumber() || "", a = this.getFunctionName() || "";
  return this.getIsEval() ? e ? "[eval] (" + e + ":" + t + ":" + i + ")" : "[eval]:" + t + ":" + i : a ? a + " (" + e + ":" + t + ":" + i + ")" : e + ":" + t + ":" + i;
}, "toString") };
p.fromString = s(function(e) {
  var t = e.indexOf("("), i = e.lastIndexOf(")"), a = e.substring(0, t), n = e.substring(t + 1, i).split(","), r = e.substring(i + 1);
  if (r.indexOf("@") === 0) var o = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(r, ""), l = o[1], c = o[2], u = o[3];
  return new p({ functionName: a, args: n || void 0, fileName: l, lineNumber: c || void 0, columnNumber: u || void 0 });
}, "StackFrame$$fromString");
for (w = 0; w < S.length; w++) p.prototype["get" + g(S[w])] = R(S[w]), p.prototype["set" + g(S[w])] = /* @__PURE__ */ function(e) {
  return function(t) {
    this[e] = !!t;
  };
}(S[w]);
var w;
for (v = 0; v < A.length; v++) p.prototype["get" + g(A[v])] = R(A[v]), p.prototype["set" + g(A[v])] = /* @__PURE__ */ function(e) {
  return function(t) {
    if (!C(t)) throw new TypeError(e + " must be a Number");
    this[e] = Number(t);
  };
}(A[v]);
var v;
for (b = 0; b < F.length; b++) p.prototype["get" + g(F[b])] = R(F[b]), p.prototype["set" + g(F[b])] = /* @__PURE__ */ function(e) {
  return function(t) {
    this[e] = String(t);
  };
}(F[b]);
var b, L = p;
function M() {
  var e = /^\s*at .*(\S+:\d+|\(native\))/m, t = /^(eval@)?(\[native code])?$/;
  return { parse: s(function(i) {
    if (i.stack && i.stack.match(e)) return this.parseV8OrIE(i);
    if (i.stack) return this.parseFFOrSafari(i);
    throw new Error("Cannot parse given Error object");
  }, "ErrorStackParser$$parse"), extractLocation: s(function(i) {
    if (i.indexOf(":") === -1) return [i];
    var a = /(.+?)(?::(\d+))?(?::(\d+))?$/, n = a.exec(i.replace(/[()]/g, ""));
    return [n[1], n[2] || void 0, n[3] || void 0];
  }, "ErrorStackParser$$extractLocation"), parseV8OrIE: s(function(i) {
    var a = i.stack.split(`
`).filter(function(n) {
      return !!n.match(e);
    }, this);
    return a.map(function(n) {
      n.indexOf("(eval ") > -1 && (n = n.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(,.*$)/g, ""));
      var r = n.replace(/^\s+/, "").replace(/\(eval code/g, "(").replace(/^.*?\s+/, ""), o = r.match(/ (\(.+\)$)/);
      r = o ? r.replace(o[0], "") : r;
      var l = this.extractLocation(o ? o[1] : r), c = o && r || void 0, u = ["eval", "<anonymous>"].indexOf(l[0]) > -1 ? void 0 : l[0];
      return new L({ functionName: c, fileName: u, lineNumber: l[1], columnNumber: l[2], source: n });
    }, this);
  }, "ErrorStackParser$$parseV8OrIE"), parseFFOrSafari: s(function(i) {
    var a = i.stack.split(`
`).filter(function(n) {
      return !n.match(t);
    }, this);
    return a.map(function(n) {
      if (n.indexOf(" > eval") > -1 && (n = n.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1")), n.indexOf("@") === -1 && n.indexOf(":") === -1) return new L({ functionName: n });
      var r = /((.*".+"[^@]*)?[^@]*)(?:@)/, o = n.match(r), l = o && o[1] ? o[1] : void 0, c = this.extractLocation(n.replace(r, ""));
      return new L({ functionName: l, fileName: c[0], lineNumber: c[1], columnNumber: c[2], source: n });
    }, this);
  }, "ErrorStackParser$$parseFFOrSafari") };
}
s(M, "ErrorStackParser");
var he = new M(), we = he, y = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && !process.browser, W = y && typeof module < "u" && typeof module.exports < "u" && typeof j < "u" && typeof __dirname < "u", ve = y && !W, be = typeof Deno < "u", H = !y && !be, Ee = H && typeof window == "object" && typeof document == "object" && typeof document.createElement == "function" && "sessionStorage" in window && typeof importScripts != "function", Se = H && typeof importScripts == "function" && typeof self == "object";
typeof navigator == "object" && typeof navigator.userAgent == "string" && navigator.userAgent.indexOf("Chrome") == -1 && navigator.userAgent.indexOf("Safari") > -1;
var N = typeof read == "function" && typeof load == "function", z, I, V, U, D;
async function _() {
  if (!y || (z = (await import("./__vite-browser-external-CPvbk0mb.js")).default, U = await import("./__vite-browser-external-CPvbk0mb.js"), D = await import("./__vite-browser-external-CPvbk0mb.js"), V = (await import("./__vite-browser-external-CPvbk0mb.js")).default, I = await import("./__vite-browser-external-CPvbk0mb.js"), T = I.sep, typeof j < "u")) return;
  let e = U, t = await import("./__vite-browser-external-CPvbk0mb.js"), i = await import("./__vite-browser-external-CPvbk0mb.js"), a = await import("./__vite-browser-external-CPvbk0mb.js"), n = { fs: e, crypto: t, ws: i, child_process: a };
  globalThis.require = function(r) {
    return n[r];
  };
}
s(_, "initNodeModules");
function B(e, t) {
  return I.resolve(t || ".", e);
}
s(B, "node_resolvePath");
function q(e, t) {
  return t === void 0 && (t = location), new URL(e, t).toString();
}
s(q, "browser_resolvePath");
var x;
y ? x = B : N ? x = s((e) => e, "resolvePath") : x = q;
var T;
y || (T = "/");
function G(e, t) {
  return e.startsWith("file://") && (e = e.slice(7)), e.includes("://") ? { response: fetch(e) } : { binary: D.readFile(e).then((i) => new Uint8Array(i.buffer, i.byteOffset, i.byteLength)) };
}
s(G, "node_getBinaryResponse");
function Y(e, t) {
  if (e.startsWith("file://") && (e = e.slice(7)), e.includes("://")) throw new Error("Shell cannot fetch urls");
  return { binary: Promise.resolve(new Uint8Array(readbuffer(e))) };
}
s(Y, "shell_getBinaryResponse");
function Z(e, t) {
  let i = new URL(e, location);
  return { response: fetch(i, t ? { integrity: t } : {}) };
}
s(Z, "browser_getBinaryResponse");
var O;
y ? O = G : N ? O = Y : O = Z;
async function J(e, t) {
  let { response: i, binary: a } = O(e, t);
  if (a) return a;
  let n = await i;
  if (!n.ok) throw new Error(`Failed to load '${e}': request failed.`);
  return new Uint8Array(await n.arrayBuffer());
}
s(J, "loadBinaryFile");
var k;
if (Ee) k = s(async (e) => await import(e), "loadScript");
else if (Se) k = s(async (e) => {
  try {
    globalThis.importScripts(e);
  } catch (t) {
    if (t instanceof TypeError) await import(e);
    else throw t;
  }
}, "loadScript");
else if (y) k = K;
else if (N) k = load;
else throw new Error("Cannot determine runtime environment");
async function K(e) {
  e.startsWith("file://") && (e = e.slice(7)), e.includes("://") ? V.runInThisContext(await (await fetch(e)).text()) : await import(z.pathToFileURL(e).href);
}
s(K, "nodeLoadScript");
async function X(e) {
  if (y) {
    await _();
    let t = await D.readFile(e, { encoding: "utf8" });
    return JSON.parse(t);
  } else if (N) {
    let t = read(e);
    return JSON.parse(t);
  } else return await (await fetch(e)).json();
}
s(X, "loadLockFile");
async function Q() {
  if (W) return __dirname;
  let e;
  try {
    throw new Error();
  } catch (a) {
    e = a;
  }
  let t = we.parse(e)[0].fileName;
  if (y && !t.startsWith("file://") && (t = `file://${t}`), ve) {
    let a = await import("./__vite-browser-external-CPvbk0mb.js");
    return (await import("./__vite-browser-external-CPvbk0mb.js")).fileURLToPath(a.dirname(t));
  }
  let i = t.lastIndexOf(T);
  if (i === -1) throw new Error("Could not extract indexURL path from pyodide module location");
  return t.slice(0, i);
}
s(Q, "calculateDirname");
function ee(e) {
  let t = e.FS, i = e.FS.filesystems.MEMFS, a = e.PATH, n = { DIR_MODE: 16895, FILE_MODE: 33279, mount: s(function(r) {
    if (!r.opts.fileSystemHandle) throw new Error("opts.fileSystemHandle is required");
    return i.mount.apply(null, arguments);
  }, "mount"), syncfs: s(async (r, o, l) => {
    try {
      let c = n.getLocalSet(r), u = await n.getRemoteSet(r), d = o ? u : c, m = o ? c : u;
      await n.reconcile(r, d, m), l(null);
    } catch (c) {
      l(c);
    }
  }, "syncfs"), getLocalSet: s((r) => {
    let o = /* @__PURE__ */ Object.create(null);
    function l(d) {
      return d !== "." && d !== "..";
    }
    s(l, "isRealDir");
    function c(d) {
      return (m) => a.join2(d, m);
    }
    s(c, "toAbsolute");
    let u = t.readdir(r.mountpoint).filter(l).map(c(r.mountpoint));
    for (; u.length; ) {
      let d = u.pop(), m = t.stat(d);
      t.isDir(m.mode) && u.push.apply(u, t.readdir(d).filter(l).map(c(d))), o[d] = { timestamp: m.mtime, mode: m.mode };
    }
    return { type: "local", entries: o };
  }, "getLocalSet"), getRemoteSet: s(async (r) => {
    let o = /* @__PURE__ */ Object.create(null), l = await Ae(r.opts.fileSystemHandle);
    for (let [c, u] of l) c !== "." && (o[a.join2(r.mountpoint, c)] = { timestamp: u.kind === "file" ? new Date((await u.getFile()).lastModified) : /* @__PURE__ */ new Date(), mode: u.kind === "file" ? n.FILE_MODE : n.DIR_MODE });
    return { type: "remote", entries: o, handles: l };
  }, "getRemoteSet"), loadLocalEntry: s((r) => {
    let o = t.lookupPath(r).node, l = t.stat(r);
    if (t.isDir(l.mode)) return { timestamp: l.mtime, mode: l.mode };
    if (t.isFile(l.mode)) return o.contents = i.getFileDataAsTypedArray(o), { timestamp: l.mtime, mode: l.mode, contents: o.contents };
    throw new Error("node type not supported");
  }, "loadLocalEntry"), storeLocalEntry: s((r, o) => {
    if (t.isDir(o.mode)) t.mkdirTree(r, o.mode);
    else if (t.isFile(o.mode)) t.writeFile(r, o.contents, { canOwn: !0 });
    else throw new Error("node type not supported");
    t.chmod(r, o.mode), t.utime(r, o.timestamp, o.timestamp);
  }, "storeLocalEntry"), removeLocalEntry: s((r) => {
    var o = t.stat(r);
    t.isDir(o.mode) ? t.rmdir(r) : t.isFile(o.mode) && t.unlink(r);
  }, "removeLocalEntry"), loadRemoteEntry: s(async (r) => {
    if (r.kind === "file") {
      let o = await r.getFile();
      return { contents: new Uint8Array(await o.arrayBuffer()), mode: n.FILE_MODE, timestamp: new Date(o.lastModified) };
    } else {
      if (r.kind === "directory") return { mode: n.DIR_MODE, timestamp: /* @__PURE__ */ new Date() };
      throw new Error("unknown kind: " + r.kind);
    }
  }, "loadRemoteEntry"), storeRemoteEntry: s(async (r, o, l) => {
    let c = r.get(a.dirname(o)), u = t.isFile(l.mode) ? await c.getFileHandle(a.basename(o), { create: !0 }) : await c.getDirectoryHandle(a.basename(o), { create: !0 });
    if (u.kind === "file") {
      let d = await u.createWritable();
      await d.write(l.contents), await d.close();
    }
    r.set(o, u);
  }, "storeRemoteEntry"), removeRemoteEntry: s(async (r, o) => {
    await r.get(a.dirname(o)).removeEntry(a.basename(o)), r.delete(o);
  }, "removeRemoteEntry"), reconcile: s(async (r, o, l) => {
    let c = 0, u = [];
    Object.keys(o.entries).forEach(function(f) {
      let h = o.entries[f], E = l.entries[f];
      (!E || t.isFile(h.mode) && h.timestamp.getTime() > E.timestamp.getTime()) && (u.push(f), c++);
    }), u.sort();
    let d = [];
    if (Object.keys(l.entries).forEach(function(f) {
      o.entries[f] || (d.push(f), c++);
    }), d.sort().reverse(), !c) return;
    let m = o.type === "remote" ? o.handles : l.handles;
    for (let f of u) {
      let h = a.normalize(f.replace(r.mountpoint, "/")).substring(1);
      if (l.type === "local") {
        let E = m.get(h), fe = await n.loadRemoteEntry(E);
        n.storeLocalEntry(f, fe);
      } else {
        let E = n.loadLocalEntry(f);
        await n.storeRemoteEntry(m, h, E);
      }
    }
    for (let f of d) if (l.type === "local") n.removeLocalEntry(f);
    else {
      let h = a.normalize(f.replace(r.mountpoint, "/")).substring(1);
      await n.removeRemoteEntry(m, h);
    }
  }, "reconcile") };
  e.FS.filesystems.NATIVEFS_ASYNC = n;
}
s(ee, "initializeNativeFS");
var Ae = s(async (e) => {
  let t = [];
  async function i(n) {
    for await (let r of n.values()) t.push(r), r.kind === "directory" && await i(r);
  }
  s(i, "collect"), await i(e);
  let a = /* @__PURE__ */ new Map();
  a.set(".", e);
  for (let n of t) {
    let r = (await e.resolve(n)).join("/");
    a.set(r, n);
  }
  return a;
}, "getFsHandles");
me("AGFzbQEAAAABDANfAGAAAW9gAW8BfwMDAgECByECD2NyZWF0ZV9zZW50aW5lbAAAC2lzX3NlbnRpbmVsAAEKEwIHAPsBAPsbCwkAIAD7GvsUAAs=");
var Fe = async function() {
  globalThis.navigator && (/iPad|iPhone|iPod/.test(navigator.userAgent) || navigator.platform === "MacIntel" && typeof navigator.maxTouchPoints < "u" && navigator.maxTouchPoints > 1);
}();
async function te() {
  let e = await Fe;
  if (e) return e.exports;
  let t = Symbol("error marker");
  return { create_sentinel: s(() => t, "create_sentinel"), is_sentinel: s((i) => i === t, "is_sentinel") };
}
s(te, "getSentinelImport");
function re(e) {
  let t = { noImageDecoding: !0, noAudioDecoding: !0, noWasmDecoding: !1, preRun: le(e), print: e.stdout, printErr: e.stderr, onExit(i) {
    t.exitCode = i;
  }, thisProgram: e._sysExecutable, arguments: e.args, API: { config: e }, locateFile: s((i) => e.indexURL + i, "locateFile"), instantiateWasm: ce(e.indexURL) };
  return t;
}
s(re, "createSettings");
function ie(e) {
  return function(t) {
    let i = "/";
    try {
      t.FS.mkdirTree(e);
    } catch (a) {
      console.error(`Error occurred while making a home directory '${e}':`), console.error(a), console.error(`Using '${i}' for a home directory instead`), e = i;
    }
    t.FS.chdir(e);
  };
}
s(ie, "createHomeDirectory");
function ne(e) {
  return function(t) {
    Object.assign(t.ENV, e);
  };
}
s(ne, "setEnvironment");
function oe(e) {
  return e ? [async (t) => {
    t.addRunDependency("fsInitHook");
    try {
      await e(t.FS, { sitePackages: t.API.sitePackages });
    } finally {
      t.removeRunDependency("fsInitHook");
    }
  }] : [];
}
s(oe, "callFsInitHook");
function ae(e) {
  let t = e.HEAPU32[e._Py_Version >>> 2], i = t >>> 24 & 255, a = t >>> 16 & 255, n = t >>> 8 & 255;
  return [i, a, n];
}
s(ae, "computeVersionTuple");
function se(e) {
  let t = J(e);
  return async (i) => {
    i.API.pyVersionTuple = ae(i);
    let [a, n] = i.API.pyVersionTuple;
    i.FS.mkdirTree("/lib"), i.API.sitePackages = `/lib/python${a}.${n}/site-packages`, i.FS.mkdirTree(i.API.sitePackages), i.addRunDependency("install-stdlib");
    try {
      let r = await t;
      i.FS.writeFile(`/lib/python${a}${n}.zip`, r);
    } catch (r) {
      console.error("Error occurred while installing the standard library:"), console.error(r);
    } finally {
      i.removeRunDependency("install-stdlib");
    }
  };
}
s(se, "installStdlib");
function le(e) {
  let t;
  return e.stdLibURL != null ? t = e.stdLibURL : t = e.indexURL + "python_stdlib.zip", [se(t), ie(e.env.HOME), ne(e.env), ee, ...oe(e.fsInit)];
}
s(le, "getFileSystemInitializationFuncs");
function ce(e) {
  if (typeof WasmOffsetConverter < "u") return;
  let { binary: t, response: i } = O(e + "pyodide.asm.wasm"), a = te();
  return function(n, r) {
    return async function() {
      n.sentinel = await a;
      try {
        let o;
        i ? o = await WebAssembly.instantiateStreaming(i, n) : o = await WebAssembly.instantiate(await t, n);
        let { instance: l, module: c } = o;
        r(l, c);
      } catch (o) {
        console.warn("wasm instantiation failed!"), console.warn(o);
      }
    }(), {};
  };
}
s(ce, "getInstantiateWasmFunc");
var $ = "0.28.0";
async function ue(e = {}) {
  await _();
  let t = e.indexURL || await Q();
  t = x(t), t.endsWith("/") || (t += "/"), e.indexURL = t;
  let i = { fullStdLib: !1, jsglobals: globalThis, stdin: globalThis.prompt ? globalThis.prompt : void 0, lockFileURL: t + "pyodide-lock.json", args: [], env: {}, packages: [], enableRunUntilComplete: !0, checkAPIVersion: !0, BUILD_ID: "aca77914b08e1d99774d24f0b7c9b8f9068e2c62cf4696d7e95d8c3b72139f2d" }, a = Object.assign(i, e);
  a.env.HOME ??= "/home/pyodide", a.env.PYTHONINSPECT ??= "1";
  let n = re(a), r = n.API;
  if (r.lockFilePromise = X(a.lockFileURL), typeof _createPyodideModule != "function") {
    let d = `${a.indexURL}pyodide.asm.js`;
    await k(d);
  }
  let o;
  if (e._loadSnapshot) {
    let d = await e._loadSnapshot;
    ArrayBuffer.isView(d) ? o = d : o = new Uint8Array(d), n.noInitialRun = !0, n.INITIAL_MEMORY = o.length;
  }
  let l = await _createPyodideModule(n);
  if (n.exitCode !== void 0) throw new l.ExitStatus(n.exitCode);
  if (e.pyproxyToStringRepr && r.setPyProxyToStringMethod(!0), e.convertNullToNone && r.setCompatNullToNone(!0), r.version !== $ && a.checkAPIVersion) throw new Error(`Pyodide version does not match: '${$}' <==> '${r.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);
  l.locateFile = (d) => {
    throw d.endsWith(".so") ? new Error(`Failed to find dynamic library "${d}"`) : new Error(`Unexpected call to locateFile("${d}")`);
  };
  let c;
  o && (c = r.restoreSnapshot(o));
  let u = r.finalizeBootstrap(c, e._snapshotDeserializer);
  return r.sys.path.insert(0, ""), u.version.includes("dev") || r.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${u.version}/full/`), r._pyodide.set_excepthook(), await r.packageIndexReady, r.initializeStreams(a.stdin, a.stdout, a.stderr), u;
}
s(ue, "loadPyodide");
const de = await ue({
  indexURL: "https://cdn.jsdelivr.net/pyodide/v0.28.0/full"
});
await de.loadPackage(["sympy", "numpy", "pandas"]);
self.postMessage("initialized");
self.onmessage = async (e) => {
  const t = de.runPython(e.data);
  t != null ? self.postMessage(t.toString()) : self.postMessage(null);
};
