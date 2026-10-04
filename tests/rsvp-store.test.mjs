import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { saveRsvp, notificationSent, markNotificationSent } from '../lib/rsvp-store.ts';
test('storage preserves original response on retries and persists sent marker', async () => {
  const original = process.cwd();
  const directory = await mkdtemp(join(tmpdir(), 'wedding-store-'));
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const mode = process.env.NODE_ENV;
  delete process.env.BLOB_READ_WRITE_TOKEN;
  process.env.NODE_ENV = 'development';
  process.chdir(directory);
  try {
    const value = {id:'test',name:'Liza',email:'test@example.com',attendance:'yes',guests:2,wants:'yes',able:'yes',abroad:true,country:'Algérie',letter:true,dietary:'Aucune',message:''};
    await saveRsvp(value);
    assert.equal((await saveRsvp({...value,name:'Changed'})).name, 'Liza');
    assert.equal(await notificationSent(value.id), false);
    await markNotificationSent(value.id);
    assert.equal(await notificationSent(value.id), true);
    process.env.NODE_ENV = 'production';
    await assert.rejects(() => saveRsvp(value), /configuration missing/);
  } finally {
    process.chdir(original);
    if(token === undefined) delete process.env.BLOB_READ_WRITE_TOKEN; else process.env.BLOB_READ_WRITE_TOKEN = token;
    if(mode === undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV = mode;
    await rm(directory, {recursive:true,force:true});
  }
});
