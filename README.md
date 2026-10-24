# Wad Tamim for Crops

A production-oriented bilingual corporate website for **Wad Tamim for Crops / ود تميم للمحاصيل**, built with React, TypeScript, Vite, Tailwind CSS, i18next, Firebase Hosting, Firestore, Cloud Functions, and Resend.

## Included functionality

- Arabic-first interface with persistent Arabic/English switching and automatic RTL/LTR layout.
- Persistent light/dark themes using the supplied brand assets.
- Responsive Home, About, Products, Contact, and custom 404 routes.
- Seven-product catalog using the customer-supplied photographs identified by `MEDIA_MANIFEST.json`.
- Product links to `/contact?product=product-slug` with automatic form preselection.
- Zod and React Hook Form client validation, encoded WhatsApp inquiries, click-to-call, and email links.
- HTTPS Cloud Function with server validation, sanitization, request-size limits, honeypot/timing checks, salted IP rate limiting, server-owned Firestore writes, and idempotent Resend delivery.
- Firestore rules that deny all browser reads and writes to inquiry and rate-limit documents.
- Firebase Hosting SPA rewrites, function proxy, and static-asset cache headers.

## Approved media mapping

All listed photographs are user supplied. The approved assets are used without additional recompression, AI editing, or artificial upscaling. Unused duplicate and source images are excluded from the deployable `public/media/` tree.

| Product | Asset |
| --- | --- |
| Gum Arabic / الصمغ العربي | `/media/products/gum-arabic.webp` |
| Frankincense / صمغ اللبان | `/media/products/frankincense-luban.webp` |
| Hibiscus / الكركديه | `/media/products/hibiscus-bulk.webp` |
| Watermelon Seeds (Tasali) / التسالي | `/media/products/tasali-watermelon-seeds.webp` |
| Tamarind / العرديب | `/media/products/tamarind-aradeib.webp` |
| Sesame / السمسم | `/media/products/sesame.webp` |
| Gudeim / القضيم | `/media/products/gudeim-grewia.webp` |

The secondary hibiscus photograph is `/media/products/hibiscus-hand.webp`. The Home and About heroes use `/media/heroes/loading.jpg` and `/media/heroes/sacks.jpg`. The portrait operations photographs are `/media/operations/warehouse-sacks-01.webp`, `warehouse-sacks-02.webp`, and `warehouse-sacks-03.webp`; they are presented in portrait-aware layouts rather than stretched into full-width backgrounds.

Branding uses `/media/branding/logo-light.webp` in light mode and `/media/branding/logo-dark-original.webp` in dark mode.

## Requirements

- Node.js 22, matching the Firebase Functions runtime in `functions/package.json`.
- npm.
- Firebase CLI: `npm install -g firebase-tools`.
- A Firebase project with Firestore enabled.
- The Firebase **Blaze plan** for Cloud Functions deployment and outbound Resend HTTPS requests.
- A Resend account with a verified sending domain/address.

## Local setup

```powershell
npm ci
npm --prefix functions ci
Copy-Item .env.example .env.local
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173/`. Do not open `index.html` directly.

The production default in `.env.example` is the same-origin Hosting rewrite:

```dotenv
VITE_INQUIRY_ENDPOINT=/api/inquiries
```

For local form submission, set `VITE_INQUIRY_ENDPOINT` in `.env.local` to either a deployed development function or the emulator URL:

```dotenv
VITE_INQUIRY_ENDPOINT=http://127.0.0.1:5001/YOUR_PROJECT_ID/africa-south1/submitInquiry
```

Copy `functions/.env.example` to `functions/.env.local` for emulator-only, non-secret parameters. Configure emulator-compatible values for the two secrets, then run the backend and frontend in separate terminals:

```powershell
npm --prefix functions run serve
npm run dev
```

## Checks and production build

```powershell
npm run typecheck
npm run functions:build
npm run build
```

The combined command is:

```powershell
npm run check
```

No live Firebase or Resend delivery is exercised by these local compilation checks.

## Firebase configuration

1. Create or select a Firebase project, enable billing, and create Firestore in production mode. Choose a location appropriate for the project; `submitInquiry` runs in `africa-south1`.
2. Authenticate and select the project without committing its ID:

```powershell
firebase login
firebase use --add
```

Alternatively, copy `.firebaserc.example` to `.firebaserc` and replace `YOUR_FIREBASE_PROJECT_ID` locally.

3. Copy `functions/.env.example` to `functions/.env.YOUR_PROJECT_ID` and set non-secret runtime parameters:

```dotenv
RESEND_FROM_EMAIL=Wad Tamim Website <inquiries@your-verified-domain.example>
ALLOWED_ORIGINS=https://YOUR_PROJECT_ID.web.app,https://YOUR_PROJECT_ID.firebaseapp.com,https://your-domain.example
```

`RESEND_FROM_EMAIL` must use a sender/domain verified by Resend. The recipient Gmail address is not used as the sender.

4. Store secrets in Firebase Secret Manager:

```powershell
firebase functions:secrets:set RESEND_API_KEY
firebase functions:secrets:set RATE_LIMIT_SALT
```

Generate a long random `RATE_LIMIT_SALT`; do not reuse the Resend key.

5. Copy `.env.example` to `.env.production` and keep the same-origin endpoint:

```dotenv
VITE_INQUIRY_ENDPOINT=/api/inquiries
```

6. Replace `YOUR_PROJECT_ID` in `public/sitemap.xml` and `public/robots.txt` with the authorized production Firebase/custom domain before deployment. Add the final canonical URL once the domain is known.

7. Optional maintenance: enable Firestore TTL for `_inquiryRateLimits.expiresAt` to remove stale rate-limit documents automatically.

## Inquiry and email behavior

1. The browser validates the form and sends it to the HTTPS function.
2. The function validates origin, method, size, honeypot, timing, and schema, then sanitizes text.
3. A salted IP hash is limited to five new inquiries per ten-minute window.
4. The server creates `inquiries/{requestId}` with a Firestore server timestamp; browsers cannot write directly.
5. Email delivery uses a stable Resend idempotency key. Firestore tracks `pending`, `sending`, `sent`, or `failed`, along with `emailAttempts`.
6. Repeating the same request safely retries a failed/stale email attempt, up to three attempts, while a two-minute lease prevents concurrent sends.
7. A Resend failure never removes the stored inquiry. The frontend distinguishes saved-and-sent from saved-with-email-failed/pending.

## Deployment

After the project, billing, Firestore, sender, parameters, secrets, domains, and production endpoint are configured:

```powershell
npm ci
npm --prefix functions ci
npm run check
firebase deploy --only firestore
firebase deploy --only functions
firebase deploy --only hosting
```

To deploy all configured Firebase resources after a successful check:

```powershell
firebase deploy
```

The Hosting rewrite sends `/api/inquiries` to `submitInquiry` in `africa-south1`, while all other unknown paths return `index.html` for React Router.

## Remaining live-verification requirements

The repository intentionally does not contain a Firebase project ID, Resend key, rate-limit salt, verified sender, or final production domain. Until those are supplied and deployed, do not claim that Firestore persistence or email delivery has passed a real end-to-end test.
