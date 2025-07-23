import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { District } from './types';
import UserDistrictList from './components/user/UserDistrictList';
import UserDistrictDashboard from './components/user/UserDistrictDashboard';

const UserPortal: React.FC = () => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedDistricts = localStorage.getItem('districts');
      if (savedDistricts) {
        setDistricts(JSON.parse(savedDistricts));
      }
    } catch (error) {
      console.error("Failed to load districts from local storage", error);
    }
  }, []);

  const selectedDistrict = districts.find(d => d.id === selectedDistrictId);

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200">
      {selectedDistrict ? (
        <UserDistrictDashboard
            district={selectedDistrict}
            onBack={() => setSelectedDistrictId(null)}
        />
      ) : (
        <div className="w-full">
            <header className="bg-white dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-700 flex items-center space-x-3">
                 <div className="p-2 bg-indigo-600 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.48-8-12a8 8 0 0 1 16 0c0 7.52-8 12-8 12Z"/><path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>
                </div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">District Information Portal</h1>
            </header>
            <main className="p-8 overflow-y-auto h-[calc(100vh-65px)]">
                <UserDistrictList
                    districts={districts}
                    onSelect={setSelectedDistrictId}
                />
            </main>
        </div>
      )}
    </div>
  );
};


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <UserPortal />
  </React.StrictMode>
);