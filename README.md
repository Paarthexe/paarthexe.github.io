# Retro Terminal Portfolio

An interactive, retro-themed terminal portfolio styled with a green phosphor CRT look. Built with React, TypeScript, and Vite.

## Features

- **Retro CRT Aesthetics:** Blinking block cursor, scanlines, radial vignette, glow effects, and classic CRT screen flicker.
- **Interactive Commands:**
  - `help` - Lists available commands.
  - `about` - Displays background info/bio.
  - `skills` - Lists skills categorized by category (languages, frameworks, etc.).
  - `projects` - Lists projects or views details of a specific project (e.g., `projects view dacsaab`).
  - `contact` - Displays social links and contact information, including a resume link.
  - `snake` - Launches a playable character-based game inside the terminal.
  - `clear` - Clears the terminal screen.
- **Developer Features:** Command history (up/down arrow keys) and directory/file autocompletion using the `Tab` key.

## Tech Stack

- React + TypeScript
- Vite
- Vanilla CSS (for retro visual styling)

## Getting Started

### Installation

Install the project dependencies:

```bash
npm install
```

### Running Locally

To run the local development server:

```bash
npm run dev
```

The application will start running at `http://localhost:5173`.

### Building for Production

To create a production build:

```bash
npm run build
```

The build assets will be generated in the `dist/` directory.
