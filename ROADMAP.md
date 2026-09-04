# Portfolio Roadmap

This file collects useful future features for the portfolio. Priorities are ordered around what helps a recruiter, client, or collaborator understand Jovan's work and make contact.

## Priority 1: Hiring clarity

- [ ] Add a downloadable CV or resume in `public/`.
- [ ] State current availability clearly: full-time, freelance, contract, or unavailable.
- [ ] Add location, timezone, and remote-work information.
- [ ] Add a concise positioning statement explaining what kind of frontend work Jovan is available for.
- [ ] Add a focused contact action near the hero as well as the full contact section.

## Priority 2: Stronger project proof

- [ ] Turn each project card into a case-study route under `src/pages/projects/`.
- [ ] Document the problem, role, responsibilities, technology choices, constraints, and outcome for every featured project.
- [ ] Add live project links where available, in addition to GitHub links.
- [ ] Add project metrics when they are real and verifiable, such as performance improvements, conversion changes, delivery time, or usage.
- [ ] Add screenshots that show the product in use, not only the project thumbnail.

## Priority 3: Credibility

- [ ] Add two or three short testimonials from managers, clients, or teammates.
- [ ] Add selected client or company context where permission allows it.
- [ ] Add a small “How I work” section: discovery, implementation, review, launch, and support.
- [ ] Add a short accessibility, performance, and SEO note to relevant case studies.

## Priority 4: Product improvements

- [ ] Move translations into a dedicated locale module with optional URL-based routes if the site needs shareable localized pages.
- [ ] Add Serbian translations for project technology descriptions if those become more descriptive than labels.
- [ ] Add a theme preference that respects the visitor's system setting on first visit, while keeping the saved manual choice.
- [ ] Add a lightweight contact form only if spam protection and an email delivery service are available.
- [ ] Add analytics only with a privacy-conscious, consent-aware solution.

## Technical maintenance

- [ ] Remove the unused legacy `app/` source once the migration is confirmed complete and no historical reference is needed.
- [ ] Replace the legacy diagnostics from `app/scripts` by excluding archived source from TypeScript checking or removing it.
- [ ] Add automated checks for `npm run check` and `npm run build` in CI.
- [ ] Add visual checks for desktop and mobile layouts after major design changes.
- [ ] Keep project content data separate from page markup as the number of case studies grows.

## Definition of done for a future feature

A feature is ready when it:

1. Has a clear user or hiring value.
2. Works on mobile and desktop.
3. Has a keyboard-accessible interaction where applicable.
4. Respects `prefers-reduced-motion`.
5. Supports the current English and Serbian locale model.
6. Passes `npm run check` and `npm run build`.
7. Is documented in `PROJECT.md` or in the relevant case-study content.
