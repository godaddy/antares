---
"@godaddy/antares": patch
---

fix(gauge-chart): align sublabel and range label typography to design spec

- Switch sublabel and range label font-size from fixed token to CQI units so they scale proportionally with the container
- Isolate range label typography tokens (font-weight, line-height) from sublabel tokens
- Add overflow: hidden to range labels to clip long values at 4ch
- Fix explicit grid placement for min/max range labels to avoid auto-placement fragility
- Add CSS variable fallback values for all --ux-{hash} tokens
