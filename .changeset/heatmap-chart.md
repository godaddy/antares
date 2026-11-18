---
'@godaddy/antares': minor
---

Add HeatmapChart, a two-dimensional chart that fills a grid of cells from discrete color buckets. It supports closed cells, a centered legend, a hover and keyboard-focus tooltip with a custom `renderTooltip` option, and RTL. Height works two ways: with no `height` the chart wraps its rows (`minCellHeight`, 40px by default), and with a `height` the rows stretch to fill it, scroll when it is too small, and stop at `maxCellHeight`. A cell is never smaller than 40px wide or tall, the minimum tap target. The chart can also be composed: pass children and place `HeatmapPlot`, `HeatmapLegend` and `HeatmapTooltip` with your own `Header`, `Content` and `Footer`.
