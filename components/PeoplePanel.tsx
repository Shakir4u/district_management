
import React, { useState } from 'react';
import { KeyPerson } from '../types';
import Card from './ui/Card';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';

interface PeoplePanelProps {
    people: KeyPerson[];
    onUpdate: (updatedPeople: KeyPerson[]) => void;
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

const emptyFormState: Omit<KeyPerson, 'id'> = { name: '', bio: '', knownFor: '' };

const PeoplePanel: React.FC<PeoplePanelProps> = ({ people, onUpdate }) => {
  const [formData, setFormData] = useState<Omit<KeyPerson, 'id'> & { id?: string }>(emptyFormState);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleAddNewClick = () => {
    setIsEditing(null);
    setFormData(emptyFormState);
    setShowForm(true);
  };

  const handleEditClick = (person: KeyPerson) => {
    setIsEditing(person.id);
    setFormData(person);
    setShowForm(true);
  };
  
  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
        onUpdate(people?.filter(person => person.id !== id));
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
      onUpdate(people?.map(person => person.id === isEditing ? { ...formData, id: isEditing } as KeyPerson : person));
    } else {
      onUpdate([...people, { ...formData, id: Date.now().toString() } as KeyPerson]);
    }
    handleCancel();
  };

  return (
    <Card title="Key People Management" description="Add, view, edit, and remove notable people from the district.">
      <div className="flex justify-end mb-6">
          {!showForm && <Button onClick={handleAddNewClick}>Add New Person</Button>}
      </div>

      {showForm && (
          <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-8 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{isEditing ? 'Edit Person' : 'Add a New Person'}</h3>
              <Input label="Person's Name" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              <Textarea label="Biography" id="bio" name="bio" placeholder="A short biography of the person." value={formData.bio} onChange={handleInputChange} required />
              <Input label="Known For" id="knownFor" name="knownFor" placeholder="e.g., Founder, Inventor, Philanthropist" value={formData.knownFor} onChange={handleInputChange} required />
              <div className="flex justify-end space-x-4">
                  <Button type="button" onClick={handleCancel} className="bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200">Cancel</Button>
                  <Button type="submit">{isEditing ? 'Update Person' : 'Add Person'}</Button>
              </div>
          </form>
      )}
      
      <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Existing People</h3>
          {people?.length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400">No people have been added yet.</p>
          ) : (
              <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-slate-800/50 rounded-lg">
                      <thead className="bg-slate-100 dark:bg-slate-700">
                          <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Name</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Known For</th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                          {people?.map(person => (
                              <tr key={person.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{person.name}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{person.knownFor}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <div className="flex items-center justify-end space-x-4">
                                          <button onClick={() => handleEditClick(person)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200" aria-label={`Edit ${person.name}`}>
                                              <PencilIcon className="w-5 h-5"/>
                                          </button>
                                          <button onClick={() => handleDeleteClick(person.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200" aria-label={`Delete ${person.name}`}>
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

export default PeoplePanel;
