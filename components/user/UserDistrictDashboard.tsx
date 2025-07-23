import React, { useState } from 'react';
import { Tab, District } from '../../types';
import { TABS } from '../../constants';
import UserGeneralPanel from './UserGeneralPanel';
import UserPeopleList from './UserPeopleList';
import UserSchoolList from './UserSchoolList';
import UserTournamentList from './UserTournamentList';
import UserHospitalList from './UserHospitalList';

interface UserDistrictDashboardProps {
  district: District;
  onBack: () => void;
}

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
    </svg>
);

const UserDistrictDashboard: React.FC<UserDistrictDashboardProps> = ({ district, onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.General);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.General:
        return <UserGeneralPanel district={district} />;
      case Tab.People:
        return <UserPeopleList people={district.people} />;
      case Tab.Schools:
        return <UserSchoolList schools={district.schools} />;
      case Tab.Tournaments:
        return <UserTournamentList tournaments={district.tournaments} />;
      case Tab.Hospitals:
        return <UserHospitalList hospitals={district.hospitals} />;
      default:
        return null;
    }
  };

  return (
    <>
      <aside className="w-64 bg-white dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-700 p-4 flex flex-col flex-shrink-0">
        <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-600 rounded-lg">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.48-8-12a8 8 0 0 1 16 0c0 7.52-8 12-8 12Z"/><path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white truncate" title={district.name}>{district.name}</h1>
        </div>
         <button onClick={onBack} className="flex items-center space-x-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-4 ml-1">
            <ArrowLeftIcon className="w-4 h-4" />
            <span>View All Districts</span>
        </button>
        <nav className="flex flex-col space-y-2">
          {TABS.map(({ id, label, icon: Icon }) => (
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
    </>
  );
};

export default UserDistrictDashboard;