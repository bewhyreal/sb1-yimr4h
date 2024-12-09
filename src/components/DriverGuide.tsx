import { Headphones, Wrench, Car, Wind, FileText } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';

export function DriverGuide() {
  const { language } = useLanguage();
  
  const guides = [
    { icon: Headphones, id: 'support' },
    { icon: Wrench, id: 'maintenance' },
    { icon: Car, id: 'rental' },
    { icon: Wind, id: 'damage' },
    { icon: FileText, id: 'documents' },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">
          {translations.driverGuide.title[language]}
        </h2>
        <p className="text-gray-600 text-center mb-12">
          {translations.driverGuide.subtitle[language]}
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {guides.map(({ icon: Icon, id }) => (
            <div
              key={id}
              className="flex flex-col items-center w-32 text-center group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-blue-50 transition-colors">
                <Icon className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-sm text-gray-700">
                {translations.driverGuide[id][language]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}