# iTu Solutions Website

Official domain: [https://www.it-u.co.za/](https://www.it-u.co.za/)

## Business Details
- **Business:** iTu Solutions (iT-U)
- **Director & Lead Developer:** Sekoala Daniel Bopape
- **Location:** Ga-Mothiba, Nobody, Polokwane, Limpopo, South Africa, 0726
- **Email:** sekoalabopape@gmail.com
- **Phone / WhatsApp:** +27 71 140 5870

---

## Architecture & Navigation
- Static HTML pages utilize clean folder-based URLs (e.g., `/about/`, `/services/computer-repairs/`, `/legal/disclaimer/`).
- Shared layout elements (Header navigation with interactive mobile drawer toggles and mega-menus, plus the 5-column footer) are structured across views. 
- Theme-aware logo assets are dynamically handled for light mode (`/assets/images/logo/logo-light-mode.png`) and dark mode (`/assets/images/logo/Logodarkmode.PNG`).

---

## Deployment Instructions (GitHub Pages)
1. **Commit and Push:** Commit all project folders and files to your GitHub repository (e.g., `itusolutions.github.io` or your custom project repo).
2. **Configure GitHub Pages:** In your GitHub repository **Settings → Pages**, select the publishing branch (`main` or `gh-pages`) and root folder (`/`).
3. **Custom Domain:** Configure the custom domain `www.it-u.co.za` in the GitHub Pages settings to automatically generate the repository `CNAME` file.
4. **DNS Management:** Ensure your DNS provider (HostAfrica) points your `www` CNAME record to your GitHub Pages domain and sets up the correct IPv4 A records for apex routing. Enable **Enforce HTTPS** once certificates issue.
5. **SEO Tokens:** Replace any placeholder search engine verification tokens in page headers with genuine Google Search Console and Bing Webmaster tokens.
6. **Post-Deployment Verification:** Check canonical URLs, responsive mobile menus, interactive canvas background scripts, form links, and asset loading across desktop and mobile browsers.

---

## SEO & Indexing
- `robots.txt` permits crawler access and references `sitemap.xml`.
- `sitemap.xml` indexes public pages intended for search engines.
- Each HTML template includes a unique meta title, description, canonical link, and Open Graph social metadata.

---

## Important Notes
- **Base Paths:** Root-relative links (`/assets/...`) are configured for the custom domain (`www.it-u.co.za`). If previewing on GitHub subpaths (e.g., `itusolutions.github.io/repo-name/`), verify pathing accordingly.
- **Contact Forms:** The enquiry and contact forms are designed as static helper demos that prepare mailto/email client dispatch or direct page redirection.
- **Legal Notices:** Legal templates (Privacy, Terms, Cookies, Disclaimer, and Data Protection/POPIA) serve as foundational drafts. Review and adapt them to match final business practices.
