# 🎬 Movie Approval CMS

> An editorial approval workflow built on Payload CMS 3 — editors submit, admins review, approved titles publish.

<p align="left">
  <a href="https://movie-approval-cms.vercel.app"><img src="https://img.shields.io/badge/Live%20demo-000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live demo" /></a>
  <img src="https://img.shields.io/badge/Payload%20CMS%203-000?style=for-the-badge&logo=payloadcms&logoColor=white" alt="Payload CMS 3" />
  <img src="https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

**[▶ Try it live](https://movie-approval-cms.vercel.app)**

Nothing goes live on a whim: an editor submits a movie for approval, an admin approves, rejects or
requests changes, and only on approval is a record created in the **Movies** collection. Roles decide
who can submit and who can review, and the whole thing is queryable over both REST and GraphQL.

- **Stack:** Payload CMS 3, Next.js (admin + API), MongoDB  
- **Database:** MongoDB (connection string in `.env`)

### Features

- **Movie approvals** — submit, review, approve/reject, request changes  
- **Movies** — published records created when an approval is approved  
- **Users** — roles (e.g. admin / editor) for who can submit vs review  
- **REST / GraphQL** — standard Payload APIs for integrations (separate clients are outside this repo)

---

## Developer quick start

### 1) Clone

```bash
git clone https://github.com/prakashshuklahub/movie-approval-cms.git
cd movie-approval-cms
```

### 2) Environment

```bash
cp .env.example .env
```

Set at least:

- `DATABASE_URL` (or `MONGODB_URL`) — MongoDB connection string  
- `PAYLOAD_SECRET` — long random secret for Payload

### 3) MongoDB

Run MongoDB locally (or point `DATABASE_URL` at Atlas). Example on macOS:

```bash
brew services start mongodb-community
```

### 4) Install and run

```bash
npm install
npm run dev
```

Open **Admin:** `http://localhost:3000/admin` — create the first user on first visit.

### 5) After changing collections or globals

```bash
npm run generate:types
npm run generate:importmap
```

Use when you add or change fields so `payload-types.ts` and the admin import map stay in sync.

---

Built by **[Prakash Shukla](https://github.com/prakashshuklahub)** ·
[The Hustling Engineer](https://www.youtube.com/@TheHustlingEngineer)
