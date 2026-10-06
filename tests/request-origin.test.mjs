import test from 'node:test';
import assert from 'node:assert/strict';
import { hasAllowedOrigin } from '../lib/request-origin.ts';
test('accepts the preview public host when Next uses an internal localhost URL', () => {
  assert.equal(hasAllowedOrigin(new Request('http://localhost:5173/api/rsvp', {headers:{host:'127.0.0.1:5173',origin:'http://127.0.0.1:5173'}})), true);
});
test('accepts the public HTTPS origin behind a proxy', () => {
  assert.equal(hasAllowedOrigin(new Request('http://localhost:3000/api/rsvp', {headers:{'x-forwarded-host':'lizaandzaki.vercel.app','x-forwarded-proto':'https',origin:'https://lizaandzaki.vercel.app'}})), true);
});
test('rejects unrelated origins and invalid origins', () => {
  for(const origin of ['https://example.com','null']) assert.equal(hasAllowedOrigin(new Request('http://localhost:5173/api/rsvp',{headers:{host:'127.0.0.1:5173',origin}})),false);
});
