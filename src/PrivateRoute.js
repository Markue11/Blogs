import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';  // Import useAuth

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth();  // Using the useAuth hook to check if the user is authenticated

  if (!user) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
