
import React from 'react';
import { Tournament } from '../../types';
import Card from '../ui/Card';

interface UserTournamentListProps {
    tournaments: Tournament[];
}

const PlaceholderIcon = () => (
    <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
        <svg className="w-10 h-10 text-slate-400 dark:text-slate-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /> <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /> <path d="M4 22h16" /> <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.87 18.75 7 20.24 7 22" /> <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.13 18.75 17 20.24 17 22" /> <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
    </div>
);

const UserTournamentList: React.FC<UserTournamentListProps> = ({ tournaments }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <Card title="Tournaments" description="Upcoming and ongoing sporting events in the district.">
        {tournaments.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">No tournaments have been listed for this district yet.</p>
        ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tournaments.map(t => (
                    <div key={t.id} className="bg-white dark:bg-slate-800/50 rounded-lg overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 transition-transform hover:scale-105 duration-300">
                        <div className="aspect-w-16 aspect-h-9">
                            {t.images && t.images.length > 0 ? (
                                <img src={t.images[0]} alt={t.name} className="w-full h-full object-cover"/>
                            ) : (
                                <PlaceholderIcon />
                            )}
                        </div>
                        <div className="p-4">
                            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{t.sport}</p>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{t.name}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 h-10">{t.details}</p>
                            <div className="mt-4 border-t border-slate-200 dark:border-slate-700 pt-3 space-y-2 text-sm">
                                <p><span className="font-semibold">Dates:</span> {formatDate(t.startDate)} - {formatDate(t.endDate)}</p>
                                <p><span className="font-semibold">Venue:</span> {t.venue || 'N/A'}</p>
                                <p><span className="font-semibold">Organizer:</span> {t.organizer || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </Card>
  );
};

export default UserTournamentList;
