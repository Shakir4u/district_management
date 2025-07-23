import React from 'react';
import { KeyPerson } from '../../types';
import Card from '../ui/Card';

interface UserPeopleListProps {
    people: KeyPerson[];
}

const UserPeopleList: React.FC<UserPeopleListProps> = ({ people }) => {
  return (
    <Card title="Key People" description="Notable individuals from the district.">
        {people.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">No key people have been listed for this district yet.</p>
        ) : (
            <div className="space-y-6">
                {people.map(person => (
                    <div key={person.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        <h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">{person.name}</h3>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">Known For: {person.knownFor}</p>
                        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{person.bio}</p>
                    </div>
                ))}
            </div>
        )}
    </Card>
  );
};

export default UserPeopleList;