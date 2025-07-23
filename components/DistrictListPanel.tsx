import React, { useState } from "react";
import { District } from "../types";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Textarea from "./ui/Textarea";
import ImageUploader from "./ui/ImageUploader";
import ApiCall from "@/apiUtils/ApiCall";

interface DistrictListPanelProps {
  districts: District[];
  onAdd: (
    district: Omit<
      District,
      "id" | "people" | "schools" | "tournaments" | "hospitals"
    >
  ) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
}

const emptyFormState: District = {
  name: "",
  state: "",
  population: "",
  area: "",
  headquarters: "",
  collector: "",
  keyPlaces: "",
  otherDetails: "",
  images: [],
  hospitals: [],
  schools: [],
  tournaments: [],
  people:[]
};

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const DistrictListPanel: React.FC<DistrictListPanelProps> = ({
  districts,
  onAdd,
  onDelete,
  onSelect,
}) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<District>(emptyFormState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (images: string[]) => {
    setFormData((prev) => ({ ...prev, images }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    await ApiCall.postDistrictRequest(formData)
    onAdd(formData);
    setFormData(emptyFormState);
    setShowForm(false);
  };
console.log('>>>>>',districts)
  return (
    <Card
      title="District Management"
      description="Select a district to manage or add a new one."
    >
      <div className="flex justify-end mb-6">
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>Add New District</Button>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg mb-8 border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            Add a New District
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input
              label="District Name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="State"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
            {/* <Input
              label="Total Population"
              id="population"
              name="population"
              type="number"
              value={formData.population}
              onChange={handleChange}
              required
            /> */}
            {/* <Input
              label="Area (sq. km.)"
              id="area"
              name="area"
              type="number"
              value={formData.area}
              onChange={handleChange}
            /> */}
            <Input
              label="Headquarters City"
              id="headquarters"
              name="headquarters"
              value={formData.headquarters}
              onChange={handleChange}
            />
            <Input
              label="Collector's Name"
              id="collector"
              name="collector"
              value={formData.collector}
              onChange={handleChange}
            />
          </div>
          <Textarea
            label="Key Places to Visit"
            id="keyPlaces"
            name="desc"
            placeholder="e.g., Central Park, History Museum"
            value={formData.desc}
            onChange={handleChange}
          />
          <Textarea
            label="Other Details"
            id="otherDetails"
            name="shortHistory"
            value={formData.shortHistory}
            onChange={handleChange}
          />
          <ImageUploader
            images={formData.images || []}
            onImagesChange={handleImagesChange}
          />
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-800 dark:text-slate-200"
            >
              Cancel
            </Button>
            <Button type="submit">Add District</Button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          Existing Districts
        </h3>
        {districts.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">
            No districts have been added yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {districts.map((district) => (
              <div
                key={district.id}
                className="bg-white dark:bg-slate-800/50 rounded-lg p-5 border border-slate-200 dark:border-slate-700 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                    {district.name}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {district.state}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Population:{" "}
                    {Number(district.population).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => onDelete(district.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                    aria-label={`Delete ${district.name}`}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                  <Button
                    onClick={() => onSelect(district.id)}
                    className="px-4 py-2 text-sm"
                  >
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default DistrictListPanel;
