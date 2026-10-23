# CODEX TASK — REPLACE INCORRECT IMAGES AND PREPARE EXISTING SITE FOR FIREBASE DEPLOYMENT

You are working inside the EXISTING project folder `wad Tamim for Crops`. The site has already been implemented. **Do not rebuild the site from scratch, create a nested project, or delete existing functionality.**

I have extracted a replacement media archive into this project. Inspect the actual directory structure, read `MEDIA_MANIFEST.json`, and locate `public/media`. If extraction created a wrapper directory, move/copy the assets into the existing `public/media` as appropriate. Preserve all originals.

## Priority 1 — Correct product identity everywhere

Use the following EXPLICIT mappings from the new manifest and do not guess:
- التسالي / Tasali (watermelon seeds): `/media/products/tasali-watermelon-seeds.webp`
- العرديب / Tamarind: `/media/products/tamarind-aradeib.webp`
- الصمغ العربي / Gum Arabic: `/media/products/gum-arabic.webp`
- صمغ اللبان / Frankincense: `/media/products/frankincense-luban.webp`
- القضيم / Gudeim: `/media/products/gudeim-grewia.webp`
- الكركدي / Hibiscus: `/media/products/hibiscus-bulk.webp` and optionally `/media/products/hibiscus-hand.webp`
- السمسم / Sesame: `/media/products/sesame.webp`

Fix ALL product imagery across Home featured products, Products page, related cards, inquiry links, SEO/OG image metadata, and any data arrays. **Gum Arabic must never show baobab/gongoleiz or another crop.** Remove references to incorrect legacy product images. Do not use AI generated or misleading product images.

## Priority 2 — Fix the poor-quality hero and warehouse images

Use the actual company-supplied sack photos:
- `/media/operations/warehouse-sacks-01.webp`
- `/media/operations/warehouse-sacks-02.webp`
- `/media/operations/warehouse-sacks-03.webp`

These photos are portrait oriented. Do NOT stretch them into wide backgrounds, upscale excessively, or crop away most of their contents. Rebuild ONLY the hero visual composition if needed: use an elegant responsive split layout with headline/CTAs on one side and a properly contained/cropped high-quality warehouse photograph on the other. Use image aspect-ratio and object-position deliberately. On mobile, ensure the important sacks remain visible. Keep text as actual HTML, not burned into images. Use genuine user-provided photographs in About/operations sections. Avoid generated collages.

## Priority 3 — Branding and fidelity

Use `/media/branding/logo-light.webp` for light mode and `/media/branding/logo-dark-original.webp` for dark mode, subject to contrast; do not distort the logo. Preserve light/dark theme toggles and Arabic RTL/English LTR functionality. Keep all seven product names and translations correct. No aggressive photo retouching, AI modifications, fake texture, or fabricated warehouse scenes. The new images are already WebP-optimized. Avoid extra lossy recompression or large CSS scaling beyond intrinsic resolution. Use srcset only if you can create real downscaled derivatives from the originals.

## Priority 4 — Maintain functional workflows

Preserve all routes, mobile navigation, WhatsApp contact, click-to-call, product-to-contact preselection, bilingual contact form, and existing Firebase Firestore + Cloud Function + email integration. Check that form writes are server-side validated, persisted to Firestore, and email attempts have accurate statuses and retries; never fake successful delivery. Do not embed email API keys in client code.

## Priority 5 — Deployment readiness

Review Firebase Hosting SPA rewrites, Firebase Cloud Functions configuration, Firestore rules, `.env.example`, secrets documentation, responsive behavior, SEO, accessibility, and build output. Run install/build/typecheck/test commands available in the repo and fix errors. Do not claim real email or deployed Firebase tests passed without credentials and real verification. Document exact commands and manual setup needed for Firebase Blaze (if required), verified email sender, Resend API secret, and Firebase deploy. Do not change Firebase project IDs without authorization.

## Final output

Actually edit the existing codebase. Report: changed files; final image-to-product mapping; which hero images are used; any missing credentials/deployment blockers; results of build/typecheck; precise Firebase deploy commands. Do not replace real photographs with generated ones.
