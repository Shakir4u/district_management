
import React, { useState } from 'react';
import { Tournament } from '../types';
import Card from './ui/Card';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import ImageUploader from './ui/ImageUploader';

interface TournamentPanelProps {
    tournaments: Tournament[];
    onUpdate: (updatedTournaments: Tournament[]) => void;
}

const PencilIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>
  </svg>
);

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const emptyFormState: Omit<Tournament, 'id'> = { name: '', sport: '', organizer: '', venue: '', details: '', startDate: '', endDate: '', ageGroup: '', images: [] };

const TournamentPanel: React.FC<TournamentPanelProps> = ({ tournaments, onUpdate }) => {
  const [formData, setFormData] = useState<Omit<Tournament, 'id'> & { id?: string }>(emptyFormState);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({ ...prev, images }));
  };
  
  const handleAddNewClick = () => {
    setIsEditing(null);
    setFormData(emptyFormState);
    setShowForm(true);
  };

  const handleEditClick = (tournament: Tournament) => {
    setIsEditing(tournament.id);
     // Format dates for input[type=date] which expects YYYY-MM-DD
    const formattedTournament = {
      ...tournament,
      startDate: tournament.startDate ? new Date(tournament.startDate).toISOString().split('T')[0] : '',
      endDate: tournament.endDate ? new Date(tournament.endDate).toISOString().split('T')[0] : '',
    };
    setFormData(formattedTournament);
    setShowForm(true);
  };
  
  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this tournament?')) {
        onUpdate(tournaments.filter(t => t.id !== id));
    }
  }

  const handleCancel = () => {
    setShowForm(false);
    setIsEditing(null);
    setFormData(emptyFormState);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      onUpdate(tournaments.map(t => t.id === isEditing ? { ...formData, id: isEditing } as Tournament : t));
    } else {
      onUpdate([...tournaments, { ...formData, id: Date.now().toString() } as Tournament]);
    }
    handleCancel();
  };


  return (
    <Card title="Tournament Management" description="Add, view, edit, and remove tournaments in the district.">
        <div className="flex justify-end mb-6">
            {!showForm && <Button onClick={handleAddNewClick}>Add New Tournament</Button>}
        </div>

        {showForm && (
             <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-8 border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{isEditing ? 'Edit Tournament' : 'Add a New Tournament'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Tournament Name" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                  <Input label="Sport" id="sport" name="sport" placeholder="e.g., Soccer, Basketball, Chess" value={formData.sport} onChange={handleInputChange} required />
                  <Input label="Organizer" id="organizer" name="organizer" placeholder="e.g., City Sports Club" value={formData.organizer} onChange={handleInputChange} />
                  <Input label="Venue" id="venue" name="venue" placeholder="e.g., Central Stadium" value={formData.venue} onChange={handleInputChange} />
                  <Input label="Start Date" id="startDate" name="startDate" type="date" value={formData.startDate} onChange={handleInputChange} />
                  <Input label="End Date" id="endDate" name="endDate" type="date" value={formData.endDate} onChange={handleInputChange} />
                  <Input label="Age Group" id="ageGroup" name="ageGroup" placeholder="e.g., Under-18, Open" value={formData.ageGroup} onChange={handleInputChange} />
                </div>
                <Textarea label="Tournament Details" id="details" name="details" placeholder="e.g., Participating teams, prize money" value={formData.details} onChange={handleInputChange} />
                <ImageUploader images={formData.images || []} onImagesChange={handleImagesChange} />
                <div className="flex justify-end space-x-4">
                    <Button type="button" onClick={handleCancel} className="bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200">Cancel</Button>
                    <Button type="submit">{isEditing ? 'Update Tournament' : 'Add Tournament'}</Button>
                </div>
            </form>
        )}

        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Existing Tournaments</h3>
            {tournaments.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">No tournaments have been added yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-slate-800/50 rounded-lg">
                        <thead className="bg-slate-100 dark:bg-slate-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Sport</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Organizer</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {tournaments.map(t => (
                                <tr key={t.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{t.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{t.sport}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{t.organizer}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-4">
                                            <button onClick={() => handleEditClick(t)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200" aria-label={`Edit ${t.name}`}>
                                                <PencilIcon className="w-5 h-5"/>
                                            </button>
                                            <button onClick={() => handleDeleteClick(t.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200" aria-label={`Delete ${t.name}`}>
                                                <TrashIcon className="w-5 h-5"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </Card>
  );
};

export default TournamentPanel;
