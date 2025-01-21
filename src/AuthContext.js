import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8000/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const users = await response.json();

      const authenticatedUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (authenticatedUser) {
        setUser(authenticatedUser); // Set the logged-in user
        return true;
      } else {
        return false; // Login failed
      }
    } catch (err) {
      console.error('Error during login:', err);
      return false;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
