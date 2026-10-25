# Wad Tamim for Crops

The official bilingual website for **Wad Tamim for Crops (ود تميم للمحاصيل)**, presenting Sudanese agricultural products and providing direct commercial inquiry channels.

## Features

- Arabic RTL and English LTR interfaces
- Responsive layouts for desktop, tablet, and mobile
- Light and dark themes with saved user preferences
- Seven accurately identified crop products with authentic supplied photography
- Product-specific inquiry links
- Validated inquiry form that prepares a WhatsApp message
- Direct WhatsApp, telephone, and email contact links
- Search-engine metadata, sitemap, and `robots.txt`
- Firebase Hosting configuration with single-page application routing

The inquiry form does **not** store form data or send it to a database or email service. After local validation, it opens WhatsApp with the completed inquiry for the visitor to review and send.

## Technology

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- i18next
- React Hook Form and Zod
- Firebase Hosting

## Project structure

```text
public/
  media/             Public brand, hero, operations, and product images
  robots.txt
  sitemap.xml
src/
  components/        Shared interface components
  data/              Product definitions and image mappings
  i18n/              Arabic and English translations
  lib/               Contact details and WhatsApp URL helper
  pages/             Route-level pages
  styles/            Global styles
firebase.json        Safe, versioned Hosting configuration
```

## Local development

Use Node.js 20 LTS or a newer compatible version.

```bash
npm ci
npm run dev
```

Vite prints the local development address in the terminal, normally `http://localhost:5173`.

## Production checks

```bash
npm run typecheck
npm run build
```

The production output is generated in `dist/`. That directory is intentionally ignored because Firebase and other hosting systems should build it from the committed source.

## Firebase deployment

This repository contains only the non-secret Firebase Hosting configuration. It does not contain Cloud Functions, Firestore rules, service-account credentials, or database exports.

1. Install the Firebase CLI and sign in:

   ```bash
   npm install --global firebase-tools
   firebase login
   ```

2. Confirm that your Firebase project already has Hosting enabled.

3. Build and deploy using your own project ID:

   ```bash
   npm ci
   npm run build
   firebase deploy --only hosting --project "YOUR_FIREBASE_PROJECT_ID"
   ```

Alternatively, run `firebase use --add` once. It creates a local `.firebaserc` file, which is excluded from Git.

To connect a custom domain, open **Firebase Console → Hosting → Add custom domain**, enter the domain, and add the DNS records Firebase supplies. Firebase provisions the SSL certificate after DNS verification.

## License

All source code and supplied media in this repository are proprietary to Wad Tamim for Crops unless the owner states otherwise. Do not reuse the brand assets or photographs without permission.
