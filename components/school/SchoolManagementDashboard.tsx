
import React, { useState } from 'react';
import { School, SchoolManagementTab, Student, Teacher } from '../../types';
import { SCHOOL_MANAGEMENT_TABS } from '../../constants';
import StudentPanel from './StudentPanel';
import TeacherPanel from './TeacherPanel';

interface SchoolManagementDashboardProps {
  school: School;
  onUpdateSchool: (updatedSchool: School) => void;
  onBack: () => void;
}

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
    </svg>
);

const SchoolManagementDashboard: React.FC<SchoolManagementDashboardProps> = ({ school, onUpdateSchool, onBack }) => {
  const [activeTab, setActiveTab] = useState<SchoolManagementTab>(SchoolManagementTab.Students);

  const renderContent = () => {
    switch (activeTab) {
      case SchoolManagementTab.Students:
        return <StudentPanel 
          students={school.students}
          onUpdate={(updatedStudents: Student[]) => onUpdateSchool({ ...school, students: updatedStudents })}
        />;
      case SchoolManagementTab.Teachers:
        return <TeacherPanel
          teachers={school.teachers}
          onUpdate={(updatedTeachers: Teacher[]) => onUpdateSchool({ ...school, teachers: updatedTeachers })}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full h-full">
        <aside className="w-60 bg-white dark:bg-slate-800/30 border-r border-slate-200 dark:border-slate-700/50 p-4 flex flex-col flex-shrink-0 rounded-l-2xl">
            <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <path d="m4 6 8-4 8 4" /><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" /><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" /><path d="M18 5v17" /><path d="M6 5v17" /><circle cx="12" cy="9" r="2" />
                    </svg>
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white truncate" title={school.name}>{school.name}</h2>
            </div>
            <button onClick={onBack} className="flex items-center space-x-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline mb-4 ml-1">
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Back to All Schools</span>
            </button>
            <nav className="flex flex-col space-y-2">
            {SCHOOL_MANAGEMENT_TABS.map(({ id, label, icon: Icon }) => (
                <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    activeTab === id
                    ? 'bg-blue-600 text-white shadow-md'
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

export default SchoolManagementDashboard;
