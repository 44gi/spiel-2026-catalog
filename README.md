# Oink Games · SPIEL 2026 catalog

Mobile booth catalog in German and English, prepared for GitHub Pages.

- Source snapshot: visible rows of `Stock list for App`, October 9, 2026.
- Hidden rows are excluded. STRAY THIEVES is excluded.
- 131 visible source rows are consolidated by game or product family. Editions, colors and shirt sizes are retained.
- Prices come from the booth list, not the online store.
- Official product photos are saved locally as optimized WebP images. Source URLs are recorded in `asset-sources.json`.
- Stock quantities, staff prices, barcodes and internal notes are not published.

## Publish

In Settings → Pages, choose “Deploy from a branch”, `main`, `/(root)`. No build tools are needed.

## Update

This is a saved snapshot, not a live connection to Google Sheets. Update `products.json` and the corresponding cards in `index.html` together. Use the `data-id` attribute to locate a card. Save any new official images under `assets/`.

The browser's primary language selects German for `de` / `de-*`, and English otherwise. `?lang=de` and `?lang=en` override this through the language buttons. Images link to the matching language of the official product page. The German catalog works without JavaScript.

## Image gaps and product families

- Eggsposed T-Shirt and Deep Sea Adventure Felt Pouch have no verified official product photo or live product page; their prices and variants remain listed with a photo placeholder.
- The Autumn EN rulebook, Maskmen pin bundle and multi-variant accessories link to the official product-family page. Photos are explicitly labeled “Product range shown”; the exact Autumn EN cover has not been verified.

All Oink Games product imagery and trademarks belong to Oink Games. No third-party trackers or external image/font requests are used by the catalog.
