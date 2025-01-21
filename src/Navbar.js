import { Link } from "react-router-dom";
import { useAuth } from './AuthContext';  // Import useAuth to check login status

const Navbar = () => {
  const { user, logout } = useAuth();  // Get user and logout function from context

  return (
    <nav className="navbar">
      <h1>Blog</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create" style={{ color: 'white', backgroundColor: '#f1356d', borderRadius: '8px' }}>New Blog</Link>
        {user ? (
          <button onClick={() => logout()} style={{ backgroundColor: '#f1356d', color: 'white', borderRadius: '8px' }}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', backgroundColor: '#f1356d', borderRadius: '8px' }}>Login</Link>
            <Link to="/signup" style={{ color: 'white', backgroundColor: '#f1356d', borderRadius: '8px' }}>Sign Up</Link>  {/* Sign Up Link */}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
