# 24h Story Feature

A simple Instagram-like Stories application built with React, TypeScript, and Vite.

This project was completed as part of the roadmap.sh frontend projects.

**Project URL:** https://roadmap.sh/projects/stories-feature

---

## Features

- Upload image stories
- Store stories in Local Storage
- Automatically expire stories after 24 hours
- Remove expired stories on application startup
- View stories in fullscreen
- Previous / Next story navigation
- Keyboard navigation
- Mouse click navigation
- Touch swipe navigation
- Automatic story progression
- Story progress indicator
- Delete stories
- Responsive UI
- Empty state when no stories are available

---

## Tech Stack

- React
- TypeScript
- Vite
- Local Storage
- CSS

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build production version

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## Available Scripts

| Script                 | Description                                       |
| ---------------------- | ------------------------------------------------- |
| `npm run dev`          | Start development server                          |
| `npm run build`        | Build production bundle                           |
| `npm run preview`      | Preview production build                          |
| `npm run lint`         | Run ESLint                                        |
| `npm run format`       | Format source code with Prettier                  |
| `npm run format:check` | Check formatting                                  |
| `npm run typecheck`    | Run TypeScript type checking                      |
| `npm run check`        | Run type checking, linting, and formatting checks |

---

## Project Structure

```
src/
├── app/
├── components/
├── services/
├── types/
├── utils/
├── main.tsx
└── index.css
```

---

## Story Behavior

- Stories are stored in Local Storage.
- Each story expires 24 hours after creation.
- Expired stories are removed automatically.
- Stories can be deleted manually.
- Navigation works with keyboard, mouse, and touch gestures.
- Stories automatically advance after a short delay.

---

## License

This project was created for educational purposes as part of the roadmap.sh learning path.
