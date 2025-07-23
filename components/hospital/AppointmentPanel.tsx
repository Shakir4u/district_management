
import React, { useState } from 'react';
import { Appointment, Patient, Employee } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';

interface AppointmentPanelProps {
    appointments: Appointment[];
    patients: Patient[];
    employees: Employee[];
    onUpdate: (updatedAppointments: Appointment[]) => void;
}

const emptyFormState = { patientId: '', doctorId: '', appointmentDate: '', appointmentTime: '', reason: '' };

const AppointmentPanel: React.FC<AppointmentPanelProps> = ({ appointments, patients, employees, onUpdate }) => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(emptyFormState);
    
    const doctors = employees.filter(e => e.role === 'Doctor');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleStatusChange = (appointmentId: string, newStatus: Appointment['status']) => {
        const updatedAppointments = appointments.map(appt => 
            appt.id === appointmentId ? { ...appt, status: newStatus } : appt
        );
        onUpdate(updatedAppointments);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedPatient = patients.find(p => p.id === formData.patientId);
        const selectedDoctor = doctors.find(d => d.id === formData.doctorId);

        if (!selectedPatient || !selectedDoctor) {
            alert('Please select a valid patient and doctor.');
            return;
        }

        const newAppointment: Appointment = {
            id: `TKN-${Date.now().toString().slice(-6)}`,
            patientId: selectedPatient.id,
            patientName: selectedPatient.name,
            doctorId: selectedDoctor.id,
            doctorName: selectedDoctor.name,
            appointmentDate: formData.appointmentDate,
            appointmentTime: formData.appointmentTime,
            status: 'Scheduled',
            reason: formData.reason,
        };

        onUpdate([...(appointments || []), newAppointment]);
        setFormData(emptyFormState);
        setShowForm(false);
    };

    return (
        <Card title="Appointment Dashboard" description="Book new appointments and manage existing ones.">
            <div className="flex justify-end mb-6">
                {!showForm && <Button onClick={() => setShowForm(true)}>Book New Appointment</Button>}
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-8 border border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Generate Appointment Token</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select label="Select Patient" id="patientId" name="patientId" value={formData.patientId} onChange={handleInputChange} required>
                            <option value="">Choose a patient...</option>
                            {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </Select>
                        <Select label="Select Doctor" id="doctorId" name="doctorId" value={formData.doctorId} onChange={handleInputChange} required>
                            <option value="">Choose a doctor...</option>
                            {doctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.department})</option>)}
                        </Select>
                         <Input label="Appointment Date" id="appointmentDate" name="appointmentDate" type="date" value={formData.appointmentDate} onChange={handleInputChange} required />
                         <Input label="Appointment Time" id="appointmentTime" name="appointmentTime" type="time" value={formData.appointmentTime} onChange={handleInputChange} required />
                    </div>
                    <Textarea label="Reason for Visit" id="reason" name="reason" placeholder="e.g., General check-up, follow-up" value={formData.reason} onChange={handleInputChange} required />
                    <div className="flex justify-end space-x-4">
                        <Button type="button" onClick={() => setShowForm(false)} className="bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200">Cancel</Button>
                        <Button type="submit">Book and Generate Token</Button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">All Appointments</h3>
                {(appointments || []).length === 0 ? (
                    <p className="text-slate-500 dark:text-slate-400">No appointments have been booked yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-slate-800/50 rounded-lg">
                            <thead className="bg-slate-100 dark:bg-slate-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Token #</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Patient</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Doctor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {appointments.map(appt => (
                                    <tr key={appt.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-indigo-600 dark:text-indigo-400">{appt.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200">{appt.patientName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{appt.doctorName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                            {new Date(appt.appointmentDate).toLocaleDateString()} {appt.appointmentTime}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <Select value={appt.status} onChange={(e) => handleStatusChange(appt.id, e.target.value as Appointment['status'])} id={`status-${appt.id}`} label="">
                                                <option value="Scheduled">Scheduled</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </Select>
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

export default AppointmentPanel;
