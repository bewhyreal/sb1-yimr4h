import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { RentalBooking } from './components/RentalBooking';
import { FeaturedTopics } from './components/FeaturedTopics';
import { DriverGuide } from './components/DriverGuide';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { VehiclesPage } from './components/vehicles/VehiclesPage';
import { LoginPage } from './components/auth/LoginPage';
import { VehicleProvider } from './contexts/VehicleContext';
import { useAuth } from './hooks/useAuth';
import { isUserAdmin } from './utils/adminUtils';

function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      if (user) {
        const admin = await isUserAdmin(user.id);
        setIsAdmin(admin);
      }
      setChecking(false);
    }
    checkAdmin();
  }, [user]);

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <VehicleProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={
            <main>
              <HeroSlider />
              <RentalBooking />
              <nav className="bg-[#003B4D] text-white py-8">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Operasyonel kiralamayı keşfedin</h3>
                      <ul className="space-y-2">
                        <li>
                          <a href="#form" className="hover:text-gray-300 flex items-center">
                            <span className="mr-2">›</span> Talep formu
                          </a>
                        </li>
                        <li>
                          <a href="#advantages" className="hover:text-gray-300 flex items-center">
                            <span className="mr-2">›</span> Kiralama avantajları
                          </a>
                        </li>
                        <li>
                          <a href="#options" className="hover:text-gray-300 flex items-center">
                            <span className="mr-2">›</span> Kiralamak mı satın almak mı
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Selar Group ile kiralayın</h3>
                      <ul className="space-y-2">
                        <li>
                          <a href="#why" className="hover:text-gray-300 flex items-center">
                            <span className="mr-2">›</span> Neden Selar Group
                          </a>
                        </li>
                        <li>
                          <a href="#discover" className="hover:text-gray-300 flex items-center">
                            <span className="mr-2">›</span> Operasyonel kiralamayı keşfedin
                          </a>
                        </li>
                        <li>
                          <a href="#solutions" className="hover:text-gray-300 flex items-center">
                            <span className="mr-2">›</span> Kiralama çözümlerimiz
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Hizmetlerimiz</h3>
                      <ul className="space-y-2">
                        <li>
                          <a href="#services" className="hover:text-gray-300 flex items-center">
                            <span className="mr-2">›</span> Hizmetlerimizi keşfedin
                          </a>
                        </li>
                        <li>
                          <a href="#faq" className="hover:text-gray-300 flex items-center">
                            <span className="mr-2">›</span> Sıkça sorulan sorular
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>
              <FeaturedTopics />
              <DriverGuide />
              <ContactSection />
            </main>
          } />
          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </VehicleProvider>
  );
}

export default App;