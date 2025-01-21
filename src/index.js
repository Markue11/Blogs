import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the correct React 18+ API
import App from './App';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import './index.css';

// Create a root for React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app wrapped with AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
