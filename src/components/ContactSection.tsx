import { Headphones } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { translations } from '../data/translations';

export function ContactSection() {
  const { language } = useLanguage();

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-6 md:mb-0">
            <Headphones className="w-10 h-10 text-blue-600 mr-4" />
            <div>
              <h3 className="text-xl font-bold mb-1">
                {translations.contact.title[language]}
              </h3>
              <p className="text-gray-600">
                {translations.contact.subtitle[language]}
              </p>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
            {translations.contact.button[language]}
          </button>
        </div>
      </div>
    </section>
  );
}