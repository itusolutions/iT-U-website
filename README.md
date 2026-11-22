# iTu Solutions website

Static multi-page website for iTu Solutions.

## Requirements
- Node.js and npm

## Install and build
```bash
npm install
npm run dev
npm run build
```

Commit `assets/css/tailwind.css` after building. GitHub Pages serves static files and does not run the Tailwind build process.

## Deployment
- Publish the repository root with GitHub Pages.
- Configure the custom domain `www.it-u.co.za`.
- Configure DNS with your domain provider and verify HTTPS.

## Before launch
- Replace placeholder copy and add genuine project images.
- Connect contact, newsletter and unsubscribe forms to real providers.
- Review legal pages for actual business practices and applicable South African law.
- Test all links, forms, mobile layouts and canonical URLs.
- Run `npm run build` and commit the generated CSS.


## Local image assets
The `assets/images/` folder contains original SVG artwork used in the page hero sections, plus the iTu Solutions logo and favicon. These assets are stored locally in the project; no external image host is required.

## Build before publishing
Run `npm install` and then `npm run build` to generate the Tailwind CSS file referenced by the pages. Connect the contact, newsletter and unsubscribe forms to a form-handling/email provider before accepting live submissions.
