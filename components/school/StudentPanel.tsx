
import React, { useState } from 'react';
import { Student } from '../../types';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface StudentPanelProps {
    students: Student[];
    onUpdate: (updatedStudents: Student[]) => void;
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

const emptyFormState: Omit<Student, 'id'> = { name: '', class: '', rollNumber: '', parentName: '', contactNumber: '' };

const StudentPanel: React.FC<StudentPanelProps> = ({ students, onUpdate }) => {
  const [formData, setFormData] = useState<Omit<Student, 'id'> & { id?: string }>(emptyFormState);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleAddNewClick = () => {
    setIsEditing(null);
    setFormData(emptyFormState);
    setShowForm(true);
  };

  const handleEditClick = (student: Student) => {
    setIsEditing(student.id);
    setFormData(student);
    setShowForm(true);
  };
  
  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
        onUpdate(students.filter(s => s.id !== id));
    }
  }

  const handleCancel = () => {
    setShowForm(false);
    setIsEditing(null);
    setFormData(emptyFormState);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentStudents = students || [];
    if (isEditing) {
      onUpdate(currentStudents.map(s => s.id === isEditing ? { ...formData, id: isEditing } as Student : s));
    } else {
      onUpdate([...currentStudents, { ...formData, id: Date.now().toString() } as Student]);
    }
    handleCancel();
  };

  return (
    <Card title="Student Management" description="Add, view, edit, and remove student records.">
      <div className="flex justify-end mb-6">
          {!showForm && <Button onClick={handleAddNewClick}>Add New Student</Button>}
      </div>

      {showForm && (
          <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-8 border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{isEditing ? 'Edit Student Record' : 'Add a New Student'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Student Name" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                <Input label="Class / Grade" id="class" name="class" value={formData.class} onChange={handleInputChange} required />
                <Input label="Roll Number" id="rollNumber" name="rollNumber" value={formData.rollNumber} onChange={handleInputChange} />
                <Input label="Parent's Name" id="parentName" name="parentName" value={formData.parentName} onChange={handleInputChange} />
                <Input label="Parent's Contact" id="contactNumber" name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleInputChange} required />
              </div>
              <div className="flex justify-end space-x-4">
                  <Button type="button" onClick={handleCancel} className="bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200">Cancel</Button>
                  <Button type="submit">{isEditing ? 'Update Student' : 'Add Student'}</Button>
              </div>
          </form>
      )}
      
      <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Existing Students</h3>
          {(students || []).length === 0 ? (
              <p className="text-slate-500 dark:text-slate-400">No student records found.</p>
          ) : (
              <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-slate-800/50 rounded-lg">
                      <thead className="bg-slate-100 dark:bg-slate-700">
                          <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Name</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Class</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Roll No.</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Parent Contact</th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                          {students.map(s => (
                              <tr key={s.id}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{s.name}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{s.class}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{s.rollNumber}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{s.contactNumber}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <div className="flex items-center justify-end space-x-4">
                                          <button onClick={() => handleEditClick(s)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200" aria-label={`Edit ${s.name}`}>
                                              <PencilIcon className="w-5 h-5"/>
                                          </button>
                                          <button onClick={() => handleDeleteClick(s.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200" aria-label={`Delete ${s.name}`}>
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

export default StudentPanel;
