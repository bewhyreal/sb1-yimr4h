import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LanguageToggle } from './LanguageToggle';
import { LoginButton } from './auth/LoginButton';
import { translations } from '../data/translations';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';
import { isUserAdmin } from '../utils/adminUtils';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      isUserAdmin(user.id).then(setIsAdmin);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const leftNavItems = ['vehicles', 'rentWithUs', 'fleetManagement', 'services', 'about'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold mr-8">Selar Group</Link>
            <div className="hidden md:flex items-center space-x-6">
              {leftNavItems.map((key) => (
                <Link
                  key={key}
                  to={`/${key}`}
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {translations.nav[key][language]}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/contact"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              {translations.nav.contact[language]}
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {language === 'tr' ? 'Admin Paneli' : 'Admin Panel'}
              </Link>
            )}
            <LoginButton />
            <LanguageToggle />
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t">
            <div className="flex flex-col p-4 space-y-4">
              {leftNavItems.map((key) => (
                <Link
                  key={key}
                  to={`/${key}`}
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {translations.nav[key][language]}
                </Link>
              ))}
              <Link
                to="/contact"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {translations.nav.contact[language]}
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language === 'tr' ? 'Admin Paneli' : 'Admin Panel'}
                </Link>
              )}
              <LoginButton />
              <LanguageToggle />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}