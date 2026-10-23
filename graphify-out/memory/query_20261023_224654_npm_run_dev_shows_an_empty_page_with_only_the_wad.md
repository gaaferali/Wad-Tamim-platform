---
type: "query"
date: "2026-10-23T22:46:54.250377+00:00"
question: "npm run dev shows an empty page with only the Wad Tamim title"
contributor: "graphify"
outcome: "dead_end"
source_nodes: ["Vite media integration"]
---

# Q: npm run dev shows an empty page with only the Wad Tamim title

## Answer

Expanded from graph vocabulary: [app, content, vite]. The graph traversal only covered media integration and did not diagnose the runtime failure. Direct console evidence identified ScrollToTop returning window.scrollTo from useEffect; React Strict Mode attempted to invoke that return value as cleanup and crashed with destroy is not a function. Fixed the effect to return undefined and removed unsupported fetchPriority.

## Outcome

- Signal: dead_end

## Source Nodes

- Vite media integration