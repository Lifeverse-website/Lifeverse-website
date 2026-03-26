# LifeVerse Technologies - Cloudflare Pages Starter

This package is a clean starter for a LifeVerse Technologies website with:

- Responsive frontend
- LifeVerse RP, LifeCoin, LifeVerse Games, and Lifetime sections
- LifeCoin mining calculator
- Cloudflare Pages Functions starter endpoints
- Documentation for deployment and updates

## Folder structure

- `index.html` - main page
- `css/styles.css` - site styles
- `js/app.js` - mobile menu, mining calculator, contact form
- `assets/img` - uploaded brand images
- `assets/icons` - starter SVG logos for RP, Games, and Lifetime
- `functions/api/mining.js` - mining JSON endpoint
- `functions/api/contact.js` - contact form starter endpoint
- `docs` - setup and branding notes

## Deploy to Cloudflare Pages

1. Open Cloudflare Pages.
2. Create a new Pages project.
3. Upload the full contents of this folder.
4. Use:
   - Framework preset: None
   - Build command: leave empty
   - Build output directory: `.`
5. Deploy.

## Notes

- The mining model is a starter calculator and should be updated with final LFC economics later.
- The contact endpoint currently validates data and returns a success message. Connect a real mail service when ready.
- The starter SVG logos for LifeVerse Games and Lifetime are designed to match the slong brand family. Replace them any time.
