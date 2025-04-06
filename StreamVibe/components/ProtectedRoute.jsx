import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useState } from 'react';
import AuthModal from './AuthModal';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        {children}
        <AuthModal
          isOpen={!isAuthenticated}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  return children;
};

export default ProtectedRoute; 