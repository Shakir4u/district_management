
export enum Tab {
  General = 'GENERAL',
  People = 'PEOPLE',
  Schools = 'SCHOOLS',
  Tournaments = 'TOURNAMENTS',
  Hospitals = 'HOSPITALS',
}

export enum SchoolManagementTab {
  Students = 'STUDENTS',
  Teachers = 'TEACHERS',
}

export enum HospitalManagementTab {
  Dashboard = 'DASHBOARD',
  Patients = 'PATIENTS',
  Employees = 'EMPLOYEES',
}

export interface KeyPerson {
  id: string;
  name: string;
  bio: string;
  knownFor: string;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  rollNumber: string;
  parentName: string;
  contactNumber: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  contactNumber: string;
  email: string;
}

export interface Employee {
  id: string;
  name: string;
  role: 'Doctor' | 'Nurse' | 'Admin' | 'Support Staff' | '';
  department: string;
  contactNumber: string;
  email: string;
}

export interface Patient {
  id: string;
  name: string;
  age: string;
  gender: 'Male' | 'Female' | 'Other' | '';
  contactNumber: string;
  address: string;
  medicalHistory: string;
}

export interface Appointment {
  id: string; // This will be our "Token"
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  reason: string;
}

export interface School {
  id: string;
  name: string;
  address: string;
  principal: string;
  schoolType: 'Public' | 'Private' | '';
  board: string;
  studentCount: string;
  udiseCode: string;
  email: string;
  website: string;
  contactNumber: string;
  details: string;
  images: string[];
  students: Student[];
  teachers: Teacher[];
}

export interface Tournament {
  id: string;
  name:string;
  sport: string;
  organizer: string;
  venue: string;
  startDate: string;
  endDate: string;
  ageGroup: string;
  details: string;
  images: string[];
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  specialties: string;
  contact: string;
  hospitalType: 'General' | 'Specialty' | 'Clinic' | '';
  bedCount: string;
  departments: string;
  website: string;
  email: string;
  emergencyNumber: string;
  isGovernment: boolean;
  details: string;
  images: string[];
  employees: Employee[];
  patients: Patient[];
  appointments: Appointment[];
}

export interface District {
  id?: string;
  name: string;
  state: string;
  population: string;
  area: string; // in sq. km.
  headquarters: string;
  collector: string;
  desc: string;
  shortHistory: string;
  images: string[];
  people: KeyPerson[];
  schools: School[];
  tournaments: Tournament[];
  hospitals: Hospital[];
}
