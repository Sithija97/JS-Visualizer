# Dynamic Event Loop Visualizer - Updates

## What Changed

The JavaScript Event Loop Visualizer has been transformed from using hard-coded steps to **dynamically analyzing user-provided code**.

### Key Features

1. **Monaco Code Editor Integration**
   - Full-featured code editor powered by Monaco (VS Code's editor)
   - Syntax highlighting for JavaScript
   - Light/dark theme support
   - 400px height with line numbers

2. **Dynamic Code Analysis**
   - Real-time parsing of JavaScript code
   - Automatic detection of:
     - `console.log()` statements
     - `setTimeout()` calls
     - `async/await` patterns
     - Promise creation and `.then()` chains
   - Smart event loop step generation

3. **Interactive Workflow**
   - Write or edit JavaScript code in the editor
   - Click "Visualize" to analyze and generate steps
   - Use playback controls to step through execution
   - Watch queues and call stack update in real-time

### New Components

- **CodeEditor.tsx** - Monaco editor wrapper with "Visualize" button
- **code-analyzer.ts** - Analyzes JavaScript and generates event loop steps

### Modified Components

- **VisualizerExperience.tsx** - Now includes code editor and manages visualization state
- **use-event-loop-visualizer.ts** - Accepts dynamic steps instead of hard-coded ones

### Default Example Code

The editor comes pre-loaded with a comprehensive example showing:

- Synchronous code execution
- setTimeout (macrotasks)
- async/await (microtasks)
- Promises and .then() chains

### How It Works

1. User writes JavaScript code in the Monaco editor
2. Clicks "Visualize" button
3. Code analyzer parses the code line-by-line
4. Detects async patterns (setTimeout, promises, async/await)
5. Generates step-by-step execution sequence
6. Visualizer displays queues, call stack, and console output
7. User can play/pause/step through execution

### Technical Details

- **No AST parsing** - Uses simple line-by-line analysis for reliability
- **Pattern matching** - Detects common async patterns via regex
- **State tracking** - Maintains call stack, microtask queue, and callback queue
- **Event loop simulation** - Follows correct microtask → macrotask order

### Try It Out

Visit `http://localhost:3000` and try:

- Modifying the default code
- Adding more `setTimeout` calls
- Creating promise chains
- Using async/await patterns
- Seeing how microtasks execute before macrotasks

The visualizer will automatically adapt to your code!
