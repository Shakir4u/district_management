import React from 'react';
import { District } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface UserDistrictListProps {
    districts: District[];
    onSelect: (id: string) => void;
}

const UserDistrictList: React.FC<UserDistrictListProps> = ({ districts, onSelect }) => {
    return (
        <Card title="Select a District" description="Browse the list of available districts to view their information.">
            <div className="space-y-4">
                {districts.length === 0 ? (
                    <div className="text-center py-10">
                        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">No Information Available</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">It looks like no district information has been added yet. Please check back later.</p>
                    </div>
                ) : (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {districts.map(district => (
                            <div key={district.id} className="bg-white dark:bg-slate-800/50 rounded-lg p-5 border border-slate-200 dark:border-slate-700 flex flex-col justify-between shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">{district.name}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{district.state}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                        Population: <span className="font-medium text-slate-600 dark:text-slate-300">{Number(district.population).toLocaleString('en-IN')}</span>
                                    </p>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <Button onClick={() => onSelect(district.id)} className="px-4 py-2 text-sm w-full">View Details</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default UserDistrictList;