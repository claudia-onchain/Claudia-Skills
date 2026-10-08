// Minimal deterministic ZIP writer (PKZIP 2.0: stored or deflated entries, UTF-8 names, unix modes). No dependencies.
// Same inputs → byte-identical output, so the sha256 in index.json only changes when content changes.
import { deflateRawSync } from "node:zlib";

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

export function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/** DOS date/time for a Date (local fields are not used: we write the UTC fields so builds match across machines). */
function dosTime(d) {
  const year = Math.max(1980, d.getUTCFullYear());
  return {
    time: ((d.getUTCHours() & 31) << 11) | ((d.getUTCMinutes() & 63) << 5) | (Math.floor(d.getUTCSeconds() / 2) & 31),
    date: (((year - 1980) & 127) << 9) | (((d.getUTCMonth() + 1) & 15) << 5) | (d.getUTCDate() & 31),
  };
}

/**
 * entries: [{ name: "slug/SKILL.md", data: Buffer, mode?: 0o644 }] or directories { name: "slug/", dir: true }.
 * Returns a Buffer with the complete archive. Parent directory entries are added automatically.
 */
export function createZip(entries, { date = new Date(Date.UTC(2026, 0, 1)), level = 9 } = {}) {
  const { time, date: ddate } = dosTime(date);
  const all = [];
  const dirs = new Set();
  for (const e of entries) {
    const parts = e.name.split("/").filter(Boolean);
    for (let i = 1; i < (e.dir ? parts.length + 1 : parts.length); i++) {
      const d = `${parts.slice(0, i).join("/")}/`;
      if (!dirs.has(d)) {
        dirs.add(d);
        all.push({ name: d, dir: true });
      }
    }
    if (!e.dir) all.push(e);
  }
  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const e of all) {
    if (e.name.startsWith("/") || e.name.split("/").includes("..")) throw new Error(`unsafe zip entry name: ${e.name}`);
    const name = Buffer.from(e.name, "utf8");
    const raw = e.dir ? Buffer.alloc(0) : Buffer.isBuffer(e.data) ? e.data : Buffer.from(e.data);
    const crc = e.dir ? 0 : crc32(raw);
    let method = 0;
    let body = raw;
    if (!e.dir && raw.length > 0) {
      const def = deflateRawSync(raw, { level });
      if (def.length < raw.length) {
        method = 8;
        body = def;
      }
    }
    if (body.length > 0xfffffffe || offset > 0xfffffffe) throw new Error("archive too large for ZIP32");
    const flags = 0x0800; // UTF-8 names
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(flags, 6);
    local.writeUInt16LE(method, 8);
    local.writeUInt16LE(time, 10);
    local.writeUInt16LE(ddate, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(raw.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, name, body);

    const mode = e.dir ? 0o40755 : 0o100000 | ((e.mode ?? 0o644) & 0o777);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE((3 << 8) | 20, 4); // made by: unix, spec 2.0
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(flags, 8);
    central.writeUInt16LE(method, 10);
    central.writeUInt16LE(time, 12);
    central.writeUInt16LE(ddate, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(body.length, 20);
    central.writeUInt32LE(raw.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt16LE(0, 30); // extra
    central.writeUInt16LE(0, 32); // comment
    central.writeUInt16LE(0, 34); // disk
    central.writeUInt16LE(0, 36); // internal attrs
    central.writeUInt32LE(((mode << 16) | (e.dir ? 0x10 : 0)) >>> 0, 38);
    central.writeUInt32LE(offset, 42);
    centrals.push(central, name);
    offset += local.length + name.length + body.length;
  }
  if (all.length > 0xffff) throw new Error("too many entries for ZIP32");
  const cd = Buffer.concat(centrals);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(all.length, 8);
  eocd.writeUInt16LE(all.length, 10);
  eocd.writeUInt32LE(cd.length, 12);
  eocd.writeUInt32LE(offset, 16);
  eocd.writeUInt16LE(0, 20);
  return Buffer.concat([...locals, cd, eocd]);
}
