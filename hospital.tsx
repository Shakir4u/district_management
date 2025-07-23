import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { HospitalData, HospitalTab, Employee, Patient, Appointment } from './hospital-types';
import { HOSPITAL_TABS } from './hospital-constants';
import H_DashboardPanel from './components/hospital/H_DashboardPanel';
import H_PatientPanel from './components/hospital/H_PatientPanel';
import H_EmployeePanel from './components/hospital/H_EmployeePanel';

const emptyData: HospitalData = { employees: [], patients: [], appointments: [] };

const HospitalApp: React.FC = () => {
    const [data, setData] = useState<HospitalData>(emptyData);
    const [activeTab, setActiveTab] = useState<HospitalTab>(HospitalTab.Dashboard);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        try {
            const savedData = localStorage.getItem('hospitalData');
            if (savedData) {
                setData(JSON.parse(savedData));
            }
        } catch (error) {
            console.error("Failed to load hospital data from local storage", error);
        }
    }, []);

    const persistData = useCallback((newData: HospitalData) => {
        try {
            localStorage.setItem('hospitalData', JSON.stringify(newData));
            setData(newData);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error("Failed to save hospital data to local storage", error);
        }
    }, []);

    const handleUpdateEmployees = (updatedEmployees: Employee[]) => {
        persistData({ ...data, employees: updatedEmployees });
    };

    const handleUpdatePatients = (updatedPatients: Patient[]) => {
        persistData({ ...data, patients: updatedPatients });
    };

    const handleUpdateAppointments = (updatedAppointments: Appointment[]) => {
        persistData({ ...data, appointments: updatedAppointments });
    };

    const renderContent = () => {
        switch (activeTab) {
            case HospitalTab.Dashboard:
                return <H_DashboardPanel
                    appointments={data.appointments}
                    patients={data.patients}
                    employees={data.employees}
                    onUpdateAppointments={handleUpdateAppointments}
                />;
            case HospitalTab.Patients:
                return <H_PatientPanel
                    patients={data.patients}
                    onUpdate={handleUpdatePatients}
                />;
            case HospitalTab.Employees:
                return <H_EmployeePanel
                    employees={data.employees}
                    onUpdate={handleUpdateEmployees}
                />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-slate-100 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200">
             <aside className="w-64 bg-white dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700 p-4 flex flex-col flex-shrink-0">
                <div className="flex items-center space-x-3 mb-8">
                    <div className="p-2 bg-indigo-600 rounded-lg">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.48-8-12a8 8 0 0 1 16 0c0 7.52-8 12-8 12Z" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M10 12h4" /><path d="M12 10v4" /></svg>
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white truncate">Hospital System</h1>
                </div>
                <nav className="flex flex-col space-y-2">
                {HOSPITAL_TABS.map(({ id, label, icon: Icon }) => (
                    <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                        activeTab === id
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                    >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{label}</span>
                    </button>
                ))}
                </nav>
            </aside>

             <main className="flex-1 p-8 overflow-y-auto">
                {renderContent()}
            </main>

            {showSuccess && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl animate-bounce z-50">
                    Data Saved Successfully!
                </div>
            )}
        </div>
    );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HospitalApp />
  </React.StrictMode>
);