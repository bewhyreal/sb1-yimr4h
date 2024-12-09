import { Car, Calendar, Check } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import type { Vehicle } from '../../data/vehicles';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onSelect }: VehicleCardProps) {
  const { language } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={vehicle.imageUrl}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-sm">
          {language === 'tr' ? 'Müsait' : 'Available'}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">
          {vehicle.brand} {vehicle.model}
        </h3>
        <div className="flex items-center text-gray-600 mb-4">
          <Car className="w-4 h-4 mr-1" />
          <span className="text-sm">{vehicle.year}</span>
          <Calendar className="w-4 h-4 ml-4 mr-1" />
          <span className="text-sm">₺{vehicle.price}/gün</span>
        </div>
        <div className="space-y-2 mb-4">
          {vehicle.features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              {feature}
            </div>
          ))}
        </div>
        <button
          onClick={() => onSelect(vehicle)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {language === 'tr' ? 'Hemen Kirala' : 'Rent Now'}
        </button>
      </div>
    </div>
  );
}