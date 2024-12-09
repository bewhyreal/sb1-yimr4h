import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useVehicles } from '../../contexts/VehicleContext';
import { VehicleForm } from './VehicleForm';
import type { Database } from '../../types/supabase';

type Vehicle = Database['public']['Tables']['cars']['Row'];

export function VehicleManagement() {
  const { language } = useLanguage();
  const { vehicles, loading, error, deleteVehicle } = useVehicles();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(language === 'tr' ? 'Aracı silmek istediğinize emin misiniz?' : 'Are you sure you want to delete this vehicle?')) {
      try {
        await deleteVehicle(id);
      } catch (error) {
        alert(language === 'tr' ? 'Araç silinirken bir hata oluştu' : 'Error deleting vehicle');
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {language === 'tr' ? 'Araç Yönetimi' : 'Vehicle Management'}
        </h2>
        <button
          onClick={() => {
            setSelectedVehicle(null);
            setIsFormOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>{language === 'tr' ? 'Yeni Araç' : 'New Vehicle'}</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'tr' ? 'Araç' : 'Vehicle'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'tr' ? 'Kategori' : 'Category'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'tr' ? 'Fiyat/Gün' : 'Price/Day'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'tr' ? 'Durum' : 'Status'}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'tr' ? 'İşlemler' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className={vehicle.active ? '' : 'opacity-50 bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className={`h-10 w-10 rounded-full object-cover ${!vehicle.active && 'filter grayscale'}`}
                        src={vehicle.image_url || ''}
                        alt={`${vehicle.brand} ${vehicle.model}`}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {vehicle.brand} {vehicle.model}
                      </div>
                      <div className="text-sm text-gray-500">{vehicle.year}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{vehicle.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ₺{Number(vehicle.price).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      vehicle.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {vehicle.active
                        ? language === 'tr' ? 'Aktif' : 'Active'
                        : language === 'tr' ? 'Deaktif' : 'Inactive'}
                    </span>
                    {vehicle.active && (
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        vehicle.available
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {vehicle.available
                          ? language === 'tr' ? 'Müsait' : 'Available'
                          : language === 'tr' ? 'Müsait Değil' : 'Unavailable'}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(vehicle)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(vehicle.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <VehicleForm
          vehicle={selectedVehicle}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedVehicle(null);
          }}
        />
      )}
    </div>
  );
}