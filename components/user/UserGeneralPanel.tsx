
import React, { useState } from 'react';
import { District } from '../../types';
import Card from '../ui/Card';

interface UserGeneralPanelProps {
  district: District;
}

const DetailItem: React.FC<{ label: string; value?: string | number | null }> = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center">
    <dt className="w-full sm:w-1/3 text-sm font-medium text-slate-500 dark:text-slate-400">{label}</dt>
    <dd className="w-full sm:w-2/3 mt-1 sm:mt-0 text-sm text-slate-900 dark:text-white">{value || 'N/A'}</dd>
  </div>
);

const ImageGallery: React.FC<{images: string[]}> = ({ images }) => {
    const [mainImage, setMainImage] = useState(images[0]);

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="mb-8">
            <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden shadow-lg">
                <img src={mainImage} alt="Main district view" className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                        <button key={index} onClick={() => setMainImage(image)} className={`rounded-md overflow-hidden aspect-w-1 aspect-h-1 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-indigo-500 ${mainImage === image ? 'ring-2 ring-indigo-500' : ''}`}>
                            <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}


const UserGeneralPanel: React.FC<UserGeneralPanelProps> = ({ district }) => {
  return (
    <Card title="General District Information" description={`Key details about ${district.name}, ${district.state}.`}>
      <ImageGallery images={district.images || []} />
      <div className="space-y-6">
        <dl className="space-y-4">
          <DetailItem label="State" value={district.state} />
          <DetailItem label="Headquarters" value={district.headquarters} />
          <DetailItem label="Population" value={Number(district.population).toLocaleString('en-IN')} />
          <DetailItem label="Area" value={`${Number(district.area).toLocaleString('en-IN')} sq. km.`} />
          <DetailItem label="Collector" value={district.collector} />
        </dl>
        
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Key Places to Visit</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{district.keyPlaces || 'No information provided.'}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Other Details</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{district.otherDetails || 'No additional details available.'}</p>
        </div>
      </div>
    </Card>
  );
};

export default UserGeneralPanel;
