# Algorithm Visualiser

An interactive sorting algorithm visualiser built with React 19, TypeScript, and Tailwind CSS. Demonstrates clean separation of algorithm logic, animation state management, and component composition.

## What it does

Select a sorting algorithm, hit play, and watch a bar chart sort itself step by step. Adjust the animation speed, pause mid-sort, and reset to a new random array at any time. All algorithms share the same visual interface via a common step-trace format, so swapping in a new algorithm requires no UI changes.

## Algorithms

- Bubble Sort
- Merge Sort
- Quick Sort
- Insertion Sort
- Selection Sort
- Heap Sort
- Cocktail Shaker Sort

## Architecture

The codebase separates three concerns cleanly:

| Layer | File | Responsibility |
|-------|------|----------------|
| Algorithm logic | `src/algorithms/sorting.ts` | Pure functions — no React, no side effects. Each algorithm produces a sequence of array snapshots (steps) that describe the sort. |
| Animation state | `src/hooks/useSorting.ts` | Custom hook managing the current step index, play/pause state, and speed interval. Drives the visualiser from the step sequence. |
| Display | `src/components/` | `VisualiserBoard`, `Controls`, `AlgorithmInfo` — receive state as props and render only. |

This means algorithm logic is fully testable without a browser, and the UI never needs to know how a sort works.

## Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for bar animations
- **Vite** for development and builds

## Getting Started

```bash
git clone https://github.com/RoPeak/algo-visualiser.git
cd algo-visualiser
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

The built output in `dist/` can be deployed to Vercel, Netlify, or GitHub Pages.

## Status

Working — all seven algorithms visualise correctly with play/pause and speed controls.

## License

MIT
