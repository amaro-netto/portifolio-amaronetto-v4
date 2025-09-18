import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client'; // [cite: 1003]

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
      setSession(session);
    };
    getSession();
  }, [navigate]);

  return session ? children : <div>Carregando...</div>; // Ou um componente de loading
};

export default ProtectedRoute;