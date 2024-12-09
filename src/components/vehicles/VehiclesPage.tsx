import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useVehicles } from '../../contexts/VehicleContext';
import { VehicleCard } from './VehicleCard';
import type { Vehicle } from '../../data/vehicles';

export function VehiclesPage() {
  const { language } = useLanguage();
  const { vehicles } = useVehicles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = Array.from(new Set(vehicles.map(vehicle => vehicle.category)));

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = `${vehicle.brand} ${vehicle.model}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || vehicle.category === selectedCategory;
    return matchesSearch && matchesCategory && vehicle.available && vehicle.active;
  });

  const handleVehicleSelect = (vehicle: Vehicle) => {
    // Handle vehicle selection (e.g., open booking modal)
    console.log('Selected vehicle:', vehicle);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 px-4">
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={language === 'tr' ? 'Araç ara...' : 'Search vehicles...'}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="md:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  <option value="">
                    {language === 'tr' ? 'Tüm Kategoriler' : 'All Categories'}
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {filteredVehicles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {language === 'tr'
                ? 'Araç bulunamadı.'
                : 'No vehicles found.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelect={handleVehicleSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}