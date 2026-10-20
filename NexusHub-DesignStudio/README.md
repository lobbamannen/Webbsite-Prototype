# Nexus Hub Design Studio

Design Studio uses **the same React components and styles as the original Nexus Hub prototype**. An empty design has no style overrides. Builder controls, research descriptions and comparisons stay in a separate panel.

## Use

Open the studio and press **Design**. Choose an area or **Välj på sidan**, then change an individual property. Close the panel with **Se resultatet** to use the actual interface. Each property can return to **Original** independently. Sections and module destinations can be reordered or hidden. Undo/redo, targeted resets and comparison with the original preserve unrelated settings.

Design choices are saved locally under `nexus-original-studio-v2`. Export/import moves them between browsers. Version 1 exports are preserved in `legacySource`, with research selections retained. Old numeric variants are not guessed into new properties. The earlier UI remains in `legacy.html`; its local storage key is untouched.

All app content is isolated example data. Film edits, favorites, series watchlists and story marks are local demo state. The mock API never writes to a real Nexus Hub backend or GitHub.

## Research and implementation status

All **527 original findings from eight models** remain in `ideas.js`, with their full source text. The five `idea-targets-*.js` files retain their mappings and classifications.

The panel distinguishes **directly connected controls** from **research awaiting implementation/review**. Only the deliberate bindings in `NexusHub/workshop/src/studio/config.mjs` can be applied automatically. Every binding describes its actual effect. Unmapped proposals can be saved, read in full and used as guidance through the relevant controls. They are not presented as 527 finished features or rendered as fake feature cards.

Independent properties combine. Two proposals changing the same property are alternatives; using the later one changes that property only. Design rules, properties, components and new interactions remain distinct in the research classification.

## Source and build

- `NexusHub/workshop/studio.html`: studio build entry and research scripts.
- `src/studio/Studio.tsx`: editor, research library and real `Portal` preview.
- `src/studio/config.mjs`: validated overrides, history, import/export and reviewed research bindings.
- `src/studio/styles.mjs`: scoped property styles; no baseline layout replacement.
- `src/studio/context.tsx`: optional design context. Outside the studio the original uses empty defaults.
- `src/studio/studio.css`: builder panel styles, isolated from the original UI.
- `src/mock-api.js`: local fixtures and demo persistence.

The Pages workflow builds both entries and copies `dist/studio.html` to `NexusHub-DesignStudio/index.html`. Both pages use versioned assets under `NexusHub/assets/`. The repository's static `index.html` is a fallback to the compiled studio, not the old demo renderer.

```sh
npm install --prefix NexusHub/workshop --no-audit --no-fund --no-package-lock
ln -s workshop/node_modules NexusHub/node_modules
npm test --prefix NexusHub/workshop
npm run build --prefix NexusHub/workshop
```

Tests cover independent choices, undo/redo, resets, validated imports, lossless legacy preservation, original component rendering, real module ordering, CSS parsing, local demo writes and backend isolation. CI also retains the source-level coverage check for all research findings. Syntax or renderer coverage is not evidence that all research proposals have been implemented.
