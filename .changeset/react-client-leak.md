---
'@bento/use-svg-sprite': patch
'@bento/icon': patch
'@godaddy/antares': patch
---

fix: register SVG sprites through the app's React tree without importing react-dom/client. Render the hook's returned SVG to register its symbol.

fix: update SVG references when the environment sprite URL changes.
