## Movie Duniya (Payload CMS Backend)

Backend for a movie catalogue website.

- Frontend: Astro (separate repo)
- CMS/API: Payload CMS (this repo)
- Database: MongoDB

### What this repo does

- Provides an admin UI to **edit site pages** and **manage movies**
- Supports a **movie approval workflow**
  - Editors can submit new movies as **pending**
  - Users with approval access can **approve**, then movies become visible in APIs
- Exposes movie APIs used by the Astro frontend (list/detail/search)
- Frontend handles **debounced search** to reduce API calls

---

## Developer quick start (clone + run)

### 1) Clone

```bash
git clone <YOUR_REPO_URL> movie-duniya-admin
cd movie-duniya-admin
```

### 2) Configure env

```bash
cp .env.example .env
```

Set at least:

- `MONGODB_URL` or `DATABASE_URL`
- `PAYLOAD_SECRET`

### 3) Start MongoDB

Local:

```bash
brew services start mongodb-community
```

### 4) Install + run

```bash
npm install
npm run dev
```

Open:

- Admin UI: `http://localhost:3000/admin`

On first run, create the initial admin user.

---

## After schema changes

Run Payload type generation:

```bash
npm run generate:types
```
