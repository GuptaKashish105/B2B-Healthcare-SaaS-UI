import { create } from "zustand";

interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
  status: "Stable" | "Urgent" | "Under Review";
  lastVisit: string;
  doctor: string;
}

interface PatientState {
  patients: Patient[];
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
}

const mockPatients: Patient[] = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    condition: "Hypertension",
    status: "Under Review",
    lastVisit: "2026-04-20",
    doctor: "Dr. Patel",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 25,
    condition: "Diabetes",
    status: "Stable",
    lastVisit: "2026-04-22",
    doctor: "Dr. Alvarez",
  },
  {
    id: 3,
    name: "Bob Johnson",
    age: 45,
    condition: "Asthma",
    status: "Urgent",
    lastVisit: "2026-04-18",
    doctor: "Dr. Wong",
  },
  {
    id: 4,
    name: "Alice Brown",
    age: 35,
    condition: "Arthritis",
    status: "Stable",
    lastVisit: "2026-04-16",
    doctor: "Dr. Singh",
  },
];

export const usePatientStore = create<PatientState>((set) => ({
  patients: mockPatients,
  view: "list",
  setView: (view) => set({ view }),
}));
