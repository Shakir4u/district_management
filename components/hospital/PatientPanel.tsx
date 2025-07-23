
import React, { useState } from 'react';
import { Patient } from '../../types';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Select from '../ui/Select';

interface PatientPanelProps {
    patients: Patient[];
    onUpdate: (updatedPatients: Patient[]) => void;
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

const emptyFormState: Omit<Patient, 'id'> = { name: '', age: '', gender: '', contactNumber: '', address: '', medicalHistory: '' };

const PatientPanel: React.FC<PatientPanelProps> = ({ patients, onUpdate }) => {
  const [formData, setFormData] = useState<Omit<Patient, 'id'> & { id?: string }>(emptyFormState);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleAddNewClick = () => {
    setIsEditing(null);
    setFormData(emptyFormState);
    setShowForm(true);
  };

  const handleEditClick = (patient: Patient) => {
    setIsEditing(patient.id);
    setFormData(patient);
    setShowForm(true);
  };
  
  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this patient record?')) {
        onUpdate(patients.filter(p => p.id !== id));
    }
  }

  const handleCancel = () => {
    setShowForm(false);
    setIsEditing(null);
    setFormData(emptyFormState);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPatients = patients || [];
    if (isEditing) {
      onUpdate(currentPatients.map(p => p.id === isEditing ? { ...formData, id: isEditing } as Patient : p));
    } else {
      onUpdate([...currentPatients, { ...formData, id: Date.now().toString() } as Patient]);
    }
    handleCancel();
  };

  return (
    <Card title="Patient Management" description="Add, view, edit, and remove patient records.">
      <div className="flex justify-end mb-6">
          {!showForm && <Button onClick={handleAddNewClick}>Add New Patient</Button>}
      </div>

      {showForm && (
          <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-8 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{isEditing ? 'Edit Patient Record' : 'Add a New Patient'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                <Input label="Age" id="age" name="age" type="number" value={formData.age} onChange={handleInputChange} required />
                <Select label="Gender" id="gender" name="gender" value={formData.gender} onChange={handleInputChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </Select>
                <Input label="Contact Number" id="contactNumber" name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleInputChange} required />
              </div>
              <Input label="Address" id="address" name="address" value={formData.address} onChange={handleInputChange} />
              <Textarea label="Brief Medical History" id="medicalHistory" name="medicalHistory" placeholder="e.g., Allergies, chronic conditions" value={formData.medicalHistory} onChange={handleInputChange} />
              <div className="flex justify-end space-x-4">
                  <Button type="button" onClick={handleCancel} className="bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200">Cancel</Button>
                  <Button type="submit">{isEditing ? 'Update Patient' : 'Add Patient'}</Button>
              </div>
          </form>
      )}
      
      <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Existing Patients</h3>
          {(patients || []).length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400">No patient records found.</p>
          ) : (
              <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-slate-800/50 rounded-lg">
                      <thead className="bg-slate-100 dark:bg-slate-700">
                          <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Name</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Age</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Gender</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Contact</th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                          {patients.map(p => (
                              <tr key={p.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{p.name}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{p.age}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{p.gender}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{p.contactNumber}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <div className="flex items-center justify-end space-x-4">
                                          <button onClick={() => handleEditClick(p)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200" aria-label={`Edit ${p.name}`}>
                                              <PencilIcon className="w-5 h-5"/>
                                          </button>
                                          <button onClick={() => handleDeleteClick(p.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200" aria-label={`Delete ${p.name}`}>
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

export default PatientPanel;
