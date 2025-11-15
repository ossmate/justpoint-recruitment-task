A small Next.js 16 project built for the Justpoint recruitment task. It fetches data from the **TMDb** (The Movie Database) public API and lets users:

* browse the list of **popular movies**,
* open a **modal** with a short overview,
* navigate to a **detail page** with extended information.

Responsive design is implemented with **Tailwind CSS**.

---

## ⚡ Tech Stack

| Purpose | Library / Tool |
|---------|----------------|
| Framework | **Next.js 16** (App Router, Server Components) |
| UI Library | **React 19** with **TypeScript 5** |
| Styling | **Tailwind CSS 4** |
| Icons | **Lucide-react** |
| Testing | **Vitest** + **@testing-library/react / jest-dom** |
| Linting | **ESLint 9** |
| Package Manager | **pnpm** |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/<your-org>/justpoint-recruitment-task.git
cd justpoint-recruitment-task
pnpm install
```

### 2. Obtain a TMDb API key

1. Sign up at https://www.themoviedb.org/
2. Go to **Settings → API** and generate an **API Key (v3 auth)**.

### 3. Configure environment variables

Create a file called `.env.local` in the project root:

```bash
TMDB_API_KEY=<your_api_key_here>
```

### 4. Run the dev server

```bash
pnpm dev
```

Visit http://localhost:3000.

---

## 🏗️ Project Structure

```
├── app/                 # Next.js server & client components
│   ├── layout.tsx
│   ├── page.tsx         # Home / Popular movies (server component)
│   └── movie/[id]/      # Dynamic movie detail route
│       └── page.tsx
├── components/          # Re-usable UI components (MovieCard, MovieModal, …)
├── lib/
│   └── api/tmdb.ts      # TMDb API helpers
├── types/               # TypeScript types shared across the app
├── test/                # Utility mocks for unit tests
└── ...                  # Config & meta files
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Build production bundle |
| `pnpm start` | Run the production server |
| `pnpm lint` | Lint the codebase with ESLint |
| `pnpm test` | Run unit tests with Vitest |
---

## ✨ Features Implemented

* Popular movies list with infinite scroll-ready component layout.
* Detail modal (client side) + dedicated server-rendered detail page.
* Responsive layouts for mobile, tablet and desktop breakpoints.
* Image optimisation via `next/image`.
* Three unit tests covering list, card and date helpers.

---