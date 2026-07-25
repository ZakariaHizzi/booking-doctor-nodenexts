import mongoose from "mongoose";
import dotenv from "dotenv";
import Specialty from "./moduls/SpecialtySchema.js";
import InsuranceProvider from "./moduls/InsuranceProviderSchema.js";
import Doctor from "./moduls/DoctorSchema.js";

dotenv.config();

const MONGO_URI =
  "mongodb://zakaria:zakisisi@ac-kml8sgp-shard-00-00.jyzbhfh.mongodb.net:27017,ac-kml8sgp-shard-00-01.jyzbhfh.mongodb.net:27017,ac-kml8sgp-shard-00-02.jyzbhfh.mongodb.net:27017/?ssl=true&replicaSet=atlas-txsgk3-shard-0&authSource=admin&appName=zakaria";

const specialties = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Interventional Cardiology",
  "Electrophysiology",
];

const insuranceProviders = [
  "BlueCross BlueShield",
  "Aetna",
  "UnitedHealthcare",
  "Cigna",
  "Humana",
  "Medicare",
];

const doctors = [
  {
    name: "Dr. Julian Vance, MD",
    specialty: "Cardiology",
    title: "Board-Certified Cardiologist",
    bio: "Dr. Julian Vance is a leading cardiologist with over 15 years of experience in preventive cardiology, interventional procedures, and patient-centered heart health management.",
    education: [
      "Harvard Medical School",
      "Johns Hopkins Hospital - Residency",
      "Cleveland Clinic - Fellowship in Interventional Cardiology",
    ],
    certifications: [
      "American Board of Internal Medicine",
      "Board Certified in Cardiovascular Disease",
      "Fellow of the American College of Cardiology (FACC)",
    ],
    languages: ["English", "Spanish"],
    experience_years: 15,
    rating: 4.9,
    reviews_count: 502,
    location: "New York, NY",
    image_initials: "JV",
    image_color: "bg-blue-100 text-blue-700",
    image_url:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
    next_available: "Tomorrow at 9:00 AM",
    accepted_insurance: ["BlueCross BlueShield", "Aetna", "Cigna"],
  },
  {
    name: "Dr. Marcus Chen, MD, PhD",
    specialty: "Interventional Cardiology",
    title: "Interventional Cardiologist",
    bio: "Dr. Marcus Chen specializes in minimally invasive cardiac procedures and has pioneered several techniques in transcatheter valve replacement.",
    education: [
      "Stanford University School of Medicine",
      "Mayo Clinic - Residency",
      "Mass General - Fellowship",
    ],
    certifications: [
      "Board Certified in Interventional Cardiology",
      "FACC",
      "FSCAI",
    ],
    languages: ["English", "Mandarin"],
    experience_years: 12,
    rating: 4.8,
    reviews_count: 378,
    location: "New York, NY",
    image_initials: "MC",
    image_color: "bg-purple-100 text-purple-700",
    image_url:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face",
    next_available: "Today at 2:00 PM",
    accepted_insurance: ["UnitedHealthcare", "Cigna", "Medicare"],
  },
  {
    name: "Dr. Robert Miller, MD",
    specialty: "Electrophysiology",
    title: "Cardiac Electrophysiologist",
    bio: "Dr. Robert Miller is an expert in cardiac rhythm disorders, specializing in pacemaker implantation, defibrillator therapy, and catheter ablation for atrial fibrillation.",
    education: [
      "University of Pennsylvania Medical School",
      "NYU Langone - Residency",
      "UCLA - Fellowship in Cardiac Electrophysiology",
    ],
    certifications: [
      "Board Certified in Clinical Cardiac Electrophysiology",
      "FACC",
      "FHRS",
    ],
    languages: ["English"],
    experience_years: 18,
    rating: 4.8,
    reviews_count: 312,
    location: "New York, NY",
    image_initials: "RM",
    image_color: "bg-green-100 text-green-700",
    image_url:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop&crop=face",
    next_available: "Thursday at 10:30 AM",
    accepted_insurance: [
      "BlueCross BlueShield",
      "Aetna",
      "UnitedHealthcare",
      "Cigna",
    ],
  },
  {
    name: "Dr. Thomas Johnson, MD, FACC",
    specialty: "Cardiology",
    title: "Senior Cardiologist",
    bio: "Dr. Thomas Johnson brings over 20 years of experience in general and preventive cardiology.",
    education: [
      "Columbia University Medical School",
      "Mount Sinai - Residency",
      "Brigham and Women's Hospital - Fellowship",
    ],
    certifications: [
      "Board Certified in Cardiovascular Disease",
      "FACC",
      "FAHA",
    ],
    languages: ["English", "French"],
    experience_years: 20,
    rating: 4.9,
    reviews_count: 612,
    location: "New York, NY",
    image_initials: "TJ",
    image_color: "bg-orange-100 text-orange-700",
    image_url: "",
    next_available: "Wednesday at 11:00 AM",
    accepted_insurance: ["Aetna", "Cigna", "Humana", "Medicare"],
  },
  {
    name: "Dr. Julian Mercer, MD",
    specialty: "Cardiology",
    title: "Cardiology Specialist",
    bio: "Specializing in preventative heart health and advanced diagnostic procedures with a focus on patient-centered outcomes.",
    education: [
      "Yale School of Medicine",
      "Duke University Hospital - Residency",
    ],
    certifications: ["Board Certified in Cardiovascular Disease"],
    languages: ["English"],
    experience_years: 15,
    rating: 4.9,
    reviews_count: 502,
    location: "New York, NY",
    image_initials: "JM",
    image_color: "bg-blue-100 text-blue-700",
    image_url:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&crop=face",
    next_available: "Friday at 9:30 AM",
    accepted_insurance: [
      "BlueCross BlueShield",
      "Aetna",
      "Cigna",
      "UnitedHealthcare",
    ],
  },
  {
    name: "Dr. David Watson, MD",
    specialty: "Dermatology",
    title: "Board-Certified Dermatologist",
    bio: "Dr. David Watson is a board-certified dermatologist specializing in medical, surgical, and cosmetic dermatology.",
    education: [
      "NYU Grossman School of Medicine",
      "Mayo Clinic - Residency in Dermatology",
      "UCSF - Fellowship in Mohs Surgery",
    ],
    certifications: [
      "American Board of Dermatology",
      "Fellow of the American Academy of Dermatology",
    ],
    languages: ["English", "Korean"],
    experience_years: 10,
    rating: 4.7,
    reviews_count: 234,
    location: "New York, NY",
    image_initials: "DW",
    image_color: "bg-pink-100 text-pink-700",
    image_url: "",
    next_available: "Monday at 10:00 AM",
    accepted_insurance: ["BlueCross BlueShield", "Aetna", "Cigna"],
  },
  {
    name: "Dr. Michael Torres, MD, PhD",
    specialty: "Neurology",
    title: "Senior Neurologist",
    bio: "Dr. Michael Torres is a distinguished neurologist with expertise in headache disorders, multiple sclerosis, and neurodegenerative diseases.",
    education: [
      "Johns Hopkins University School of Medicine",
      "Mass General Brigham - Residency in Neurology",
      "NIH - Fellowship in Neuroimmunology",
    ],
    certifications: [
      "American Board of Psychiatry and Neurology",
      "United Council for Neurologic Subspecialties",
      "Fellow of the American Neurological Association",
    ],
    languages: ["English", "Spanish", "Portuguese"],
    experience_years: 14,
    rating: 4.8,
    reviews_count: 298,
    location: "New York, NY",
    image_initials: "MT",
    image_color: "bg-indigo-100 text-indigo-700",
    image_url: "",
    next_available: "Tuesday at 1:00 PM",
    accepted_insurance: ["UnitedHealthcare", "Cigna", "Medicare"],
  },
  {
    name: "Dr. Kevin Kim, MD",
    specialty: "Pediatrics",
    title: "Pediatrician & Child Health Specialist",
    bio: "Dr. Kevin Kim is a compassionate pediatrician dedicated to providing comprehensive care for children from infancy through adolescence.",
    education: [
      "University of Michigan Medical School",
      "Boston Children's Hospital - Residency in Pediatrics",
      "Children's Hospital of Philadelphia - Fellowship in Developmental Pediatrics",
    ],
    certifications: [
      "American Board of Pediatrics",
      "Fellow of the American Academy of Pediatrics",
    ],
    languages: ["English", "Mandarin", "Cantonese"],
    experience_years: 9,
    rating: 4.9,
    reviews_count: 456,
    location: "New York, NY",
    image_initials: "KK",
    image_color: "bg-teal-100 text-teal-700",
    image_url: "",
    next_available: "Today at 3:30 PM",
    accepted_insurance: [
      "BlueCross BlueShield",
      "Aetna",
      "UnitedHealthcare",
      "Humana",
    ],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await Specialty.deleteMany({});
    await InsuranceProvider.deleteMany({});
    await Doctor.deleteMany({});

    const specResult = await Specialty.insertMany(
      specialties.map((name) => ({ name }))
    );
    console.log(`Seeded ${specResult.length} specialties`);

    const insResult = await InsuranceProvider.insertMany(
      insuranceProviders.map((name) => ({ name }))
    );
    console.log(`Seeded ${insResult.length} insurance providers`);

    const docResult = await Doctor.insertMany(doctors);
    console.log(`Seeded ${docResult.length} doctors`);

    console.log("Seed complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();
