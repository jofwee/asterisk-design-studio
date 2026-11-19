# Asterisk Design Studio

Architecture showroom built with Vite, React, TypeScript, React Router, and Motion. Descriptive section headings explain the layout; body copy uses Lorem Ipsum until real content is supplied.

## Local development

```sh
npm ci
npm run dev
```

Optimized supplied images and the generated asset manifest are included, so the original renders are not needed to run or deploy the app.

To regenerate images after changing source assets, place the original files in `provided images/` and run `npm run assets`. Keep old hashed derivatives while active deployments may still use them.

## Build

```sh
npm run build
npm run preview
```

The build runs TypeScript and checks compressed bundle/image budgets. `dist/` is the deployable output. No backend, contact form, or analytics is connected.

Run `npm test` after building for the browser smoke checks (requires an installed Google Chrome). The checks cover routes, images, theme persistence, history, mobile menu focus, reduced motion, and overflow at four viewport widths.

## Vercel

Import this directory or its repository as a Vercel project. The included `vercel.json` selects Vite, `npm run build`, and `dist`, configures client-side route rewrites, and defines revalidation for pages and immutable caching for hashed assets. HTTPS, CDN distribution, and response compression are handled by Vercel; verify their actual response headers after deployment.

This workspace has not been linked to a Vercel account or deployed. No Vercel credentials are required for local development.

## Content

- Layouts: `src/pages/`.
- Placeholder copy, filenames, and team entries: `src/content/site.ts`.
- Landing animation: `src/components/Hero.tsx`.
- Team portrait frames and service layouts: `src/components/Team.tsx` and `src/components/Services.tsx`.
- Shared interface elements: `src/components/UI.tsx`.
- Image URLs: generated `src/content/assets.json`.
- Styling and theme tokens: `src/styles.css`.
- Routing, navigation, and theme persistence: `src/main.tsx`.
- Original design and implementation requirements: `plan.md`.

The supplied renders are presented as one provisional studio project, using `Scene 4_1.png` as its temporary name. Gallery views retain their filenames and can be filtered by exterior or interior. Run `node scripts/prepare-showcase.mjs` to refresh thumbnails and responsive images from the source folder.

The walkthrough uses a compressed MP4 in `public/images` and loads only after a visitor selects Play. To move it to Cloudflare, replace `walkthroughUrl` in `src/components/Showcase.tsx` with the hosted MP4 URL and remove the local video once the new URL works.

Missing contact values, portraits, five team profiles, and the logo construction artwork remain placeholders. The firm background, mission, vision, logo story, and service names are based on the supplied studio brief.

## Transparent logo

The supplied logo was edited with the built-in image editing tool to remove its white background. The transparent master is `src/assets/asterisk-logo.png`; `node scripts/prepare-logo.mjs` creates a cropped, optimized, versioned WebP and updates the asset manifest. The original supplied JPEG remains untouched. Dark mode displays the same artwork in white through a CSS filter for legibility; light mode retains its original colors.

The header displays the full supplied logo, including its emblem, without cropping. The landing headline uses the studio name, without introductory filler. Open spacing, fewer rules, rounded project images, and arched portrait frames soften the page composition.

The studio identity uses self-hosted Barlow Condensed for upright uppercase display headings, Manrope for body copy, and system monospace for technical captions. Blue graphite and cool paper backgrounds pair with bronze accents from the supplied logo. Both webfonts are preloaded and prepared before route entrances.

Scroll reveals slide content horizontally with eased motion. The home page staggers section labels, headings, and project imagery; image reveals combine lateral movement with a soft crop opening. The detail section brings its text and image in from opposite sides. Reveals run once per page mount, avoid horizontal document overflow, and remove movement and staggering for reduced-motion preferences.

The home page uses natural browser scrolling without wheel interception, forced section snapping, or automatic section movement. The sticky header includes an explicit Home link on desktop and mobile. Home and the logo return visitors to the top without restarting the hero animation when they are already on Home. The entrance runs when the home page loads and respects reduced-motion preferences.

Scrollbars use thin, theme-aware styling, and the root reserves a stable scrollbar gutter so short pages such as Contact keep the same layout width. Route transitions preload internal pages on hover/focus and wait for the route module and both display/body fonts. During loading, the current page stays visible at its existing scroll position with scrolling and content interaction temporarily locked; a thin loading bar appears at the top. Once ready, the old page fades out and the new page enters. Newer navigation cancels any older pending page change. Both fonts are also preloaded from the HTML. Failed page loads retain the retry screen. There is no artificial loading delay. Reduced motion removes the fades.

Edit prompt: "Edit target: the supplied Asterisk Design Studio logo image. Background extraction only. Remove every white background pixel including enclosed white negative spaces to genuine alpha transparency. Preserve the exact original taupe emblem, exact dark charcoal lettering ASTERISK DESIGN STUDIO, exact shapes, typeface, spacing, alignment, and proportions. No redesign, no new image content, no added elements, no shadows, no rewording, no changed letters. Crop empty canvas to a modest transparent margin around the original artwork. Output a transparent PNG for use as the website's existing logo."

Motion references: [Karl Namuco](https://karl-namuco.vercel.app/) for staged type and restrained entrances, and [NFT Showcase](https://nft-showcase-rva.vercel.app/) for cinematic scale and depth. The implementation uses original architecture-focused composition, masked headline entrances, subtle scroll-linked image movement, staggered section reveals, and route transitions. Reduced motion removes these movements.

## Before public launch

Replace placeholder content and approve project details and image publication. Update page metadata and sharing images. Remove the `noindex` meta tag from `index.html`, the `X-Robots-Tag` header from `vercel.json`, and the crawl block in `public/robots.txt` only when the content is ready. Add a sitemap and canonical URLs once the final domain is known.

Verify browser behavior, mobile layouts, image quality, Core Web Vitals, and cold/repeat caching on the actual Vercel deployment. A successful local build does not validate hosted cache headers or real-user performance.

