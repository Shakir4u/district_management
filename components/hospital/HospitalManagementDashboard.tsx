
import React, { useState } from 'react';
import { Hospital, HospitalManagementTab, Patient, Employee, Appointment } from '../../types';
import { HOSPITAL_MANAGEMENT_TABS } from '../../constants';
import AppointmentPanel from './AppointmentPanel';
import PatientPanel from './PatientPanel';
import EmployeePanel from './EmployeePanel';

interface HospitalManagementDashboardProps {
  hospital: Hospital;
  onUpdateHospital: (updatedHospital: Hospital) => void;
  onBack: () => void;
}

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
    </svg>
);

const HospitalManagementDashboard: React.FC<HospitalManagementDashboardProps> = ({ hospital, onUpdateHospital, onBack }) => {
  const [activeTab, setActiveTab] = useState<HospitalManagementTab>(HospitalManagementTab.Dashboard);

  const renderContent = () => {
    switch (activeTab) {
      case HospitalManagementTab.Dashboard:
        return <AppointmentPanel 
            appointments={hospital.appointments}
            patients={hospital.patients}
            employees={hospital.employees}
            onUpdate={(updatedAppointments: Appointment[]) => onUpdateHospital({ ...hospital, appointments: updatedAppointments })}
        />;
      case HospitalManagementTab.Patients:
        return <PatientPanel 
          patients={hospital.patients}
          onUpdate={(updatedPatients: Patient[]) => onUpdateHospital({ ...hospital, patients: updatedPatients })}
        />;
      case HospitalManagementTab.Employees:
        return <EmployeePanel 
          employees={hospital.employees}
          onUpdate={(updatedEmployees: Employee[]) => onUpdateHospital({ ...hospital, employees: updatedEmployees })}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full h-full">
        {/* We use a nested flexbox here to create the sub-dashboard layout */}
        <aside className="w-60 bg-white dark:bg-slate-800/30 border-r border-slate-200 dark:border-slate-700/50 p-4 flex flex-col flex-shrink-0 rounded-l-2xl">
            <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-600 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s-8-4.48-8-12a8 8 0 0 1 16 0c0 7.52-8 12-8 12Z" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M10 12h4" /><path d="M12 10v4" />
                    </svg>
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white truncate" title={hospital.name}>{hospital.name}</h2>
            </div>
            <button onClick={onBack} className="flex items-center space-x-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-4 ml-1">
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Back to All Facilities</span>
            </button>
            <nav className="flex flex-col space-y-2">
            {HOSPITAL_MANAGEMENT_TABS.map(({ id, label, icon: Icon }) => (
                <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    activeTab === id
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
                >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
                </button>
            ))}
            </nav>
        </aside>
        
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-800/50 p-6 rounded-r-2xl">
            {renderContent()}
        </div>
    </div>
  );
};

export default HospitalManagementDashboard;
