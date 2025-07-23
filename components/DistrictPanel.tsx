
import React, { useState, useEffect } from 'react';
import { District } from '../types';
import Card from './ui/Card';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import ImageUploader from './ui/ImageUploader';
import ApiCall from '@/apiUtils/ApiCall';

interface DistrictPanelProps {
  district: District;
  onSave: (updatedDistrict: District) => void;
}

const DistrictPanel: React.FC<DistrictPanelProps> = ({ district, onSave }) => {
  const [formData, setFormData] = useState<District>(district);

  useEffect(() => {
    setFormData(district);
  }, [district]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({ ...prev, images }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    await ApiCall.postDistrictRequest(formData)
    onSave(formData);
  };

  return (
    <Card title="General District Information" description="Update general information about the district.">
      <form onSubmit={handleSubmit} className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="District Name" id="name" name="name" value={formData.name} onChange={handleChange} required />
            <Input label="State" id="state" name="state" value={formData.state} onChange={handleChange} required />
            {/* <Input label="Total Population" id="population" name="population" type="number" value={formData.population} onChange={handleChange} required /> */}
            {/* <Input label="Area (sq. km.)" id="area" name="area" type="number" value={formData.area} onChange={handleChange} /> */}
            <Input label="Headquarters City" id="headquarters" name="headquarters" value={formData.headquarters} onChange={handleChange} />
            <Input label="Collector's Name" id="collector" name="collector" value={formData.collector} onChange={handleChange} />
        </div>
        <Textarea label="Key Places to Visit" id="keyPlaces" name="keyPlaces" placeholder="e.g., Central Park, History Museum, City Riverfront" value={formData.keyPlaces} onChange={handleChange} required />
        <Textarea label="Other Details" id="otherDetails" name="otherDetails" placeholder="Any other relevant details about the district." value={formData.otherDetails} onChange={handleChange} />
        <ImageUploader images={formData.images || []} onImagesChange={handleImagesChange} />
        <div className="flex justify-end">
          <Button type="submit">Save District Info</Button>
        </div>
      </form>
    </Card>
  );
};

export default DistrictPanel;
