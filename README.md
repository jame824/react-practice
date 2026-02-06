# React Practice

A collection of React projects for deliberate practice, focusing on core frontend and backend concepts.

## Projects

### 1. Movie App

A movie discovery app built with pure React (Vite). Search for movies using TMDB API with debounced search, and track trending searches via Appwrite.

**Tech Stack:**
- React 19 + Vite
- Tailwind CSS
- Appwrite (trending search storage)
- TMDB API

**Key Concepts:**
- Debounced search with `use-debounce`
- External API consumption (fetch)
- Loading/error/success state handling
- useEffect for data fetching

### 2. Storage App

A file storage application built with Next.js. Upload, share, rename, and delete files with user authentication via OTP.

**Tech Stack:**
- Next.js 15 (App Router, Server Actions)
- React 19
- Appwrite (auth, database, storage)
- Tailwind CSS + shadcn/ui
- react-hook-form + Zod validation

**Key Concepts:**
- Server Actions for CRUD operations
- Dynamic routing (`[type]`)
- URL state management (search, sort)
- Form validation with Zod
- Multi-step auth flow (email → OTP)
- File upload with react-dropzone

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

---

### Movie App

```bash
cd movie-app
npm install
```

Create a `.env` file:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

### Storage App

```bash
cd storage-app
npm install
```

Create a `.env.local` file (see `.env.example`):

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE=your_database_id
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=your_users_collection_id
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=your_files_collection_id
NEXT_PUBLIC_APPWRITE_BUCKET=your_bucket_id
NEXT_APPWRITE_KEY=your_appwrite_secret_key
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Scripts Reference

| Command | Movie App | Storage App |
|---------|-----------|-------------|
| Dev server | `npm run dev` | `npm run dev` |
| Build | `npm run build` | `npm run build` |
| Lint | `npm run lint` | `npm run lint` |
| Start prod | `npm run preview` | `npm run start` |
