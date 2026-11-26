# Wedding Invitation

A React, Vite and Motion invitation for Arsalaan and Heena.

## Run locally

Requires Node.js 20.19+ or 22.12+ and pnpm.

```sh
pnpm install --frozen-lockfile
pnpm run dev
```

Open the local address printed by Vite.

## Edit content

Edit names, event details and map links in `src/data/invitation.js`. Each section is a component in `src/components/`, and reusable animations are in `src/components/motion/`.

## Deploy

Run `pnpm run build` and deploy the contents of `dist/` to a static host. The invitation is served from the site root. No SPA rewrite is required.

The original standalone HTML versions are preserved in `archive/`. The reception date and venue are sample details and should be confirmed before sharing.