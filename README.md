# Stitch Next

Server-first healthcare booking platform built from the provided UI handoff.

## Stack

- Next.js 16 App Router
- Tailwind CSS 4
- MongoDB
- Prisma ORM
- Better Auth
- Nodemailer with Gmail App Password

## Routes

- `/` landing page
- `/doctors` search results
- `/doctors/[slug]` doctor profile and slot booking
- `/checkout/[bookingId]` payment page
- `/booking/[reference]/success` confirmation page
- `/dashboard` patient dashboard
- `/doctor` doctor dashboard
- `/doctor/availability` doctor availability manager
- `/doctor/appointments/[id]` appointment detail with AI summary
- `/admin` admin control panel
- `/admin/reports` analytics and reports
- `/admin/session-analysis` AI-powered session analysis
- `/sign-in` and `/sign-up` Better Auth entry points

## Setup

1. Copy `.env.example` to `.env.local`.
2. Fill in MongoDB, Better Auth, Google OAuth, and Gmail App Password values.
3. Run `npm install`.
4. Run `npx prisma generate`.
5. Run `npx prisma db push`.
6. Run `npm run dev`.
