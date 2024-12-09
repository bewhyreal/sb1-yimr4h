import { Languages } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
      aria-label={`Switch to ${language === 'tr' ? 'English' : 'Turkish'}`}
    >
      <Languages className="w-4 h-4" />
      <span>{language.toUpperCase()}</span>
    </button>
  );
}