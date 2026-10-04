import { env } from 'cloudflare:workers';
export function rsvpDb(){if(!env.DB) throw new Error('RSVP storage unavailable');return env.DB;}
