---
type: "query"
date: "2026-10-24T00:04:07.321206+00:00"
question: "Remove the Gum Arabic photo note, use loading.jpg and sacks.jpg in exactly two existing hero sections, and delete every unused site image."
contributor: "graphify"
outcome: "useful"
source_nodes: ["MEDIA_MANIFEST.json", "Accessible and identity-preserving web image delivery"]
---

# Q: Remove the Gum Arabic photo note, use loading.jpg and sacks.jpg in exactly two existing hero sections, and delete every unused site image.

## Answer

Expanded via graph vocabulary: [hero, image, media, photo, photograph, product, arabic]. Home now uses /media/heroes/loading.jpg and About uses /media/heroes/sacks.jpg with landscape-aware 3:2 cropping; Products and Contact heroes remain unchanged. The Gum Arabic note was removed in both languages. Runtime reference analysis retained 17 images and deleted 37 unused images from public/media. MEDIA_MANIFEST.json now recommends the two new heroes.

## Outcome

- Signal: useful

## Source Nodes

- MEDIA_MANIFEST.json
- Accessible and identity-preserving web image delivery