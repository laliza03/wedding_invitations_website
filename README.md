# Mariage de Liza et Zakaria

Site d’invitation en français — 8 août 2027. Next.js, formulaire RSVP, notifications Resend, musique et invitation animée.

## Déploiement sur Vercel

Importez ce dépôt avec le preset **Next.js**, répertoire racine `./`, commande de build `npm run build`.

Avant de tester le formulaire en production :

1. Dans Storage, créez et connectez un store **Vercel Blob privé** au projet. La variable `BLOB_READ_WRITE_TOKEN` doit être disponible dans l’environnement de déploiement.
2. Ajoutez `RESEND_API_KEY` et `RSVP_EMAIL_FROM` dans les variables d’environnement Vercel. Exemple d’expéditeur pour le test : `Mariage Liza et Zakaria <onboarding@resend.dev>`.
3. Redéployez après avoir configuré ces variables.

Les notifications sont envoyées à `lizabenkadoum@gmail.com`, avec le nom complet dans l’objet. Les réponses sont conservées dans le stockage privé, même si une notification échoue. L’expéditeur de test Resend est réservé au destinataire autorisé par votre compte ; utilisez un domaine vérifié pour changer d’expéditeur.

Ne publiez jamais les fichiers `.env.local` ou `.dev.vars` ni votre clé API.

## Développement

`npm install`, puis `npm run dev` : http://localhost:5173.

Placez les variables Resend dans `.env.local`. Sans token Blob, le développement conserve les réponses dans `.data/`, ignoré par Git. En production, le stockage privé est obligatoire.

Vérifications : `npm run build` et `node --experimental-strip-types --test tests/rsvp-email.test.mjs`.

Les anciens fichiers Cloudflare sont conservés pour référence ; le déploiement et les scripts actifs utilisent Next.js et Vercel.
