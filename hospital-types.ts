export enum HospitalTab {
  Dashboard = 'DASHBOARD',
  Patients = 'PATIENTS',
  Employees = 'EMPLOYEES',
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

export interface HospitalData {
  employees: Employee[];
  patients: Patient[];
  appointments: Appointment[];
}