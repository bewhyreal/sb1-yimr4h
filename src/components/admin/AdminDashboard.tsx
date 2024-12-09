import { useState } from 'react';
import { LayoutDashboard, Car, CalendarRange, Settings } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { VehicleManagement } from './VehicleManagement';

export function AdminDashboard() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'vehicles' | 'bookings' | 'settings'>('vehicles');

  const tabs = [
    { id: 'overview', label: { tr: 'Genel Bakış', en: 'Overview' }, icon: LayoutDashboard },
    { id: 'vehicles', label: { tr: 'Araçlar', en: 'Vehicles' }, icon: Car },
    { id: 'bookings', label: { tr: 'Rezervasyonlar', en: 'Bookings' }, icon: CalendarRange },
    { id: 'settings', label: { tr: 'Ayarlar', en: 'Settings' }, icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-[calc(100vh-4rem)] fixed">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">
              {language === 'tr' ? 'Admin Paneli' : 'Admin Panel'}
            </h2>
          </div>
          <nav className="mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`w-full flex items-center space-x-2 px-4 py-3 text-left ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label[language]}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1">
          {activeTab === 'vehicles' && <VehicleManagement />}
          {activeTab === 'overview' && (
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {language === 'tr' ? 'Toplam Araç' : 'Total Vehicles'}
                  </h3>
                  <p className="text-3xl font-bold text-blue-600">24</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {language === 'tr' ? 'Aktif Kiralama' : 'Active Rentals'}
                  </h3>
                  <p className="text-3xl font-bold text-green-600">18</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {language === 'tr' ? 'Bekleyen Rezervasyon' : 'Pending Bookings'}
                  </h3>
                  <p className="text-3xl font-bold text-yellow-600">7</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}