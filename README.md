# Fardeen Ahmed — Creative Frontend Developer Portfolio

A modern, creative, responsive, and fully manageable personal portfolio built with **Next.js 16 (App Router)**. It works as a **personal portfolio + mini CMS**: the owner can update profile, skills, projects, experience, education, services, achievements, and social links from a secure admin dashboard **without touching source code**.

> Design: dark-first, premium, developer-focused, fully responsive, accessible, and SEO-ready.

## 1. Project Overview

A production-ready database-driven portfolio for **Fardeen Ahmed — Frontend Developer**. Visitors browse the public site; the owner manages all content from an authenticated admin panel.

## 2. Features

- **Public site**: Home (Hero, Skills, Featured Projects, Experience, Services, CTA), About, Projects (filterable), Project detail pages, Contact.
- **Admin CMS**: Dashboard, Profile, Skills, Experience, Education, Projects, Services, Achievements, Messages, Settings.
- **Auth**: Secure credentials login with bcrypt password hashing & JWT sessions (next-auth v5).
- **Content CRUD**: Create / edit / delete / publish-draft / reorder every major content type.
- **Contact system**: Validated public form stored in MongoDB, with optional Resend email notifications.
- **Dark / Light / System** theme with next-themes (no flash on load).
- **Animations**: Framer Motion (hero, scroll reveals, navbar).
- **SEO**: Metadata API, sitemap.xml, robots.txt, canonical links, and JSON-LD structured data (Person + WebSite).
- **Modern UI**: Tailwind CSS v4, shadcn-style primitives, glassmorphism, gradient accents.

## 3. Technology Stack

- **Framework**: Next.js 16 (App Router, Server Components, Route Handlers)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4, tailwind-merge, clsx, class-variance-authority
- **UI/Animation**: Framer Motion, lucide-react, Radix UI primitives
- **Forms/Validation**: React Hook Form, Zod
- **Auth**: NextAuth (next-auth@beta) Credentials provider, bcryptjs
- **Database**: MongoDB via Mongoose
- **Media (optional)**: Cloudinary, Resend (email)

## 4. Installation

```bash
npm install
```

## 5. Environment Variables

Copy `.env.example` to `.env.local` and fill in real values. Secrets are **never** exposed to the client.

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_URI` | yes | MongoDB connection string |
| `AUTH_SECRET` | yes | Secret used to sign auth JWTs |
| `NEXT_PUBLIC_APP_URL` | yes | Public base URL |
| `CLOUDINARY_*` | no | For image uploads |
| `RESEND_API_KEY` | no | Contact email notifications |
| `CONTACT_EMAIL` | no | Notification recipient |
| `ADMIN_EMAIL` | yes | Initial admin email (seed) |
| `ADMIN_PASSWORD` | yes | Initial admin password (seed) |

## 6. Database Setup

Use **MongoDB Atlas** (recommended) or any MongoDB instance. Provide the URI in `MONGODB_URI`. No migrations needed — Mongoose creates collections on first write.

## 7. Admin Setup

1. Start the dev server and open `http://localhost:3000`.
2. Seed the database once via `Settings → Seed Initial Data` or `POST /api/admin/seed` (dev only). This creates the admin user and demo content.
3. Log in at `/admin/login`.

## 8. Development

```bash
npm run dev
```

The admin area lives under `/admin/*`, protected by `app/proxy.ts` (Next.js 16 Proxy convention).

## 9. Production Build

```bash
npm run build
npm start
```

## 10. Deployment

Recommended: **Vercel** + **MongoDB Atlas**. Set environment variables in project settings. The `/api/admin/seed` route is disabled in production.

## 11. Image Storage

Image URLs (avatar, project covers, gallery) are stored as strings. With Cloudinary configured, upload via the SDK and persist the returned secure URL. Otherwise paste any hosted image URL.

## 12. Email Configuration

Set `RESEND_API_KEY` and `CONTACT_EMAIL`. Contact submissions are stored in MongoDB and, when configured, a notification email is sent via Resend. Email failure is non-blocking.

## 13. How to Add Projects

Admin → **Projects → Add Project**. Fill title, slug, description, category, technologies, links, featured/published flags, and order. Publish to show it publicly.

## 14. How to Update Profile

Admin → **Profile**. Edit name, title, bio, contact info, availability, stats, and SEO fields. Save to update the public site instantly.

## 15. How to Update Skills

Admin → **Skills**. Add/edit skills with category, level (0-100), years of experience, and publish state.

## 16. How to Update Experience

Admin → **Experience**. Add roles with company, position, dates, responsibilities, and technologies. Toggle `current` for ongoing roles.

## 17. Troubleshooting

- **Cannot connect to DB**: verify `MONGODB_URI` and Atlas IP allowlist.
- **Logged out unexpectedly**: ensure `AUTH_SECRET` is set (JWT sessions).
- **Admin redirect loop**: confirm `app/proxy.ts` matcher and hit `/admin/login` first.
- **Images not loading**: use absolute URLs; configure Next.js remote patterns if needed.
- **Email not received**: confirm `RESEND_API_KEY` + `CONTACT_EMAIL`.

© Fardeen Ahmed. Built with Next.js, Tailwind CSS & TypeScript.
