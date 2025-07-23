
import React from 'react';
import { Hospital } from '../../types';
import Card from '../ui/Card';

interface UserHospitalListProps {
    hospitals: Hospital[];
}

const PlaceholderIcon = () => (
    <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
        <svg className="w-10 h-10 text-slate-400 dark:text-slate-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s-8-4.48-8-12a8 8 0 0 1 16 0c0 7.52-8 12-8 12Z" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M10 12h4" /><path d="M12 10v4" />
        </svg>
    </div>
);

const UserHospitalList: React.FC<UserHospitalListProps> = ({ hospitals }) => {
  return (
    <Card title="Hospitals & Clinics" description="Healthcare facilities available in the district.">
        {hospitals.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">No healthcare facilities have been listed for this district yet.</p>
        ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hospitals.map(h => (
                     <div key={h.id} className="bg-white dark:bg-slate-800/50 rounded-lg overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 transition-transform hover:scale-105 duration-300">
                        <div className="aspect-w-16 aspect-h-9">
                           {h.images && h.images.length > 0 ? (
                                <img src={h.images[0]} alt={h.name} className="w-full h-full object-cover"/>
                            ) : (
                                <PlaceholderIcon />
                            )}
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{h.name}</h3>
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${h.isGovernment ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'}`}>
                                    {h.isGovernment ? 'Govt' : 'Private'}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{h.hospitalType}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{h.specialties}</p>
                             <div className="mt-4 border-t border-slate-200 dark:border-slate-700 pt-3 space-y-2 text-sm">
                                {h.contact && <p><span className="font-semibold">Phone:</span> {h.contact}</p>}
                                {h.emergencyNumber && <p className="text-red-600 dark:text-red-400"><span className="font-semibold">Emergency:</span> {h.emergencyNumber}</p>}
                                {h.website && (
                                     <a href={h.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold block truncate">
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

export default UserHospitalList;
