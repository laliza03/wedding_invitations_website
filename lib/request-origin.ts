/** Compare the browser origin with the public host, including proxy deployments. */
export function hasAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  try {
    const source = new URL(origin);
    if (!['http:', 'https:'].includes(source.protocol)) return false;
    const host = req.headers.get('x-forwarded-host')?.split(',')[0].trim() || req.headers.get('host');
    const protocol = req.headers.get('x-forwarded-proto')?.split(',')[0].trim() || new URL(req.url).protocol.slice(0, -1);
    const expected = host ? new URL(`${protocol}://${host}`).origin : new URL(req.url).origin;
    return source.origin === expected;
  } catch { return false; }
}
