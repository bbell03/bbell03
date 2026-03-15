# Upgrade / version notes

These settings were added after a dependency update caused runtime and dev issues. **Do not loosen the version pins below** unless you’re doing a planned upgrade and are ready to re-test the 3D scene and Contentlayer.

## Locked versions (keep exact)

- **React 18.2.0** – `react` and `react-dom` are pinned and set in `overrides`. Required for `@react-three/fiber@8` (R3F 9 needs React 19).
- **Next 16.1.6** – Pinned so dev/build behavior stays consistent with Contentlayer and R3F.
- **@react-three/fiber 8.18.0**, **@react-three/drei 9.102.4**, **three 0.180.0** – Exact versions avoid R3F/React mismatch and `LinearEncoding` removal in three.js.
- **next-contentlayer2 0.5.8** – Matches Contentlayer usage in this project.

## Dev vs build

- **Notion sync** runs only during production build (and when you run `npm run sync-notion`). In dev it’s skipped so the terminal doesn’t hang on Notion API.
- **Contentlayer** is used in development only (`next.config.js`). Production build uses the pre-built output.
- **Webpack** is used for both dev and build (`--webpack` in scripts). Turbopack was reverted due to R3F runtime errors.

## If you upgrade later

1. **React 19** – Upgrade `react`/`react-dom` to 19 and switch to `@react-three/fiber@9` (and a drei version that supports it). Then remove the React overrides.
2. **Next.js** – Test dev, build, and the landing page 3D scene after bumping.
3. **Contentlayer** – After upgrading contentlayer2/next-contentlayer2, run `npm run build` and fix any new assert or config issues.
