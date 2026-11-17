# TROVE STUDIO — Decan's Tattoo Portfolio

A zero-dependency, mobile-first, dark monochrome tattoo portfolio for **Decan**. It uses his supplied circular logo and four authentic tattoo photos. All images remain in their original colours. The typography and ornamentation are inspired by a cybersigilism aesthetic without using any external stock photography or generated tattoo work.

## Pages

- `/` — homepage, featured art, artist and enquiry journey.
- `/gallery/` — four real photos, category filtering and accessible native-dialog lightbox.
- `/artist/` — about the artist, using verified information only.
- `/book/` — accessible enquiry form that generates a WhatsApp message on the visitor's device; nothing is stored or sent by the website. `mailto` and direct WhatsApp alternatives are included.
- `/privacy/` — preview-stage description of current handling; must be reviewed for launch.
- `/404.html` — custom not-found page.

## Launch status

**PRE-LAUNCH / NOINDEX.** This is not a live bookable tattoo studio website yet. All pages have `<meta name="robots" content="noindex,nofollow">`, and `_headers` applies the same via HTTP headers. There is no calendar integration, checkout, payment service, analytics, claims about licences, address, operating hours, ratings, or user testimonials. No known city/studio address was supplied, so none is fabricated, including in structured data.

The name *Trove Studio*, artist *Decan*, email `trovestudio64@gmail.com`, and number `+27 62 563 8490` are user-supplied. Obtain Decan's approval to publish the photos, logo, description, booking and contact details before switching indexing on.

## Local preview

Run from the project root:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/`. A server is required because asset URLs are root-relative.

## Free hosting with Cloudflare Pages

1. Sign in to Cloudflare and open **Workers & Pages > Create > Pages > Connect to Git**.
2. Select GitHub repository `janusoosthuizen2-work/trove-studio`.
3. Choose preset **None**, production branch **main**, build command `exit 0`, output directory `.`.
4. Deploy. The preview will remain `noindex` even on a public `pages.dev` URL.
5. If the UI doesn't accept `.` as output, set output to `dist` and build command to `mkdir -p dist && cp -R index.html 404.html assets gallery artist book privacy robots.txt _headers dist/`.

No server secrets or credentials are needed. All files are static, so Cloudflare Pages' free tier is sufficient for this prototype, subject to current platform limits.

## SEO and legal launch checklist

Do not remove noindex until the owner approves all required details.

1. Verify Decan's official business/studio name, **city/service location** and any public address, opening hours, booking rules and age policy. Do not expose a private residential address without permission.
2. Obtain artist consent to publish every logo/photo; confirm tattoos shown are his work and client-photo permissions are in place.
3. Confirm an actual approved production URL. Add an absolute **canonical URL** to each page and absolute `og:url` and `og:image` where applicable. Create a matching `sitemap.xml` and reference it in `robots.txt`.
4. Add appropriate structured data (e.g. `Person` and only a truthful `LocalBusiness` or `TattooParlor` if the actual business identity/location/eligibility are verified). Avoid invented services, reviews, locations and credentials.
5. Update `_headers` to remove `X-Robots-Tag: noindex, nofollow` and remove the per-page robots noindex. Verify with `curl -I` and source HTML.
6. Review and approve privacy notice and enquiry processing against POPIA and South African legal requirements, and document how booking data will be handled and deleted. Don't add analytics until consent/privacy obligations are understood.
7. Connect Google Search Console, submit sitemap and use URL Inspection one URL at a time. Test mobile, accessibility, structured data, security headers, image loading and Core Web Vitals in PageSpeed Insights.
8. Confirm WhatsApp link, phone and mailto; test on iOS and Android; verify no forms falsely suggest an appointment or payment has been accepted.

## Adding future tattoos

- Add an original, approved tattoo photograph under `assets/images/`, ideally encoded as WebP.
- Edit `gallery/index.html` and create a new `.work-card` button with accurate `data-category`, alt text, display title, full-size image path and artwork details.
- Optionally feature new pieces on `index.html`. Update displayed counts for both pages.
- Keep original images private as backups. Avoid third-party CDN uploads without the artist's permission.

© Trove Studio. Artist branding and content subject to the owner's approval.
