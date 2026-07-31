# Appointment App - Node.js Backend

A full-stack medical appointment booking application with a Node.js/Express backend and a Next.js frontend. Patients can browse doctors by specialty, view doctor profiles, and book appointments. Doctors/providers can manage their appointments and update statuses.

## Tech Stack

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js v5
- **Database:** MongoDB (via Mongoose v9)
- **Authentication:** JWT (JSON Web Tokens) with HTTP-only cookies
- **Password Hashing:** bcryptjs
- **Other:** CORS, Cookie Parser, dotenv

### Frontend
- **Framework:** Next.js (located in `nextproject/`)

## Project Structure

```
.
├── server.js              # Express app entry point, DB connection, route mounting
├── seed.js                # Database seed script for sample data
├── package.json           # Backend dependencies and scripts
├── .env                   # Environment variables (SECRET_KEY)
├── auth/
│   └── middleware.js       # JWT authentication middleware (cookie & Bearer token)
├── moduls/
│   ├── userSchema.js              # User model (email, password, full_name)
│   ├── DoctorSchema.js            # Doctor model (profile, specialty, credentials, insurance)
│   ├── appointementSchema.js      # Appointment model (patient, doctor, date/time, status)
│   ├── SpecialtySchema.js         # Specialty model (name)
│   └── InsuranceProviderSchema.js # Insurance Provider model (name)
├── routes/
│   ├── user.js            # Auth routes (register, signin, signout, me)
│   ├── doctor.js          # Doctor CRUD routes
│   ├── appointment.js     # Appointment management routes
│   ├── specialty.js       # Specialty listing route
│   ├── insurance.js       # Insurance provider listing route
│   └── profile.js         # User profile route
└── nextproject/           # Next.js frontend application
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB instance)
- npm

### Installation

1. Clone the repository and navigate to the project folder.

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   SECRET_KEY=your_jwt_secret_key
   ```

4. Seed the database with sample data (optional):
   ```bash
   node seed.js
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

   The server runs on `http://localhost:3000`.

6. For the frontend, navigate to `nextproject/` and follow its setup instructions.

## API Endpoints

### Authentication (`/user`)

| Method | Endpoint              | Description              | Auth Required |
|--------|-----------------------|--------------------------|---------------|
| POST   | `/user/auth/register` | Register a new user      | No            |
| POST   | `/user/auth/signin`   | Sign in                  | No            |
| POST   | `/user/signout`       | Sign out (clear cookie)  | No            |
| GET    | `/user/me`            | Get current user profile | Yes           |

### Doctors (`/doctor`)

| Method | Endpoint              | Description              | Auth Required |
|--------|-----------------------|--------------------------|---------------|
| GET    | `/doctor/doctors`     | Get all doctors          | No            |
| GET    | `/doctor/doctors/:id` | Get doctor by ID         | No            |
| POST   | `/doctor/Doctor`      | Create a new doctor      | No            |

### Appointments (`/appointment`)

| Method | Endpoint                              | Description                      | Auth Required |
|--------|---------------------------------------|----------------------------------|---------------|
| GET    | `/appointment/myAppointments`         | Get current patient's appointments | Yes         |
| GET    | `/appointment/providerAppointments`   | Get provider's appointments       | Yes         |
| GET    | `/appointment/count`                  | Get appointment counts            | Yes         |
| POST   | `/appointment/createAppointment`      | Create a new appointment          | Yes         |
| DELETE | `/appointment/deleteAppointment/:id`  | Delete an appointment             | Yes         |
| PUT    | `/appointment/updateStatus/:id`       | Update appointment status         | Yes         |

### Specialties (`/specialty`)

| Method | Endpoint     | Description        | Auth Required |
|--------|--------------|--------------------|---------------|
| GET    | `/specialty/` | Get all specialties | No           |

### Insurance (`/insurance`)

| Method | Endpoint      | Description              | Auth Required |
|--------|---------------|--------------------------|---------------|
| GET    | `/insurance/` | Get all insurance providers | No          |

### Profile (`/profile`)

| Method | Endpoint       | Description       | Auth Required |
|--------|----------------|-------------------|---------------|
| GET    | `/profile/:id` | Get user by ID    | Yes           |

## Data Models

### User
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `full_name` (String)
- `created_at` / `updated_at` (Date)

### Doctor
- `profile_id` (ObjectId, ref: User)
- `name` (String, required)
- `specialty` (String, required)
- `title`, `bio` (String)
- `education`, `certifications`, `languages`, `accepted_insurance` (Array of Strings)
- `experience_years`, `rating`, `reviews_count` (Number)
- `location`, `image_initials`, `image_color`, `image_url`, `next_available` (String)

### Appointment
- `patient_id` (ObjectId, ref: User, required)
- `doctor_id` (ObjectId, ref: Doctor, required)
- `appointment_date`, `appointment_time` (String, required)
- `status` (String: scheduled | completed | cancelled, default: scheduled)
- `reason_for_visit` (String)
- `is_first_visit` (Boolean)
- `insurance_provider`, `insurance_member_id`, `insurance_group_number` (String)

### Specialty
- `name` (String, required, unique)

### InsuranceProvider
- `name` (String, required, unique)

## Authentication

- JWT tokens are stored in HTTP-only cookies with a 7-day expiry.
- The auth middleware also supports `Authorization: Bearer <token>` headers.
- Passwords are hashed with bcrypt (salt rounds: 10).

## Seed Data

The `seed.js` script populates the database with:

- **6 Specialties:** Cardiology, Dermatology, Neurology, Pediatrics, Interventional Cardiology, Electrophysiology
- **6 Insurance Providers:** BlueCross BlueShield, Aetna, UnitedHealthcare, Cigna, Humana, Medicare
- **8 Doctors** with full profiles including education, certifications, languages, ratings, and accepted insurance
