# Jovan Sitaric Portfolio

This project is a static portfolio built with Astro and Vue. Astro renders the page and ships only the JavaScript needed for the interactive experience selector. Vue owns the stateful experience browser.

## Stack

- **Astro**: page structure, static generation, asset handling, and the build pipeline.
- **Vue 3**: the interactive `ExperienceTabs` island.
- **TypeScript**: type checking for Astro and Vue files.
- **CSS**: the visual system, responsive layout, transitions, custom fonts, and reduced-motion behavior.
- **Vite**: the development server and bundler used by Astro.

The project does not need Pug, Sass, AOS, or Swiper anymore. The original `app/` directory is preserved as historical source material, but the running site is implemented from `src/` and `public/`.

### What replaced the old tools?

| Previous tool              | Current approach                                           | Why                                                                                                                                                                                                  |
| -------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pug                        | Astro components and HTML in `src/pages/index.astro`       | Astro provides static HTML, page metadata, asset handling, and a clearer component boundary without a separate template compilation step.                                                            |
| Sass                       | `src/styles/global.css`                                    | The current visual system is one focused stylesheet with CSS variables, native nesting-free selectors, media queries, and modern transitions. A preprocessor was not adding useful abstraction here. |
| AOS                        | `IntersectionObserver` plus CSS transitions                | The browser observes only the elements that need to reveal, and CSS owns the animation. This avoids a dependency for a small behavior.                                                               |
| Swiper                     | Vue state plus CSS/Vue transitions in `ExperienceTabs.vue` | The experience area needs selectable entries, not touch-slide behavior. Vue keeps the active mode and entry explicit and animates the content swap.                                                  |
| Legacy `scripts/script.js` | Small inline page behavior and the Vue island              | Mobile navigation, scroll reveals, and pointer tilt are local to this page. Keeping them close to their markup makes the behavior easier to trace.                                                   |

There is also no external motion library in the current project. The motion uses CSS cubic-bezier easing, `IntersectionObserver`, pointer events, and Vue's built-in `<Transition>`. That keeps the bundle small while still allowing the movement to feel responsive and physical.

## Why the redesign?

The redesign was not intended to change the portfolio's identity or content. It addressed two structural problems exposed by the migration:

1. The old page was a large Pug template coupled to global DOM scripts and Swiper markup. Separating the static page from the one stateful experience area makes the new Astro architecture easier to maintain and gives Vue a clear, limited responsibility.
2. The original visual layout treated the portfolio as another offset two-column section. Its heading and project cards were pushed into a secondary grid column, which made the work feel visually uncentered. The redesigned Portfolio section uses one centered content frame, so the label, heading, and project grid share a consistent axis.

The visual direction keeps the existing portrait, project images, custom fonts, warm paper palette, rust accent, and editorial typography. The changes are primarily about hierarchy, alignment, responsive behavior, and making interactions feel intentional instead of adding animation for its own sake.

## Structure

```text
src/
  components/
    ExperienceTabs.vue   Vue experience browser
  data/
    i18n.ts              Shared locale labels and date formatting
  pages/
    index.astro          Main page and static content
  styles/
    global.css           Fonts, design tokens, layout, responsive CSS, motion
public/
  assets/                Images, fonts, and icons served at /assets
astro.config.mjs         Astro + Vue integration
package.json              Scripts and dependencies
```

## Running the project

```bash
npm install
npm run dev
```

The development server is normally available at `http://localhost:4321`.

Other commands:

```bash
npm run build    # Generate the production site in dist/
npm run preview  # Preview the production build locally
npm run check    # Run Astro and TypeScript diagnostics
```

## Page flow

`src/pages/index.astro` is the single page entry point. It contains:

1. A header with anchor navigation and social links.
2. A hero with the primary introduction and portrait.
3. An About section.
4. An Experience section powered by `<ExperienceTabs client:load />`.
5. A Portfolio section with selected project links.
6. A Skills section.
7. A Contact section and footer.

Astro renders all of the text and images as HTML at build time. The `client:load` directive hydrates only `ExperienceTabs.vue` in the browser, keeping the rest of the page lightweight.

## Decoration utility

The grain pattern is intentionally not global. It used to live on `body::before`, which meant every section received it and there was no local control.

Use the `texture` class wherever the decoration belongs:

```html
<section class="portfolio texture">...</section>
```

The utility is implemented by `.texture::before`. Its children are raised above the pattern with `.texture > *`, so content remains readable. The pseudo-element is `position: absolute`, not fixed, and `.texture` is positioned relative to its own section. This keeps the grain from leaking into sections above or below it. The current design applies it to the dark Portfolio section only, but it can be moved to any section without changing the CSS.

## Theme and translation

The header contains two lightweight controls:

- The theme switch toggles `data-theme="light"` and `data-theme="dark"` on the root element. CSS variables then change the paper, ink, accent, surfaces, and borders without duplicating the layout. The selected theme is stored as `portfolio-theme` in `localStorage`.
- The language switch currently toggles English (`en`) and Serbian (`sr`). Page strings use `data-i18n` keys and the page dictionary is serialized into the browser from the Astro page. Shared Experience UI labels and date formatting live in `src/data/i18n.ts`. The selected language is stored as `portfolio-language`. A `portfolio-language-change` custom event keeps `ExperienceTabs.vue` synchronized with the static Astro page. Experience records use one shared English base list and Serbian partial overrides, so company, date, and technology data are not duplicated.

This is intentionally a small translation layer rather than a URL-based routing system. It is ready for more languages: add a new language dictionary, extend the `Language` union, add month names in `src/data/i18n.ts`, and add locale overrides for the experience records in the Vue island. Project names, technologies, and proper nouns remain unchanged between locales. The current approach keeps locale switching client-side, so it does not create separate translated URLs or server-rendered locale pages. Experience dates remain one English source string and are formatted through `translateExperienceDate()`, which translates month names and `Present` at render time.

## Motion system

The motion is deliberately small and physical rather than a collection of constant effects.

### Scroll reveals

Elements with `data-reveal` start slightly lower and transparent. An `IntersectionObserver` adds `is-visible` once an element enters the viewport. This means the animation happens at the moment the content becomes relevant, rather than on every page load or with a long list of unrelated delays.

`data-reveal="delay"` adds a short 120ms offset for a nearby heading or content block. The easing curve, `cubic-bezier(.22, 1, .36, 1)`, gives the movement a quick settle similar to native interface motion.

### Pointer response

The About image uses `data-tilt`. Pointer coordinates are converted into a maximum two-degree rotation and written to CSS custom properties. CSS handles the interpolation, so the response stays subtle and returns smoothly when the pointer leaves.

### Vue transitions

The experience detail is wrapped in Vue's `<Transition mode="out-in">`. A keyed article causes the old job to fade and lift away before the new one settles in. This prevents the content from snapping while keeping the interaction fast.

### Press and hover states

Navigation, project cards, the brand mark, and experience controls use the same restrained easing family. Project cards lift only a few pixels and images scale slightly, which gives feedback without distracting from the work.

### Accessibility

The stylesheet includes `@media (prefers-reduced-motion: reduce)`. It disables long transitions and animations, shows reveal content immediately, and removes the 3D tilt. The experience controls remain fully usable because their behavior is not dependent on animation.

## Editing content

- Edit page copy, the `projects` data (title, type, year, description, technologies, image, and link), project links, and the skills list in `src/pages/index.astro`.
- Edit work and internship entries in the `experiences` object in `src/components/ExperienceTabs.vue`.
- Add or replace images under `public/assets/images` and reference them with `/assets/images/...`.
- Add font files under `public/assets/fonts` and update the `@font-face` declarations in `src/styles/global.css` if needed.
- Adjust colors and typography from the CSS variables at the top of `src/styles/global.css`.

## Validation

The production build is generated with `npm run build`. The Astro checker reports no errors in the new Astro/Vue implementation. It may still report hints from the preserved legacy files under `app/scripts`; those files are not imported by the Astro page and are not part of the running application.
