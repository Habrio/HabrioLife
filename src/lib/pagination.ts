export function toInt(v: string | string[] | undefined, def = 1) {
  const n = Number(Array.isArray(v) ? v[0] : v);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : def;
}

export function pageCount(total: number, pageSize: number) {
  return Math.max(1, Math.ceil((total || 0) / pageSize));
}

