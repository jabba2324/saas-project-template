# Next.js SaaS Template

A production-ready Next.js 15 SaaS starter built on Vercel's native services.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| Auth | [Auth.js v5](https://authjs.dev/) — Email / Password |
| Database | [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (Neon) + [Drizzle ORM](https://orm.drizzle.team/) |
| File storage | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) |
| UI | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |

## Pages

| Route | Description |
|---|---|
| `/` | Public landing page |
| `/login` | Sign in with email and password |
| `/register` | Create an account |
| `/dashboard` | Protected dashboard home |
| `/profile` | Profile picture upload + change password |

---

## Local Development

### 1. Clone and install

```bash
git clone <your-repo>
cd saas-template
npm install
```

### 2. Set up Vercel services

You need two Vercel storage services linked to your project:

1. **Vercel Postgres** — create a store in the [Vercel dashboard](https://vercel.com/dashboard) under Storage.
2. **Vercel Blob** — create a store in the Vercel dashboard under Storage.

### 3. Pull environment variables

```bash
npm i -g vercel          # if not installed
vercel link              # link this directory to your Vercel project
vercel env pull .env.local
```

Then add `AUTH_SECRET` to `.env.local`:

```env
AUTH_SECRET=             # openssl rand -base64 32
```

### 4. Push the database schema

```bash
npm run db:push
```

This creates all required tables (`user`, `account`, `session`, `verificationToken`) in your Vercel Postgres database.

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

```bash
vercel --prod
```

Environment variables from linked Vercel services are automatically available. Add `AUTH_SECRET` in the Vercel project settings under Environment Variables.

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/login          # Sign-in page
│   ├── (auth)/register       # Registration page
│   ├── (dashboard)/dashboard # Protected home
│   ├── (dashboard)/profile   # Profile management
│   └── api/
│       ├── auth/[...nextauth] # Auth.js handler
│       ├── auth/register      # POST — create account
│       ├── profile/avatar     # POST — upload via Vercel Blob
│       └── profile/password   # POST — change password
├── components/
│   ├── auth/                  # Login + register forms
│   ├── profile/               # Avatar upload + password form
│   └── ui/                    # shadcn/ui primitives
└── lib/
    ├── db/index.ts            # Drizzle client
    ├── db/schema.ts           # Table definitions
    └── utils.ts               # cn() helper

auth.ts                        # Auth.js v5 config
middleware.ts                  # Route protection
drizzle.config.ts
```

---

## Useful Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run db:push` | Push schema changes to the database |
| `npm run db:studio` | Open Drizzle Studio (visual DB browser) |
| `npm run db:generate` | Generate migration SQL files |
