
import React, { useState } from 'react';
import { Hospital } from '../types';
import Card from './ui/Card';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import Select from './ui/Select';
import Toggle from './ui/Toggle';
import ImageUploader from './ui/ImageUploader';

interface HospitalPanelProps {
    hospitals: Hospital[];
    onUpdate: (updatedHospitals: Hospital[]) => void;
    onManage: (hospitalId: string) => void;
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

const emptyFormState: Omit<Hospital, 'id' | 'employees' | 'patients' | 'appointments'> = { name: '', address: '', specialties: '', contact: '', details: '', hospitalType: '', bedCount: '', departments: '', website: '', email: '', emergencyNumber: '', isGovernment: false, images: [] };

const HospitalPanel: React.FC<HospitalPanelProps> = ({ hospitals, onUpdate, onManage }) => {
  const [formData, setFormData] = useState<Omit<Hospital, 'id' | 'employees' | 'patients' | 'appointments'> & { id?: string }>(emptyFormState);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (enabled: boolean) => {
    setFormData(prev => ({ ...prev, isGovernment: enabled }));
  }

  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({ ...prev, images }));
  };

  const handleAddNewClick = () => {
    setIsEditing(null);
    setFormData(emptyFormState);
    setShowForm(true);
  };

  const handleEditClick = (hospital: Hospital) => {
    setIsEditing(hospital.id);
    setFormData(hospital);
    setShowForm(true);
  };
  
  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this hospital?')) {
        onUpdate(hospitals.filter(h => h.id !== id));
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
        onUpdate(hospitals.map(h => h.id === isEditing ? { ...h, ...formData } : h));
    } else {
      const newHospital: Hospital = {
        ...formData,
        id: Date.now().toString(),
        employees: [],
        patients: [],
        appointments: []
      };
      onUpdate([...hospitals, newHospital]);
    }
    handleCancel();
  };


  return (
    <Card title="Hospital & Clinic Management" description="Add, view, edit, and remove healthcare facilities.">
        <div className="flex justify-end mb-6">
            {!showForm && <Button onClick={handleAddNewClick}>Add New Facility</Button>}
        </div>

        {showForm && (
             <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-8 border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{isEditing ? 'Edit Facility' : 'Add a New Facility'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Input label="Facility Name" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                    <Input label="Address" id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                    <Select label="Facility Type" id="hospitalType" name="hospitalType" value={formData.hospitalType} onChange={handleInputChange} required>
                        <option value="">Select Type</option>
                        <option value="General">General Hospital</option>
                        <option value="Specialty">Specialty Hospital</option>
                        <option value="Clinic">Clinic</option>
                    </Select>
                    <Input label="Contact Number" id="contact" name="contact" type="tel" value={formData.contact} onChange={handleInputChange} />
                    <Input label="Emergency Number" id="emergencyNumber" name="emergencyNumber" type="tel" value={formData.emergencyNumber} onChange={handleInputChange} />
                    <Input label="Bed Count" id="bedCount" name="bedCount" type="number" value={formData.bedCount} onChange={handleInputChange} />
                    <Input label="Key Departments" id="departments" name="departments" placeholder="e.g., Cardiology, Neurology" value={formData.departments} onChange={handleInputChange} />
                    <Input label="Email Address" id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                    <Input label="Website" id="website" name="website" type="url" value={formData.website} onChange={handleInputChange} />
                    <Toggle label="Government Facility" enabled={formData.isGovernment ?? false} onChange={handleToggleChange} />
                </div>
                <Textarea label="Specialties" id="specialties" name="specialties" placeholder="e.g., Cardiology, Pediatrics, Emergency" value={formData.specialties} onChange={handleInputChange} />
                <Textarea label="Additional Details" id="details" name="details" placeholder="e.g., Visiting hours, website" value={formData.details} onChange={handleInputChange} />
                <ImageUploader images={formData.images || []} onImagesChange={handleImagesChange} />
                <div className="flex justify-end space-x-4">
                    <Button type="button" onClick={handleCancel} className="bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200">Cancel</Button>
                    <Button type="submit">{isEditing ? 'Update Facility' : 'Add Facility'}</Button>
                </div>
            </form>
        )}

        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Existing Facilities</h3>
            {hospitals.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">No facilities have been added yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-slate-800/50 rounded-lg">
                        <thead className="bg-slate-100 dark:bg-slate-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Specialties</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {hospitals.map(h => (
                                <tr key={h.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{h.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{h.hospitalType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{h.specialties}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button onClick={() => onManage(h.id)} className="flex items-center space-x-2 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 p-2 rounded-md hover:bg-green-100 dark:hover:bg-green-900/20" aria-label={`Manage ${h.name}`}>
                                                <SettingsIcon className="w-5 h-5"/>
                                                <span>Manage</span>
                                            </button>
                                            <button onClick={() => handleEditClick(h)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 p-2 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-900/20" aria-label={`Edit ${h.name}`}>
                                                <PencilIcon className="w-5 h-5"/>
                                            </button>
                                            <button onClick={() => handleDeleteClick(h.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200 p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900/20" aria-label={`Delete ${h.name}`}>
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

export default HospitalPanel;
