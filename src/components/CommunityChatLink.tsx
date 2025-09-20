import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from './LoginModal';

interface CommunityChatlinkProps {
  className?: string;
  children: React.ReactNode;
}

const CommunityChatLink: React.FC<CommunityChatlinkProps> = ({ className, children }) => {
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (user) {
    // User is logged in, show normal link
    return (
      <Link to="/community-chat" className={className}>
        {children}
      </Link>
    );
  }

  // User is not logged in, show login prompt
  return (
    <>
      <button 
        onClick={() => setShowLoginModal(true)}
        className={className}
      >
        {children}
      </button>
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default CommunityChatLink;