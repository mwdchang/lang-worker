class A {
  static read_bytes(e, r) {
    const s = new A();
    return s.buf = e.getUint32(r, !0), s.buf_len = e.getUint32(r + 4, !0), s;
  }
  static read_bytes_array(e, r, s) {
    const o = [];
    for (let t = 0; t < s; t++)
      o.push(A.read_bytes(e, r + 8 * t));
    return o;
  }
}
class F {
  static read_bytes(e, r) {
    const s = new F();
    return s.buf = e.getUint32(r, !0), s.buf_len = e.getUint32(r + 4, !0), s;
  }
  static read_bytes_array(e, r, s) {
    const o = [];
    for (let t = 0; t < s; t++)
      o.push(F.read_bytes(e, r + 8 * t));
    return o;
  }
}
const he = 0, _e = 1, Q = 2, E = 3, V = 4;
class M {
  head_length() {
    return 24;
  }
  name_length() {
    return this.dir_name.byteLength;
  }
  write_head_bytes(e, r) {
    e.setBigUint64(r, this.d_next, !0), e.setBigUint64(r + 8, this.d_ino, !0), e.setUint32(r + 16, this.dir_name.length, !0), e.setUint8(r + 20, this.d_type);
  }
  write_name_bytes(e, r, s) {
    e.set(this.dir_name.slice(0, Math.min(this.dir_name.byteLength, s)), r);
  }
  constructor(e, r, s) {
    this.d_ino = 0n;
    const o = new TextEncoder().encode(r);
    this.d_next = e, this.d_namlen = o.byteLength, this.d_type = s, this.dir_name = o;
  }
}
const be = 1;
class Z {
  write_bytes(e, r) {
    e.setUint8(r, this.fs_filetype), e.setUint16(r + 2, this.fs_flags, !0), e.setBigUint64(r + 8, this.fs_rights_base, !0), e.setBigUint64(r + 16, this.fs_rights_inherited, !0);
  }
  constructor(e, r) {
    this.fs_rights_base = 0n, this.fs_rights_inherited = 0n, this.fs_filetype = e, this.fs_flags = r;
  }
}
const J = 1, j = 2, q = 4, K = 8;
class ee {
  write_bytes(e, r) {
    e.setBigUint64(r, this.dev, !0), e.setBigUint64(r + 8, this.ino, !0), e.setUint8(r + 16, this.filetype), e.setBigUint64(r + 24, this.nlink, !0), e.setBigUint64(r + 32, this.size, !0), e.setBigUint64(r + 38, this.atim, !0), e.setBigUint64(r + 46, this.mtim, !0), e.setBigUint64(r + 52, this.ctim, !0);
  }
  constructor(e, r) {
    this.dev = 0n, this.ino = 0n, this.nlink = 0n, this.atim = 0n, this.mtim = 0n, this.ctim = 0n, this.filetype = e, this.size = r;
  }
}
const pe = 0;
class ge {
  write_bytes(e, r) {
    e.setUint32(r, this.pr_name.byteLength, !0);
  }
  constructor(e) {
    this.pr_name = new TextEncoder().encode(e);
  }
}
class G {
  static dir(e) {
    const r = new G();
    return r.tag = pe, r.inner = new ge(e), r;
  }
  write_bytes(e, r) {
    e.setUint32(r, this.tag, !0), this.inner.write_bytes(e, r + 4);
  }
}
let we = class {
  enable(e) {
    this.log = ye(e === void 0 ? !0 : e, this.prefix);
  }
  get enabled() {
    return this.isEnabled;
  }
  constructor(e) {
    this.isEnabled = e, this.prefix = "wasi:", this.enable(e);
  }
};
function ye(c, e) {
  return c ? console.log.bind(console, "%c%s", "color: #265BA0", e) : () => {
  };
}
const y = new we(!1);
class $ extends Error {
  constructor(e) {
    super("exit with exit code " + e), this.code = e;
  }
}
let Re = class {
  start(e) {
    this.inst = e;
    try {
      return e.exports._start(), 0;
    } catch (r) {
      if (r instanceof $)
        return r.code;
      throw r;
    }
  }
  initialize(e) {
    this.inst = e, e.exports._initialize && e.exports._initialize();
  }
  constructor(e, r, s, o = {}) {
    this.args = [], this.env = [], this.fds = [], y.enable(o.debug), this.args = e, this.env = r, this.fds = s;
    const t = this;
    this.wasiImport = { args_sizes_get(n, i) {
      const a = new DataView(t.inst.exports.memory.buffer);
      a.setUint32(n, t.args.length, !0);
      let l = 0;
      for (const u of t.args)
        l += u.length + 1;
      return a.setUint32(i, l, !0), y.log(a.getUint32(n, !0), a.getUint32(i, !0)), 0;
    }, args_get(n, i) {
      const a = new DataView(t.inst.exports.memory.buffer), l = new Uint8Array(t.inst.exports.memory.buffer), u = i;
      for (let f = 0; f < t.args.length; f++) {
        a.setUint32(n, i, !0), n += 4;
        const d = new TextEncoder().encode(t.args[f]);
        l.set(d, i), a.setUint8(i + d.length, 0), i += d.length + 1;
      }
      return y.enabled && y.log(new TextDecoder("utf-8").decode(l.slice(u, i))), 0;
    }, environ_sizes_get(n, i) {
      const a = new DataView(t.inst.exports.memory.buffer);
      a.setUint32(n, t.env.length, !0);
      let l = 0;
      for (const u of t.env)
        l += u.length + 1;
      return a.setUint32(i, l, !0), y.log(a.getUint32(n, !0), a.getUint32(i, !0)), 0;
    }, environ_get(n, i) {
      const a = new DataView(t.inst.exports.memory.buffer), l = new Uint8Array(t.inst.exports.memory.buffer), u = i;
      for (let f = 0; f < t.env.length; f++) {
        a.setUint32(n, i, !0), n += 4;
        const d = new TextEncoder().encode(t.env[f]);
        l.set(d, i), a.setUint8(i + d.length, 0), i += d.length + 1;
      }
      return y.enabled && y.log(new TextDecoder("utf-8").decode(l.slice(u, i))), 0;
    }, clock_res_get(n, i) {
      let a;
      switch (n) {
        case 1: {
          a = 5000n;
          break;
        }
        case 0: {
          a = 1000000n;
          break;
        }
        default:
          return 52;
      }
      return new DataView(t.inst.exports.memory.buffer).setBigUint64(i, a, !0), 0;
    }, clock_time_get(n, i, a) {
      const l = new DataView(t.inst.exports.memory.buffer);
      if (n === 0)
        l.setBigUint64(a, BigInt((/* @__PURE__ */ new Date()).getTime()) * 1000000n, !0);
      else if (n == 1) {
        let u;
        try {
          u = BigInt(Math.round(performance.now() * 1e6));
        } catch {
          u = 0n;
        }
        l.setBigUint64(a, u, !0);
      } else
        l.setBigUint64(a, 0n, !0);
      return 0;
    }, fd_advise(n, i, a, l) {
      return t.fds[n] != null ? 0 : 8;
    }, fd_allocate(n, i, a) {
      return t.fds[n] != null ? t.fds[n].fd_allocate(i, a) : 8;
    }, fd_close(n) {
      if (t.fds[n] != null) {
        const i = t.fds[n].fd_close();
        return t.fds[n] = void 0, i;
      } else
        return 8;
    }, fd_datasync(n) {
      return t.fds[n] != null ? t.fds[n].fd_sync() : 8;
    }, fd_fdstat_get(n, i) {
      if (t.fds[n] != null) {
        const { ret: a, fdstat: l } = t.fds[n].fd_fdstat_get();
        return l?.write_bytes(new DataView(t.inst.exports.memory.buffer), i), a;
      } else
        return 8;
    }, fd_fdstat_set_flags(n, i) {
      return t.fds[n] != null ? t.fds[n].fd_fdstat_set_flags(i) : 8;
    }, fd_fdstat_set_rights(n, i, a) {
      return t.fds[n] != null ? t.fds[n].fd_fdstat_set_rights(i, a) : 8;
    }, fd_filestat_get(n, i) {
      if (t.fds[n] != null) {
        const { ret: a, filestat: l } = t.fds[n].fd_filestat_get();
        return l?.write_bytes(new DataView(t.inst.exports.memory.buffer), i), a;
      } else
        return 8;
    }, fd_filestat_set_size(n, i) {
      return t.fds[n] != null ? t.fds[n].fd_filestat_set_size(i) : 8;
    }, fd_filestat_set_times(n, i, a, l) {
      return t.fds[n] != null ? t.fds[n].fd_filestat_set_times(i, a, l) : 8;
    }, fd_pread(n, i, a, l, u) {
      const f = new DataView(t.inst.exports.memory.buffer), d = new Uint8Array(t.inst.exports.memory.buffer);
      if (t.fds[n] != null) {
        const h = A.read_bytes_array(f, i, a);
        let b = 0;
        for (const _ of h) {
          const { ret: g, data: w } = t.fds[n].fd_pread(_.buf_len, l);
          if (g != 0)
            return f.setUint32(u, b, !0), g;
          if (d.set(w, _.buf), b += w.length, l += BigInt(w.length), w.length != _.buf_len)
            break;
        }
        return f.setUint32(u, b, !0), 0;
      } else
        return 8;
    }, fd_prestat_get(n, i) {
      const a = new DataView(t.inst.exports.memory.buffer);
      if (t.fds[n] != null) {
        const { ret: l, prestat: u } = t.fds[n].fd_prestat_get();
        return u?.write_bytes(a, i), l;
      } else
        return 8;
    }, fd_prestat_dir_name(n, i, a) {
      if (t.fds[n] != null) {
        const { ret: l, prestat: u } = t.fds[n].fd_prestat_get();
        if (u == null)
          return l;
        const f = u.inner.pr_name;
        return new Uint8Array(t.inst.exports.memory.buffer).set(f.slice(0, a), i), f.byteLength > a ? 37 : 0;
      } else
        return 8;
    }, fd_pwrite(n, i, a, l, u) {
      const f = new DataView(t.inst.exports.memory.buffer), d = new Uint8Array(t.inst.exports.memory.buffer);
      if (t.fds[n] != null) {
        const h = F.read_bytes_array(f, i, a);
        let b = 0;
        for (const _ of h) {
          const g = d.slice(_.buf, _.buf + _.buf_len), { ret: w, nwritten: O } = t.fds[n].fd_pwrite(g, l);
          if (w != 0)
            return f.setUint32(u, b, !0), w;
          if (b += O, l += BigInt(O), O != g.byteLength)
            break;
        }
        return f.setUint32(u, b, !0), 0;
      } else
        return 8;
    }, fd_read(n, i, a, l) {
      const u = new DataView(t.inst.exports.memory.buffer), f = new Uint8Array(t.inst.exports.memory.buffer);
      if (t.fds[n] != null) {
        const d = A.read_bytes_array(u, i, a);
        let h = 0;
        for (const b of d) {
          const { ret: _, data: g } = t.fds[n].fd_read(b.buf_len);
          if (_ != 0)
            return u.setUint32(l, h, !0), _;
          if (f.set(g, b.buf), h += g.length, g.length != b.buf_len)
            break;
        }
        return u.setUint32(l, h, !0), 0;
      } else
        return 8;
    }, fd_readdir(n, i, a, l, u) {
      const f = new DataView(t.inst.exports.memory.buffer), d = new Uint8Array(t.inst.exports.memory.buffer);
      if (t.fds[n] != null) {
        let h = 0;
        for (; ; ) {
          const { ret: b, dirent: _ } = t.fds[n].fd_readdir_single(l);
          if (b != 0)
            return f.setUint32(u, h, !0), b;
          if (_ == null)
            break;
          if (a - h < _.head_length()) {
            h = a;
            break;
          }
          const g = new ArrayBuffer(_.head_length());
          if (_.write_head_bytes(new DataView(g), 0), d.set(new Uint8Array(g).slice(0, Math.min(g.byteLength, a - h)), i), i += _.head_length(), h += _.head_length(), a - h < _.name_length()) {
            h = a;
            break;
          }
          _.write_name_bytes(d, i, a - h), i += _.name_length(), h += _.name_length(), l = _.d_next;
        }
        return f.setUint32(u, h, !0), 0;
      } else
        return 8;
    }, fd_renumber(n, i) {
      if (t.fds[n] != null && t.fds[i] != null) {
        const a = t.fds[i].fd_close();
        return a != 0 ? a : (t.fds[i] = t.fds[n], t.fds[n] = void 0, 0);
      } else
        return 8;
    }, fd_seek(n, i, a, l) {
      const u = new DataView(t.inst.exports.memory.buffer);
      if (t.fds[n] != null) {
        const { ret: f, offset: d } = t.fds[n].fd_seek(i, a);
        return u.setBigInt64(l, d, !0), f;
      } else
        return 8;
    }, fd_sync(n) {
      return t.fds[n] != null ? t.fds[n].fd_sync() : 8;
    }, fd_tell(n, i) {
      const a = new DataView(t.inst.exports.memory.buffer);
      if (t.fds[n] != null) {
        const { ret: l, offset: u } = t.fds[n].fd_tell();
        return a.setBigUint64(i, u, !0), l;
      } else
        return 8;
    }, fd_write(n, i, a, l) {
      const u = new DataView(t.inst.exports.memory.buffer), f = new Uint8Array(t.inst.exports.memory.buffer);
      if (t.fds[n] != null) {
        const d = F.read_bytes_array(u, i, a);
        let h = 0;
        for (const b of d) {
          const _ = f.slice(b.buf, b.buf + b.buf_len), { ret: g, nwritten: w } = t.fds[n].fd_write(_);
          if (g != 0)
            return u.setUint32(l, h, !0), g;
          if (h += w, w != _.byteLength)
            break;
        }
        return u.setUint32(l, h, !0), 0;
      } else
        return 8;
    }, path_create_directory(n, i, a) {
      const l = new Uint8Array(t.inst.exports.memory.buffer);
      if (t.fds[n] != null) {
        const u = new TextDecoder("utf-8").decode(l.slice(i, i + a));
        return t.fds[n].path_create_directory(u);
      } else
        return 8;
    }, path_filestat_get(n, i, a, l, u) {
      const f = new DataView(t.inst.exports.memory.buffer), d = new Uint8Array(t.inst.exports.memory.buffer);
      if (t.fds[n] != null) {
        const h = new TextDecoder("utf-8").decode(d.slice(a, a + l)), { ret: b, filestat: _ } = t.fds[n].path_filestat_get(i, h);
        return _?.write_bytes(f, u), b;
      } else
        return 8;
    }, path_filestat_set_times(n, i, a, l, u, f, d) {
      const h = new Uint8Array(t.inst.exports.memory.buffer);
      if (t.fds[n] != null) {
        const b = new TextDecoder("utf-8").decode(h.slice(a, a + l));
        return t.fds[n].path_filestat_set_times(i, b, u, f, d);
      } else
        return 8;
    }, path_link(n, i, a, l, u, f, d) {
      const h = new Uint8Array(t.inst.exports.memory.buffer);
      if (t.fds[n] != null && t.fds[u] != null) {
        const b = new TextDecoder("utf-8").decode(h.slice(a, a + l)), _ = new TextDecoder("utf-8").decode(h.slice(f, f + d)), { ret: g, inode_obj: w } = t.fds[n].path_lookup(b, i);
        return w == null ? g : t.fds[u].path_link(_, w, !1);
      } else
        return 8;
    }, path_open(n, i, a, l, u, f, d, h, b) {
      const _ = new DataView(t.inst.exports.memory.buffer), g = new Uint8Array(t.inst.exports.memory.buffer);
      if (t.fds[n] != null) {
        const w = new TextDecoder("utf-8").decode(g.slice(a, a + l));
        y.log(w);
        const { ret: O, fd_obj: W } = t.fds[n].path_open(i, w, u, f, d, h);
        if (O != 0)
          return O;
        t.fds.push(W);
        const x = t.fds.length - 1;
        return _.setUint32(b, x, !0), 0;
      } else
        return 8;
    }, path_readlink(n, i, a, l, u, f) {
      const d = new DataView(t.inst.exports.memory.buffer), h = new Uint8Array(t.inst.exports.memory.buffer);
      if (t.fds[n] != null) {
        const b = new TextDecoder("utf-8").decode(h.slice(i, i + a));
        y.log(b);
        const { ret: _, data: g } = t.fds[n].path_readlink(b);
        if (g != null) {
          const w = new TextEncoder().encode(g);
          if (w.length > u)
            return d.setUint32(f, 0, !0), 8;
          h.set(w, l), d.setUint32(f, w.length, !0);
        }
        return _;
      } else
        return 8;
    }, path_remove_directory(n, i, a) {
      const l = new Uint8Array(t.inst.exports.memory.buffer);
      if (t.fds[n] != null) {
        const u = new TextDecoder("utf-8").decode(l.slice(i, i + a));
        return t.fds[n].path_remove_directory(u);
      } else
        return 8;
    }, path_rename(n, i, a, l, u, f) {
      const d = new Uint8Array(t.inst.exports.memory.buffer);
      if (t.fds[n] != null && t.fds[l] != null) {
        const h = new TextDecoder("utf-8").decode(d.slice(i, i + a)), b = new TextDecoder("utf-8").decode(d.slice(u, u + f));
        let { ret: _, inode_obj: g } = t.fds[n].path_unlink(h);
        if (g == null)
          return _;
        if (_ = t.fds[l].path_link(b, g, !0), _ != 0 && t.fds[n].path_link(h, g, !0) != 0)
          throw "path_link should always return success when relinking an inode back to the original place";
        return _;
      } else
        return 8;
    }, path_symlink(n, i, a, l, u) {
      const f = new Uint8Array(t.inst.exports.memory.buffer);
      return t.fds[a] != null ? (new TextDecoder("utf-8").decode(f.slice(n, n + i)), new TextDecoder("utf-8").decode(f.slice(l, l + u)), 58) : 8;
    }, path_unlink_file(n, i, a) {
      const l = new Uint8Array(t.inst.exports.memory.buffer);
      if (t.fds[n] != null) {
        const u = new TextDecoder("utf-8").decode(l.slice(i, i + a));
        return t.fds[n].path_unlink_file(u);
      } else
        return 8;
    }, poll_oneoff(n, i, a) {
      throw "async io not supported";
    }, proc_exit(n) {
      throw new $(n);
    }, proc_raise(n) {
      throw "raised signal " + n;
    }, sched_yield() {
    }, random_get(n, i) {
      const a = new Uint8Array(t.inst.exports.memory.buffer);
      for (let l = 0; l < i; l++)
        a[n + l] = Math.random() * 256 | 0;
    }, sock_recv(n, i, a) {
      throw "sockets not supported";
    }, sock_send(n, i, a) {
      throw "sockets not supported";
    }, sock_shutdown(n, i) {
      throw "sockets not supported";
    }, sock_accept(n, i) {
      throw "sockets not supported";
    } };
  }
};
class te {
  fd_allocate(e, r) {
    return 58;
  }
  fd_close() {
    return 0;
  }
  fd_fdstat_get() {
    return { ret: 58, fdstat: null };
  }
  fd_fdstat_set_flags(e) {
    return 58;
  }
  fd_fdstat_set_rights(e, r) {
    return 58;
  }
  fd_filestat_get() {
    return { ret: 58, filestat: null };
  }
  fd_filestat_set_size(e) {
    return 58;
  }
  fd_filestat_set_times(e, r, s) {
    return 58;
  }
  fd_pread(e, r) {
    return { ret: 58, data: new Uint8Array() };
  }
  fd_prestat_get() {
    return { ret: 58, prestat: null };
  }
  fd_pwrite(e, r) {
    return { ret: 58, nwritten: 0 };
  }
  fd_read(e) {
    return { ret: 58, data: new Uint8Array() };
  }
  fd_readdir_single(e) {
    return { ret: 58, dirent: null };
  }
  fd_seek(e, r) {
    return { ret: 58, offset: 0n };
  }
  fd_sync() {
    return 0;
  }
  fd_tell() {
    return { ret: 58, offset: 0n };
  }
  fd_write(e) {
    return { ret: 58, nwritten: 0 };
  }
  path_create_directory(e) {
    return 58;
  }
  path_filestat_get(e, r) {
    return { ret: 58, filestat: null };
  }
  path_filestat_set_times(e, r, s, o, t) {
    return 58;
  }
  path_link(e, r, s) {
    return 58;
  }
  path_unlink(e) {
    return { ret: 58, inode_obj: null };
  }
  path_lookup(e, r) {
    return { ret: 58, inode_obj: null };
  }
  path_open(e, r, s, o, t, n) {
    return { ret: 54, fd_obj: null };
  }
  path_readlink(e) {
    return { ret: 58, data: null };
  }
  path_remove_directory(e) {
    return 58;
  }
  path_rename(e, r, s) {
    return 58;
  }
  path_unlink_file(e) {
    return 58;
  }
}
class re {
}
class C extends te {
  fd_allocate(e, r) {
    if (!(this.file.size > e + r)) {
      const s = new Uint8Array(Number(e + r));
      s.set(this.file.data, 0), this.file.data = s;
    }
    return 0;
  }
  fd_fdstat_get() {
    return { ret: 0, fdstat: new Z(V, 0) };
  }
  fd_filestat_set_size(e) {
    if (this.file.size > e)
      this.file.data = new Uint8Array(this.file.data.buffer.slice(0, Number(e)));
    else {
      const r = new Uint8Array(Number(e));
      r.set(this.file.data, 0), this.file.data = r;
    }
    return 0;
  }
  fd_read(e) {
    const r = this.file.data.slice(Number(this.file_pos), Number(this.file_pos + BigInt(e)));
    return this.file_pos += BigInt(r.length), { ret: 0, data: r };
  }
  fd_pread(e, r) {
    return { ret: 0, data: this.file.data.slice(Number(r), Number(r + BigInt(e))) };
  }
  fd_seek(e, r) {
    let s;
    switch (r) {
      case he:
        s = e;
        break;
      case _e:
        s = this.file_pos + e;
        break;
      case Q:
        s = BigInt(this.file.data.byteLength) + e;
        break;
      default:
        return { ret: 28, offset: 0n };
    }
    return s < 0 ? { ret: 28, offset: 0n } : (this.file_pos = s, { ret: 0, offset: this.file_pos });
  }
  fd_tell() {
    return { ret: 0, offset: this.file_pos };
  }
  fd_write(e) {
    if (this.file.readonly) return { ret: 8, nwritten: 0 };
    if (this.file_pos + BigInt(e.byteLength) > this.file.size) {
      const r = this.file.data;
      this.file.data = new Uint8Array(Number(this.file_pos + BigInt(e.byteLength))), this.file.data.set(r);
    }
    return this.file.data.set(e, Number(this.file_pos)), this.file_pos += BigInt(e.byteLength), { ret: 0, nwritten: e.byteLength };
  }
  fd_pwrite(e, r) {
    if (this.file.readonly) return { ret: 8, nwritten: 0 };
    if (r + BigInt(e.byteLength) > this.file.size) {
      const s = this.file.data;
      this.file.data = new Uint8Array(Number(r + BigInt(e.byteLength))), this.file.data.set(s);
    }
    return this.file.data.set(e, Number(r)), { ret: 0, nwritten: e.byteLength };
  }
  fd_filestat_get() {
    return { ret: 0, filestat: this.file.stat() };
  }
  constructor(e) {
    super(), this.file_pos = 0n, this.file = e;
  }
}
class ne extends te {
  fd_seek(e, r) {
    return { ret: 8, offset: 0n };
  }
  fd_tell() {
    return { ret: 8, offset: 0n };
  }
  fd_allocate(e, r) {
    return 8;
  }
  fd_fdstat_get() {
    return { ret: 0, fdstat: new Z(E, 0) };
  }
  fd_readdir_single(e) {
    if (y.enabled && (y.log("readdir_single", e), y.log(e, this.dir.contents.keys())), e == 0n)
      return { ret: 0, dirent: new M(1n, ".", E) };
    if (e == 1n)
      return { ret: 0, dirent: new M(2n, "..", E) };
    if (e >= BigInt(this.dir.contents.size) + 2n)
      return { ret: 0, dirent: null };
    const [r, s] = Array.from(this.dir.contents.entries())[Number(e - 2n)];
    return { ret: 0, dirent: new M(e + 1n, r, s.stat().filetype) };
  }
  path_filestat_get(e, r) {
    const { ret: s, path: o } = N.from(r);
    if (o == null)
      return { ret: s, filestat: null };
    const { ret: t, entry: n } = this.dir.get_entry_for_path(o);
    return n == null ? { ret: t, filestat: null } : { ret: 0, filestat: n.stat() };
  }
  path_lookup(e, r) {
    const { ret: s, path: o } = N.from(e);
    if (o == null)
      return { ret: s, inode_obj: null };
    const { ret: t, entry: n } = this.dir.get_entry_for_path(o);
    return n == null ? { ret: t, inode_obj: null } : { ret: 0, inode_obj: n };
  }
  path_open(e, r, s, o, t, n) {
    const { ret: i, path: a } = N.from(r);
    if (a == null)
      return { ret: i, fd_obj: null };
    let { ret: l, entry: u } = this.dir.get_entry_for_path(a);
    if (u == null) {
      if (l != 44)
        return { ret: l, fd_obj: null };
      if ((s & J) == J) {
        const { ret: f, entry: d } = this.dir.create_entry_for_path(r, (s & j) == j);
        if (d == null)
          return { ret: f, fd_obj: null };
        u = d;
      } else
        return { ret: 44, fd_obj: null };
    } else if ((s & q) == q)
      return { ret: 20, fd_obj: null };
    return (s & j) == j && u.stat().filetype !== E ? { ret: 54, fd_obj: null } : u.path_open(s, o, n);
  }
  path_create_directory(e) {
    return this.path_open(0, e, J | j, 0n, 0n, 0).ret;
  }
  path_link(e, r, s) {
    const { ret: o, path: t } = N.from(e);
    if (t == null)
      return o;
    if (t.is_dir)
      return 44;
    const { ret: n, parent_entry: i, filename: a, entry: l } = this.dir.get_parent_dir_and_entry_for_path(t, !0);
    if (i == null || a == null)
      return n;
    if (l != null) {
      const u = r.stat().filetype == E, f = l.stat().filetype == E;
      if (u && f)
        if (s && l instanceof T) {
          if (l.contents.size != 0) return 55;
        } else
          return 20;
      else {
        if (u && !f)
          return 54;
        if (!u && f)
          return 31;
        if (!(r.stat().filetype == V && l.stat().filetype == V)) return 20;
      }
    }
    return !s && r.stat().filetype == E ? 63 : (i.contents.set(a, r), 0);
  }
  path_unlink(e) {
    const { ret: r, path: s } = N.from(e);
    if (s == null)
      return { ret: r, inode_obj: null };
    const { ret: o, parent_entry: t, filename: n, entry: i } = this.dir.get_parent_dir_and_entry_for_path(s, !0);
    return t == null || n == null ? { ret: o, inode_obj: null } : i == null ? { ret: 44, inode_obj: null } : (t.contents.delete(n), { ret: 0, inode_obj: i });
  }
  path_unlink_file(e) {
    const { ret: r, path: s } = N.from(e);
    if (s == null)
      return r;
    const { ret: o, parent_entry: t, filename: n, entry: i } = this.dir.get_parent_dir_and_entry_for_path(s, !1);
    return t == null || n == null || i == null ? o : i.stat().filetype === E ? 31 : (t.contents.delete(n), 0);
  }
  path_remove_directory(e) {
    const { ret: r, path: s } = N.from(e);
    if (s == null)
      return r;
    const { ret: o, parent_entry: t, filename: n, entry: i } = this.dir.get_parent_dir_and_entry_for_path(s, !1);
    return t == null || n == null || i == null ? o : !(i instanceof T) || i.stat().filetype !== E ? 54 : i.contents.size !== 0 ? 55 : t.contents.delete(n) ? 0 : 44;
  }
  fd_filestat_get() {
    return { ret: 0, filestat: this.dir.stat() };
  }
  fd_filestat_set_size(e) {
    return 8;
  }
  fd_read(e) {
    return { ret: 8, data: new Uint8Array() };
  }
  fd_pread(e, r) {
    return { ret: 8, data: new Uint8Array() };
  }
  fd_write(e) {
    return { ret: 8, nwritten: 0 };
  }
  fd_pwrite(e, r) {
    return { ret: 8, nwritten: 0 };
  }
  constructor(e) {
    super(), this.dir = e;
  }
}
class me extends ne {
  fd_prestat_get() {
    return { ret: 0, prestat: G.dir(this.prestat_name) };
  }
  constructor(e, r) {
    super(new T(r)), this.prestat_name = e;
  }
}
class B extends re {
  path_open(e, r, s) {
    if (this.readonly && (r & BigInt(64)) == BigInt(64))
      return { ret: 63, fd_obj: null };
    if ((e & K) == K) {
      if (this.readonly) return { ret: 63, fd_obj: null };
      this.data = new Uint8Array([]);
    }
    const o = new C(this);
    return s & be && o.fd_seek(0n, Q), { ret: 0, fd_obj: o };
  }
  get size() {
    return BigInt(this.data.byteLength);
  }
  stat() {
    return new ee(V, this.size);
  }
  constructor(e, r) {
    super(), this.data = new Uint8Array(e), this.readonly = !!r?.readonly;
  }
}
let N = class se {
  static from(e) {
    const r = new se();
    if (r.is_dir = e.endsWith("/"), e.startsWith("/"))
      return { ret: 76, path: null };
    if (e.includes("\0"))
      return { ret: 28, path: null };
    for (const s of e.split("/"))
      if (!(s === "" || s === ".")) {
        if (s === "..") {
          if (r.parts.pop() == null)
            return { ret: 76, path: null };
          continue;
        }
        r.parts.push(s);
      }
    return { ret: 0, path: r };
  }
  to_path_string() {
    let e = this.parts.join("/");
    return this.is_dir && (e += "/"), e;
  }
  constructor() {
    this.parts = [], this.is_dir = !1;
  }
};
class T extends re {
  path_open(e, r, s) {
    return { ret: 0, fd_obj: new ne(this) };
  }
  stat() {
    return new ee(E, 0n);
  }
  get_entry_for_path(e) {
    let r = this;
    for (const s of e.parts) {
      if (!(r instanceof T))
        return { ret: 54, entry: null };
      const o = r.contents.get(s);
      if (o !== void 0)
        r = o;
      else
        return y.log(s), { ret: 44, entry: null };
    }
    return e.is_dir && r.stat().filetype != E ? { ret: 54, entry: null } : { ret: 0, entry: r };
  }
  get_parent_dir_and_entry_for_path(e, r) {
    const s = e.parts.pop();
    if (s === void 0)
      return { ret: 28, parent_entry: null, filename: null, entry: null };
    const { ret: o, entry: t } = this.get_entry_for_path(e);
    if (t == null)
      return { ret: o, parent_entry: null, filename: null, entry: null };
    if (!(t instanceof T))
      return { ret: 54, parent_entry: null, filename: null, entry: null };
    const n = t.contents.get(s);
    return n === void 0 ? r ? { ret: 0, parent_entry: t, filename: s, entry: null } : { ret: 44, parent_entry: null, filename: null, entry: null } : e.is_dir && n.stat().filetype != E ? { ret: 54, parent_entry: null, filename: null, entry: null } : { ret: 0, parent_entry: t, filename: s, entry: n };
  }
  create_entry_for_path(e, r) {
    const { ret: s, path: o } = N.from(e);
    if (o == null)
      return { ret: s, entry: null };
    let { ret: t, parent_entry: n, filename: i, entry: a } = this.get_parent_dir_and_entry_for_path(o, !0);
    if (n == null || i == null)
      return { ret: t, entry: null };
    if (a != null)
      return { ret: 20, entry: null };
    y.log("create", o);
    let l;
    return r ? l = new T(/* @__PURE__ */ new Map()) : l = new B(new ArrayBuffer(0)), n.contents.set(i, l), a = l, { ret: 0, entry: a };
  }
  constructor(e) {
    super(), e instanceof Array ? this.contents = new Map(e) : this.contents = e;
  }
}
function Ee({ stdout: c, stderr: e } = {
  stdout: console.log,
  stderr: console.warn
}) {
  let r, s;
  function o() {
    if (typeof r > "u")
      throw new Error("Memory is not set");
    return (s === void 0 || s.buffer.byteLength === 0) && (s = new DataView(r.buffer)), s;
  }
  const t = new TextDecoder();
  return {
    addToImports(n) {
      const i = n.wasi_snapshot_preview1, a = i.fd_write;
      i.fd_write = (f, d, h, b) => {
        if (f !== 1 && f !== 2)
          return a(f, d, h, b);
        const _ = o(), g = Array.from({ length: h }, (x, ce) => {
          const H = d + ce * 8, fe = _.getUint32(H, !0), de = _.getUint32(H + 4, !0);
          return new Uint8Array(r.buffer, fe, de);
        });
        let w = 0, O = "";
        for (const x of g)
          O += t.decode(x), w += x.byteLength;
        return _.setUint32(b, w, !0), (f === 1 ? c : e)(O), 0;
      };
      const l = i.fd_filestat_get;
      i.fd_filestat_get = (f, d) => {
        if (f !== 1 && f !== 2)
          return l(f, d);
        const h = o(), b = l(f, d);
        if (b !== 0)
          return b;
        const _ = d + 0;
        return h.setUint8(_, 2), 0;
      };
      const u = i.fd_fdstat_get;
      i.fd_fdstat_get = (f, d) => {
        if (f !== 1 && f !== 2)
          return u(f, d);
        const h = o(), b = d + 0;
        h.setUint8(b, 2);
        const _ = d + 8;
        return h.setBigUint64(_, BigInt(64), !0), 0;
      };
    },
    setMemory(n) {
      r = n;
    }
  };
}
let z = new DataView(new ArrayBuffer());
function p(c) {
  return z.buffer !== c.buffer && (z = new DataView(c.buffer)), z;
}
function Oe(c) {
  return c >>> 0;
}
const v = new TextDecoder("utf-8"), Ne = new TextEncoder("utf-8");
function I(c, e, r) {
  if (typeof c != "string")
    throw new TypeError("expected a string");
  if (c.length === 0)
    return U = 0, 1;
  let s = 0, o = 0, t = 0;
  for (; c.length > 0; ) {
    o = e(o, s, 1, s + c.length), s += c.length;
    const { read: n, written: i } = Ne.encodeInto(c, new Uint8Array(r.buffer, o + t, s - t));
    t += i, c = c.slice(n);
  }
  return s > t && (o = e(o, s, 1, t)), U = t, o;
}
let U = 0;
class ie {
  constructor() {
    this.list = [], this.head = 0;
  }
  insert(e) {
    this.head >= this.list.length && this.list.push({
      next: this.list.length + 1,
      val: void 0
    });
    const r = this.head, s = this.list[r];
    return this.head = s.next, s.next = -1, s.val = e, r;
  }
  get(e) {
    if (e >= this.list.length)
      throw new RangeError("handle index not valid");
    const r = this.list[e];
    if (r.next === -1)
      return r.val;
    throw new RangeError("handle index not valid");
  }
  remove(e) {
    const r = this.get(e), s = this.list[e];
    return s.val = void 0, s.next = this.head, this.head = e, r;
  }
}
function k() {
  throw new RangeError("invalid variant discriminant for bool");
}
class ae {
  constructor() {
    this._resource0_slab = new ie();
  }
  addToImports(e) {
    "canonical_abi" in e || (e.canonical_abi = {}), e.canonical_abi["resource_drop_rb-abi-value"] = (r) => {
      this._resource0_slab.remove(r).drop();
    }, e.canonical_abi["resource_clone_rb-abi-value"] = (r) => {
      const s = this._resource0_slab.get(r);
      return this._resource0_slab.insert(s.clone());
    }, e.canonical_abi["resource_get_rb-abi-value"] = (r) => this._resource0_slab.get(r)._wasm_val, e.canonical_abi["resource_new_rb-abi-value"] = (r) => (this._registry0, this._resource0_slab.insert(new D(r, this)));
  }
  async instantiate(e, r) {
    if (r = r || {}, this.addToImports(r), e instanceof WebAssembly.Instance)
      this.instance = e;
    else if (e instanceof WebAssembly.Module)
      this.instance = await WebAssembly.instantiate(e, r);
    else if (e instanceof ArrayBuffer || e instanceof Uint8Array) {
      const { instance: s } = await WebAssembly.instantiate(e, r);
      this.instance = s;
    } else {
      const { instance: s } = await WebAssembly.instantiateStreaming(e, r);
      this.instance = s;
    }
    this._exports = this.instance.exports, this._registry0 = new FinalizationRegistry(this._exports["canonical_abi_drop_rb-abi-value"]);
  }
  rubyShowVersion() {
    this._exports["ruby-show-version: func() -> ()"]();
  }
  rubyInit(e) {
    const r = this._exports.memory, s = this._exports.cabi_realloc, o = e, t = o.length, n = s(0, 0, 4, t * 8);
    for (let i = 0; i < o.length; i++) {
      const a = o[i], l = n + i * 8, u = I(a, s, r), f = U;
      p(r).setInt32(l + 4, f, !0), p(r).setInt32(l + 0, u, !0);
    }
    this._exports["ruby-init: func(args: list<string>) -> ()"](n, t);
  }
  rubyInitLoadpath() {
    this._exports["ruby-init-loadpath: func() -> ()"]();
  }
  rbEvalStringProtect(e) {
    const r = this._exports.memory, s = this._exports.cabi_realloc, o = I(e, s, r), t = U, n = this._exports["rb-eval-string-protect: func(str: string) -> tuple<handle<rb-abi-value>, s32>"](o, t);
    return [this._resource0_slab.remove(p(r).getInt32(n + 0, !0)), p(r).getInt32(n + 4, !0)];
  }
  rbFuncallvProtect(e, r, s) {
    const o = this._exports.memory, t = this._exports.cabi_realloc, n = e;
    if (!(n instanceof D))
      throw new TypeError("expected instance of RbAbiValue");
    const i = s, a = i.length, l = t(0, 0, 4, a * 4);
    for (let f = 0; f < i.length; f++) {
      const d = i[f], h = l + f * 4, b = d;
      if (!(b instanceof D))
        throw new TypeError("expected instance of RbAbiValue");
      p(o).setInt32(h + 0, this._resource0_slab.insert(b.clone()), !0);
    }
    const u = this._exports["rb-funcallv-protect: func(recv: handle<rb-abi-value>, mid: u32, args: list<handle<rb-abi-value>>) -> tuple<handle<rb-abi-value>, s32>"](this._resource0_slab.insert(n.clone()), Oe(r), l, a);
    return [this._resource0_slab.remove(p(o).getInt32(u + 0, !0)), p(o).getInt32(u + 4, !0)];
  }
  rbIntern(e) {
    const r = this._exports.memory, s = this._exports.cabi_realloc, o = I(e, s, r), t = U;
    return this._exports["rb-intern: func(name: string) -> u32"](o, t) >>> 0;
  }
  rbErrinfo() {
    const e = this._exports["rb-errinfo: func() -> handle<rb-abi-value>"]();
    return this._resource0_slab.remove(e);
  }
  rbClearErrinfo() {
    this._exports["rb-clear-errinfo: func() -> ()"]();
  }
  rstringPtr(e) {
    const r = this._exports.memory, s = e;
    if (!(s instanceof D))
      throw new TypeError("expected instance of RbAbiValue");
    const o = this._exports["rstring-ptr: func(value: handle<rb-abi-value>) -> string"](this._resource0_slab.insert(s.clone())), t = p(r).getInt32(o + 0, !0), n = p(r).getInt32(o + 4, !0), i = v.decode(new Uint8Array(r.buffer, t, n));
    return this._exports["cabi_post_rstring-ptr"](o), i;
  }
  rbVmBugreport() {
    this._exports["rb-vm-bugreport: func() -> ()"]();
  }
  rbGcEnable() {
    const r = this._exports["rb-gc-enable: func() -> bool"]();
    return r == 0 ? !1 : r == 1 ? !0 : k();
  }
  rbGcDisable() {
    const r = this._exports["rb-gc-disable: func() -> bool"]();
    return r == 0 ? !1 : r == 1 ? !0 : k();
  }
  rbSetShouldProhibitRewind(e) {
    const s = this._exports["rb-set-should-prohibit-rewind: func(new-value: bool) -> bool"](e ? 1 : 0);
    return s == 0 ? !1 : s == 1 ? !0 : k();
  }
}
class D {
  constructor(e, r) {
    this._wasm_val = e, this._obj = r, this._refcnt = 1, r._registry0.register(this, e, this);
  }
  clone() {
    return this._refcnt += 1, this;
  }
  drop() {
    if (this._refcnt -= 1, this._refcnt !== 0)
      return;
    this._obj._registry0.unregister(this);
    const e = this._obj._exports["canonical_abi_drop_rb-abi-value"], r = this._wasm_val;
    delete this._obj, delete this._refcnt, delete this._wasm_val, e(r);
  }
}
function ve(c, e, r) {
  "rb-js-abi-host" in c || (c["rb-js-abi-host"] = {}), c["rb-js-abi-host"]["eval-js: func(code: string) -> variant { success(handle<js-abi-value>), failure(handle<js-abi-value>) }"] = function(o, t, n) {
    const i = r("memory"), a = o, l = t, u = v.decode(new Uint8Array(i.buffer, a, l)), d = e.evalJs(u);
    switch (d.tag) {
      case "success": {
        const h = d.val;
        p(i).setInt8(n + 0, 0, !0), p(i).setInt32(n + 4, s.insert(h), !0);
        break;
      }
      case "failure": {
        const h = d.val;
        p(i).setInt8(n + 0, 1, !0), p(i).setInt32(n + 4, s.insert(h), !0);
        break;
      }
      default:
        throw new RangeError("invalid variant specified for JsAbiResult");
    }
  }, c["rb-js-abi-host"]["is-js: func(value: handle<js-abi-value>) -> bool"] = function(o) {
    return e.isJs(s.get(o)) ? 1 : 0;
  }, c["rb-js-abi-host"]["instance-of: func(value: handle<js-abi-value>, klass: handle<js-abi-value>) -> bool"] = function(o, t) {
    return e.instanceOf(s.get(o), s.get(t)) ? 1 : 0;
  }, c["rb-js-abi-host"]["global-this: func() -> handle<js-abi-value>"] = function() {
    const o = e.globalThis();
    return s.insert(o);
  }, c["rb-js-abi-host"]["int-to-js-number: func(value: s32) -> handle<js-abi-value>"] = function(o) {
    const t = e.intToJsNumber(o);
    return s.insert(t);
  }, c["rb-js-abi-host"]["float-to-js-number: func(value: float64) -> handle<js-abi-value>"] = function(o) {
    const t = e.floatToJsNumber(o);
    return s.insert(t);
  }, c["rb-js-abi-host"]["string-to-js-string: func(value: string) -> handle<js-abi-value>"] = function(o, t) {
    const n = r("memory"), i = o, a = t, l = v.decode(new Uint8Array(n.buffer, i, a)), u = e.stringToJsString(l);
    return s.insert(u);
  }, c["rb-js-abi-host"]["bool-to-js-bool: func(value: bool) -> handle<js-abi-value>"] = function(o) {
    const t = o, n = e.boolToJsBool(t == 0 ? !1 : t == 1 ? !0 : k());
    return s.insert(n);
  }, c["rb-js-abi-host"]["proc-to-js-function: func(value: u32) -> handle<js-abi-value>"] = function(o) {
    const t = e.procToJsFunction(o >>> 0);
    return s.insert(t);
  }, c["rb-js-abi-host"]["rb-object-to-js-rb-value: func(raw-rb-abi-value: u32) -> handle<js-abi-value>"] = function(o) {
    const t = e.rbObjectToJsRbValue(o >>> 0);
    return s.insert(t);
  }, c["rb-js-abi-host"]["js-value-to-string: func(value: handle<js-abi-value>) -> string"] = function(o, t) {
    const n = r("memory"), i = r("cabi_realloc"), a = e.jsValueToString(s.get(o)), l = I(a, i, n), u = U;
    p(n).setInt32(t + 4, u, !0), p(n).setInt32(t + 0, l, !0);
  }, c["rb-js-abi-host"]["js-value-to-integer: func(value: handle<js-abi-value>) -> variant { as-float(float64), bignum(string) }"] = function(o, t) {
    const n = r("memory"), i = r("cabi_realloc"), l = e.jsValueToInteger(s.get(o));
    switch (l.tag) {
      case "as-float": {
        const u = l.val;
        p(n).setInt8(t + 0, 0, !0), p(n).setFloat64(t + 8, +u, !0);
        break;
      }
      case "bignum": {
        const u = l.val;
        p(n).setInt8(t + 0, 1, !0);
        const f = I(u, i, n), d = U;
        p(n).setInt32(t + 12, d, !0), p(n).setInt32(t + 8, f, !0);
        break;
      }
      default:
        throw new RangeError("invalid variant specified for RawInteger");
    }
  }, c["rb-js-abi-host"]["export-js-value-to-host: func(value: handle<js-abi-value>) -> ()"] = function(o) {
    e.exportJsValueToHost(s.get(o));
  }, c["rb-js-abi-host"]["import-js-value-from-host: func() -> handle<js-abi-value>"] = function() {
    const o = e.importJsValueFromHost();
    return s.insert(o);
  }, c["rb-js-abi-host"]["js-value-typeof: func(value: handle<js-abi-value>) -> string"] = function(o, t) {
    const n = r("memory"), i = r("cabi_realloc"), a = e.jsValueTypeof(s.get(o)), l = I(a, i, n), u = U;
    p(n).setInt32(t + 4, u, !0), p(n).setInt32(t + 0, l, !0);
  }, c["rb-js-abi-host"]["js-value-equal: func(lhs: handle<js-abi-value>, rhs: handle<js-abi-value>) -> bool"] = function(o, t) {
    return e.jsValueEqual(s.get(o), s.get(t)) ? 1 : 0;
  }, c["rb-js-abi-host"]["js-value-strictly-equal: func(lhs: handle<js-abi-value>, rhs: handle<js-abi-value>) -> bool"] = function(o, t) {
    return e.jsValueStrictlyEqual(s.get(o), s.get(t)) ? 1 : 0;
  }, c["rb-js-abi-host"]["reflect-apply: func(target: handle<js-abi-value>, this-argument: handle<js-abi-value>, arguments: list<handle<js-abi-value>>) -> variant { success(handle<js-abi-value>), failure(handle<js-abi-value>) }"] = function(o, t, n, i, a) {
    const l = r("memory"), u = i, f = n, d = [];
    for (let _ = 0; _ < u; _++) {
      const g = f + _ * 4;
      d.push(s.get(p(l).getInt32(g + 0, !0)));
    }
    const b = e.reflectApply(s.get(o), s.get(t), d);
    switch (b.tag) {
      case "success": {
        const _ = b.val;
        p(l).setInt8(a + 0, 0, !0), p(l).setInt32(a + 4, s.insert(_), !0);
        break;
      }
      case "failure": {
        const _ = b.val;
        p(l).setInt8(a + 0, 1, !0), p(l).setInt32(a + 4, s.insert(_), !0);
        break;
      }
      default:
        throw new RangeError("invalid variant specified for JsAbiResult");
    }
  }, c["rb-js-abi-host"]["reflect-construct: func(target: handle<js-abi-value>, arguments: list<handle<js-abi-value>>) -> handle<js-abi-value>"] = function(o, t, n) {
    const i = r("memory"), a = n, l = t, u = [];
    for (let d = 0; d < a; d++) {
      const h = l + d * 4;
      u.push(s.get(p(i).getInt32(h + 0, !0)));
    }
    const f = e.reflectConstruct(s.get(o), u);
    return s.insert(f);
  }, c["rb-js-abi-host"]["reflect-delete-property: func(target: handle<js-abi-value>, property-key: string) -> bool"] = function(o, t, n) {
    const i = r("memory"), a = t, l = n, u = v.decode(new Uint8Array(i.buffer, a, l));
    return e.reflectDeleteProperty(s.get(o), u) ? 1 : 0;
  }, c["rb-js-abi-host"]["reflect-get: func(target: handle<js-abi-value>, property-key: string) -> variant { success(handle<js-abi-value>), failure(handle<js-abi-value>) }"] = function(o, t, n, i) {
    const a = r("memory"), l = t, u = n, f = v.decode(new Uint8Array(a.buffer, l, u)), h = e.reflectGet(s.get(o), f);
    switch (h.tag) {
      case "success": {
        const b = h.val;
        p(a).setInt8(i + 0, 0, !0), p(a).setInt32(i + 4, s.insert(b), !0);
        break;
      }
      case "failure": {
        const b = h.val;
        p(a).setInt8(i + 0, 1, !0), p(a).setInt32(i + 4, s.insert(b), !0);
        break;
      }
      default:
        throw new RangeError("invalid variant specified for JsAbiResult");
    }
  }, c["rb-js-abi-host"]["reflect-get-own-property-descriptor: func(target: handle<js-abi-value>, property-key: string) -> handle<js-abi-value>"] = function(o, t, n) {
    const i = r("memory"), a = t, l = n, u = v.decode(new Uint8Array(i.buffer, a, l)), f = e.reflectGetOwnPropertyDescriptor(s.get(o), u);
    return s.insert(f);
  }, c["rb-js-abi-host"]["reflect-get-prototype-of: func(target: handle<js-abi-value>) -> handle<js-abi-value>"] = function(o) {
    const t = e.reflectGetPrototypeOf(s.get(o));
    return s.insert(t);
  }, c["rb-js-abi-host"]["reflect-has: func(target: handle<js-abi-value>, property-key: string) -> bool"] = function(o, t, n) {
    const i = r("memory"), a = t, l = n, u = v.decode(new Uint8Array(i.buffer, a, l));
    return e.reflectHas(s.get(o), u) ? 1 : 0;
  }, c["rb-js-abi-host"]["reflect-is-extensible: func(target: handle<js-abi-value>) -> bool"] = function(o) {
    return e.reflectIsExtensible(s.get(o)) ? 1 : 0;
  }, c["rb-js-abi-host"]["reflect-own-keys: func(target: handle<js-abi-value>) -> list<handle<js-abi-value>>"] = function(o, t) {
    const n = r("memory"), i = r("cabi_realloc"), l = e.reflectOwnKeys(s.get(o)), u = l.length, f = i(0, 0, 4, u * 4);
    for (let d = 0; d < l.length; d++) {
      const h = l[d], b = f + d * 4;
      p(n).setInt32(b + 0, s.insert(h), !0);
    }
    p(n).setInt32(t + 4, u, !0), p(n).setInt32(t + 0, f, !0);
  }, c["rb-js-abi-host"]["reflect-prevent-extensions: func(target: handle<js-abi-value>) -> bool"] = function(o) {
    return e.reflectPreventExtensions(s.get(o)) ? 1 : 0;
  }, c["rb-js-abi-host"]["reflect-set: func(target: handle<js-abi-value>, property-key: string, value: handle<js-abi-value>) -> variant { success(handle<js-abi-value>), failure(handle<js-abi-value>) }"] = function(o, t, n, i, a) {
    const l = r("memory"), u = t, f = n, d = v.decode(new Uint8Array(l.buffer, u, f)), b = e.reflectSet(s.get(o), d, s.get(i));
    switch (b.tag) {
      case "success": {
        const _ = b.val;
        p(l).setInt8(a + 0, 0, !0), p(l).setInt32(a + 4, s.insert(_), !0);
        break;
      }
      case "failure": {
        const _ = b.val;
        p(l).setInt8(a + 0, 1, !0), p(l).setInt32(a + 4, s.insert(_), !0);
        break;
      }
      default:
        throw new RangeError("invalid variant specified for JsAbiResult");
    }
  }, c["rb-js-abi-host"]["reflect-set-prototype-of: func(target: handle<js-abi-value>, prototype: handle<js-abi-value>) -> bool"] = function(o, t) {
    return e.reflectSetPrototypeOf(s.get(o), s.get(t)) ? 1 : 0;
  }, "canonical_abi" in c || (c.canonical_abi = {});
  const s = new ie();
  c.canonical_abi["resource_drop_js-abi-value"] = (o) => {
    const t = s.remove(o);
    e.dropJsAbiValue && e.dropJsAbiValue(t);
  };
}
class Se extends ae {
  async setInstance(e) {
    await this.instantiate(e);
  }
}
class Ue {
  constructor() {
  }
  setUnderlying(e) {
    this.underlying = e;
  }
  rubyShowVersion() {
    this.underlying.rubyShowVersion();
  }
  rubyInit(e) {
    this.underlying.rubyInit(e);
  }
  rubyInitLoadpath() {
    this.underlying.rubyInitLoadpath();
  }
  rbEvalStringProtect(e) {
    return this.underlying.rbEvalStringProtect(e);
  }
  rbFuncallvProtect(e, r, s) {
    return this.underlying.rbFuncallvProtect(e, r, s);
  }
  rbIntern(e) {
    return this.underlying.rbIntern(e);
  }
  rbErrinfo() {
    return this.underlying.rbErrinfo();
  }
  rbClearErrinfo() {
    return this.underlying.rbClearErrinfo();
  }
  rstringPtr(e) {
    return this.underlying.rstringPtr(e);
  }
  rbVmBugreport() {
    this.underlying.rbVmBugreport();
  }
  rbGcEnable() {
    return this.underlying.rbGcEnable();
  }
  rbGcDisable() {
    return this.underlying.rbGcDisable();
  }
  rbSetShouldProhibitRewind(e) {
    return this.underlying.rbSetShouldProhibitRewind(e);
  }
  async setInstance(e) {
  }
  addToImports(e) {
  }
}
class L {
  /**
   * Instantiate a Ruby VM with the given WebAssembly Core module with WASI Preview 1 implementation.
   *
   * @param options The options to instantiate the Ruby VM
   * @returns A promise that resolves to the Ruby VM instance and the WebAssembly instance
   * @category Essentials
   *
   * @example
   *
   * import { WASI } from "@bjorn3/browser_wasi_shim";
   * const wasip1 = new WASI([], [], []);
   * const module = await WebAssembly.compile("./path/to/ruby.wasm");
   * const { vm } = await RubyVM.instantiateModule({ module, wasip1 });
   *
   */
  static async instantiateModule(e) {
    var r, s;
    const { module: o, wasip1: t } = e, n = new L(), i = {
      wasi_snapshot_preview1: t.wasiImport
    };
    n.addToImports(i), (r = e.addToImports) === null || r === void 0 || r.call(e, i);
    const a = await WebAssembly.instantiate(o, i);
    return await n.setInstance(a), (s = e.setMemory) === null || s === void 0 || s.call(e, a.exports.memory), t.initialize(a), n.initialize(e.args), { vm: n, instance: a };
  }
  /**
   * Instantiate a Ruby VM with the given WebAssembly component with WASI Preview 2 implementation.
   *
   * @param options The options to instantiate the Ruby VM
   * @returns A promise that resolves to the Ruby VM instance
   * @category Essentials
   *
   * @example
   *
   * // First, you need to transpile the Ruby component to a JavaScript module using jco.
   * // $ jco transpile --no-wasi-shim --instantiation --valid-lifting-optimization ./ruby.component.wasm -o ./component
   * // Then, you can instantiate the Ruby VM with the component:
   *
   * import * as wasip2 from "@bytecodealliance/preview2-shim"
   * import fs from "fs/promises";
   * import path from "path";
   *
   * const { instantiate } = await import("./component/ruby.component.js");
   * const getCoreModule = async (relativePath) => {
   *   const buffer = await fs.readFile(path.join("./component", relativePath));
   *   return WebAssembly.compile(buffer);
   * }
   *
   * const { vm } = await RubyVM.instantiateComponent({
   *   instantiate, getCoreModule, wasip2,
   * });
   *
   */
  static async instantiateComponent(e) {
    let r;
    return "getCoreModule" in e ? r = async (o) => {
      const { instantiate: t, getCoreModule: n, wasip2: i } = e, { cli: a, clocks: l, filesystem: u, io: f, random: d, sockets: h, http: b } = i, _ = {
        "ruby:js/js-runtime": o,
        "wasi:cli/environment": a.environment,
        "wasi:cli/exit": a.exit,
        "wasi:cli/stderr": a.stderr,
        "wasi:cli/stdin": a.stdin,
        "wasi:cli/stdout": a.stdout,
        "wasi:cli/terminal-input": a.terminalInput,
        "wasi:cli/terminal-output": a.terminalOutput,
        "wasi:cli/terminal-stderr": a.terminalStderr,
        "wasi:cli/terminal-stdin": a.terminalStdin,
        "wasi:cli/terminal-stdout": a.terminalStdout,
        "wasi:clocks/monotonic-clock": l.monotonicClock,
        "wasi:clocks/wall-clock": l.wallClock,
        "wasi:filesystem/preopens": u.preopens,
        "wasi:filesystem/types": u.types,
        "wasi:io/error": f.error,
        "wasi:io/poll": f.poll,
        "wasi:io/streams": f.streams,
        "wasi:random/random": d.random,
        "wasi:sockets/tcp": h.tcp,
        "wasi:http/types": b.types,
        "wasi:http/incoming-handler": b.incomingHandler,
        "wasi:http/outgoing-handler": b.outgoingHandler
      };
      return (await t(n, _, e.instantiateCore)).rubyRuntime;
    } : r = e.instantiate, { vm: await this._instantiate({}, r) };
  }
  constructor(e) {
    this.instance = null, this.interfaceState = {
      hasJSFrameAfterRbFrame: !1
    };
    const r = (s) => {
      const o = [
        "setInstance",
        "addToImports",
        "instantiate",
        "rbSetShouldProhibitRewind",
        "rbGcDisable",
        "rbGcEnable"
      ], t = ["constructor"].concat(o);
      for (const n of Object.getOwnPropertyNames(ae.prototype)) {
        if (t.includes(n))
          continue;
        const i = s[n];
        typeof i == "function" && (s[n] = (...a) => {
          if (this.interfaceState.hasJSFrameAfterRbFrame) {
            const u = this.guest.rbSetShouldProhibitRewind(!0), f = this.guest.rbGcDisable(), d = Reflect.apply(i, s, a);
            return this.guest.rbSetShouldProhibitRewind(u), f || this.guest.rbGcEnable(), d;
          } else
            return Reflect.apply(i, s, a);
        });
      }
      return s;
    };
    this.guest = r(e ?? new Se()), this.transport = new Te(), this.exceptionFormatter = new Ie();
  }
  static async _instantiate(e, r) {
    const s = new Ue(), o = new L(s);
    class t {
      constructor(l) {
        this.underlying = l;
      }
    }
    const n = o.getImports((a) => new t(a), (a) => a.underlying), i = await r(Object.assign(Object.assign({}, n), { throwProhibitRewindException: (a) => {
      o.throwProhibitRewindException(a);
    }, procToJsFunction: () => {
      const a = new S(i.exportRbValueToJs(), o, o.privateObject());
      return new t((...l) => a.call("call", ...l.map((u) => o.wrap(u))).toJS());
    }, rbObjectToJsRbValue: () => {
      const a = new S(i.exportRbValueToJs(), o, o.privateObject());
      return new t(a);
    }, JsAbiValue: t }));
    return s.setUnderlying(i), o.initialize(e.args), o;
  }
  /**
   * Initialize the Ruby VM with the given command line arguments
   * @param args The command line arguments to pass to Ruby. Must be
   * an array of strings starting with the Ruby program name.
   * @category Low-level initialization
   */
  initialize(e = ["ruby.wasm", "-EUTF-8", "-e_=0"]) {
    const r = e.map((s) => s + "\0");
    this.guest.rubyInit(r);
    try {
      this.eval(`
        # Require Bundler standalone setup
        if File.exist?("/bundle/bundler/setup.rb")
          require "/bundle/bundler/setup.rb"
        elsif File.exist?("/bundle/setup.rb")
          # For non-CM builds, which doesn't use Bundler's standalone mode
          require "/bundle/setup.rb"
        end
      `);
    } catch (s) {
      console.warn("Failed to load /bundle/setup", s);
    }
  }
  /**
   * Set a given instance to interact JavaScript and Ruby's
   * WebAssembly instance. This method must be called before calling
   * Ruby API.
   *
   * @param instance The WebAssembly instance to interact with. Must
   * be instantiated from a Ruby built with JS extension, and built
   * with Reactor ABI instead of command line.
   * @category Low-level initialization
   */
  async setInstance(e) {
    this.instance = e, await this.guest.setInstance(e);
  }
  /**
   * Add intrinsic import entries, which is necessary to interact JavaScript
   * and Ruby's WebAssembly instance.
   * @param imports The import object to add to the WebAssembly instance
   * @category Low-level initialization
   */
  addToImports(e) {
    this.guest.addToImports(e), e["rb-js-abi-host"] = {
      rb_wasm_throw_prohibit_rewind_exception: (r, s) => {
        const o = this.instance.exports.memory, t = new TextDecoder().decode(new Uint8Array(o.buffer, r, s));
        this.throwProhibitRewindException(t);
      }
    }, ve(e, this.getImports((r) => r, (r) => r), (r) => this.instance.exports[r]);
  }
  throwProhibitRewindException(e) {
    let r = `Ruby APIs that may rewind the VM stack are prohibited under nested VM operation (${e})
Nested VM operation means that the call stack has sandwitched JS frames like JS -> Ruby -> JS -> Ruby caused by something like \`window.rubyVM.eval("JS.global[:rubyVM].eval('Fiber.yield')")\`

Please check your call stack and make sure that you are **not** doing any of the following inside the nested Ruby frame:
  1. Switching fibers (e.g. Fiber#resume, Fiber.yield, and Fiber#transfer)
     Note that \`evalAsync\` JS API switches fibers internally
  2. Raising uncaught exceptions
     Please catch all exceptions inside the nested operation
  3. Calling Continuation APIs
`;
    const s = new S(this.guest.rbErrinfo(), this, this.privateObject());
    throw s.call("nil?").toString() === "false" && (r += `
` + this.exceptionFormatter.format(s, this, this.privateObject())), new X(r);
  }
  getImports(e, r) {
    const s = (t) => {
      for (const [n, i] of Object.entries(t))
        typeof i == "function" && (t[n] = (...a) => {
          const l = this.interfaceState.hasJSFrameAfterRbFrame;
          this.interfaceState.hasJSFrameAfterRbFrame = !0;
          const u = Reflect.apply(i, t, a);
          return this.interfaceState.hasJSFrameAfterRbFrame = l, u;
        });
      return t;
    };
    function o(t) {
      return (...n) => {
        try {
          return { tag: "success", val: t(...n) };
        } catch (i) {
          if (i instanceof X)
            throw i;
          return { tag: "failure", val: e(i) };
        }
      };
    }
    return s({
      evalJs: o((t) => e(Function(t)())),
      isJs: (t) => !0,
      globalThis: () => {
        if (typeof globalThis < "u")
          return e(globalThis);
        if (typeof global < "u")
          return e(global);
        if (typeof window < "u")
          return e(window);
        throw new Error("unable to locate global object");
      },
      intToJsNumber: (t) => e(t),
      floatToJsNumber: (t) => e(t),
      stringToJsString: (t) => e(t),
      boolToJsBool: (t) => e(t),
      procToJsFunction: (t) => {
        const n = this.rbValueOfPointer(t);
        return e((...i) => n.call("call", ...i.map((a) => this.wrap(a))).toJS());
      },
      rbObjectToJsRbValue: (t) => e(this.rbValueOfPointer(t)),
      jsValueToString: (t) => (t = r(t), String(t)),
      jsValueToInteger(t) {
        return t = r(t), typeof t == "number" ? { tag: "as-float", val: t } : typeof t == "bigint" ? { tag: "bignum", val: BigInt(t).toString(10) + "\0" } : typeof t == "string" ? { tag: "bignum", val: t + "\0" } : typeof t > "u" ? { tag: "as-float", val: 0 } : { tag: "as-float", val: Number(t) };
      },
      exportJsValueToHost: (t) => {
        this.transport.takeJsValue(r(t));
      },
      importJsValueFromHost: () => e(this.transport.consumeJsValue()),
      instanceOf: (t, n) => (n = r(n), typeof n == "function" ? r(t) instanceof n : !1),
      jsValueTypeof(t) {
        return typeof r(t);
      },
      jsValueEqual(t, n) {
        return r(t) == r(n);
      },
      jsValueStrictlyEqual(t, n) {
        return r(t) === r(n);
      },
      reflectApply: o((t, n, i) => {
        const a = i.map((l) => r(l));
        return e(Reflect.apply(r(t), r(n), a));
      }),
      reflectConstruct: function(t, n) {
        throw new Error("Function not implemented.");
      },
      reflectDeleteProperty: function(t, n) {
        throw new Error("Function not implemented.");
      },
      reflectGet: o((t, n) => e(r(t)[n])),
      reflectGetOwnPropertyDescriptor: function(t, n) {
        throw new Error("Function not implemented.");
      },
      reflectGetPrototypeOf: function(t) {
        throw new Error("Function not implemented.");
      },
      reflectHas: function(t, n) {
        throw new Error("Function not implemented.");
      },
      reflectIsExtensible: function(t) {
        throw new Error("Function not implemented.");
      },
      reflectOwnKeys: function(t) {
        throw new Error("Function not implemented.");
      },
      reflectPreventExtensions: function(t) {
        throw new Error("Function not implemented.");
      },
      reflectSet: o((t, n, i) => e(Reflect.set(r(t), n, r(i)))),
      reflectSetPrototypeOf: function(t, n) {
        throw new Error("Function not implemented.");
      }
    });
  }
  /**
   * Print the Ruby version to stdout
   */
  printVersion() {
    this.guest.rubyShowVersion();
  }
  /**
   * Runs a string of Ruby code from JavaScript
   * @param code The Ruby code to run
   * @returns the result of the last expression
   * @category Essentials
   *
   * @example
   * vm.eval("puts 'hello world'");
   * const result = vm.eval("1 + 2");
   * console.log(result.toString()); // 3
   *
   */
  eval(e) {
    return P(this, this.privateObject(), e);
  }
  /**
   * Runs a string of Ruby code with top-level `JS::Object#await`
   * Returns a promise that resolves when execution completes.
   * @param code The Ruby code to run
   * @returns a promise that resolves to the result of the last expression
   * @category Essentials
   *
   * @example
   * const text = await vm.evalAsync(`
   *   require 'js'
   *   response = JS.global.fetch('https://example.com').await
   *   response.text.await
   * `);
   * console.log(text.toString()); // <html>...</html>
   */
  evalAsync(e) {
    const r = this.eval("require 'js'; JS");
    return ue(this, this.privateObject(), (s) => {
      r.call("__eval_async_rb", this.wrap(e), s);
    });
  }
  /**
   * Wrap a JavaScript value into a Ruby JS::Object
   * @param value The value to convert to RbValue
   * @returns the RbValue object representing the given JS value
   *
   * @example
   * const hash = vm.eval(`Hash.new`)
   * hash.call("store", vm.eval(`"key1"`), vm.wrap(new Object()));
   */
  wrap(e) {
    return this.transport.importJsValue(e, this);
  }
  /** @private */
  privateObject() {
    return {
      transport: this.transport,
      exceptionFormatter: this.exceptionFormatter
    };
  }
  /** @private */
  rbValueOfPointer(e) {
    const r = new D(e, this.guest);
    return new S(r, this, this.privateObject());
  }
}
class Te {
  constructor() {
    this._takenJsValue = null;
  }
  takeJsValue(e) {
    this._takenJsValue = e;
  }
  consumeJsValue() {
    return this._takenJsValue;
  }
  exportJsValue(e) {
    return e.call("__export_to_js"), this._takenJsValue;
  }
  importJsValue(e, r) {
    return this._takenJsValue = e, r.eval('require "js"; JS::Object').call("__import_from_js");
  }
}
class S {
  /**
   * @hideconstructor
   */
  constructor(e, r, s) {
    this.inner = e, this.vm = r, this.privateObject = s;
  }
  /**
   * Call a given method with given arguments
   *
   * @param callee name of the Ruby method to call
   * @param args arguments to pass to the method. Must be an array of RbValue
   * @returns The result of the method call as a new RbValue.
   *
   * @example
   * const ary = vm.eval("[1, 2, 3]");
   * ary.call("push", 4);
   * console.log(ary.call("sample").toString());
   */
  call(e, ...r) {
    const s = r.map((o) => o.inner);
    return new S(Y(this.vm, this.privateObject, this.inner, e, s), this.vm, this.privateObject);
  }
  /**
   * Call a given method that may call `JS::Object#await` with given arguments
   *
   * @param callee name of the Ruby method to call
   * @param args arguments to pass to the method. Must be an array of RbValue
   * @returns A Promise that resolves to the result of the method call as a new RbValue.
   *
   * @example
   * const client = vm.eval(`
   *   require 'js'
   *   class HttpClient
   *     def get(url)
   *       JS.global.fetch(url).await
   *     end
   *   end
   *   HttpClient.new
   * `);
   * const response = await client.callAsync("get", vm.eval(`"https://example.com"`));
   */
  callAsync(e, ...r) {
    const s = this.vm.eval("require 'js'; JS");
    return ue(this.vm, this.privateObject, (o) => {
      s.call("__call_async_method", this, this.vm.wrap(e), o, ...r);
    });
  }
  /**
   * @see {@link https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive}
   * @param hint Preferred type of the result primitive value. `"number"`, `"string"`, or `"default"`.
   */
  [Symbol.toPrimitive](e) {
    return e === "string" || e === "default" ? this.toString() : null;
  }
  /**
   * Returns a string representation of the value by calling `to_s`
   */
  toString() {
    const e = Y(this.vm, this.privateObject, this.inner, "to_s", []);
    return this.vm.guest.rstringPtr(e);
  }
  /**
   * Returns a JavaScript object representation of the value
   * by calling `to_js`.
   *
   * Returns null if the value is not convertible to a JavaScript object.
   */
  toJS() {
    const r = this.vm.eval("JS").call("try_convert", this);
    return r.call("nil?").toString() === "true" ? null : this.privateObject.transport.exportJsValue(r);
  }
}
var m;
(function(c) {
  c[c.None = 0] = "None", c[c.Return = 1] = "Return", c[c.Break = 2] = "Break", c[c.Next = 3] = "Next", c[c.Retry = 4] = "Retry", c[c.Redo = 5] = "Redo", c[c.Raise = 6] = "Raise", c[c.Throw = 7] = "Throw", c[c.Fatal = 8] = "Fatal", c[c.Mask = 15] = "Mask";
})(m || (m = {}));
class Ie {
  constructor() {
    this.literalsCache = null, this.isFormmatting = !1;
  }
  format(e, r, s) {
    class o extends Error {
    }
    if (this.isFormmatting)
      throw new o("Unexpected exception occurred during formatting exception message");
    this.isFormmatting = !0;
    try {
      return this._format(e, r, s);
    } finally {
      this.isFormmatting = !1;
    }
  }
  _format(e, r, s) {
    const [o, t, n] = (() => {
      if (this.literalsCache == null) {
        const u = [
          P(r, s, "0"),
          P(r, s, "1"),
          P(r, s, `"
"`)
        ];
        return this.literalsCache = u, u;
      } else
        return this.literalsCache;
    })();
    let i, a, l;
    try {
      i = e.call("class").toString();
    } catch {
      i = "unknown";
    }
    try {
      l = e.call("message").toString();
    } catch {
      l = "unknown";
    }
    try {
      a = e.call("backtrace");
    } catch {
      return this.formatString(i, l);
    }
    if (a.call("nil?").toString() === "true")
      return this.formatString(i, l);
    try {
      const u = a.call("at", o), f = a.call("drop", t).call("join", n);
      return this.formatString(i, l, [
        u.toString(),
        f.toString()
      ]);
    } catch {
      return this.formatString(i, l);
    }
  }
  formatString(e, r, s) {
    return s ? `${s[0]}: ${r} (${e})
${s[1]}` : `${e}: ${r}`;
  }
}
const oe = (c, e, r) => {
  switch (c & m.Mask) {
    case m.None:
      break;
    case m.Return:
      throw new R("unexpected return");
    case m.Next:
      throw new R("unexpected next");
    case m.Break:
      throw new R("unexpected break");
    case m.Redo:
      throw new R("unexpected redo");
    case m.Retry:
      throw new R("retry outside of rescue clause");
    case m.Throw:
      throw new R("unexpected throw");
    case m.Raise:
    case m.Fatal:
      const s = new S(e.guest.rbErrinfo(), e, r);
      throw s.call("nil?").toString() === "true" ? new R("no exception object") : (e.guest.rbClearErrinfo(), new R(r.exceptionFormatter.format(s, e, r)));
    default:
      throw new R(`unknown error tag: ${c}`);
  }
};
function le(c, e) {
  try {
    return e();
  } catch (r) {
    if (r instanceof R)
      throw r;
    try {
      c.guest.rbVmBugreport();
    } catch (s) {
      console.error("Tried to report internal Ruby VM state but failed: ", s);
    }
    if (r instanceof WebAssembly.RuntimeError && r.message === "unreachable") {
      const s = new R(`Something went wrong in Ruby VM: ${r}`);
      throw s.stack = r.stack, s;
    } else
      throw r;
  }
}
const Y = (c, e, r, s, o) => {
  const t = c.guest.rbIntern(s + "\0");
  return le(c, () => {
    const [n, i] = c.guest.rbFuncallvProtect(r, t, o);
    return oe(i, c, e), n;
  });
}, P = (c, e, r) => le(c, () => {
  const [s, o] = c.guest.rbEvalStringProtect(r + "\0");
  return oe(o, c, e), new S(s, c, e);
});
function ue(c, e, r) {
  return new Promise((s, o) => {
    const t = c.wrap({
      resolve: s,
      reject: (n) => {
        const i = new R(e.exceptionFormatter.format(n, c, e));
        o(i);
      }
    });
    r(t);
  });
}
class R extends Error {
  /**
   * @hideconstructor
   */
  constructor(e) {
    super(e);
  }
}
class X extends R {
  /**
   * @hideconstructor
   */
  constructor(e) {
    super("Ruby Fatal Error: " + e);
  }
}
const xe = async (c, e = {}) => {
  var r, s;
  const o = [], t = Object.entries((r = e.env) !== null && r !== void 0 ? r : {}).map(([f, d]) => `${f}=${d}`), n = [
    new C(new B([])),
    new C(new B([])),
    new C(new B([])),
    new me("/", /* @__PURE__ */ new Map())
  ], i = new Re(o, t, n, { debug: !1 }), a = !((s = e.consolePrint) !== null && s !== void 0) || s ? Ee() : void 0, { vm: l, instance: u } = await L.instantiateModule({
    module: c,
    wasip1: i,
    addToImports: (f) => {
      a?.addToImports(f);
    },
    setMemory: (f) => {
      a?.setMemory(f);
    }
  });
  return {
    vm: l,
    wasi: i,
    instance: u
  };
}, je = "https://cdn.jsdelivr.net/npm/@ruby/3.4-wasm-wasi@latest/dist/ruby.wasm", De = new URL(je, import.meta.url).href, Ae = await fetch(De), Fe = await Ae.arrayBuffer(), Ce = await WebAssembly.compile(Fe), { vm: Be } = await xe(Ce);
self.postMessage("initialized");
self.onmessage = async (c) => {
  console.log("hihihi", c.data);
  const e = Be.eval(c.data);
  e != null ? self.postMessage(e.toString()) : self.postMessage(null);
};
