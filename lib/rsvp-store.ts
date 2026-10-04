import { get, put } from '@vercel/blob';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { RsvpEmailData } from './rsvp-email';

const local = () => !process.env.BLOB_READ_WRITE_TOKEN && process.env.NODE_ENV !== 'production' && !process.env.VERCEL;
async function read<T>(path: string): Promise<T | null> {
  if (local()) {
    try { return JSON.parse(await readFile(join(process.cwd(), '.data', path), 'utf8')); }
    catch (error) { if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null; throw error; }
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('Private Blob storage configuration missing');
  const result = await get(path, { access: 'private', useCache: false });
  if (!result) return null;
  if (!result.stream) throw new Error('Storage response missing');
  return await new Response(result.stream).json() as T;
}
async function create<T>(path: string, value: T): Promise<T> {
  try {
    if (local()) {
      const file = join(process.cwd(), '.data', path);
      await mkdir(join(file, '..'), { recursive: true });
      await writeFile(file, JSON.stringify(value), { flag: 'wx' });
    } else {
      if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('Private Blob storage configuration missing');
      await put(path, JSON.stringify(value), { access: 'private', addRandomSuffix: false, allowOverwrite: false, contentType: 'application/json' });
    }
    return value;
  } catch (error) {
    const existing = await read<T>(path);
    if (existing) return existing;
    throw error;
  }
}
export async function saveRsvp(value: RsvpEmailData) {
  return create(`rsvps/${value.id}.json`, { ...value, created_at: new Date().toISOString() });
}
export async function notificationSent(id: string) {
  return Boolean(await read(`notifications/${id}.json`));
}
export async function markNotificationSent(id: string) {
  await create(`notifications/${id}.json`, { sent_at: new Date().toISOString() });
}
