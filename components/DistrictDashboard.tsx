
import React, { useState, useCallback } from 'react';
import { Tab, District, School, Hospital, KeyPerson, Tournament } from '../types';
import { TABS } from '../constants';
import DistrictPanel from './DistrictPanel';
import PeoplePanel from './PeoplePanel';
import SchoolPanel from './SchoolPanel';
import TournamentPanel from './TournamentPanel';
import HospitalPanel from './HospitalPanel';
import SchoolManagementDashboard from './school/SchoolManagementDashboard';
import HospitalManagementDashboard from './hospital/HospitalManagementDashboard';


interface DistrictDashboardProps {
  district: District;
  onUpdate: (updatedDistrict: District) => void;
  onBack: () => void;
}

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
    </svg>
);


const DistrictDashboard: React.FC<DistrictDashboardProps> = ({ district, onUpdate, onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.General);
  const [managingSchoolId, setManagingSchoolId] = useState<string | null>(null);
  const [managingHospitalId, setManagingHospitalId] = useState<string | null>(null);
  console.log('district >>123',district)

  const handleUpdateSchool = (updatedSchool: School) => {
    const updatedSchools = district.schools.map(s => s.id === updatedSchool.id ? updatedSchool : s);
    onUpdate({ ...district, schools: updatedSchools });
  };
  
  const handleUpdateHospital = (updatedHospital: Hospital) => {
    const updatedHospitals = district.hospitals.map(h => h.id === updatedHospital.id ? updatedHospital : h);
    onUpdate({ ...district, hospitals: updatedHospitals });
  };

  const renderContent = () => {
    const schoolToManage= district?.schools?.find(s => s.id === managingSchoolId);
    if(schoolToManage) {
        return <SchoolManagementDashboard 
            school={schoolToManage}
            onUpdateSchool={handleUpdateSchool}
            onBack={() => setManagingSchoolId(null)}
        />
    }

    const hospitalToManage = district?.hospitals?.find(h => h.id === managingHospitalId);
    if(hospitalToManage) {
        return <HospitalManagementDashboard
            hospital={hospitalToManage}
            onUpdateHospital={handleUpdateHospital}
            onBack={() => setManagingHospitalId(null)}
        />
    }


    switch (activeTab) {
      case Tab.General:
        return <DistrictPanel district={district} onSave={onUpdate} />;
      case Tab.People:
        return <PeoplePanel 
          people={district?.people}
          onUpdate={(newPeople: KeyPerson[]) => onUpdate({ ...district, people: newPeople })}
        />;
      case Tab.Schools:
        return <SchoolPanel
          schools={district?.schools}
          onUpdate={(newSchools: School[]) => onUpdate({ ...district, schools: newSchools })}
          onManage={setManagingSchoolId}
        />;
      case Tab.Tournaments:
        return <TournamentPanel 
          tournaments={district?.tournaments}
          onUpdate={(newTournaments: Tournament[]) => onUpdate({ ...district, tournaments: newTournaments })}
        />;
      case Tab.Hospitals:
        return <HospitalPanel
          hospitals={district?.hospitals}
          onUpdate={(newHospitals: Hospital[]) => onUpdate({ ...district, hospitals: newHospitals })}
          onManage={setManagingHospitalId}
        />;
      default:
        return null;
    }
  };

  const isManagingSubItem = !!(managingSchoolId || managingHospitalId);

  return (
    <>
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700 p-4 flex flex-col flex-shrink-0">
        <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-600 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white truncate" title={district.name}>{district.name}</h1>
        </div>
         <button onClick={onBack} className="flex items-center space-x-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-4 ml-1">
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to All Districts</span>
        </button>
        <nav className="flex flex-col space-y-2">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                console.log('TABS>>@@',{ id, label, icon: Icon })
                setActiveTab(id);
                setManagingHospitalId(null);
                setManagingSchoolId(null);
              }}
              disabled={isManagingSubItem}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === id && !isManagingSubItem
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              } ${isManagingSubItem ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </>
  );
};

export default DistrictDashboard;
