# Architecture Showroom — Build Plan

## 1. Goal and scope

Build an original architecture portfolio with Vite + React, a dark default theme, a complete light theme, and restrained fade transitions. The work should be the main attraction: large renders, careful composition, clear navigation, and minimal interface decoration.

Implementation status: the local Vite + React site is built, with Vercel selected for hosting. TypeScript, production bundle/image budgets, and browser smoke checks pass. Vercel deployment, hosted response-header checks, and measured Core Web Vitals remain pending. See `README.md` for commands and launch requirements.

### Non-negotiables

- Use the supplied logo and architectural images.
- Updated content direction: use descriptive section headings, original image filenames for temporary project/view names, and Lorem Ipsum for body copy. This supersedes the initial request for literal `Title` and `Description` labels.
- No invented studio story, completed-project facts, testimonials, awards, statistics, or client logos. Team names, roles, portrait frames, and proposed service categories remain placeholders until approved.
- Functional interface labels can be real: `Projects`, `About`, `Contact`, `View Project`, `Back`, `Next`, `Close`, `Light mode`, and `Dark mode`. These describe actions and navigation.
- Use an original design. References guide content organization; their branding, copy, imagery, and layouts are not assets for this site.
- Do not manufacture extra portfolio entries to make the site look fuller.

## 2. References and content direction

Reviewed on November 15, 2026.

| Reference | Observed content structure | How it informs our plan |
| --- | --- | --- |
| [WEAVENEX](https://weavenexstudio.hopp.site/) | Walkthrough, completed projects, team, and contact sections | Allow for project galleries, optional video, team profiles, and contact details as assets arrive. |
| [JSLA Architects — About Us](https://www.jslaarchitects.com/about-us/about-jsla-architects/) | Firm introduction, founders, mission/vision, recognition, project navigation, and inquiry details | Provide room for an About page and future verified studio information without requiring all sections at launch. |
| [Karl Namuco](https://karl-namuco.vercel.app/) | Large type, staged entrances, and restrained image composition | Use masked headline entrances and measured section motion. |
| [NFT Showcase](https://nft-showcase-rva.vercel.app/) | Cinematic hero scale and depth | Adapt the sense of scale to the supplied architecture, with quieter effects and no generated imagery. |

These are examples of content categories, not facts about Asterisk Design Studio. Neither reference's names, claims, project information, nor contact details will populate this site.

## 3. Supplied asset audit

Files currently live in `provided images/`. All six files were visually reviewed.

| File | Dimensions | Approximate size | Proposed use |
| --- | --- | --- | --- |
| `Scene 3_1.png` | 7680 × 5345 | 73.6 MB | Wide establishing view; hero candidate |
| `Scene 4_1.png` | 7680 × 5345 | 74.1 MB | Alternate wide exterior; project cover candidate |
| `Scene 7.png` | 1142 × 923 | 1.9 MB | Facade/signage detail |
| `Scene 8.png` | 1142 × 923 | 2.4 MB | Entrance detail |
| `Scene 9.png` | 1142 × 923 | 2.0 MB | Upward facade detail |
| `5ed8330b-211d-4b51-80a3-a2475c859170.jpg` | 1920 × 1080 | 42 KB | Asterisk Design Studio logo on a white background |

### Asset handling

- Treat the five renders as one provisional project because they appear to show the same building. Confirm their grouping before final content entry.
- Keep originals untouched. Produce separate optimized delivery images; never ship the two approximately 74 MB originals as page images.
- Export responsive WebP/AVIF derivatives with a suitable fallback. Suggested widths: 640, 960, 1440, 1920, and 2560 where the source supports them; never upscale the smaller renders.
- Use `srcset`, `sizes`, explicit image dimensions, and per-image focal positions. Preserve the building silhouette and important facade details on mobile.
- Compare optimized output against the originals for texture quality, window edges, sky banding, and signage legibility.
- The supplied logo has been edited to remove its white background. Keep its transparent master in `src/assets/asterisk-logo.png`; generate a trimmed, optimized, versioned derivative with `scripts/prepare-logo.mjs`.
- Use the original logo colors in light mode and the same transparent artwork in white in dark mode for readability. Keep the original JPEG untouched.
- The logo names Asterisk Design Studio; the WEAVENEX reference uses a different name. Use the supplied logo's identity.
- Missing media gets a deliberate neutral frame labeled `Image`. Do not generate substitute architecture, portraits, or stock project imagery.

## 4. Visual direction

### An architectural editorial layout

Use a measured grid, generous margins, thin rules, large images, and strong differences in scale. Take cues from architectural presentation boards: ordered information, quiet captions, and images with enough room to read the design.

The distinctive composition will come from alternating full-width establishing views with smaller offset detail images, a narrow project-information rail, and consistent alignment between sections. Avoid repeating identical cards down the page.

### First screen

- A slim header holds the supplied logo at left and navigation plus theme toggle at right.
- A full-height landing composition places the supplied exterior render behind a large two-line studio-name heading: `Asterisk Design Studio.` Keep introductory filler out of the hero and display the full supplied logo, including its emblem, in the header.
- Masked headline entrances, staged supporting text, viewfinder rules, and subtle scroll-linked image movement create depth. Preserve native scrolling and remove movement for reduced-motion preferences.
- The featured-view caption uses the source image filename and links to the project gallery. Keep a clear project-index call to action and mobile-specific image crop.
- Let the image load promptly. No forced introductory loader, auto-playing slideshow, or animation that delays access.

### Theme and typography

| Token | Dark default | Light mode |
| --- | --- | --- |
| Background | Blue graphite `#131D24` | Cool paper `#EDF1F3` |
| Raised surface | `#1C2932` | `#DFE6EA` |
| Primary text | `#EEF2F4` | `#1D303D` |
| Secondary text | `#A3B1B9` | `#516570` |
| Rules | `#344651` | `#C4D0D7` |
| Bronze accent | `#C2A184` | `#785A42` |

These are starting tokens, subject to contrast checks. Let the logo and warm render lighting supply color; avoid decorative gradients and arbitrary accent colors.

- Use self-hosted Barlow Condensed at weight 500 for uppercase display headings, Manrope for body copy and navigation, and system monospace for technical captions. Avoid the reference's serif/sans pairing. Preload and prepare both webfonts before page entrances.
- Use fluid type and spacing with `clamp()`. Keep descriptions comfortably readable and avoid huge empty sections when content is only a placeholder.
- Use square image edges and subtle borders. Avoid pill-shaped navigation everywhere, floating dashboard cards, glass effects, oversized shadows, and decorative blobs.
- Every layout decision should improve the presentation of a project or navigation through the work.

## 5. Site structure

Build a small routed portfolio with a reusable project template.

| Route | Content and behavior |
| --- | --- |
| `/` | Opening composition, featured work, compact studio introduction, contact link, footer |
| `/projects` | Project index with image, `Project Title`, and optional metadata |
| `/projects/:slug` | Establishing image, `Project Title`, `Description`, metadata, image sequence, back navigation, and next project when one exists |
| `/about` | `Title`, `Description`, and space for approved studio information; optional team section once assets arrive |
| `/contact` | `Title`, `Description`, and `Email`, `Phone`, `Address` placeholders until real details are supplied |
| Unmatched route | Simple not-found state with a working return link |

### Home sequence

1. **Opening:** header, `Title`, `Description`, establishing image, project caption.
2. **Work:** one substantial project entry with the current assets. Expand into a varied two-column composition only when more distinct projects exist.
3. **Studio:** a short `Title` / `Description` block with an About link. No fabricated founder narrative or achievements.
4. **Contact:** a restrained closing section and link to the Contact page.
5. **Footer:** supplied identity, navigation, theme control if useful, and approved contact/social links when available.

### Project detail sequence

- Lead with the strongest establishing view.
- Place `Description` alongside a compact metadata rail: `Category`, `Location`, `Year`, and optional `Area`.
- Follow with a large exterior, an offset entrance detail, and a facade detail. Use only distinct useful views; avoid displaying near-identical images just to fill space.
- Keep images accessible in normal page flow. A full-screen viewer is optional polish after the core gallery works.
- Omit next-project navigation when there is only one project.

### Missing-content behavior

- Use meaningful headings and Lorem Ipsum body copy during development. Required unknown metadata remains visibly unfinished.
- Include the requested team portrait frames and proposed service layout with placeholder names, roles, and Lorem Ipsum. Keep awards, publications, and video sections deferred until content is supplied.
- Show project filters only when multiple real categories make filtering useful.
- Keep placeholder contact values as text. Do not create fake `mailto:`, telephone, map, or social destinations.
- Start with contact details and links. An inquiry form requires a real submission destination and a separate implementation decision; never simulate a successful submission.

## 6. Motion and interaction

Use CSS for simple interactions and Motion for coordinated React enter/exit transitions. Keep one shared motion vocabulary.

| Interaction | Intended motion |
| --- | --- |
| Initial text entrance | Opacity plus up to 12 px upward movement over 400–550 ms |
| Section reveal | One-time fade over 350–500 ms, with at most a short stagger |
| Route change | Brief fade-out followed by fade-in; total transition around 300–450 ms |
| Project image hover | Subtle scale up to 1.02 within its frame over 350–450 ms |
| Menu open/close | 180–250 ms opacity and a small positional shift |
| Theme toggle | 180–250 ms color transition after the theme has initialized |

- Animate opacity and transforms where possible; avoid expensive full-page blur and layout animation.
- Navigation must respond immediately. Handle rapid clicks and browser back/forward without stacked transitions or a blank screen.
- Apply reduced-motion preferences: remove movement, zoom, stagger, and decorative fades; keep content visible immediately.
- Use natural browser scrolling on every page, without section snapping, wheel interception, or automatic section movement. Keep the sticky header with an explicit Home link and scroll-triggered image/text reveals that respect reduced motion. Do not add cursor replacement or endless animated marquees.
- Hover effects must have keyboard-focus equivalents; essential information stays visible on touch devices.
- On route changes, update the document title, move focus appropriately, and manage scroll restoration.
- A mobile menu needs an accessible toggle, Escape-to-close, focus handling, and scroll locking while open.

## 7. Technical approach

### Proposed stack

- **Vite + React + TypeScript:** app foundation and typed content structures.
- **React Router:** project URLs, navigation, and not-found handling.
- **CSS custom properties + CSS Modules:** theme tokens, grid, responsive layout, and component styling.
- **Motion for React:** coordinated page and menu transitions. Verify package names and compatible stable versions during setup; record exact dependencies in the lockfile.
- **Local content modules:** portfolio data stays easy to replace without editing layout components. No CMS or backend required for the initial showroom.

### Suggested organization

```text
public/
  images/                 # Optimized project images
  brand/                  # Prepared supplied logo assets
src/
  app/                    # Router, app shell, providers
  components/             # Header, footer, theme toggle, project link, image
  features/projects/      # Index, detail template, gallery
  pages/                  # Home, About, Contact, NotFound
  content/                # Projects, studio placeholders, navigation
  styles/                 # Tokens, global styles, motion preferences
provided images/          # Untouched original files
plan.md
```

### Content model

- Project: stable ID, slug, placeholder title and description, optional category/location/year/area, cover, gallery, and image focal positions.
- Image: source variants, width, height, alternative text, optional caption, and loading priority.
- Studio: placeholder title/description plus optional verified contact and team data.
- Separate unknown data from display placeholders. For example, an unknown year is absent in the data and displays `Year` in preview; never invent a numeric year.
- Keep development placeholders easy to find so production content can replace them in one pass.
- Keep page width stable with a reserved scrollbar gutter and use thin, theme-aware scrollbars. Before each route entrance, prepare its code and font while holding the existing page at its current scroll position, with a thin loading bar at the top. Start the exit/entrance transition once ready; preload internal routes on hover/focus, discard superseded navigation, and show a retry state on failures.
- Write factual image alternative text based on what is visible, such as an exterior render. Alternative text and accessible control names describe function and content; they are not marketing copy.

### Theme behavior

- First visit defaults to dark, as requested.
- Persist an explicit light/dark choice locally and restore it before first paint to prevent a theme flash.
- Handle unavailable local storage gracefully.
- Theme both pages and interaction states, including menu, focus rings, image placeholders, and any future viewer.

### Loading and bundle size

- Load the hero eagerly with high fetch priority. Use native lazy loading and asynchronous decoding for below-fold gallery images; reserve their space before they load.
- Keep the app shell and home route immediately available. Split secondary routes with dynamic imports and provide a stable loading state plus a recoverable error state for failed chunk requests.
- Do not preload every route or image. Add responsive hero preload only if measurement shows discovery is delayed, ensuring it matches the image's `srcset` and `sizes` without duplicate downloads.
- Use production minification and tree shaking. Import only used components and icons, and inspect bundle output before adding dependencies.
- Initial budget: at most 150 KB of compressed JavaScript for the home route, including shared dependencies, and 50 KB of compressed CSS. Treat these as project budgets to verify, not guarantees supplied by Vite.
- Keep the initial visible home-page transfer under 2 MB, including its hero, logo, scripts, styles, and fonts. Measure below-fold gallery loading separately.
- Do not delay the hero's visibility with a reveal animation. Transitions should not worsen the main content's loading time.

### Font delivery

- Prefer one self-hosted, licensed WOFF2 family with only the weights and character sets the site needs. Retain a system fallback until approved font files exist.
- Use `font-display: swap` and a similar fallback to reduce text movement. Reserve appropriate line heights.
- Preload only the font actually required above the fold, and only when measurement justifies it. Avoid third-party font requests and loading unused styles.

### Caching, compression, and hosting

Caching and compression are hosting requirements; the React app cannot enforce HTTP response headers on its own. Configure and verify them against the selected production host.

| Resource | Planned delivery policy |
| --- | --- |
| Content-hashed JavaScript, CSS, images, and fonts | `Cache-Control: public, max-age=31536000, immutable` |
| HTML, including responses used for client-side route fallback | `Cache-Control: no-cache` with an ETag or Last-Modified validator so cached HTML is revalidated |
| Stable-name files that may change, including metadata and unversioned public assets | Revalidate or use an explicitly short lifetime; never apply the immutable policy without URL versioning |

- Give optimized images and fonts content-hashed filenames in the preparation step, or import them through Vite's asset pipeline. Files copied from `public/` do not gain hashed filenames automatically.
- New content gets a new asset URL. Publish assets before or atomically with the HTML that references them, and retain older chunks where the host permits so existing sessions can keep navigating after deployment.
- Handle stale chunk failures with a clear retry or bounded refresh path; avoid reload loops.
- Serve through HTTPS and a CDN, keeping host-specific settings alongside deployment configuration once hosting is selected.
- Enable Brotli for HTML, CSS, JavaScript, and other compressible text, with Gzip fallback and correct content negotiation. Verify `Content-Encoding` and `Vary: Accept-Encoding` where applicable. Do not waste effort recompressing already compressed image/font formats.
- Use browser and CDN caching for the first release. A service worker and offline mode are outside the current scope; add them only for an actual visitor requirement.
- Test a cold visit, a repeat visit, and an update between visits. Confirm unchanged assets are reused and updated HTML discovers new asset versions.

Implementation references: [MDN HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching) and [Vite production builds](https://vite.dev/guide/build).

### Performance measurement

- Measure the production build with a consistent mobile viewport and throttled network/CPU settings. Record the tool settings, transfer sizes, and results so comparisons are useful.
- Target LCP at or below 2.5 seconds, CLS at or below 0.1, and INP at or below 200 ms. Before launch, use lab loading measurements and manual interaction checks; real-user percentile results require sufficient production traffic.
- Check that route changes, menu opening, and theme switching remain responsive on a slower device. Avoid long main-thread tasks from image processing or unnecessary JavaScript.
- Test full delivery behavior on the eventual host. A local production preview does not establish that CDN caching or HTTP compression is configured correctly.
- Log any unmet budget with its measured cause and resolution before release; do not rely on a single overall performance score.

## 8. Build phases

### Phase 1 — Foundation and asset preparation

- [x] Scaffold Vite + React + TypeScript in this workspace without overwriting supplied assets.
- [x] Add routes, CSS tokens, content structures, and dark/light theme initialization.
- [x] Create optimized responsive images and prepare the supplied logo presentation.
- [x] Establish reusable image, navigation, and typography primitives.
- [x] Add deterministic asset versioning, route splitting, and a repeatable image-preparation command.

**Exit condition:** app runs locally, supplied assets render, and both themes work without a first-paint flash.

### Phase 2 — Visual baseline

- [x] Build the complete home layout with the supplied images and literal placeholders.
- [x] Establish desktop and mobile compositions together.
- [x] Check image crops, logo readability, spacing, and type hierarchy in both themes.

**Exit condition:** the unanimated home page already feels intentional and presents the architecture clearly.

### Phase 3 — Portfolio and supporting pages

- [x] Build project index and reusable project detail page.
- [x] Add About, Contact, footer, mobile navigation, and not-found behavior.
- [x] Handle the current single-project dataset cleanly.
- [x] Ensure every active link leads to a real route or approved destination.

**Exit condition:** the full visitor journey works from home to project details to contact.

### Phase 4 — Motion and refinement

- [x] Add shared fade transitions, section reveals, hover feedback, and menu animation.
- [x] Add reduced-motion support, route focus management, and scroll restoration.
- [x] Tune timing on mobile and test rapid navigation.

**Exit condition:** transitions feel quiet and responsive, with no hidden content or blocked navigation.

### Phase 5 — Verification and delivery

- [ ] Run TypeScript checks and the production build.
- [ ] Check representative mobile, tablet, desktop, and wide layouts, including 360, 768, 1280, and 1920 px widths.
- [ ] Test keyboard navigation, visible focus, menu behavior, theme persistence, browser history, direct project URLs, and reduced motion.
- [ ] Check text contrast against WCAG AA targets and confirm text remains usable at 200% zoom.
- [ ] Inspect network delivery: responsive derivatives load instead of original PNGs; only the lead image has high loading priority and below-fold images load lazily.
- [ ] Measure the initial visible home-page transfer against the 2 MB budget and check JavaScript/CSS budgets; adjust encoding and dependencies based on measurements.
- [ ] Check font subsets, fallback layout, preload behavior, and absence of duplicate image/font downloads.
- [ ] Record production-build performance measurements and check the LCP, CLS, and interaction targets above.
- [ ] Check for layout shifts, image failures, horizontal overflow, and console errors.
- [ ] Record remaining placeholders and missing assets before production release.
- [x] Configure Vercel client-side route rewrites and versioned-asset cache headers in `vercel.json`; deployment remains separate.
- [ ] On the selected host, verify HTTPS, CDN delivery, compression, response headers, cold/repeat visits, and an update between visits. Keep these checks pending until a host is configured.

**Exit condition:** a reviewable local production build with working navigation, consistent themes, optimized images, and a clear list of missing final content.

## 9. Content needed later

These items do not block the placeholder build:

- Confirmed studio display name and approved logo variants.
- Confirmed project grouping, titles, descriptions, locations, dates, categories, and credits.
- Additional distinct projects and any preferred image order.
- Studio biography, team names/roles, and portraits if an About team section is wanted.
- Approved contact details and social URLs.
- Walkthrough video only if supplied and appropriate.
- Final domain, hosting choice, and any real inquiry-form destination.

Before a public launch, replace required placeholders, confirm permission to publish the supplied material, and add real page titles, descriptions, and sharing metadata. The development preview should remain unindexed while it contains placeholder content.

## 10. Definition of done

The site presents the supplied architecture clearly, feels designed specifically for the studio, works on mobile and desktop, and offers polished fade transitions with a fully usable reduced-motion experience. Dark and light modes receive equal attention. Content remains literal placeholders until real material is supplied, and the current assets are never misrepresented as multiple completed projects.

