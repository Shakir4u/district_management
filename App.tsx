
import React, { useState, useCallback, useEffect } from 'react';
import { District } from './types';
import DistrictDashboard from './components/DistrictDashboard';
import DistrictListPanel from './components/DistrictListPanel';
import ApiCall from './apiUtils/ApiCall';

const App: React.FC = () => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    try {
      ApiCall.getAllDistrict().then((
        response
      )=>{
        response.json().then((allDistrict)=>{
          console.log('allDistrict>>',allDistrict)
          setDistricts(allDistrict)
        }) ;
        
      })
      // const savedDistricts = localStorage.getItem('districts');
      // if (savedDistricts) {
      //   setDistricts(JSON.parse(savedDistricts));
      // }
    } catch (error) {
      console.error("Failed to load districts from local storage", error);
    }
  }, []);
  
  const persistDistricts = (newDistricts: District[]) => {
      try {
        localStorage.setItem('districts', JSON.stringify(newDistricts));
        setDistricts(newDistricts);
      } catch (error) {
          console.error("Failed to save districts to local storage", error);
      }
  };
  
  const handleSave = useCallback(() => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  }, []);

  const handleAddDistrict = (district: Omit<District, 'id' | 'people' | 'schools' | 'tournaments' | 'hospitals' | 'images'>) => {
    const newDistrict: District = {
        ...district,
        id: Date.now().toString(),
        people: [],
        schools: [],
        tournaments: [],
        hospitals: [],
        images: [],
    };
    persistDistricts([...districts, newDistrict]);
    handleSave();
  };

  const handleDeleteDistrict = (id: string) => {
      if(window.confirm('Are you sure you want to permanently delete this district and all its data?')) {
        persistDistricts(districts.filter(d => d.id !== id));
        handleSave();
      }
  };
  
  const handleUpdateDistrict = (updatedDistrict: District) => {
    persistDistricts(districts.map(d => d.id === updatedDistrict.id ? updatedDistrict : d));
    handleSave();
  };

  const selectedDistrict = districts.find(d => d.id === selectedDistrictId);
  console.log('selectedDistrict >>',selectedDistrict)

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200">
      {selectedDistrict ? (
        <DistrictDashboard 
            district={selectedDistrict} 
            onUpdate={handleUpdateDistrict}
            onBack={() => setSelectedDistrictId(null)}
        />
      ) : (
        <div className="w-full">
            <header className="bg-white dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-700 flex items-center space-x-3">
                 <div className="p-2 bg-indigo-600 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M12 18v-6"/><path d="M9 15h6"/></svg>
                </div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Super Admin Panel</h1>
            </header>
            <main className="p-8 overflow-y-auto h-[calc(100vh-65px)]">
                <DistrictListPanel 
                    districts={districts}
                    onAdd={handleAddDistrict}
                    onDelete={handleDeleteDistrict}
                    onSelect={setSelectedDistrictId}
                />
            </main>
        </div>
      )}
      {showSuccess && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl animate-bounce z-50">
              Data Saved Successfully!
            </div>
      )}
    </div>
  );
};

export default App;
