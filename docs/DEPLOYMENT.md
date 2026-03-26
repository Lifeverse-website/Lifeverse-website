# LifeVerse Website Deployment Guide

## GitHub repo structure
```text
lifeverse-website/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── functions/
│   └── api/
│       ├── mining.js
│       └── contact.js
├── assets/
│   ├── img/
│   └── icons/
└── docs/
```

## Upload to GitHub
1. Create a new repository named `lifeverse-website`.
2. Upload `index.html` to the repo root.
3. Upload the `css`, `js`, `assets`, `functions`, and `docs` folders.
4. Commit to the `main` branch.

## Deploy to Cloudflare Pages
Use these exact settings:
- **Framework preset:** None
- **Build command:** leave empty
- **Build output directory:** `.`
- **Root directory:** leave empty unless the website is inside a subfolder

## Backend notes
The `functions/api` folder is for Cloudflare Pages Functions:
- `/api/mining` returns mining calculation JSON
- `/api/contact` validates form submissions and can be connected to a real email service later

## Final production steps
- Replace placeholder contact info with official company details
- Upload final brand images to `assets/img`
- Connect custom domain when ready
- Add email sending service for the contact form
- Add D1 or another database only when you need admin/content storage
