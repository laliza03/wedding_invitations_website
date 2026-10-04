export interface RsvpEmailData {
  id: string; name: string; email: string; attendance: string; guests: number;
  wants: string; able: string; abroad: boolean | number; country: string;
  letter: boolean | number; dietary: string; message: string;
}

export function rsvpEmailContent(v: RsvpEmailData) {
  const answer = (value: string) => ({yes:'Oui',no:'Non',pending:'À confirmer'}[value] ?? value);
  return {
    subject: `[mariage 2027 : réponse formulaire ${v.name.replace(/[\r\n]/g, ' ')}]`,
    text: [
      'Nouvelle réponse au mariage de Liza et Zakaria — 8 août 2027',
      '', `Nom complet : ${v.name}`, `Adresse courriel : ${v.email}`,
      `Souhaite venir : ${answer(v.wants)}`, `Peut être présent : ${answer(v.able)}`,
      `Présence : ${answer(v.attendance)}`, `Nombre de personnes : ${v.guests}`,
      `Vient de l’étranger : ${v.abroad ? 'Oui' : 'Non'}`,
      `Pays de résidence : ${v.country || 'Non indiqué'}`,
      `Lettre d’invitation pour le visa demandée : ${v.letter ? 'OUI — demande à traiter' : 'Non'}`,
      '', 'Préférences alimentaires et allergies :', v.dietary,
      '', 'Petit mot :', v.message || 'Aucun', '', `Référence de la réponse : ${v.id}`,
    ].join('\n'),
  };
}

export async function sendRsvpEmail(v: RsvpEmailData, config: {apiKey?: string; from?: string}, transport: typeof fetch = fetch) {
  if (!config.apiKey || !config.from) throw new Error('Email configuration missing');
  const content = rsvpEmailContent(v);
  const response = await transport('https://api.resend.com/emails', {
    method: 'POST',
    headers: {'Content-Type':'application/json', Authorization:`Bearer ${config.apiKey}`, 'Idempotency-Key':`wedding-rsvp/${v.id}`},
    body: JSON.stringify({from:config.from,to:['lizabenkadoum@gmail.com'],reply_to:v.email,...content}),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
  const result = await response.json() as {id?: string};
  if (!result.id) throw new Error('Email provider did not confirm acceptance');
  return result.id;
}
