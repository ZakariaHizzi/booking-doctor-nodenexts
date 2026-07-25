# HealSync

A modern healthcare platform that connects patients with world-class specialists. Find doctors, book appointments instantly, manage health records, and track treatment progress — all in one place.

## Features

- **Doctor Directory** — Browse specialists by name, specialty, or location with ratings and reviews
- **Instant Booking** — View real-time availability and book appointments in seconds
- **Patient Dashboard** — Manage appointments, view health progress, and access records
- **Authentication** — Secure sign-up and login for patients and healthcare providers (Supabase Auth)
- **Role-Based Access** — Separate roles for patients and providers with Row Level Security
- **Responsive Design** — Fully responsive UI with smooth animations (Framer Motion)

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, React 19)
- [Supabase](https://supabase.com/) (Auth, PostgreSQL, Row Level Security)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) (animations)
- [Inter](https://rsms.me/inter/) (Google Font)

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com/) project

### Setup

1. Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd nextproject
npm install
```

2. Create a `.env.local` file with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

3. Run the Supabase migrations to set up the database schema:

- `supabase/migrations/00001_schema.sql` — Core tables (profiles, doctors, appointments, specialties, insurance providers) with RLS policies
- `supabase/migrations/00002_add_image_url.sql` — Adds image URL support

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── page.js              # Landing page (hero, features, testimonials)
│   ├── layout.js            # Root layout (Navbar + Footer)
│   ├── globals.css          # Global styles & Tailwind theme
│   ├── auth/
│   │   ├── login/           # Login page
│   │   ├── register/        # Registration page
│   │   └── callback/        # Auth callback handler
│   ├── doctors/
│   │   ├── page.js          # Doctor directory
│   │   └── [id]/            # Doctor detail page
│   ├── appointment/
│   │   └── page.js          # Appointment booking
│   └── dashboard/
│       ├── page.js          # Patient dashboard
│       └── appointments/    # Patient appointments list
├── components/              # Reusable UI components
│   ├── Navbar.js
│   ├── Footer.js
│   ├── DoctorCard.js
│   ├── AppointmentCard.js
│   ├── StatsCard.js
│   ├── FadeIn.js            # Scroll-triggered animation wrapper
│   └── Icons.js             # SVG icon components
├── hooks/
│   ├── useUser.js           # Current user hook
│   └── useAppointments.js   # Appointments data hook
├── lib/
│   └── supabase/            # Supabase client utilities
└── middleware.js            # Auth middleware for protected routes

supabase/
├── migrations/
│   ├── 00001_schema.sql     # Database schema & RLS policies
│   └── 00002_add_image_url.sql
└── seed.sql                 # Seed data
```

## Database Schema

| Table | Description |
|---|---|
| `profiles` | User profiles (patient/provider roles) |
| `doctors` | Doctor listings with specialty, ratings, education, and availability |
| `appointments` | Patient appointments with scheduling and status tracking |
| `specialties` | Medical specialties (Cardiology, Neurology, etc.) |
| `insurance_providers` | Accepted insurance providers |

All tables are secured with Supabase Row Level Security (RLS) policies.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
