# JavaScript Event Loop Visualizer

An interactive Next.js application that visualizes how JavaScript handles async operations with the event loop, microtasks, and macrotasks.

## Features

- 🎯 Step-by-step visualization of JavaScript event loop execution
- ⚡ Interactive controls (Play/Pause, Next/Previous, Reset)
- 🎨 Dark/Light mode support with CSS variables
- 📱 Responsive design
- 🔄 Real-time queue state visualization (Call Stack, Microtask Queue, Callback Queue)
- 📊 Console output tracking
- 🎓 Educational key concepts section

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling with custom CSS variables
- **Lucide React** - Icon library

## Project Structure

```
app/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Banner.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Navigation.tsx
│   │   ├── ProgressBar.tsx
│   │   └── index.ts
│   └── visualizer/            # Feature-specific components
│       ├── ConsoleOutput.tsx
│       ├── CurrentStepDisplay.tsx
│       ├── KeyConcepts.tsx
│       ├── QueueVisualizer.tsx
│       ├── VisualizerControls.tsx
│       └── index.ts
├── lib/
│   ├── constants/             # App constants and data
│   │   └── visualizer-steps.ts
│   └── hooks/                 # Custom React hooks
│       └── use-event-loop-visualizer.ts
├── globals.css                # Global styles with CSS variables
├── layout.tsx                 # Root layout
└── page.tsx                   # Home page
```

## Architecture Highlights

### Modular Component Design

- **UI Components**: Reusable, presentational components (`Button`, `Card`, `ProgressBar`)
- **Feature Components**: Domain-specific visualizer components
- **Custom Hooks**: Business logic separated into `useEventLoopVisualizer` hook
- **Constants**: Step data and configuration in dedicated files

### CSS Variables

All colors are defined as CSS variables in `globals.css` with automatic dark mode support:

- Background colors (`--background`, `--background-card`, etc.)
- Text colors (`--foreground`, `--foreground-secondary`)
- Queue colors (`--queue-callstack`, `--queue-microtask`, etc.)
- Border colors

### Performance Optimizations

- Client-side rendering only where needed (`'use client'` directive)
- Memoized callbacks with `useCallback`
- Efficient state management with custom hooks
- CSS variables for theme switching without re-renders

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

```bash
npm run build
npm start
```

## Customization

### Adding New Steps

Edit `app/lib/constants/visualizer-steps.ts` and add new step objects to the `VISUALIZER_STEPS` array.

### Modifying Colors

Update CSS variables in `app/globals.css` under the `:root` and `@media (prefers-color-scheme: dark)` sections.

### Adjusting Animation Speed

Modify the interval duration in `app/lib/hooks/use-event-loop-visualizer.ts` (default: 2000ms).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

MIT
