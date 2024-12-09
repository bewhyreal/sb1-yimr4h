import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuthStore } from '../../stores/authStore';

export function LoginButton() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { user, signOut } = useAuthStore();

  const handleClick = async () => {
    if (user) {
      await signOut();
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
    >
      <LogIn className="w-4 h-4" />
      <span>
        {user 
          ? (language === 'tr' ? 'Çıkış Yap' : 'Sign Out')
          : (language === 'tr' ? 'Giriş Yap' : 'Sign In')}
      </span>
    </button>
  );
}