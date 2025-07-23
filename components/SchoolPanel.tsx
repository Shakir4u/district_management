
import React, { useState } from 'react';
import { School } from '../types';
import Card from './ui/Card';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import Select from './ui/Select';
import ImageUploader from './ui/ImageUploader';

interface SchoolPanelProps {
    schools: School[];
    onUpdate: (updatedSchools: School[]) => void;
    onManage: (schoolId: string) => void;
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

const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.12l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1 0-2.12l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
    </svg>
);


const emptyFormState: Omit<School, 'id' | 'students' | 'teachers'> = { name: '', address: '', principal: '', details: '', schoolType: '', board: '', studentCount: '', udiseCode: '', email: '', website: '', contactNumber: '', images: [] };

const SchoolPanel: React.FC<SchoolPanelProps> = ({ schools, onUpdate, onManage }) => {
  const [formData, setFormData] = useState<Omit<School, 'id' | 'students' | 'teachers'> & { id?: string }>(emptyFormState);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleEditClick = (school: School) => {
    setIsEditing(school.id);
    setFormData(school);
    setShowForm(true);
  };
  
  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this school?')) {
        onUpdate(schools.filter(school => school.id !== id));
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
      onUpdate(schools.map(school => school.id === isEditing ? { ...school, ...formData } : school));
    } else {
      const newSchool: School = {
        ...formData,
        id: Date.now().toString(),
        students: [],
        teachers: [],
      };
      onUpdate([...schools, newSchool]);
    }
    handleCancel();
  };

  return (
    <Card title="School Management" description="Add, view, edit, and remove schools in the district.">
        <div className="flex justify-end mb-6">
            {!showForm && <Button onClick={handleAddNewClick}>Add New School</Button>}
        </div>

        {showForm && (
            <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-8 border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{isEditing ? 'Edit School' : 'Add a New School'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Input label="School Name" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                    <Input label="Address" id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                    <Input label="Principal's Name" id="principal" name="principal" value={formData.principal} onChange={handleInputChange} />
                    <Input label="Student Count" id="studentCount" name="studentCount" type="number" value={formData.studentCount} onChange={handleInputChange} />
                     <Select label="School Type" id="schoolType" name="schoolType" value={formData.schoolType} onChange={handleInputChange} required>
                        <option value="">Select Type</option>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </Select>
                    <Input label="Board Affiliation" id="board" name="board" placeholder="e.g., State Board, CBSE" value={formData.board} onChange={handleInputChange} />
                    <Input label="UDISE Code" id="udiseCode" name="udiseCode" value={formData.udiseCode} onChange={handleInputChange} />
                    <Input label="Contact Number" id="contactNumber" name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleInputChange} />
                    <Input label="Email Address" id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                    <Input label="Website" id="website" name="website" type="url" value={formData.website} onChange={handleInputChange} />
                </div>
                <Textarea label="Additional Details" id="details" name="details" placeholder="e.g., Special programs, facilities" value={formData.details} onChange={handleInputChange} />
                <ImageUploader images={formData.images || []} onImagesChange={handleImagesChange} />
                <div className="flex justify-end space-x-4">
                    <Button type="button" onClick={handleCancel} className="bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200">Cancel</Button>
                    <Button type="submit">{isEditing ? 'Update School' : 'Add School'}</Button>
                </div>
            </form>
        )}
        
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Existing Schools</h3>
            {schools.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">No schools have been added yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-slate-800/50 rounded-lg">
                        <thead className="bg-slate-100 dark:bg-slate-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Principal</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {schools.map(school => (
                                <tr key={school.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{school.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{school.schoolType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{school.principal}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button onClick={() => onManage(school.id)} className="flex items-center space-x-2 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 p-2 rounded-md hover:bg-green-100 dark:hover:bg-green-900/20" aria-label={`Manage ${school.name}`}>
                                                <SettingsIcon className="w-5 h-5"/>
                                                <span>Manage</span>
                                            </button>
                                            <button onClick={() => handleEditClick(school)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 p-2 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-900/20" aria-label={`Edit ${school.name}`}>
                                                <PencilIcon className="w-5 h-5"/>
                                            </button>
                                            <button onClick={() => handleDeleteClick(school.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200 p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900/20" aria-label={`Delete ${school.name}`}>
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

export default SchoolPanel;
