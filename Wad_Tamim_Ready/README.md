# Wad Tamim — media ready for Codex

Copy the **public/media/** directory into the root of a Vite project (so assets resolve at `/media/...`).

All product and operations photos are **actual user-provided photographs**. No generated crop imagery, artificial warehouse photos, or scraped stock photography are included. Images were only re-encoded as WebP (no AI enhancement, relighting, retouching or reshaping). Original JPEGs are in `public/media/originals/`.

## Approved usage
- Hibiscus: `products/hibiscus-*`
- Gum/resin: `products/gum-arabic-*` — verify the precise commercial species/grade with the business before describing each photo as hashab gum.
- Warehouse/sacks and logistics: `operations/sacks-stacked-*`; these are real photos supplied by the user.
- Market scene: `operations/sudan-crop-market.webp`.
- Branding: `branding/logo-light.webp` and `branding/logo-dark-original.webp`. **The original dark logo has low contrast on black**; use a contrasting CSS surface around it or request a higher-contrast original, rather than altering the mark.

## Important exclusions
There are currently **no approved product photographs** for tasali (watermelon seeds), gudeim (Grewia fruit), tamarind, sesame, or frankincense. Do NOT repurpose hibiscus, gum or any other image as these products. Use a clean text/illustrative neutral placeholder until authentic verified commercial-use photos are provided. The reference ads are not standalone product photos.

## For Codex
Read `MEDIA_MANIFEST.json` for exact URLs and original names. Prefer `<picture>`/`img` with `loading=lazy`, `decoding=async`, `object-fit: cover` only when crop does not hide product identity; `alt` in Arabic and English. Hero images must not contain text baked into the image. Do not invent inventory, certifications, shipment history, or warehouses owned by the company.
