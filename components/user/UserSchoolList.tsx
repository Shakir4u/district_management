
import React from 'react';
import { School } from '../../types';
import Card from '../ui/Card';

interface UserSchoolListProps {
    schools: School[];
}

const PlaceholderIcon = () => (
    <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
        <svg className="w-10 h-10 text-slate-400 dark:text-slate-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
           <path d="m4 6 8-4 8 4" /> <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" /> <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" /> <path d="M18 5v17" /> <path d="M6 5v17" /> <circle cx="12" cy="9" r="2" />
        </svg>
    </div>
);


const UserSchoolList: React.FC<UserSchoolListProps> = ({ schools }) => {
  return (
    <Card title="Schools" description="List of educational institutions in the district.">
        {schools.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">No schools have been listed for this district yet.</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schools.map(school => (
                    <div key={school.id} className="bg-white dark:bg-slate-800/50 rounded-lg overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 transition-transform hover:scale-105 duration-300">
                        <div className="aspect-w-16 aspect-h-9">
                            {school.images && school.images.length > 0 ? (
                                <img src={school.images[0]} alt={school.name} className="w-full h-full object-cover"/>
                            ) : (
                                <PlaceholderIcon />
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{school.name}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{school.address}</p>
                            <div className="mt-4 space-y-2 text-sm">
                                <p><span className="font-semibold">Principal:</span> {school.principal || 'N/A'}</p>
                                <p><span className="font-semibold">Type:</span> {school.schoolType}</p>
                                <p><span className="font-semibold">Board:</span> {school.board || 'N/A'}</p>
                                <p><span className="font-semibold">Contact:</span> {school.contactNumber || 'N/A'}</p>
                                {school.website && (
                                     <a href={school.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold block truncate">
                                         Visit Website
                                     </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </Card>
  );
};

export default UserSchoolList;
