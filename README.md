# myTutor

An AI-driven solution that evaluates source code to deliver targeted refactoring recommendations, while curating relevant documentation links for ongoing learning and future reference.

## Features

- **Code analysis** – Paste code into the Monaco editor and get AI-generated suggestions
- **Helpful resources** – Each analysis returns 1–3 curated links (MDN, docs, articles) to deepen your understanding
- **GitHub sign-in** – Sign in with GitHub to track your account (optional)

## Tech Stack

- Next.js 16, React 19
- OpenRouter (AI) – GLM-4.5-Air model
- Supabase – Auth (GitHub OAuth)
- Monaco Editor, React Markdown, Tailwind CSS

## Prerequisites

- Node.js 18+
- [OpenRouter](https://openrouter.ai/) API key
- [Supabase](https://supabase.com/) project (for auth)

## Setup

1. **Clone and install**

   ```bash
   npm install
   ```

2. **Environment variables**

   Create `.env.local` in the project root:

   ```
   OPENROUTER_API_KEY=your_openrouter_api_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```

3. **Supabase auth (optional, for sign-in)**

   - In Supabase Dashboard: **Authentication → Providers** → enable **GitHub**
   - Add your GitHub OAuth app Client ID and Secret
   - Add redirect URLs: `http://localhost:3000/auth/callback` and `https://your-app.vercel.app/auth/callback`

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

The app is designed to be hosted on Vercel. Connect your repo, add the same environment variables in the Vercel project settings, and deploy. Add `https://your-app.vercel.app/auth/callback` to Supabase redirect URLs so GitHub sign-in works in production.

## How to Use

1. Paste or type code in the left panel
2. Click **Analyze & Suggest**
3. View suggestions (markdown) in the right panel
4. Use the resource links at the bottom for further reading
5. Sign in with GitHub to keep your session (optional)
